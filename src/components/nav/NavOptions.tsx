import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { BadgeInfo, ChevronDown, Cog, LogOut, Settings } from "lucide-react";
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

export const NavOptions = () => {
  const [user] = useAuthState(auth);
  const { toast } = useToast();

  const signUserOut = async () => {
    await signOut(auth);

    toast({
      title: "signing out...",
      description: "we hope to see you again soon!",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="group">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground group-data-[state=open]:text-primary group-data-[state=open]:bg-muted transition-all"
          >
            <ChevronDown
              size={20}
              className="transition-all group-data-[state=open]:rotate-180"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center justify-start gap-2 p-3">
            <Settings size={18} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-start gap-2 p-3">
            <BadgeInfo size={18} />
            About
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={signUserOut}
            className="flex items-center justify-start gap-2 p-3 hover:bg-destructive/30"
          >
            <LogOut size={18} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
