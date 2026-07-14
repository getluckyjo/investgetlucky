"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#product", label: "The Product" },
  { href: "#proof", label: "SA Proof" },
  { href: "#global", label: "Global" },
  { href: "#why-dean", label: "Why You" },
  { href: "#deal", label: "The Deal" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid || open
          ? "bg-green-deep/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Get Lucky">
          <Image
            src="/logos/logo-dark-bg.png"
            alt="Get Lucky Golf"
            width={120}
            height={44}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-wider text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#deal"
            className="rounded-full bg-gold px-5 py-2 text-[13px] font-bold uppercase tracking-wider text-green-deep transition-transform hover:scale-[1.04]"
          >
            The Offer
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream transition-colors hover:text-gold md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-cream/10 bg-green-deep/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-cream/5 py-3 text-sm font-medium uppercase tracking-wider text-cream/85 transition-colors last:border-b-0 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
