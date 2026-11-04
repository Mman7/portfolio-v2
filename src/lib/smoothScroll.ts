import type Lenis from "lenis";
import type { MouseEvent } from "react";

// Shared handle so other modules can reset scroll without importing the provider
export const smoothScroll: { current: Lenis | null } = { current: null };

// Smooth-scrolls to an in-page section, clearing the fixed navbar; falls back to native anchor jump
export function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  id: string,
) {
  const target = document.getElementById(id);
  if (!target || !smoothScroll.current) return;
  event.preventDefault();
  const mobile = window.matchMedia("(max-width: 899px)").matches;
  smoothScroll.current.scrollTo(target, { offset: mobile ? -120 : -72 });
}
