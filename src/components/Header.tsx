"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Rankings", href: "/rankings" },
  { label: "Categories", href: "/categories" },
  { label: "Compare", href: "/compare" },
  { label: "Methodology", href: "/methodology" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors rounded-md hover:bg-neutral-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-sm text-neutral-400 hover:border-neutral-700 hover:text-neutral-200 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search rankings...</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-neutral-700 bg-neutral-900 px-1.5 font-mono text-[10px] text-neutral-400">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/submit"
            className="hidden sm:inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            Submit
          </Link>

          <button
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-black">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-3 py-2.5 text-sm font-medium text-blue-400 hover:bg-neutral-900 rounded-md"
            >
              Submit a Product
            </Link>
          </nav>
        </div>
      )}

      {/* Search modal placeholder - functional search on /search */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div
            className="mx-auto mt-20 max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form action="/search" method="GET" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                name="q"
                autoFocus
                placeholder="Search products, rankings, categories..."
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 py-4 pl-12 pr-4 text-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </form>
            <p className="mt-3 text-center text-sm text-neutral-500">
              Press Enter to search or Esc to close
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
