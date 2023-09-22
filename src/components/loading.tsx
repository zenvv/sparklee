import { RiLoader4Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <body className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <span className="text-muted-foreground/50 animate-spin animate-ease-in-out">
        <RiLoader4Fill size={28} />
      </span>
    </body>
  );
}
