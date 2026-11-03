"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#top", pageHref: "/", id: "top" },
  { label: "About", href: "#about", pageHref: "/about", id: "about" },
  { label: "Projects", href: "#work", pageHref: "/projects", id: "work" },
  { label: "Contact", href: "#contact", pageHref: "/contact", id: "contact" },
];

const linkClass =
  "relative py-2 text-sm transition-colors hover:text-foreground";
const activeUnderline =
  "after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:bg-foreground after:content-['']";

type NavbarProps = {
  page?: "home" | "projects" | "about" | "contact";
};

export function Navbar({ page = "home" }: NavbarProps) {
  const isHome = page === "home";
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSolid(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const activeId = isHome
    ? null
    : { about: "about", contact: "contact", projects: "work" }[page];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-[calc(72px+env(safe-area-inset-top,0px))] items-center justify-between border-b pt-[env(safe-area-inset-top,0px)] px-[clamp(20px,4.5vw,64px)] transition-[background-color,border-color] duration-400 animate-[header-in_.8s_ease-out_both] ${isSolid ? "border-line bg-[rgb(8_8_8/85%)] backdrop-blur-sm" : "border-transparent"}`}
    >
      <a
        className="font-brand text-[18px] font-extrabold tracking-[.04em]"
        href={isHome ? "#top" : "/"}
        onClick={closeMenu}
      >
        ERIC MAN
      </a>
      <button
        className="hidden h-11 cursor-pointer items-center border border-[#333] px-4 font-mono text-xs text-foreground max-[767px]:inline-flex"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        MENU
      </button>
      <nav
        id="primary-navigation"
        className={`flex gap-8 text-sm text-muted ${isOpen ? "max-[767px]:flex" : "max-[767px]:hidden"} max-[767px]:absolute max-[767px]:inset-x-0 max-[767px]:top-[calc(72px+env(safe-area-inset-top,0px))] max-[767px]:flex-col max-[767px]:gap-3 max-[767px]:border-b max-[767px]:border-[#222] max-[767px]:bg-[#0b0b0b] max-[767px]:p-5`}
        aria-label="Primary navigation"
      >
        {links.map((link) => (
          <a
            key={link.label}
            className={`${linkClass} ${activeId === link.id ? `text-foreground ${activeUnderline}` : ""}`}
            href={isHome && link.id === "top" ? link.href : link.pageHref}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
