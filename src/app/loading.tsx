import { RiLoader4Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <span className="text-muted-foreground/50 animate-spin animate-ease-in-out">
        <RiLoader4Fill size={28} />
      </span>
    </div>
  );
}
