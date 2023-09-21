import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Heart, HeartCrack, Repeat } from "lucide-react";

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
import { title } from "process";

interface Props {
  post: Post;
}

interface Repost {
  userId: string;
  repostId: string;
  username: string;
}

export const RepostButton = ({ post }: Props) => {
  const [user] = useAuthState(auth);
  const { toast } = useToast();

  const [repost, setRepost] = useState<Repost[] | null>(null);

  const repRef = collection(db, "reposts");

  const getReposts = async () => {
    const data = await getDocs(query(repRef, where("postId", "==", post.id)));
    setRepost(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        repostId: doc.id,
        username: doc.data().username,
      }))
    );
  };

  const addRepost = async () => {
    try {
      const newDoc = await addDoc(repRef, {
        userId: user?.uid,
        username: user?.displayName,
        postId: post?.id,
      });
      if (user) {
        setRepost((prev: any) =>
          prev
            ? [
                ...prev,
                {
                  userId: user?.uid,
                  repostId: newDoc.id,
                  username: user?.displayName,
                },
              ]
            : [
                {
                  userId: user?.uid,
                  repostId: newDoc.id,
                  username: user?.displayName,
                },
              ]
        );
      }
      toast({
        title: `You have reposted ${post.username}'s post`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeRepost = async () => {
    try {
      const repToDelQuery = query(
        repRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const repToDelData = await getDocs(repToDelQuery);
      const repostId = repToDelData.docs[0].id;
      const repToDel = doc(db, "reposts", repostId);

      await deleteDoc(repToDel);

      if (user) {
        setRepost(
          (prev) =>
            prev && prev.filter((repost) => repost.repostId !== repostId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserReposted = repost?.find((repost) => repost.userId === user?.uid);

  useEffect(() => {
    getReposts();
  }, []);

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          {hasUserReposted ? (
            <div>
              <TooltipTrigger asChild>
                <button
                  onClick={removeRepost}
                  className="rounded-lg p-1.5 text-accent transition-all hover:bg-accent/30 bg-accent/20 flex text-xs gap-2"
                >
                  <Repeat size={14} />
                  Reposted
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo repost</p>
              </TooltipContent>
            </div>
          ) : (
            <div>
              <TooltipTrigger asChild>
                <button
                  onClick={addRepost}
                  className="rounded-lg p-1.5 text-primary transition-all hover:bg-primary/10 flex text-xs gap-2"
                >
                  <Repeat size={14} />
                  Repost
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Repost</p>
              </TooltipContent>
            </div>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const RepostList = ({ post }: Props) => {
  const [user] = useAuthState(auth);
  const [repost, setRepost] = useState<Repost[] | null>(null);
  const repRef = collection(db, "reposts");

  const getReposts = async () => {
    const data = await getDocs(query(repRef, where("postId", "==", post.id)));
    setRepost(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        repostId: doc.id,
        username: doc.data().username,
      }))
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(repRef, where("postId", "==", post.id)),
      (snapshot) => {
        const updatedReposts = snapshot.docs.map((doc) => ({
          userId: doc.data().userId,
          repostId: doc.id,
          username: doc.data().username, // Fetch the username of the user who reposted
        }));
        setRepost(updatedReposts);
      }
    );

    return () => unsubscribe();
  }, [post.id]);

  const repostedBy = repost?.filter(
    (repost) => repost.userId !== user?.uid || repost.userId === user?.uid
  );

  return (
    <div>
      {repostedBy && repostedBy.length > 0 && (
        <span className="flex items-center w-full gap-2 p-2 text-xs border-b">
          <Repeat size={10} />
          <h1 className="">
            {repostedBy.length === 1
              ? `${repostedBy[0].username} reposted this`
              : `${repostedBy.length} people reposted this`}
          </h1>
        </span>
      )}
    </div>
  );
};
