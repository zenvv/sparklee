import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/config/firebase";

import { collection, deleteDoc, doc } from "firebase/firestore";

import { Flag, MoreHorizontal, Share2, Trash } from "lucide-react";

import { useAuthState } from "react-firebase-hooks/auth";
import { Reply } from "./replies";

interface RepProps {
  reply: Reply;
}

export default function ReplyOptions(props: RepProps) {
  const { reply } = props;
  const [user] = useAuthState(auth);

  const { toast } = useToast();
  const replyRef = collection(db, "replies");

  const removeReply = async () => {
    try {
      const replyId = reply.id;
      const replyToDel = doc(db, "replies", replyId);

      if (user?.uid === reply.userId) {
        await deleteDoc(replyToDel);
        toast({
          variant: "destructive",
          title: "Reply deleted.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="p-1 rounded-lg hover:bg-primary/5">
              <MoreHorizontal size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <Flag size={14} />
              Report reply
            </DropdownMenuItem>
            {user?.uid === reply.userId && (
              <div>
                <DropdownMenuSeparator />

                <DialogTrigger asChild>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Trash size={14} /> Delete reply
                  </DropdownMenuItem>
                </DialogTrigger>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure about that?</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" onClick={removeReply}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
