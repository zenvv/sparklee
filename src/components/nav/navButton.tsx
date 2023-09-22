import { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface NavProps {
  icon: ElementType;
  activeIcon: ElementType;
  to: string;
  name: string;
}

export const NavButton = ({
  to,
  name,
  icon: Icon,
  activeIcon: AIcon,
}: NavProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        className={
          isActive
            ? "p-2 px-4 text-base font-semibold rounded-lg text-accent hover:bg-accent/10 hover:text-accent transition-all w-full justify-start hover:border-accent/20 border-transparent border"
            : "p-2 px-4 hover:opacity-100 opacity-60 text-base hover:bg-muted/50 font-semibold rounded-lg transition-all w-full justify-start hover:border-border border-transparent border"
        }
      >
        <Link
          href={to}
          key={name}
          className="flex items-center justify-start gap-3 transition-all"
        >
          {isActive ? <AIcon size={20} /> : <Icon size={20} />}
          <p>{name}</p>
        </Link>
      </Button>
    </>
  );
};
