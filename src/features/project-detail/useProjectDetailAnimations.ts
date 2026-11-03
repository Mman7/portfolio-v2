"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useProjectDetailAnimations(
  scope: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const q = (selector: string) => root.querySelector<HTMLElement>(selector);
      const qa = (selector: string) =>
        Array.from(root.querySelectorAll<HTMLElement>(selector));

      // Sidebar: active section and reading progress.
      const links = qa("[data-pd-link]");
      const navEl = q("[data-pd-nav]");
      const bar = q("[data-pd-bar]");
      const setActive = (id: string) => {
        links.forEach((link) => {
          const on = link.getAttribute("href") === `#${id}`;
          if (on) {
            link.setAttribute("aria-current", "true");
            if (navEl && navEl.scrollWidth > navEl.clientWidth) {
              navEl.scrollTo({
                left:
                  link.offsetLeft -
                  navEl.clientWidth / 2 +
                  link.offsetWidth / 2,
                behavior: "smooth",
              });
            }
          } else {
            link.removeAttribute("aria-current");
          }
        });
      };
      qa("[data-pd-section]").forEach((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => self.isActive && setActive(section.id),
        }),
      );
      gsap.set(bar, { scaleX: 1, scaleY: 0, transformOrigin: "0% 0%" });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (!bar) return;
          const horizontal = window.matchMedia("(max-width: 899px)").matches;
          gsap.set(
            bar,
            horizontal
              ? { scaleX: self.progress, scaleY: 1 }
              : { scaleY: self.progress, scaleX: 1 },
          );
        },
      });

      const media = gsap.matchMedia();
      media.add(
        {
          mobile: "(max-width: 899px)",
        },
        (context) => {
          const { mobile } = context.conditions as Record<string, boolean>;

          const k = mobile ? 0.5 : 1;
          const scrub = (
            trigger: Element | string | null,
            start: string,
            end: string,
            value: boolean | number = true,
          ) => ({ trigger, start, end, scrub: value });

          // Hero entrance
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(qa("[data-ch]"), {
              yPercent: 115,
              rotate: 5,
              duration: 1.1,
              stagger: 0.035,
            })
            .from(
              qa("[data-fade]"),
              {
                y: 24,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=.8",
            )
            .from(
              q("[data-frame]"),
              {
                y: 120,
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 1.3,
                clearProps: "clipPath",
              },
              "-=.9",
            );

          // Hero media: settle in and drift against the scroll
          gsap.fromTo(
            q("[data-frame]"),
            { scale: 0.94 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: scrub("[data-frame]", "top 90%", "top 35%"),
            },
          );
          const art = q("[data-art]");
          if (art) {
            gsap.to(art, {
              yPercent: -7 * k,
              ease: "none",
              scrollTrigger: scrub("[data-frame]", "top bottom", "bottom top"),
            });
          }

          // Outline marquee between hero and overview
          gsap.fromTo(
            q("[data-ghost] span"),
            { xPercent: 0 },
            {
              xPercent: -45,
              ease: "none",
              scrollTrigger: scrub("[data-ghost]", "top bottom", "bottom top"),
            },
          );

          // Content reveal
          gsap.set(qa("[data-rv]"), { opacity: 0, y: 36 });
          ScrollTrigger.batch(qa("[data-rv]"), {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: "power3.out",
                overwrite: true,
              }),
          });

          // Architecture: columns appear in order, connectors draw between them
          const archColumns = qa("[data-arch-col]");
          const archLinks = qa("[data-arch-link]");
          if (archColumns.length) {
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: scrub("[data-arch]", "top 75%", "bottom 60%", 0.8),
            });
            archColumns.forEach((column, i) => {
              tl.from(column, { opacity: 0, y: 24, duration: 0.5 });
              if (archLinks[i]) {
                tl.from(archLinks[i], {
                  scale: 0,
                  transformOrigin: "0% 0%",
                  duration: 0.4,
                });
              }
            });
          }

          // Flow: rail fills, the active step follows the scroll
          const flow = q("[data-flow]");
          if (flow) {
            gsap.fromTo(
              q("[data-flow-fill]"),
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: scrub(flow, "top 55%", "bottom 55%"),
              },
            );
            const steps = qa("[data-step]");
            gsap.set(steps, { opacity: 0.38 });
            steps.forEach((step) =>
              ScrollTrigger.create({
                trigger: step,
                start: "top 55%",
                end: "bottom 55%",
                onToggle: (self) => {
                  step.toggleAttribute("data-on", self.isActive);
                  gsap.to(step, {
                    opacity: self.isActive ? 1 : 0.38,
                    duration: 0.4,
                  });
                },
              }),
            );
          }

          // Gallery: mask reveal with a scale settle, reversible
          qa("[data-tile]").forEach((tile) => {
            const mask = tile.querySelector("[data-tile-mask]");
            const inner = tile.querySelector("[data-tile-in]");
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: tile,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              })
              .fromTo(
                mask,
                { clipPath: "inset(0 100% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 1.2,
                  ease: "expo.inOut",
                },
              )
              .fromTo(
                inner,
                { scale: 1.25 },
                { scale: 1, duration: 1.6, ease: "expo.out" },
                "<",
              );
          });

          // Next project title slides in
          gsap.from(q("[data-next-title]"), {
            xPercent: 14,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: scrub("[data-next]", "top bottom", "top 45%"),
          });
        },
      );

      return () => media.revert();
    },
    { scope },
  );
}
