import * as React from "react";
import { LaptopIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import * as ToggleGroup from '@radix-ui/react-toggle-group';

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
      >
        {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
