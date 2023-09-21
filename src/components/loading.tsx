import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <body className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <span className="text-muted-foreground/50 animate-rotate-y animate-infinite animate-duration-[1000ms] animate-ease-in-out">
        <Sparkles size={28} />
      </span>
    </body>
  );
}
