import { Post } from "@/components/feed/Feed";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/config/firebase";

import {
  collection,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

import { Flag, MoreHorizontal, Share2, Trash } from "lucide-react";

import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: Post;
}

export const Options = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const { toast } = useToast();

  const postRef = collection(db, "posts");

  const removePost = async () => {
    try {
      const postId = post.id;
      const postToDel = doc(db, "posts", postId);

      if (user?.uid === post.userId) {
        const userRef = doc(db, "users", user.uid);
        await deleteDoc(postToDel);

        await updateDoc(userRef, {
          posts: increment(-1),
        });

        toast({
          variant: "destructive",
          title: "Post deleted.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="p-1 rounded-lg hover:bg-primary/5">
              <MoreHorizontal size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <Share2 size={14} />
              Share Post
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Flag size={14} />
              Report Post
            </DropdownMenuItem>
            {user?.uid == post.userId && (
              <div>
                <DropdownMenuSeparator />

                <DialogTrigger asChild>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Trash size={14} /> Delete post
                  </DropdownMenuItem>
                </DialogTrigger>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure about that?</DialogTitle>
            <DialogDescription>
              Deleting a post is a <strong>permanent action</strong> and can not
              be reversed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" onClick={removePost}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
