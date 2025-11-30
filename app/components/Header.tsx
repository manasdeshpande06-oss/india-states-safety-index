'use client';

import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="group flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm group-hover:scale-110 transition-transform" />
          <span className="text-xl font-semibold tracking-tight group-hover:text-emerald-700 transition-colors">
            Indian States Safety Index
          </span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="/" className="hover:text-emerald-700 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all">Home</a>
          <a href="/compare" className="hover:text-emerald-700 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all">Compare States</a>
          <a href="/about" className="hover:text-emerald-700 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all">About / Methodology</a>
          <a href="/api-docs" className="hover:text-emerald-700 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all">API Docs</a>
          <a href="/contact" className="hover:text-emerald-700 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all">Contact</a>
          <a href="/admin" className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 transition">Admin</a>
        </div>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-300 hover:bg-slate-100 hover:-translate-y-0.5 transition"
          aria-label="Open navigation menu"
          onClick={() => {
            const el = document.getElementById('mobile-nav');
            if (el) el.classList.toggle('hidden');
          }}
        >
          <Menu className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="sr-only">Menu</span>
        </button>
      </nav>
      <div id="mobile-nav" className="md:hidden hidden border-t border-slate-200">
        <div className="px-4 py-3 space-y-2">
          <a href="/" className="block px-3 py-2 rounded-md hover:bg-slate-100">Home</a>
          <a href="/compare" className="block px-3 py-2 rounded-md hover:bg-slate-100">Compare States</a>
          <a href="/about" className="block px-3 py-2 rounded-md hover:bg-slate-100">About / Methodology</a>
          <a href="/api-docs" className="block px-3 py-2 rounded-md hover:bg-slate-100">API Docs</a>
          <a href="/contact" className="block px-3 py-2 rounded-md hover:bg-slate-100">Contact</a>
          <a href="/admin" className="block px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Admin</a>
        </div>
      </div>
    </header>
  );
}
