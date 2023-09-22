import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { CreatePost } from "./createPost";

import { RiBardLine } from "react-icons/ri";

function CreateButton() {
  return (
    <div className="flex items-center justify-center w-full">
      <Dialog>
        <DialogTrigger className="w-full">
          <Button
            size="lg"
            className="flex items-center justify-center w-full gap-2 p-3 rounded-full"
          >
            <Edit2 size={16} />
            Create post
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-[800px]">
          <DialogHeader className="w-full p-6">
            <DialogTitle className="flex items-center gap-2 text-base">
              <RiBardLine /> Create a post
            </DialogTitle>
            <DialogDescription className="text-xs">
              show your sparkle, share your ideas, jokes or thought
            </DialogDescription>
          </DialogHeader>
          <div className="w-full p-6 pt-0">
            <CreatePost />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateButton;
