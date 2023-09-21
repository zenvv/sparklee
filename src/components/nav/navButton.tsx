import { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface NavProps {
  icon: ElementType;
  to: string;
  name: string;
}

export const NavButton = ({ to, name, icon: Icon }: NavProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        className={isActive ? "p-2 px-3" : "p-2 px-3 opacity-50"}
      >
        <Link href={to} key={name} className="flex gap-1.5 items-center">
          <Icon size={16} />
          <p>{name}</p>
        </Link>
      </Button>
    </>
  );
};
