"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { smoothScroll } from "@/lib/smoothScroll";
import { INTRO_EXIT_EVENT } from "./introEvents";
import { createStarfield } from "./starfieldScene";

gsap.registerPlugin(ScrollTrigger);

const PI = Math.PI;
const SEEN_KEY = "ericIntroSeen";
const USER_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown", "scroll"];

export function StarfieldIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current!;
    const spacer = spacerRef.current!;
    const canvas = canvasRef.current!;
    const flash = flashRef.current!;
    const ui = uiRef.current!;
    const hint = hintRef.current!;
    const btns = btnsRef.current!;

    const finalize = () => {
      root.style.display = "none";
      spacer.style.display = "none";
      root.dataset.state = "done";
    };
    const announceExit = () =>
      window.dispatchEvent(new Event(INTRO_EXIT_EVENT));
    // Blocks native touch/wheel scrolling of the page behind the overlay
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      // Keeps the scrollbar width so pins measured while locked match the unlocked layout
      document.documentElement.style.scrollbarGutter = "stable";
      root.style.touchAction = "none";
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || seen) {
      finalize();
      announceExit();
      return;
    }

    let field: ReturnType<typeof createStarfield>;
    try {
      field = createStarfield(canvas, window.innerWidth < 768 ? 0.6 : 1);
    } catch {
      finalize();
      announceExit();
      return;
    }
    const { state, drift, nudge } = field;

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let exiting = false;
    let exited = false;
    let tl: gsap.core.Timeline;

    const exit = () => {
      if (exiting) return;
      exiting = true;
      lockScroll();
      tl.scrollTrigger?.kill();
      // Killing the scrub trigger rewinds the timeline to progress 0 (edge-on text).
      // Re-apply the end pose without firing callbacks so the zoom starts from the reading view.
      tl.progress(1, true);
      document.removeEventListener("focusin", onFocusIn);
      spacer.style.display = "none";
      smoothScroll.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      smoothScroll.current?.stop();
      // Done under the overlay so no re-measure lands while the user resumes scrolling
      ScrollTrigger.refresh(true);
      gsap
        .timeline({
          onComplete: () => {
            exited = true;
            teardown();
            finalize();
            ctx.revert();
            smoothScroll.current?.start();
          },
        })
        .to(state, { zoom: 1, ease: "power2.in", duration: 2.2 }, 0)
        .to(flash, { opacity: 1, ease: "power1.in", duration: 1 }, 1.2)
        .add(announceExit, 1.6)
        .to(root, { opacity: 0, duration: 0.8, ease: "power1.out" }, 2.2);
    };

    // Holds the page where the intro ends so a fast scroll can't carry on behind the overlay
    const holdAtEnd = () => {
      if (exiting) return;
      lockScroll();
      smoothScroll.current?.stop();
    };

    const ctx = gsap.context(() => {
      tl = gsap
        .timeline({
          onComplete: exit,
          scrollTrigger: {
            trigger: spacer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onLeave: holdAtEnd,
          },
        })
        .to(hint, { opacity: 0, duration: 0.4 }, 0)
        .to(btns, { autoAlpha: 0, duration: 0.4 }, 0)
        .to(
          state,
          { ry: -PI / 4, rx: 0.35, ease: "power1.inOut", duration: 2 },
          0,
        )
        .to(state, { ry: -PI / 2, rx: 0, ease: "power2.out", duration: 2 })
        .to(state, { duration: 0.8 });
    }, root);

    window.addEventListener("resize", field.resize);
    field.start();

    // Keyboard users tabbing into the page content skip the intro
    function onFocusIn(event: FocusEvent) {
      if (!root.contains(event.target as Node)) tl.progress(1);
    }
    document.addEventListener("focusin", onFocusIn);

    // Skip: detach from scroll and play the remaining timeline, then exit
    skipRef.current = () => {
      if (exiting) return;
      lockScroll();
      tl.scrollTrigger?.kill();
      gsap.to(tl, {
        progress: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: exit,
      });
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") skipRef.current();
    };
    window.addEventListener("keydown", onEscape);

    // Nudge once if the user hasn't moved after the intro loads
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let peek: gsap.core.Tween | null = null;
    const onUser = () => {
      clearTimeout(idleTimer);
      if (peek) {
        peek.kill();
        peek = null;
        gsap.to(nudge, { rx: 0, ry: 0, duration: 0.5, ease: "power2.out" });
      }
      USER_EVENTS.forEach((t) => window.removeEventListener(t, onUser));
    };
    const armIdle = () => {
      USER_EVENTS.forEach((t) =>
        window.addEventListener(t, onUser, { passive: true }),
      );
      idleTimer = setTimeout(() => {
        peek = gsap.to(nudge, {
          ry: -0.3,
          rx: 0.1,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            peek = null;
          },
        });
      }, 4000);
    };

    let finishCall: gsap.core.Tween | null = null;
    const finishLoading = (hold: number) => {
      finishCall = gsap.delayedCall(hold, () => {
        ui.inert = false;
        gsap.to(drift, { a: 1, duration: 4, ease: "power1.inOut" });
        gsap.to(ui, { opacity: 1, duration: 0.9, ease: "power1.out" });
        ScrollTrigger.refresh();
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        armIdle();
      });
    };

    // Stars light up with real load progress; 6s fallback so it never hangs
    let tick: (() => void) | null = null;
    field.reveal(0);
    let target = 0.4;
    let shown = 0;
    const done = { fonts: false, load: false };
    const setTarget = () => {
      target = 0.4 + (done.fonts ? 0.3 : 0) + (done.load ? 0.3 : 0);
    };
    document.fonts?.ready.then(() => {
      done.fonts = true;
      setTarget();
    });
    const onLoad = () => {
      done.load = true;
      setTarget();
    };
    if (document.readyState === "complete") done.load = true;
    else window.addEventListener("load", onLoad, { once: true });
    const fallback = setTimeout(() => {
      done.fonts = done.load = true;
      setTarget();
    }, 6000);
    const t0 = performance.now();
    const MIN = 2.2;
    tick = () => {
      const t = Math.min(1, (performance.now() - t0) / 1000 / MIN);
      const cap = Math.min(1 - Math.pow(1 - t, 2), target);
      shown += (cap - shown) * 0.12;
      field.reveal(Math.min(shown, 1));
      if (t >= 1 && target >= 1 && shown > 0.995) {
        gsap.ticker.remove(tick!);
        tick = null;
        field.reveal(1);
        finishLoading(0.35);
      }
    };
    gsap.ticker.add(tick);

    function teardown() {
      document.documentElement.style.overflow = "";
      document.documentElement.style.scrollbarGutter = "";
      root.style.touchAction = "";
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      clearTimeout(fallback);
      clearTimeout(idleTimer);
      finishCall?.kill();
      peek?.kill();
      gsap.killTweensOf([drift, nudge, ui]);
      USER_EVENTS.forEach((t) => window.removeEventListener(t, onUser));
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", field.resize);
      document.removeEventListener("focusin", onFocusIn);
      field.dispose();
    }

    return () => {
      if (exiting) smoothScroll.current?.start();
      if (exited) return;
      teardown();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={spacerRef}
        data-starfield-spacer
        aria-hidden="true"
        className="h-[300svh]"
      />
      <div
        ref={rootRef}
        data-starfield-intro
        role="region"
        aria-label="Intro animation"
        className="fixed inset-0 z-[100] overflow-hidden bg-black"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full"
        />
        <div
          ref={flashRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white opacity-0"
        />
        <div
          ref={uiRef}
          inert
          className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-3 opacity-0"
        >
          <div
            ref={hintRef}
            className="font-mono text-[13px] tracking-[.08em] text-[#7f93b8]"
          >
            Scroll to turn the view
          </div>
          <div ref={btnsRef} className="pointer-events-auto flex gap-2.5">
            <button
              type="button"
              onClick={() => skipRef.current()}
              className="cursor-pointer rounded-full border border-[#2a3a5c] px-[18px] py-2 text-sm text-[#c9dcff] transition-colors hover:border-[#7f93b8]"
            >
              Skip intro
            </button>
          </div>
        </div>
      </div>
      <noscript>
        <style>
          {"[data-starfield-intro],[data-starfield-spacer]{display:none}"}
        </style>
      </noscript>
    </>
  );
}
