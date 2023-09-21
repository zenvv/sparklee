import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

function AddTags() {
  return (
    <div>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Tag size={14} /> Add tags
      </Button>
    </div>
  );
}

export default AddTags;
