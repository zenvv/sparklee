import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { BadgeInfo, ChevronDown, LogOut, Settings } from "lucide-react";
import { auth } from "@/config/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { SwitchTheme } from "../switchTheme";
import { useToast } from "../ui/use-toast";

export const UserOptions = () => {
  const [user] = useAuthState(auth);
  const { toast } = useToast()

  const signUserOut = async () => {
    await signOut(auth);

    toast({
      title: "signing out...",
      description: "we hope to see you again soon!"
    })
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
            <SwitchTheme />
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-start gap-2">
            <Settings size={18} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-start gap-2">
            <BadgeInfo size={18} />
            About 
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={signUserOut}
            className="flex items-center justify-start gap-2"
          >
            <LogOut size={18} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
