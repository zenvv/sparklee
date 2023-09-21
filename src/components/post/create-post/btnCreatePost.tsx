import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { CreatePost } from "./createPost";

function CreateButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="flex gap-2">
          <Edit2 size={16} />
          Create post
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-lg border bg-background max-w-[700px] h-56 pr-8">
        <CreatePost />
      </DialogContent>
    </Dialog>
  );
}

export default CreateButton;
