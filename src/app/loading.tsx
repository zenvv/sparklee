import { Sparkles } from "lucide-react";

export default function Loading() {
    return  (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-muted-foreground animate-rotate-y animate-infinite animate-duration-[2000ms] animate-ease-in-out">
          <Sparkles size={28} />
        </span>
      </div>
    )
  }