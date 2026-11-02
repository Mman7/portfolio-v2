"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const DIM = "#2e2e2e";
const BRIGHT = "#f2efe9";

export function useAboutAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      ScrollTrigger.config({ ignoreMobileResize: true });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.querySelectorAll("video").forEach((video) => video.pause());
      }

      const media = gsap.matchMedia();

      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { motion, mobile } = context.conditions as Record<
            string,
            boolean
          >;
          if (!motion) return;

          const k = mobile ? 0.5 : 1;
          const q = (selector: string, from: ParentNode = root) =>
            from.querySelector<HTMLElement>(selector);
          const qa = (selector: string, from: ParentNode = root) =>
            Array.from(from.querySelectorAll<HTMLElement>(selector));
          const tz = (trigger: Element | null, start: string, end: string) => ({
            trigger,
            start,
            end,
            scrub: true,
          });
          const lines = (
            el: Element | null,
            start: string,
            end: string,
            stagger = 0.15,
          ) => {
            if (!el) return;
            gsap.fromTo(
              el.querySelectorAll("[data-ln] > span"),
              { yPercent: 110 },
              {
                yPercent: 0,
                stagger,
                ease: "none",
                scrollTrigger: tz(el, start, end),
              },
            );
          };
          const enter = (el: Element | null, from: string) => {
            if (!el) return;
            gsap.fromTo(
              el,
              { clipPath: from },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: tz(el, "top bottom", "top 25%"),
              },
            );
          };

          // Hero entrance
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .fromTo(
              qa("[data-hero] [data-ln] > span"),
              { yPercent: 110 },
              { yPercent: 0, duration: 1.1, stagger: 0.12 },
              0.2,
            )
            .from(q("[data-hero-scroll]"), { opacity: 0, duration: 0.8 }, 1);

          // Hero scroll: video scales and the frame closes into the next section
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: tz(q("#top"), "top top", "bottom top"),
            })
            .to(q("[data-hero-bg]"), { scale: 1.25 }, 0)
            .to(
              q("[data-hero-clip]"),
              { clipPath: "inset(12% 6% 0% 6% round 18px)" },
              0,
            )
            .to(q("[data-hero-copy]"), { yPercent: -25, opacity: 0 }, 0)
            .to(q("[data-hero-scroll]"), { y: 40, opacity: 0 }, 0);

          // Turning point: headline rises, words light up, 17 to 40 draws itself
          const turn = q("[data-turn]");
          enter(turn, "inset(10% 4% 0% 4% round 18px)");
          lines(q("[data-turn-h]"), "top 75%", "top 35%");
          const nums = q("[data-nums]");
          gsap.fromTo(
            nums,
            { "--sk": "#333" },
            {
              "--sk": "#7f9cf5",
              ease: "none",
              scrollTrigger: tz(nums, "top 90%", "top 35%"),
            },
          );
          gsap.fromTo(
            q("[data-arrow]"),
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: tz(nums, "top 90%", "top 40%"),
            },
          );
          qa("[data-wr]").forEach((block) => {
            const words = qa("[data-word]", block);
            gsap.set(words, { opacity: 0.15 });
            gsap.to(words, {
              opacity: 1,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: tz(block, "top 85%", "bottom 55%"),
            });
          });

          // Journey: vertical scroll drives a horizontal track
          const path = q("[data-path]");
          const track = q("[data-path-track]");
          if (path && track) {
            const dist = () => track.scrollWidth - window.innerWidth;
            const horizontal = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: path,
                start: "top top",
                end: () => `+=${dist() * 1.15}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            // Short hold so the last panel rests fully revealed
            horizontal
              .to(track, { x: () => -dist(), duration: 1 }, 0)
              .to(q("[data-path-bar]"), { scaleX: 1, duration: 1 }, 0)
              .to({}, { duration: 0.15 });

            gsap.to(q("[data-path-h]"), {
              scale: 0.75,
              opacity: 0.25,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: path,
                start: "top top",
                end: () => `+=${dist() * 0.35}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            qa("[data-path-panel]", track).forEach((panel) => {
              // Reveals finish before the panel reaches its resting position
              const rest = () =>
                Math.ceil(100 - (panel.offsetWidth / window.innerWidth) * 100);
              const reveal = (start: string, offset: number) => ({
                containerAnimation: horizontal,
                trigger: panel,
                start,
                end: () => `left ${rest() + offset}%`,
                scrub: true,
                invalidateOnRefresh: true,
              });
              gsap.from(q("[data-path-title]", panel), {
                y: 80 * k,
                opacity: 0,
                ease: "none",
                scrollTrigger: reveal("left 95%", 8),
              });
              gsap.from(q("[data-path-body]", panel), {
                y: 60 * k,
                opacity: 0,
                ease: "none",
                scrollTrigger: reveal("left 90%", 4),
              });
            });
          }

          // Discipline: the terminal types out line by line
          lines(q("[data-disc-h]"), "top 80%", "top 40%", 0.2);
          const term = q("[data-term]");
          gsap.fromTo(
            qa(":scope > div", term ?? root),
            { opacity: 0, y: 12 * k },
            {
              opacity: 1,
              y: 0,
              stagger: 0.55,
              ease: "none",
              scrollTrigger: tz(term, "top 85%", "bottom 55%"),
            },
          );

          // Principles: scrolling advances one at a time
          const steps = qa("[data-hw]");
          const descriptions = qa("[data-hdd]");
          gsap.set(descriptions, { opacity: 0 });
          gsap.set(descriptions[0], { opacity: 1 });
          gsap.set(steps[0], { color: BRIGHT });
          const how = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: tz(q("#how"), "top top", "bottom bottom"),
          });
          how.to(q("[data-hf]"), { scaleX: 1, duration: steps.length }, 0);
          steps.forEach((step, index) => {
            if (!index) return;
            how
              .to(steps[index - 1], { color: DIM, duration: 0.3 }, index - 0.15)
              .to(step, { color: BRIGHT, duration: 0.3 }, index - 0.15)
              .to(
                descriptions[index - 1],
                { opacity: 0, y: -30 * k, duration: 0.3 },
                index - 0.15,
              )
              .fromTo(
                descriptions[index],
                { opacity: 0, y: 30 * k },
                { opacity: 1, y: 0, duration: 0.3 },
                index,
              );
          });

          // Beyond the screen: a circle opens onto the video, then the words arrive
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: tz(q("[data-out]"), "top top", "bottom bottom"),
            })
            .fromTo(
              q("[data-ring]"),
              { clipPath: "circle(0% at 50% 65%)" },
              { clipPath: "circle(78% at 50% 65%)", duration: 0.6 },
              0,
            )
            .fromTo(
              q("[data-ring-media]"),
              { scale: 1.2 },
              { scale: 1, duration: 1 },
              0,
            )
            .fromTo(
              qa("[data-out-copy] > *"),
              { opacity: 0, y: 30 * k },
              { opacity: 1, y: 0, stagger: 0.12, duration: 0.4 },
              0.5,
            )
            .to({}, { duration: 0.2 });

          // Future: three directions draw in
          lines(q("[data-future-h]"), "top 85%", "top 50%");
          qa("[data-dir]").forEach((row) => {
            gsap.fromTo(
              q("[data-dir-line]", row),
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: tz(row, "top 92%", "top 62%"),
              },
            );
            gsap.fromTo(
              q("[data-dir-title]", row),
              { color: DIM },
              {
                color: BRIGHT,
                ease: "none",
                scrollTrigger: tz(row, "top 88%", "top 48%"),
              },
            );
            gsap.from(q("[data-dir-text]", row), {
              x: 70 * k,
              opacity: 0,
              ease: "none",
              scrollTrigger: tz(row, "top 85%", "top 50%"),
            });
          });

          // Closing
          const end = q("[data-end]");
          enter(end, "inset(12% 5% 0% 5% round 18px)");
          gsap.fromTo(
            q("[data-big]"),
            { scale: 0.8 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: tz(end, "top bottom", "top 25%"),
            },
          );
          lines(end, "top 40%", "top 10%", 0.2);
          gsap.from(qa("[data-end-link]"), {
            x: -50 * k,
            opacity: 0,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: tz(end, "top 40%", "top 5%"),
          });
          gsap.fromTo(
            q("[data-glow]"),
            { yPercent: 20 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: tz(end, "top bottom", "bottom bottom"),
            },
          );
        },
      );

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => media.revert();
    },
    { scope },
  );
}
