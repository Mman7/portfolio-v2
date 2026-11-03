import type Lenis from "lenis";

// Shared handle so other modules can reset scroll without importing the provider
export const smoothScroll: { current: Lenis | null } = { current: null };
