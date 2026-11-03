"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useContactAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
          fine: "(pointer: fine)",
        },
        (context) => {
          const { motion, mobile, fine } = context.conditions as Record<
            string,
            boolean
          >;
          if (!motion) return;

          const k = mobile ? 0.5 : 1;
          const q = (selector: string) =>
            root.querySelector<HTMLElement>(selector);
          const qa = (selector: string) =>
            Array.from(root.querySelectorAll<HTMLElement>(selector));
          const tz = (trigger: Element | null, start: string, end: string) => ({
            trigger,
            start,
            end,
            scrub: true,
          });

          // Hero entrance
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .fromTo(
              qa("[data-hero] [data-ln] > span"),
              { yPercent: 110 },
              { yPercent: 0, duration: 1.1, stagger: 0.12 },
              0.2,
            )
            .from(
              q("[data-hero-fade]"),
              { y: 24, opacity: 0, duration: 0.9 },
              0.8,
            )
            .from(q("[data-hero-scroll]"), { opacity: 0, duration: 0.8 }, 1.1);

          // Hero scroll: copy drifts up and fades
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: tz(q("#top"), "top top", "bottom top"),
            })
            .to(q("[data-hero-copy]"), { yPercent: -25, opacity: 0 }, 0)
            .to(q("[data-hero-scroll]"), { y: 40, opacity: 0 }, 0);

          // Spotlight follows the pointer inside the hero
          let removePointer: (() => void) | undefined;
          const hero = q("#top");
          const spot = q("[data-spot]");
          if (fine && !mobile && hero && spot) {
            gsap.set(spot, { xPercent: -50, yPercent: -50 });
            const sx = gsap.quickTo(spot, "x", {
              duration: 1.2,
              ease: "power3",
            });
            const sy = gsap.quickTo(spot, "y", {
              duration: 1.2,
              ease: "power3",
            });
            sx(hero.clientWidth * 0.75);
            sy(hero.clientHeight * 0.3);
            const move = (event: PointerEvent) => {
              const rect = hero.getBoundingClientRect();
              sx(event.clientX - rect.left);
              sy(event.clientY - rect.top);
            };
            hero.addEventListener("pointermove", move);
            removePointer = () => hero.removeEventListener("pointermove", move);
          }

          // Band: vertical scroll drives the oversized outline text sideways
          gsap.fromTo(
            q("[data-band-text]"),
            { xPercent: 6 },
            {
              xPercent: -58,
              ease: "none",
              scrollTrigger: tz(q("[data-band]"), "top bottom", "bottom top"),
            },
          );

          // Form section: heading lines rise, fields appear once and stay
          const heading = q("#message h2");
          gsap.fromTo(
            heading?.querySelectorAll("[data-ln] > span") ?? [],
            { yPercent: 110 },
            {
              yPercent: 0,
              stagger: 0.15,
              ease: "none",
              scrollTrigger: tz(heading, "top 85%", "top 40%"),
            },
          );
          gsap.from(q("#message [data-reveal]"), {
            y: 28 * k,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: q("#message [data-reveal]"),
              start: "top 90%",
              once: true,
            },
          });
          const fields = qa("[data-field]");
          gsap.set(fields, { opacity: 0, y: 24 * k });
          ScrollTrigger.batch(fields, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
              }),
          });

          // Direct contact rows
          const rows = qa("[data-row]");
          gsap.set(rows, { opacity: 0, y: 24 * k });
          ScrollTrigger.batch(rows, {
            start: "top 92%",
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                overwrite: true,
              }),
            onLeaveBack: (batch) =>
              gsap.to(batch, {
                opacity: 0,
                y: 24 * k,
                duration: 0.4,
                overwrite: true,
              }),
          });

          // Closing: glow opens from the bottom edge, words light up with scroll
          const end = q("[data-end]");
          gsap.fromTo(
            q("[data-clip]"),
            { clipPath: "circle(0% at 50% 100%)" },
            {
              clipPath: "circle(150% at 50% 100%)",
              ease: "none",
              scrollTrigger: tz(end, "top 80%", "top 20%"),
            },
          );
          const words = qa("[data-end] [data-word]");
          gsap.set(words, { opacity: 0.15 });
          gsap.to(words, {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: tz(end, "top 60%", "top 5%"),
          });
          gsap.from(q("[data-end-cta]"), {
            y: 20,
            opacity: 0,
            ease: "none",
            scrollTrigger: tz(end, "top 40%", "top 5%"),
          });

          return () => removePointer?.();
        },
      );

      return () => media.revert();
    },
    { scope },
  );
}
