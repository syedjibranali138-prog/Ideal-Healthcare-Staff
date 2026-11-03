"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Theme toggle loading"
        className={`relative inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-100 dark:bg-dark-surface opacity-70 cursor-default ${className}`}
      >
        <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center text-slate-400">
          <Moon className="w-4 h-4" />
        </div>
        {showLabel && (
          <span className="ml-2 text-xs font-semibold text-slate-400">Theme</span>
        )}
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative inline-flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 hover:scale-105 active:scale-95 cursor-pointer ${
        isDark
          ? "bg-navy-900/80 hover:bg-navy-800 text-amber-300 border border-navy-700/80 shadow-sm hover:border-amber-400/40 hover:shadow-amber-500/10"
          : "bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 border border-slate-200/90 shadow-sm hover:border-green-500/40 hover:shadow-green-500/10"
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5">
        <Sun
          className={`w-full h-full transition-all duration-500 absolute inset-0 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-amber-500 group-hover:rotate-45"
          }`}
        />
        <Moon
          className={`w-full h-full transition-all duration-500 absolute inset-0 ${
            isDark ? "rotate-0 scale-100 opacity-100 text-cyan-300 group-hover:-rotate-12" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}

