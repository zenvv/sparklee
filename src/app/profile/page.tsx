/* eslint-disable @next/next/no-img-element */
"use client";

import { PostCard } from "@/components/post/card/postCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, db } from "@/config/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Edit, Heart, MessagesSquare, Repeat } from "lucide-react";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import ProfileSettings from "./components/profileConfig";

export interface Post {
  id: string;
  userId: string;
  content: string;
  username: string;
  userPhoto: string;
  postDate: string;
}

export default function Page() {
  const user = auth.currentUser;

  const [postsList, setPostList] = React.useState<Post[] | null>(null);
  const [likedPosts, setLikedPosts] = React.useState<Post[] | null>(null);

  const postsRef = collection(db, "posts");
  const likesRef = collection(db, "likes");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    const userPosts = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id } as Post))
      .filter((post) => post.userId === user?.uid);
    setPostList(userPosts);
  };

  const getLikedPosts = async () => {
    if (user) {
      const likedPostsQuery = query(likesRef, where("userId", "==", user?.uid));
      const likedPostsSnapshot = await getDocs(likedPostsQuery);
      const likedPostIds = likedPostsSnapshot.docs.map(
        (doc) => doc.data().postId
      );

      const likedPostsData = await Promise.all(
        likedPostIds.map(async (postId) => {
          const postDocRef = collection(db, "posts", postId);
          const postDocSnapshot = await getDocs(postDocRef);
          const postData = postDocSnapshot.docs[0].data() as Post;
          return postData;
        })
      );

      setLikedPosts(likedPostsData);
    }
  };

  React.useEffect(() => {
    if (user) {
      getPosts();
      getLikedPosts();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <div className="w-full">
        <ProfileSettings />

        <div className="flex items-center justify-center w-full">
          <Tabs defaultValue="posts" className="w-full my-2">
            <TabsList className="flex items-center justify-start w-full gap-1 p-2 rounded-lg h-max bg-muted/50">
              <TabsTrigger
                value="posts"
                className="w-full p-2 px-5 text-sm font-bold -full"
              >
                <MessagesSquare size={16} className="mr-2" />
                your posts
              </TabsTrigger>
              <TabsTrigger
                value="reposts"
                className="w-full p-2 px-5 text-sm font-bold -full"
              >
                <Repeat size={16} className="mr-2" />
                your reposts
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="w-full p-2 px-5 text-sm font-bold -full"
              >
                <Heart size={16} className="mr-2" /> liked posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="flex flex-col w-full gap-2 py-2">
                {postsList?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="likes">
              <div className="flex flex-col w-full py-2">
                {likedPosts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reposts">
              <span>WIP</span>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
