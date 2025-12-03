"use client";

import { Menu, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [usingSupabase, setUsingSupabase] = useState<boolean | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Theme initialize
  useEffect(() => {
    try {
      const saved = localStorage.getItem("site-theme");
      if (saved) {
        const isSavedDark = saved === "dark";
        if (isSavedDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.classList.add("dark");
      }
    } catch {}
  }, []);

  // Supabase banner, API check
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("dismiss-mock-banner");
      setBannerDismissed(dismissed === "true");
    } catch {}

    fetch("/api/_status")
      .then((r) => r.json())
      .then((j) => {
        setUsingSupabase(!!j?.usingSupabase);
      })
      .catch(() => setUsingSupabase(false));
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* DEMO BANNER */}
      {usingSupabase === false && !bannerDismissed && (
        <div className="w-full bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-b border-amber-100 dark:border-amber-800 px-4 py-2 text-sm flex items-center justify-between">
          <div>
            Running in demo mode — Supabase credentials are not configured,
            using sample/mock data.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://supabase.com/dashboard/project/_/settings/api"
              target="_blank"
              rel="noreferrer"
              className="underline text-xs"
            >
              Add Supabase keys
            </a>
            <button
              onClick={() => {
                setBannerDismissed(true);
                try {
                  localStorage.setItem("dismiss-mock-banner", "true");
                } catch {}
              }}
              className="text-xs px-2 py-1 rounded-md bg-transparent hover:bg-amber-100 dark:hover:bg-amber-800/30"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TOP NAV */}
      <div className="backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* LOGO */}
          <a href="/" className="group flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm group-hover:scale-110 transition-transform animate-float" />
            <span className="text-xl font-semibold tracking-tight group-hover:text-emerald-700 transition-colors">
              Indian States Safety Index
            </span>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/compare">Compare States</a>
            <a className="nav-link" href="/about">About / Methodology</a>
            <a className="nav-link" href="/api-docs">API Docs</a>
            <a className="nav-link" href="/contact">Contact</a>
            <a href="/admin" className="btn">Admin</a>

            {/* 🌙/🌞 DARK MODE SWITCH (Animated) */}
            <button
              aria-label="Toggle theme"
              title="Toggle theme"
              className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              onClick={() => {
                const isDarkNow = document.documentElement.classList.toggle("dark");
                try {
                  localStorage.setItem(
                    "site-theme",
                    isDarkNow ? "dark" : "light"
                  );
                } catch {}
              }}
            >
              <span className="sr-only">Toggle theme</span>

              {/* Sun icon (visible in light mode) */}
              <Sun className="w-5 h-5 absolute text-amber-500 transition-all duration-300 dark:scale-0 dark:-rotate-90" />

              {/* Moon icon (visible in dark mode) */}
              <Moon className="w-5 h-5 absolute text-blue-300 transition-all duration-300 scale-0 dark:scale-100 rotate-90 dark:rotate-0" />
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-300 hover:bg-slate-100 hover:-translate-y-0.5 transition"
            aria-label="Open navigation menu"
            onClick={() => {
              const el = document.getElementById("mobile-nav");
              if (el) el.classList.toggle("hidden");
            }}
          >
            <Menu className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="sr-only">Menu</span>
          </button>
        </nav>
      </div>

      {/* MOBILE NAV */}
      <div
        id="mobile-nav"
        className="md:hidden hidden border-t border-slate-200 dark:border-slate-700"
      >
        <div className="px-4 py-3 space-y-2">
          <a href="/" className="mobile-link">Home</a>
          <a href="/compare" className="mobile-link">Compare States</a>
          <a href="/about" className="mobile-link">About / Methodology</a>
          <a href="/api-docs" className="mobile-link">API Docs</a>
          <a href="/contact" className="mobile-link">Contact</a>
          <a href="/admin" className="block px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
            Admin
          </a>

          {/* MOBILE DARK MODE TOGGLE */}
          <button
            onClick={() => {
              const isDarkNow = document.documentElement.classList.toggle("dark");
              try {
                localStorage.setItem(
                  "site-theme",
                  isDarkNow ? "dark" : "light"
                );
              } catch {}
            }}
            className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
            aria-label="Toggle theme"
          >
            <span className="inline-flex items-center gap-2">
              <Sun className="w-4 h-4 dark:hidden" />
              <Moon className="w-4 h-4 hidden dark:inline" />
              <span>Toggle theme</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
