import { Post } from "@/components/feed/Feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Repeat, Send } from "lucide-react";
import { Options } from "./options";
import { LikeButton, LikedBy } from "./likes";

import { useEffect, useState } from "react";
import { ViewReplies } from "../replies/replies";
import { Button } from "@/components/ui/button";
import { CreateReply } from "../replies/addReply";
import { RepostButton, RepostList } from "../repost/repost";

interface Props {
  posts: Post[];
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

export const PostCard = ({ post }: { post: Post }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatted = calculateTimeDifference(post.postDate.seconds);
    setFormattedDate(formatted);
  }, [post.postDate.seconds]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full flex-col items-start bg-muted-foreground/5 border transition-all rounded-sm animate-fade-down animate-once animate-duration-[400ms] animate-ease-in-out">
        <span className="w-full opacity-80">
          <RepostList post={post} />
        </span>
        <div className="flex flex-col items-start w-full gap-2 p-4">
          <header className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="w-5 h-5 border">
                <AvatarFallback>🦎</AvatarFallback>
                <AvatarImage src={post.userPhoto || ""} />
              </Avatar>
              <span className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <span className="text-primary hover:underline hover:cursor-pointer">
                  {post.username}
                </span>
                <span>posted {formattedDate}</span>
              </span>
            </div>
            <span className="flex items-center gap-3 text-xs text-muted-foreground">
              <Options post={post} />
            </span>
          </header>

          <main className="overflow-hidden font-medium break-all h-fit w-fit hyphens-auto">
            {post.content}
          </main>
          <footer className="flex items-center justify-between w-full">
            <div>
              <LikedBy post={post} />
            </div>
            <div className="flex items-center justify-end gap-1 opacity-80 hover:opacity-100">
              <LikeButton post={post} />
              <ViewReplies post={post} />
              <RepostButton post={post} />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
