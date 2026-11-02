"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const INACTIVE = "#555";
const ACTIVE = "#f2efe9";
const STEP = 2; // one wipe plus one rest per project
const LEAD = 1; // rest before the first wipe

// Timeline time at the middle of a project's rest, when it is fully shown
const restTime = (index: number) =>
  index === 0 ? LEAD / 2 : LEAD + index * STEP - (STEP - 1) / 2;

export function useProjectsAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      ScrollTrigger.config({ ignoreMobileResize: true });
      const media = gsap.matchMedia();

      // Sidebar picks: scroll to the project's position in the pinned timeline
      const onPick = (event: Event) => {
        const button = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-sc-pick]",
        );
        if (!button) return;
        const index = Number(button.dataset.scPick);
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? "auto"
          : "smooth";
        const trigger = ScrollTrigger.getById("showcase");
        if (trigger?.animation) {
          const top =
            trigger.start +
            (trigger.end - trigger.start) *
              (restTime(index) / trigger.animation.duration());
          window.scrollTo({ top, behavior });
        } else {
          root
            .querySelectorAll("[data-sc-frame]")
            [index]?.scrollIntoView({ behavior, block: "center" });
        }
      };
      root.addEventListener("click", onPick);

      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, mobile, fine } = context.conditions as Record<
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
              { yPercent: 110, y: 0 },
              {
                yPercent: 0,
                y: 0,
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
            .from(
              qa("[data-hero-cta] a"),
              { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 },
              0.8,
            )
            .from(q("[data-hero-scroll]"), { opacity: 0, duration: 0.8 }, 1.2);

          // Hero scroll
          const hero = q("#top");
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: tz(hero, "top top", "bottom top"),
            })
            .to(q("[data-hero-copy]"), { yPercent: -25, opacity: 0 }, 0)
            .to(q("[data-hero-scroll]"), { y: 40, opacity: 0 }, 0);

          let removePointer: (() => void) | undefined;
          const heroBg = q("[data-hero-bg]");
          if (!mobile && fine && heroBg) {
            const qx = gsap.quickTo(heroBg, "x", {
              duration: 1.2,
              ease: "power3",
            });
            const qy = gsap.quickTo(heroBg, "y", {
              duration: 1.2,
              ease: "power3",
            });
            const move = (event: PointerEvent) => {
              qx((event.clientX / window.innerWidth - 0.5) * -26);
              qy((event.clientY / window.innerHeight - 0.5) * -26);
            };
            window.addEventListener("pointermove", move);
            removePointer = () =>
              window.removeEventListener("pointermove", move);
          }

          // Pinned showcase: each project's frame wipes in while the
          // previous one is replaced in the list and details column
          const showcase = q("[data-showcase]");
          if (showcase) {
            const names = qa("[data-sc-name]", showcase);
            const details = qa("[data-sc-detail]", showcase);
            const frames = qa("[data-sc-frame]", showcase);
            const arts = qa("[data-sc-art]", showcase);
            const ticks = qa("[data-sc-tick]", showcase);
            const segs = qa("[data-sc-seg]", showcase);
            const nav = q("[data-sc-nav]", showcase);

            gsap.set(names, { color: INACTIVE });
            gsap.set(names[0], { color: ACTIVE });
            gsap.set(ticks, { scaleX: 0.4 });
            gsap.set(ticks[0], { scaleX: 1 });
            gsap.set(segs.slice(1), { scaleX: 0 });
            gsap.set(details.slice(1), { autoAlpha: 0, y: 24 * k });
            gsap.set(frames.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
            gsap.set(arts.slice(1), { scale: 1.3 });

            let current = 0;
            const sequence = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                ...tz(showcase, "top top", "bottom bottom"),
                id: "showcase",
                onUpdate: (self) => {
                  const t = self.progress * (self.animation?.duration() ?? 1);
                  const switchAt = LEAD + STEP / 4;
                  const index =
                    t < switchAt
                      ? 0
                      : Math.min(
                          names.length - 1,
                          Math.floor((t - switchAt) / STEP) + 1,
                        );
                  if (index === current) return;
                  names[current].removeAttribute("aria-current");
                  names[index].setAttribute("aria-current", "true");
                  current = index;
                  if (mobile && nav) {
                    nav.scrollTo({
                      left:
                        names[index].offsetLeft -
                        nav.clientWidth / 2 +
                        names[index].clientWidth / 2,
                      behavior: "smooth",
                    });
                  }
                },
              },
            });

            frames.slice(1).forEach((frame, index) => {
              const next = index + 1;
              const at = LEAD + index * STEP;
              sequence
                .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, at)
                .to(arts[next], { scale: 1, duration: 1 }, at)
                .to(segs[next], { scaleX: 1, duration: 1 }, at)
                .to(names[index], { color: INACTIVE, duration: 0.5 }, at)
                .to(names[next], { color: ACTIVE, duration: 0.5 }, at)
                .to(ticks[index], { scaleX: 0.4, duration: 0.5 }, at)
                .to(ticks[next], { scaleX: 1, duration: 0.5 }, at)
                .to(
                  details[index],
                  { autoAlpha: 0, y: -24 * k, duration: 0.4 },
                  at,
                )
                .fromTo(
                  details[next],
                  { autoAlpha: 0, y: 24 * k },
                  { autoAlpha: 1, y: 0, duration: 0.4 },
                  at + 0.6,
                );
            });

            // Final rest so the last project stays fully revealed
            sequence.to({}, { duration: STEP / 2 });
          }

          // Beyond the interface
          lines(q("[data-beyond-h]"), "top 85%", "top 50%");
          qa("[data-bp]").forEach((row) => {
            gsap.from(q("[data-bp-code]", row), {
              opacity: 0,
              ease: "none",
              scrollTrigger: tz(row, "top 92%", "top 65%"),
            });
            gsap.from(q("[data-bp-title]", row), {
              x: 70 * k,
              opacity: 0,
              ease: "none",
              scrollTrigger: tz(row, "top 85%", "top 50%"),
            });
          });

          // Closing
          const contact = q("[data-contact]");
          enter(contact, "inset(12% 5% 0% 5% round 18px)");
          gsap.fromTo(
            q("[data-big]"),
            { scale: 0.8 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: tz(contact, "top bottom", "top 25%"),
            },
          );
          lines(contact, "top 75%", "top 25%", 0.2);

          return () => removePointer?.();
        },
      );

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        root.removeEventListener("click", onPick);
        media.revert();
      };
    },
    { scope },
  );
}
