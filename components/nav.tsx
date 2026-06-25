"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, nav as navItems } from "@/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "border-b border-line/10 bg-bg/70 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          {profile.name}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line/20 px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:border-accent/40"
          >
            Resume
          </a>
        </div>

        <button
          className="text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/10 bg-bg/95 px-6 py-5 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-muted"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-accent"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
