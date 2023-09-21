"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Post } from "@/components/feed/Feed";
import { auth, db } from "@/config/firebase";
import { MessageCircle, MessagesSquare, Reply } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResProps {
  reply: string;
}

const replySchema: any = z.object({
  reply: z
    .string()
    .min(0, { message: "you must write something to reply!" })
    .max(512, { message: "You've reached the 512-character limit!" }),
});

interface Props {
  post: Post;
}

export function CreateReply({ post }: Props) {
  const { toast } = useToast();

  const [user] = useAuthState(auth);

  const [reply, setReply] = useState<ResProps[]>([]);

  const replyRef = collection(db, "replies");

  const repDoc = query(replyRef, where("postId", "==", post.id));
  const getReply = async () => {
    const data = await getDocs(repDoc);
    setReply(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        reply: doc.id,
      }))
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(repDoc, (snapshot) => {
      getReply();
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      reply: "",
    },
  });

  async function onAddreply(values: z.infer<typeof replySchema>) {
    try {
      if (!values.reply) {
        toast({
          title: "Your reply can't be empty!",
          variant: "destructive",
        });
      } else {
        const newDoc = await addDoc(replyRef, {
          userId: user?.uid,
          postId: post?.id,
          reply: values.reply,
          username: user?.displayName,
          userPhoto: user?.photoURL,
        });
        toast({
          title: `Your reply was sent to ${post.username}`,
          description: `"${values.reply}"`,
        });
        if (user) {
          getReply();
          form.reset();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex items-end w-full gap-2"
        onSubmit={form.handleSubmit(onAddreply)}
      >
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormDescription className="flex items-center">
                <MessagesSquare size={15} className="mx-2" />
                <p>
                  Add a reply to <strong>{post.username}</strong>
                </p>
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="What do you want to reply?"
                  className="bg-background"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit" className="gap-2">
          <Reply size={16} />
          Reply
        </Button>
      </form>
    </Form>
  );
}
