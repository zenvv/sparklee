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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const schema: any = z.object({
  content: z
    .string()
    .min(1, { message: "Your post can't be empty!" })
    .max(512, { message: "You've reached the 512-character limit!" }),
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
  const [imgData, setImgData] = useState<any | null>();

  const [img, setImg] = useState("");

  const handleUpload = (e: any) => {
    console.log(e.target.files[0]);
    const name = e.target.files[0].name;
    const imgs = ref(storage, `posts/${name}`);

    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
      });
    });
  };

  // const getImage = async () => {
  //   const postsRef = collection(db, "posts");

  //   const postdb = await getDocs(postsRef);

  //   const allData = postdb.docs.map((val) => ({ ...val.data(), id: val.id }));

  //   setImgData(allData);
  //   console.log("getImage function", postdb);
  // };

  // useEffect(() => {
  //   getImage();
  // });

  if (user) {
    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: z.infer<typeof schema>) => {
      await addDoc(postsRef, {
        ...data,
        postDate: Timestamp.fromDate(new Date()),
        username: user?.displayName,
        userId: user?.uid,
        userPhoto: user?.photoURL,
        postImage: img,
      });

      toast({
        title: "hey you wrote another post! ;)",
        description: `"${data.content}"`,
      });
      reset();
    };

    return (
      <div className="w-full h-full">
        <form
          className="flex flex-col w-full h-full gap-2 overflow-hidden transition-all"
          onSubmit={handleSubmit(onCreatePost)}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="flex flex-col items-start w-full gap-3 p-4 border-b h-min">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>🦎</AvatarFallback>
                  <AvatarImage src={user?.photoURL || ""} />
                </Avatar>
                <p className="text-sm font-bold">{user?.displayName}</p>
              </div>

              <div className="w-full h-full overflow-hidden">
                <Textarea
                  contentEditable="true"
                  placeholder="What do you want to write?"
                  {...register("content")}
                  onChange={(e) => setValue(e.target.value)}
                  className="h-full p-0 text-base border-none rounded-none resize-none text-baseoutline-none ring-0 focus-within:outline-none focus-within:ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
                />
              </div>
            </div>

            {imgData?.map((value: any) => {
              <div className="relative w-full h-40 my-4">
                <span className="absolute top-0 right-0 z-10 p-4">
                  <Button size="icon" variant="destructive" className="">
                    <Trash2 size={18} />
                  </Button>
                </span>
                <img
                  src={value.postImage || "https://www.bit.ly/placeholder-img"}
                  alt="test"
                  className="object-cover w-full h-full border rounded-lg hover:opacity-80"
                />
              </div>;
            })}

            <div className="flex items-center justify-between w-full p-4">
              <div className="flex items-center gap-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Image size={14} /> Add image
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-full p-4 rounded-lg"
                  >
                    <header className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-lg font-bold text-primary">
                        <Image size={18} />
                        Upload your photos
                      </div>
                    </header>
                    <div className="relative w-full h-20 group">
                      <Input
                        id="picture"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        placeholder="Select a photo to upload!"
                        className="flex flex-col items-center justify-center w-full h-full gap-2 p-4 text-transparent border border-dashed rounded-lg cursor-pointer hover:bg-muted/30 file:text-transparent"
                        onChange={(e) => handleUpload(e)}
                      />
                      <span className="absolute bottom-0 right-0 flex flex-row items-center justify-center w-full gap-4 transition-all pointer-events-none select-none top-1 left-1 text-muted-foreground/50 group-hover:text-accent">
                        <Upload size={20} />
                        <span className="font-semibold">
                          Select a file to upload
                        </span>
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
                <AddTags />
              </div>
              <div className="text-xs">
                <div className="ml-5 text-left text-red-400">
                  <p>{errors.root?.message}</p>
                </div>
              </div>
              <div>
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 px-8"
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

function UploadImage() {
  return <div></div>;
}
