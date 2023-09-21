/* eslint-disable react/no-unescaped-entities */
import { SparkleeLogo } from "@/components/logo";
import { ThemeButton } from "@/components/switchTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat,
  Send,
} from "lucide-react";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import type { Metadata } from "next";
import LoginGoogle from "@/components/auth/joinWithGoogle";
import LoginGithub from "@/components/auth/joinWithGithub";

export const metadata: Metadata = {
  title: "login | sparklee!",
  description: "show the world your sparklee",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden">
      <div className="flex items-center justify-center w-full h-full p-8 max-w-7xl">
        <div className="flex items-center justify-center w-full h-full overflow-hidden border rounded-xl">
          <div className="flex flex-col items-center justify-between w-full h-full overflow-hidden">
            <header className="flex items-center justify-between w-full p-8 text-primary">
              <SparkleeLogo />
              <ThemeButton />
            </header>

            <div className="flex items-center w-full gap-8 p-4">
              <LoginGoogle />
              <LoginGithub />
            </div>

            <footer className="flex items-center justify-center w-full p-6 border-t">
              <span className="text-sm text-primary/50">
                made with ♡ by{" "}
                <a
                  className="hover:text-primary hover:underline"
                  href="https://www.github.com/zenvv"
                  rel="external"
                >
                  zenvv
                </a>
              </span>
            </footer>
          </div>
          <div className="flex items-center justify-center w-full h-full p-8 overflow-hidden bg-accent">
            <main className="flex items-center justify-center flex-1 w-full h-full">
              <div className="flex flex-col items-center justify-center gap-8 ">
                <PostLogin />
                <p className="text-base leading-relaxed opacity-80 text-background">
                  Join the vibrant community of sparklee! Unleash your thoughts,
                  follow your interests, and engage in meaningful discussions.{" "}
                  <br />
                  <strong className="text-background">
                    Log in now and be part of the spark!
                  </strong>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostLogin() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start w-full overflow-hidden transition-all border rounded-md shadow-xl select-none bg-card ">
        <div className="flex flex-col items-start w-full gap-2 p-4">
          <header className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="w-5 h-5 border">
                <AvatarFallback></AvatarFallback>
                <AvatarImage src="https://i.pravatar.cc/300" />
              </Avatar>
              <span className="text-sm font-semibold hover:underline hover:cursor-pointer text-muted-foreground">
                Jesse Miller
              </span>
            </div>
            <span className="flex items-center gap-3 text-xs text-muted-foreground">
              19:45 - 25/03/23
              <button className="p-1 rounded-lg hover:bg-primary/5">
                <MoreHorizontal size={14} />
              </button>
            </span>
          </header>

          <main className="overflow-hidden font-medium break-all h-fit w-fit hyphens-auto">
            Heyyy, I'm realy enjoing this sparklee thingy!
          </main>

          <footer className="flex items-start justify-center gap-1">
            <button className="p-1.5 text-primary transition-all hover:bg-primary/10 flex text-xs gap-2 rounded-md">
              <AiOutlineHeart size={16} />
            </button>

            <button className="-full p-1.5 text-primary transition-all hover:bg-primary/10 rounded-md">
              <MessageCircle size={16} />
            </button>
            <button className="-full p-1.5 text-primary transition-all hover:bg-primary/10 rounded-md">
              <Repeat size={16} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
