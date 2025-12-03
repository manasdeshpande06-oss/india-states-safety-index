import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Indian States Safety Index",
  description: "Explore safety across Indian states and union territories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
          <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm" />
                <span className="text-xl font-semibold tracking-tight">Indian States Safety Index</span>
              </a>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="/" className="hover:text-emerald-700 transition-colors">Home</a>
                <a href="/compare" className="hover:text-emerald-700 transition-colors">Compare States</a>
                <a href="/about" className="hover:text-emerald-700 transition-colors">About / Methodology</a>
                <a href="/api-docs" className="hover:text-emerald-700 transition-colors">API Docs</a>
                <a href="/contact" className="hover:text-emerald-700 transition-colors">Contact</a>
                <div className="flex items-center gap-3">
                  <a href="/admin" className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">Admin</a>
                  {/* Theme toggle beside Admin in the top nav */}
                  {/* Client component — toggles document.documentElement and localStorage */}
                  <ThemeToggle />
                </div>
              </div>
              <div className="md:hidden">
                <a href="/" className="flex items-center gap-2">
                  <span className="text-xl font-semibold tracking-tight">Menu</span>
                </a>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} Indian States Safety Index</div>
              <div className="flex items-center gap-3">
                <span>Last updated: —</span>
                <span>Data Sources: —</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
