/* eslint-disable react/no-unescaped-entities */
import { PostCard } from "@/components/post/card/postCard";
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { CreatePost } from "../post/create-post/createPost";
import { Sparkles } from "lucide-react";
import { RiEmotionSadLine } from "react-icons/ri";

export interface Post {
  id: string;
  userId: string;
  content: string;
  username: string;
  userPhoto: string;
  postDate: any;
  postImage: string;
}

export default function Feed() {
  const [postsList, setPostList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[];
      setPostList(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex items-start justify-start w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 transition-all">
          {!postsList?.length == false ? (
            <main className="flex flex-col items-center justify-center w-full gap-2">
              <header className="w-full mb-4">
                <CreatePost />
              </header>
              <span className="flex items-center justify-center w-full gap-2 p-3 text-muted-foreground">
                <Sparkles size={13} />
                <h1 className="text-sm font-semibold">
                  See what's happening in sparklee now!
                </h1>
              </span>
              <span className="flex flex-col flex-wrap w-full gap-4">
                {postsList?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </span>

              <span className="w-full text-xs text-center text-muted-foreground opacity-80">
                that's all for today!
              </span>
            </main>
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-8">
              <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 py-12 text-lg border rounded-xl bg-muted/30 text-muted-foreground">
                <RiEmotionSadLine size={48} className="opacity-40" />
                <span className="flex flex-col items-center">
                  <h1 className="font-bold">There are no posts yet =/</h1>
                  <span className="text-sm">
                    You could start by writing your own!
                  </span>
                </span>
              </div>
              <header className="flex w-full">
                <CreatePost />
              </header>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
