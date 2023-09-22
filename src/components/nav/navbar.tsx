import { Edit2, Hash, Home, Search, Send, UserCircle } from "lucide-react";

import {
  RiHome2Fill,
  RiHome2Line,
  RiUserSmileLine,
  RiUserSmileFill,
  RiStarLine,
  RiStarFill,
} from "react-icons/ri";

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
import { NavOptions } from "./NavOptions";
import { NavButton } from "./navButton";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateButton from "../post/create-post/btnCreatePost";
import Image from "next/image";
import { ThemeButton } from "../switchTheme";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-start justify-between w-full h-full">
        <span className="flex items-center justify-between w-full p-4 px-6 mt-10 text-primary">
          <span className="scale-90">
            <SparkleeLogo />
          </span>
          <ThemeButton />
        </span>

        <div className="flex flex-col items-start justify-start w-full h-full gap-1 p-4 px-8 my-8">
          <span className="flex items-center justify-center w-full mb-8">
            <CreateButton />
          </span>
          <NavButton
            name="Home"
            to="/"
            icon={RiHome2Line}
            activeIcon={RiHome2Fill}
          />
          <NavButton
            name="Favorites"
            to="/fav"
            icon={RiStarLine}
            activeIcon={RiStarFill}
          />
          <NavButton
            name="Profile"
            to="/profile"
            icon={RiUserSmileLine}
            activeIcon={RiUserSmileFill}
          />
        </div>
        <div className="flex w-full p-6">
          <div className="flex items-center justify-between w-full p-2 transition-all border border-transparent rounded-lg hover:bg-muted/50 hover:border-border">
            <span className="flex flex-row items-center justify-start w-full gap-2">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback>🦎</AvatarFallback>
                <AvatarImage src={user?.photoURL || ""} />
              </Avatar>
              <Link
                href="/profile/"
                className="flex flex-col items-center gap-3 text-base font-medium opacity-80 hover:opacity-100"
              >
                {user?.displayName}
              </Link>
            </span>
            <NavOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /*



*/
}
