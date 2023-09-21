"use client";

import Feed from "@/components/feed/Feed";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Page() {
  return (
    <div className="flex items-center justify-start w-full h-full">
      <Feed />
    </div>
  );
}

{
  /* <div className="h-full w-72 bg-background border rounded-md sticky top-[72px]">
        <header className="p-4">
          <h1 className="text-base font-bold">Connect with some new friends!</h1>
        </header>
        <main className="p-2 border-t">
          <span className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50">
            <span className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarFallback>🦎</AvatarFallback>
            <AvatarImage src="/" />
          </Avatar>
          <p className="text-sm text-primary/80 hover:underline hover:text-primary hover:cursor-pointer">username</p>
            </span>
          <Button size="sm" variant="ghost" className="hover:bg-indigo-500/20 hover:text-indigo-500">Follow</Button>
          </span>
          <span className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50">
            <span className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarFallback>🦎</AvatarFallback>
            <AvatarImage src="/" />
          </Avatar>
          <p className="text-sm text-primary/80 hover:underline hover:text-primary hover:cursor-pointer">username</p>
            </span>
          <Button size="sm" variant="ghost" className="hover:bg-indigo-500/20 hover:text-indigo-500">Follow</Button>
          </span>
          <span className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50">
            <span className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarFallback>🦎</AvatarFallback>
            <AvatarImage src="/" />
          </Avatar>
          <p className="text-sm text-primary/80 hover:underline hover:text-primary hover:cursor-pointer">username</p>
            </span>
          <Button size="sm" variant="ghost" className="hover:bg-indigo-500/20 hover:text-indigo-500">Follow</Button>
          </span>
        </main>
      </div> */
}
