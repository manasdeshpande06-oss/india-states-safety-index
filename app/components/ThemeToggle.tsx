"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("site-theme");
      if (saved) {
        const isSaved = saved === "dark";
        setIsDark(isSaved);
        // ensure root class matches saved preference
        if (isSaved) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    } catch {}
  }, []);

  const handleToggle = () => {
    const next = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("site-theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={handleToggle}
      className={className || "inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"}
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className="w-4 h-4 dark:hidden text-amber-500" />
      <Moon className="w-4 h-4 hidden dark:inline text-blue-300" />
    </button>
  );
}
