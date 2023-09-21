import { Edit2, Hash, Home, Search, Send, UserCircle } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { SparkleeLogo } from "../logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserOptions } from "./userOptions";
import { NavButton } from "./navButton";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateButton from "../post/create-post/btnCreatePost";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex items-center justify-center w-full h-screen p-8 border-r bg-background">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <SparkleeLogo />
        <CreateButton />
        <div className="flex flex-col items-end gap-2">
          <NavButton name="Home" to="/" icon={Home} />
          <NavButton name="Profile" to="/profile" icon={UserCircle} />
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/profile/"
            className="flex flex-row-reverse items-center gap-3 "
          >
            <span className="text-sm opacity-80 hover:opacity-100">
              {user?.displayName}
            </span>
            <Avatar className="border h-7 w-7 hover:border-primary">
              <AvatarFallback>🦎</AvatarFallback>
              <AvatarImage src={user?.photoURL || ""} />
            </Avatar>
          </Link>
          <UserOptions />
        </div>
      </div>
    </div>
  );
};

{
  /*



*/
}
