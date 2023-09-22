import * as React from "react";
import { LaptopIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="flex items-center justify-between gap-2 p-2">
      {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm">
        {theme === "light" ? "Light" : "Dark"} Theme
      </span>
      <Switch onCheckedChange={handleTheme} checked={theme === "dark"} />
    </div>
  );
}

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleTheme}
      className="transition-all"
    >
      {theme === "light" ? (
        <RiSunLine className="w-4 h-4 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-primary" />
      ) : (
        <RiMoonClearLine className="absolute w-4 h-4 transition-all scale-0 -rotate-90 dark:scale-100 dark:rotate-0 text-primary" />
      )}
    </Button>
  );
}
