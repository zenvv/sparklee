/* eslint-disable @next/next/no-img-element */
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Heart, HeartCrack } from "lucide-react";

import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { Post } from "@/components/feed/Feed";
import { auth, db } from "@/config/firebase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  post: Post;
}

interface Like {
  userId: string;
  likeId: string;
  userPhoto: string;
  userName: string;
}

export const LikeButton = ({ post }: Props) => {
  const { toast } = useToast();

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");

  const getLikes = async () => {
    const data = await getDocs(query(likesRef, where("postId", "==", post.id)));
    setLikes(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        likeId: doc.id,
        userPhoto: doc.data().userPhoto,
        userName: doc.data().userName,
      }))
    );
  };

  const addLike = async () => {
    try {
      if (!user) {
        toast({
          title: "ERROR",
          description: "Since you aren't logged on, you can not like this.",
        });
        return;
      }
      const newDoc = await addDoc(likesRef, {
        userId: user.uid,
        postId: post.id,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });
      const newLike = {
        userId: user.uid,
        likeId: newDoc.id,
        userName: user.displayName,
        userPhoto: user.photoURL,
      };
      setLikes((prevLikes: any) =>
        prevLikes ? [...prevLikes, newLike] : [newLike]
      );
    } catch (err) {
      console.error("Error adding like:", err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDelQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDelData = await getDocs(likeToDelQuery);
      const likeId = likeToDelData.docs[0].id;
      const likeToDel = doc(db, "likes", likeId);

      await deleteDoc(likeToDel);

      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          {hasUserLiked ? (
            <div>
              <TooltipTrigger asChild>
                <button
                  onClick={removeLike}
                  className="rounded-lg p-1.5 text-accent transition-all hover:bg-accent/30 bg-accent/20 flex text-xs gap-2"
                >
                  <AiFillHeart size={14} />
                  Liked
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove like</p>
              </TooltipContent>
            </div>
          ) : (
            <div>
              <TooltipTrigger asChild>
                <button
                  onClick={addLike}
                  className="rounded-lg p-1.5 text-primary transition-all hover:bg-primary/10 flex text-xs gap-2"
                >
                  <AiOutlineHeart size={14} />
                  Like
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add like</p>
              </TooltipContent>
            </div>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const LikedBy = ({ post }: Props) => {
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesQuery = query(likesRef, where("postId", "==", post.id));

  useEffect(() => {
    const unsubscribe = onSnapshot(likesQuery, async (snapshot) => {
      const likesData: Like[] = [];

      for (const doc of snapshot.docs) {
        const likeDocumentData = doc.data();
        const userDoc = await getDoc(doc.ref);
        const userDocumentData = userDoc.data();

        if (userDocumentData) {
          likesData.push({
            userId: likeDocumentData.userId,
            likeId: doc.id,
            userPhoto: userDocumentData.photoURL,
            userName: userDocumentData.displayName,
          });
        }
      }

      setLikes(likesData);
    });

    return () => unsubscribe();
  }, [likesQuery]);

  return (
    <div>
      {likes?.length != 0 ? (
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          {likes?.length} {likes?.length == 1 ? "like" : "likes"}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">no likes yet</span>
      )}
    </div>
  );
};
