import { Post } from "@/components/feed/Feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { MessageCircle, Repeat, Send } from "lucide-react";
import React, { useEffect, useState } from "react";

import { CreateReply } from "./addReply";
import { LikeButton } from "../card/likes";
import { Options } from "../card/options";
import ReplyOptions from "./replyOptions";
import { Button } from "@/components/ui/button";

export interface Reply {
  id: string;
  reply: string;
  postId: string;
  userId: string;
  username: string;
  userPhoto: string;
  post: string;
}

interface ReplyProp {
  replies: Reply[];
}

interface PostProp {
  post: Post;
}

const calculateTimeDifference = (timestamp: number): string => {
  const now = new Date();
  const postDate = new Date(timestamp * 1000);

  const timeDifferenceInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000
  );

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} seconds ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

const ReplyList: React.FC<ReplyProp> = ({ replies }) => {
  const [showMore, setShowMore] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState<Reply[]>([]);

  useEffect(() => {
    if (replies.length > 3) {
      setVisibleReplies(replies.slice(0, 3));
      setShowMore(true);
    } else {
      setVisibleReplies(replies);
      setShowMore(false);
    }
  }, [replies]);

  const handleShowMore = () => {
    setVisibleReplies(replies);
    setShowMore(false);
  };

  return (
    <div className="w-full">
      {replies.length !== 0 && (
        <div className="w-full">
          <span className="flex flex-col w-full overflow-hidden">
            <div className="flex items-center justify-between w-full p-2 px-4">
              <h2 className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <MessageCircle size={14} />
                <span>
                  {replies.length} {replies.length == 1 ? "reply" : "replies"}
                </span>
              </h2>
              {showMore && (
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-1 px-2 text-xs"
                    onClick={handleShowMore}
                  >
                    Show more
                  </Button>
                </div>
              )}
            </div>

            {visibleReplies.map((reply, index) => (
              <div
                key={`${reply.postId}-${index}`}
                className="flex flex-row items-start justify-between w-full gap-1 p-4 border-t last:border-y border-muted/25"
              >
                <div className="flex flex-col items-start justify-center gap-1 leading-none">
                  <span className="flex items-center gap-2">
                    <Avatar className="w-3 h-3">
                      <AvatarFallback>🦎</AvatarFallback>
                      <AvatarImage src={reply.userPhoto} />
                    </Avatar>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {reply.username}
                    </p>
                  </span>

                  <p className="text-sm font-semibold text-primary">
                    {reply.reply}
                  </p>
                </div>
                <span>
                  <ReplyOptions reply={reply} />
                </span>
              </div>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export const ViewReplies: React.FC<PostProp> = ({ post }) => {
  const [replies, setReplies] = useState<Reply[]>([]);

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatted = calculateTimeDifference(post.postDate.seconds);
    setFormattedDate(formatted);
  }, [post.postDate.seconds]);

  useEffect(() => {
    const replyRef = collection(db, "replies");
    const q = query(replyRef, where("postId", "==", post.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReplies: Reply[] = [];
      snapshot.forEach((doc) => {
        fetchedReplies.push({ postId: doc.id, ...doc.data() } as Reply);
      });
      setReplies(fetchedReplies);
    });

    return () => {
      unsubscribe();
    };
  }, [post.id]);

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center">
                <button className="rounded-lg text-xs flex gap-2 items-center p-1.5 text-primary transition-all hover:bg-primary/10">
                  <MessageCircle size={14} />
                  Reply
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View/Add Replies</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent className="w-screen max-w-[700px] overflow-hidden bg-card p-0 rounded-lg">
          <DialogTitle className="w-full pr-8">
            <div className="w-full">
              <div className="flex items-start w-full gap-2 p-4">
                <Avatar className="border h-7 w-7">
                  <AvatarFallback>🦎</AvatarFallback>
                  <AvatarImage src={post.userPhoto || ""} />
                </Avatar>
                <div className="flex flex-col w-full leading-none">
                  <header className="flex items-center justify-between w-full pb-1">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {post.username}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <p className="text-xs">{formattedDate}</p>
                      <Options post={post} />
                    </div>
                  </header>
                  <p className="pt-1">{post.content}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full pb-1 pr-6 px-11">
                <div className="flex items-center justify-center gap-2">
                  <LikeButton post={post} />

                  <button className="-full p-1.5 text-primary transition-all hover:bg-primary/10">
                    <Repeat size={16} />
                  </button>
                  <button className="-full p-1.5 text-primary transition-all hover:bg-primary/10">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="w-full m-0">
            <ReplyList replies={replies} />
          </DialogDescription>
          <div className="p-3">
            <div className="w-full p-4 border text-primary -2xl bg-muted/30">
              <CreateReply post={post} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
