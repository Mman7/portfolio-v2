"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      ScrollTrigger.config({ ignoreMobileResize: true });
      const media = gsap.matchMedia();

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
            .to(q("[data-hero-bg]"), { scale: 1.25 }, 0)
            .to(
              q("[data-hero-clip]"),
              { clipPath: "inset(12% 6% 0% 6% round 18px)" },
              0,
            )
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

          // Statement
          enter(q("#intro"), "inset(12% 6% 0% 6% round 18px)");
          lines(q("[data-intro-h]"), "top 75%", "top 15%", 0.25);
          gsap.to(q("[data-grid]"), {
            yPercent: -15,
            ease: "none",
            scrollTrigger: tz(q("#intro"), "top bottom", "bottom top"),
          });

          // Projects
          lines(q("[data-work-h]"), "top 85%", "top 50%");
          qa("[data-pr]").forEach((article) => {
            const frame = q("[data-mf]", article);
            const image = q("[data-mi]", article);
            gsap.fromTo(
              frame,
              { clipPath: "inset(100% 0 0 0)" },
              {
                clipPath: "inset(0% 0 0 0)",
                ease: "none",
                scrollTrigger: tz(article, "top 88%", "top 38%"),
              },
            );
            gsap.fromTo(
              image,
              { scale: 1.3 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: tz(article, "top 88%", "top 38%"),
              },
            );
            gsap.fromTo(
              image,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: tz(article, "top bottom", "bottom top"),
              },
            );
            gsap.fromTo(
              article.querySelectorAll("[data-ln] > span"),
              { yPercent: 115 },
              {
                yPercent: 0,
                ease: "none",
                scrollTrigger: tz(article, "top 60%", "top 25%"),
              },
            );
            gsap.from(q("[data-pt-p]", article), {
              opacity: 0,
              y: 16 * k,
              ease: "none",
              scrollTrigger: tz(article, "top 50%", "top 20%"),
            });
          });
          const viewAll = q("[data-vall]");
          gsap.from(viewAll, {
            opacity: 0,
            y: 24 * k,
            ease: "none",
            scrollTrigger: tz(viewAll, "top 98%", "top 80%"),
          });

          // What I build: vertical scroll drives the horizontal track
          const build = q("[data-build-section]");
          const track = q("[data-build-track]");
          enter(build, "inset(15% 8% 0% 8% round 18px)");
          if (build && track) {
            const dist = () => track.scrollWidth - window.innerWidth;
            const horizontal = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: build,
                start: "top top",
                end: () => `+=${dist() * 1.15}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            // Short hold so the last panel rests fully revealed
            horizontal
              .to(track, { x: () => -dist(), duration: 1 })
              .to({}, { duration: 0.15 });

            gsap.to(q("[data-build-heading]"), {
              scale: 0.75,
              opacity: 0.25,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: build,
                start: "top top",
                end: () => `+=${dist() * 0.35}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            qa("[data-build-panel]", track).forEach((panel) => {
              // Every reveal must finish before the panel reaches its resting position
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
              gsap.from(q("[data-build-title]", panel), {
                y: 80 * k,
                opacity: 0,
                ease: "none",
                scrollTrigger: reveal("left 95%", 8),
              });
              gsap.from(q("[data-build-list]", panel), {
                y: 60 * k,
                opacity: 0,
                ease: "none",
                scrollTrigger: reveal("left 90%", 4),
              });
              gsap.from(q("[data-build-icon]", panel), {
                rotation: -120,
                scale: 0.4,
                ease: "none",
                scrollTrigger: reveal("left 95%", 8),
              });
            });
          }

          // Engineering
          lines(q("[data-eng-h]"), "top 85%", "top 50%");
          qa("[data-eng-li]").forEach((item) => {
            gsap.fromTo(
              q("[data-bl]", item),
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: tz(item, "top 92%", "top 62%"),
              },
            );
            gsap.fromTo(
              q("[data-num]", item),
              { color: "#2e2e2e" },
              {
                color: "#f2efe9",
                ease: "none",
                scrollTrigger: tz(item, "top 88%", "top 48%"),
              },
            );
            gsap.from(q("[data-tt]", item), {
              x: 70 * k,
              opacity: 0,
              ease: "none",
              scrollTrigger: tz(item, "top 85%", "top 50%"),
            });
          });

          // Technology
          lines(q("[data-tech-h]"), "top 85%", "top 50%");
          qa("[data-tr]").forEach((row) => {
            gsap.from(q("[data-lb]", row), {
              opacity: 0,
              ease: "none",
              scrollTrigger: tz(row, "top 92%", "top 65%"),
            });
            gsap.from(qa("[data-tn]", row), {
              y: 26 * k,
              opacity: 0,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: tz(row, "top 90%", "top 50%"),
            });
          });
          const fin = q("[data-fin]");
          const finWords = qa("[data-fw]");
          gsap.set(finWords, { opacity: 0.12 });
          gsap.to(finWords, {
            opacity: 1,
            stagger: 0.2,
            ease: "none",
            scrollTrigger: tz(fin, "top 92%", "top 40%"),
          });

          // How I work: scrolling advances the four stages
          const steps = qa("[data-hw]");
          const descriptions = qa("[data-hdd]");
          gsap.set(descriptions, { opacity: 0 });
          gsap.set(descriptions[0], { opacity: 1 });
          gsap.set(steps[0], { color: "#f2efe9" });
          const how = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: tz(q("#how"), "top top", "bottom bottom"),
          });
          how.to(q("[data-hf]"), { scaleX: 1, duration: 4 }, 0);
          steps.forEach((step, index) => {
            if (!index) return;
            how
              .to(
                steps[index - 1],
                { color: "#2e2e2e", x: 0, duration: 0.3 },
                index - 0.15,
              )
              .to(step, { color: "#f2efe9", duration: 0.3 }, index - 0.15)
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

          // About me
          const bioWords = qa("[data-mep] [data-word]");
          gsap.set(bioWords, { opacity: 0.15 });
          gsap.to(bioWords, {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: tz(q("[data-mep]"), "top 85%", "bottom 50%"),
          });
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: tz(q("[data-mt]"), "top 92%", "top 45%"),
            })
            .fromTo(
              qa("[data-tb]"),
              { scaleX: 0 },
              { scaleX: 1, duration: 1, stagger: 0.6 },
              0,
            )
            .fromTo(
              qa("[data-mt-li]"),
              { opacity: 0.2 },
              { opacity: 1, duration: 1, stagger: 0.6 },
              0,
            );

          // Story
          enter(q("[data-about]"), "inset(10% 4% 0% 4% round 18px)");
          lines(q("[data-about-h]"), "top 85%", "top 45%", 0.2);
          const storyLink = q("[data-sl]");
          gsap.from(storyLink, {
            opacity: 0,
            y: 24 * k,
            ease: "none",
            scrollTrigger: tz(storyLink, "top 98%", "top 80%"),
          });
          const quoteWords = qa("[data-qt] [data-word]");
          gsap.set(quoteWords, { opacity: 0.15 });
          gsap.to(quoteWords, {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: tz(q("[data-qt]"), "top 90%", "top 45%"),
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
          gsap.fromTo(
            qa("[data-big] [data-ln] > span"),
            { yPercent: 110 },
            {
              yPercent: 0,
              stagger: 0.2,
              ease: "none",
              scrollTrigger: tz(contact, "top 75%", "top 25%"),
            },
          );
          gsap.from(q("[data-sub]"), {
            xPercent: 8,
            opacity: 0,
            ease: "none",
            scrollTrigger: tz(contact, "top 60%", "top 25%"),
          });
          gsap.from(qa("[data-link]"), {
            x: -50 * k,
            opacity: 0,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: tz(contact, "top 40%", "top 5%"),
          });
          gsap.from(qa("[data-form] label, [data-form] button"), {
            y: 36 * k,
            opacity: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: tz(contact, "top 40%", "top 5%"),
          });
          gsap.fromTo(
            q("[data-glow]"),
            { yPercent: 20 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: tz(contact, "top bottom", "bottom bottom"),
            },
          );

          return () => removePointer?.();
        },
      );

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => media.revert();
    },
    { scope },
  );
}
