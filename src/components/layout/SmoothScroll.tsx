"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { smoothScroll } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ respectReducedMotion: false });
    smoothScroll.current = lenis;
    const handleScroll = () => ScrollTrigger.update();
    const handleTick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", handleScroll);
    gsap.ticker.add(handleTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handleTick);
      smoothScroll.current = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
