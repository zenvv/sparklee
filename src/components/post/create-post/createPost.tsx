"use client";

/* eslint-disable jsx-a11y/alt-text */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Image, Send, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import AddTags from "./addTags";
import { auth, db, storage } from "@/config/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
// import UploadImage from "./uploadImage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Dialog } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const schema: any = z.object({
  content: z
    .string()
    .min(1, { message: "Your post can't be empty!" })
    .max(128, { message: "You've reached the 128-character limit!" }),
});

export const CreatePost = () => {
  const [user] = useAuthState(auth);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });
  const [value, setValue] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState("");

  const handleUpload = (e: any) => {
    const file = e.target[0]?.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  if (user) {
    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: z.infer<typeof schema>) => {
      try {
        let postImage = imgURL; // Use the current image URL if it exists

        if (selectedImage) {
          // Upload the selected image to Firebase Storage
          const storageRef = ref(storage, `posts/${doc}/${selectedImage.name}`);
          const uploadTask = uploadBytes(storageRef, selectedImage);

          await uploadTask;

          // Get the download URL of the uploaded image
          postImage = await getDownloadURL(storageRef);
        }

        // Create the post with text content and image URL
        await addDoc(postsRef, {
          ...data,
          postDate: Timestamp.fromDate(new Date()),
          username: user?.displayName,
          userId: user?.uid,
          userPhoto: user?.photoURL,
          postImage,
        });

        toast({
          title: "hey you wrote another post! ;)",
          description: `"${data.content}"`,
        });

        // Reset form and selected image
        reset();
        setSelectedImage(null);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    };

    return (
      <div className="w-full h-full">
        <form
          className="flex flex-col w-full gap-2 overflow-hidden transition-all group"
          onSubmit={handleSubmit(onCreatePost)}
        >
          <div className="flex flex-col items-center justify-between w-full gap-3 transition-all">
            <div className="flex flex-col items-start w-full gap-3">
              <div className="flex items-center w-full gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>🦎</AvatarFallback>
                  <AvatarImage src={user?.photoURL || ""} />
                </Avatar>
                <div className="w-full transition-all">
                  <Input
                    placeholder="What do you want to write?"
                    {...register("content")}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-full p-0 overflow-hidden text-base border-none rounded-none outline-none ring-0 focus-within:outline-none focus-within:ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="text-xs">
                <div className="ml-5 text-left text-red-400">
                  <p>{errors.root?.message}</p>
                </div>
              </div>
              {!imgURL && ""}
              {imgURL && (
                <div className="w-full h-64">
                  <img
                    src={imgURL || "https://www.bit.ly/placeholder-img"}
                    alt="test"
                    className="object-cover object-top w-full h-full border rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between w-full py-4 transition-all border-t border-dashed">
              <div className="flex items-center gap-1">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="flex items-center gap-2"
                    >
                      <Image size={14} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full p-4 rounded-lg">
                    <header className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-lg font-bold text-primary">
                        <Image size={18} />
                        Upload your photos
                      </div>
                    </header>
                    <form onSubmit={handleSubmit(onCreatePost)}>
                      <div className="relative w-full h-40 group">
                        <Input
                          id="picture"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onSubmit={handleSubmit(onCreatePost)}
                          placeholder="Select a photo to upload!"
                          className="flex flex-col items-center justify-center w-full h-full gap-2 p-4 text-transparent border border-dashed rounded-lg cursor-pointer hover:bg-muted/30 file:text-transparent"
                        />
                        <span className="absolute bottom-0 right-0 flex flex-col items-center justify-center w-full gap-4 transition-all pointer-events-none select-none top-1 left-1 text-muted-foreground/50 group-hover:text-accent">
                          <Upload size={20} />
                          <span className="font-semibold">
                            Select a file to upload
                          </span>
                        </span>
                      </div>
                    </form>
                    {!selectedImage && ""}
                    {selectedImage && (
                      <div className="w-full p-4 text-sm rounded-lg bg-muted/50 text-muted-foreground">
                        <p>File selected: {selectedImage.size}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between w-full gap-4">
                      <AlertDialogCancel className="w-full">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="w-full">
                        Done
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
                {/* <AddTags /> */}
              </div>

              <div>
                <Button
                  variant="default"
                  className="flex items-center gap-2 p-2 px-10 rounded-full"
                  type="submit"
                  disabled={!value}
                >
                  Post
                  <Send size={14} className="transition-all" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};
