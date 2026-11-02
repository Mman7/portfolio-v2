"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { lineClass, pad, section } from "@/lib/styles";
import { directions, discipline, journey, outside, principles } from "./data";
import { useAboutAnimations } from "./useAboutAnimations";

const mutedText = "text-[#a3a3a3]";
const endLink =
  "flex min-h-[84px] items-center justify-between border-b border-[#2a2a2a] font-display text-[clamp(20px,2.4vw,34px)] font-medium tracking-[-.02em] text-[#c9c6c0] transition-[color,padding] duration-300 hover:pl-3 hover:text-foreground";

function Words({ text }: { text: string }) {
  return (
    <>
      {text
        .split(" ")
        .filter(Boolean)
        .map((word, index) => (
          <span key={index} data-word className="inline">
            {word}{" "}
          </span>
        ))}
    </>
  );
}

function Video({ className = "" }: { className?: string }) {
  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover md:object-contain ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/about_hero.mp4" type="video/mp4" />
    </video>
  );
}

export function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);
  useAboutAnimations(pageRef);

  return (
    <main ref={pageRef}>
      <section
        id="top"
        data-hero
        aria-label="Hero"
        className={`relative flex h-svh min-h-150 flex-col justify-end overflow-hidden pb-18 ${pad}`}
      >
        <div data-hero-clip className="absolute inset-0 overflow-hidden">
          <div data-hero-bg className="absolute inset-[-4%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_90%,rgb(70_100_170/40%),transparent_70%)]" />
            <Video />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_8_8/50%),rgb(8_8_8/10%)_40%,rgb(8_8_8/88%))]"
          />
        </div>
        <div data-hero-copy className="relative">
          <h1 className="font-display text-[clamp(36px,8.4vw,136px)] font-bold uppercase leading-[.96] tracking-[-.045em]">
            <span data-ln className={lineClass}>
              <span className="block">I’m still figuring</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block text-[#777]">things out.</span>
            </span>
          </h1>
        </div>
        <div
          data-hero-scroll
          aria-hidden="true"
          className="absolute bottom-0 right-[clamp(20px,4.5vw,64px)] h-16 w-px bg-[linear-gradient(#888,transparent)]"
        />
      </section>

      <section
        id="turn"
        data-turn
        aria-label="The turning point"
        className={`relative grid grid-cols-2 gap-[clamp(32px,6vw,96px)] border-t border-line py-[140px] max-[767px]:grid-cols-1 max-[767px]:py-24 ${pad}`}
      >
        <div className="sticky top-27.5 self-start max-[767px]:static">
          <h2
            data-turn-h
            className="font-display text-[clamp(40px,6.2vw,100px)] font-semibold leading-none tracking-[-.045em]"
          >
            <span data-ln className={lineClass}>
              <span className="block">I was more afraid of</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block text-accent">regret than failure.</span>
            </span>
          </h2>
          <div
            data-nums
            aria-hidden="true"
            className="mt-[8vh] flex items-center gap-[2vw] font-display text-[clamp(80px,13vw,200px)] font-bold leading-none tracking-[-.05em] text-transparent [--sk:#333] [-webkit-text-stroke:1.5px_var(--sk)]"
          >
            <span>17</span>
            <svg
              data-arrow
              viewBox="0 0 120 40"
              className="w-[clamp(70px,9vw,140px)] origin-left overflow-visible fill-none"
              style={{ stroke: "var(--sk)", strokeWidth: 1.5 }}
            >
              <path d="M0 20H114M98 6l16 14-16 14" />
            </svg>
            <span>40</span>
          </div>
        </div>
        <div
          className={`flex max-w-140 flex-col gap-6.5 ${mutedText} max-[767px]:gap-5`}
        >
          <p data-wr>
            <Words text="When I was 17, I started learning to code. Life took me in other directions." />
          </p>
          <p data-wr>
            <Words text="Eventually, I found myself working in the furniture industry. It was honest work, and I learned from it. But deep down, I knew it wasn’t the path I wanted to follow forever." />
          </p>
          <h3
            data-wr
            className="mt-7 font-display text-[clamp(30px,3.4vw,52px)] font-medium leading-[1.05] tracking-[-.03em] text-foreground"
          >
            <Words text="What if I never tried?" />
          </h3>
          <p data-wr>
            <Words text="I imagined reaching 40 and looking back, wondering what could have happened if I had taken that first step." />
          </p>
          <p data-wr className="text-foreground">
            <Words text="That thought stayed with me." />
          </p>
          <p data-wr>
            <Words text="So I stopped treating fear as a reason to stay where I was, and stepped into software development." />
          </p>
          <p
            data-wr
            className="text-[clamp(20px,2vw,28px)] leading-[1.4] text-foreground"
          >
            <Words text="I’d rather face the uncertainty of trying than spend my life wondering what if." />
          </p>
        </div>
      </section>

      <section
        id="path"
        data-path
        aria-label="The journey"
        className="relative overflow-hidden border-t border-line bg-surface"
      >
        <div
          data-path-track
          className="flex h-screen min-h-[640px] w-max items-center pr-[clamp(20px,4.5vw,64px)] motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-col motion-reduce:items-stretch motion-reduce:py-20"
        >
          <div className="flex w-[min(60vw,820px)] flex-col justify-center pl-[clamp(20px,4.5vw,64px)] max-[899px]:w-[86vw] motion-reduce:w-full">
            <h2
              data-path-h
              className="origin-left font-display text-[clamp(44px,7vw,104px)] font-semibold leading-none tracking-[-.045em]"
            >
              <span className="block">Different paths.</span>
              <span className="block text-[#777]">One direction.</span>
            </h2>
          </div>
          {journey.map((step) => (
            <div
              data-path-panel
              key={step.title}
              className="flex h-[72%] w-[min(42vw,520px)] min-w-[320px] flex-col justify-end gap-5 border-l border-[#2a2a2a] px-10 max-[899px]:w-[78vw] max-[899px]:min-w-0 max-[899px]:px-6 motion-reduce:h-auto motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:border-l-0 motion-reduce:border-t motion-reduce:px-5 motion-reduce:py-10"
            >
              <h3
                data-path-title
                className="font-display text-[clamp(30px,3vw,44px)] font-medium leading-[1.05] tracking-[-.03em]"
              >
                {step.title}
              </h3>
              <div data-path-body className="flex flex-col gap-5">
                <p className={`max-w-[420px] ${mutedText}`}>
                  {step.description}
                </p>
                <ul className="flex flex-col gap-2 text-[15px] text-[#c9c6c0]">
                  {step.tags.map((tag) => (
                    <li key={tag} className="border-b border-[#262626] pb-2">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-[clamp(20px,4.5vw,64px)] bottom-[7vh] h-px bg-[#2a2a2a] motion-reduce:hidden"
        >
          <i
            data-path-bar
            className="absolute inset-0 origin-left scale-x-0 bg-foreground"
          />
        </div>
      </section>

      <section
        id="discipline"
        data-disc
        aria-label="The discipline"
        className={`relative border-t border-line ${section}`}
      >
        <div className="grid grid-cols-2 gap-[clamp(32px,6vw,96px)] max-[767px]:grid-cols-1">
          <h2
            data-disc-h
            className="font-display text-[clamp(38px,6vw,96px)] font-semibold leading-[1.02] tracking-[-.045em]"
          >
            <span data-ln className={lineClass}>
              <span className="block">Progress is built,</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block text-[#777]">not given.</span>
            </span>
          </h2>
          <div
            className={`flex max-w-[560px] flex-col gap-[22px] text-[clamp(16px,1.3vw,19px)] leading-[1.8] ${mutedText}`}
          >
            {discipline.map((text) => (
              <p data-wr key={text}>
                <Words text={text} />
              </p>
            ))}
          </div>
        </div>
        <div
          data-term
          className="mx-auto mt-[120px] max-w-[860px] rounded-[2px] border border-[#2a2a2a] bg-surface p-[clamp(22px,4vw,48px)] font-mono text-[clamp(12px,1.3vw,15px)] leading-[2.2] text-[#777] max-[767px]:mt-[72px]"
        >
          <div>
            <span className="text-accent">$</span>{" "}
            <span className="text-foreground">why does this work?</span>
          </div>
          <div className="whitespace-pre">{"  > read the docs"}</div>
          <div className="whitespace-pre">{"  > break it on purpose"}</div>
          <div className="whitespace-pre">
            {"  > explain it back, in my own words"}
          </div>
          <div className="mt-3.5 text-[#a9c1ff]">
            $ git commit -m “understood it this time”
          </div>
          <div>process exited with code 0</div>
        </div>
      </section>

      <section
        id="how"
        aria-label="How I think"
        className="relative h-[260vh] border-t border-line max-[767px]:h-[220vh] motion-reduce:h-auto motion-reduce:py-[100px]"
      >
        <div
          className={`sticky top-0 flex h-svh items-center overflow-hidden ${pad} max-[767px]:items-start max-[767px]:pt-[14vh] motion-reduce:relative motion-reduce:h-auto`}
        >
          <div className="grid w-full grid-cols-[1.15fr_1fr] items-center gap-[clamp(24px,5vw,80px)] max-[767px]:grid-cols-1 max-[767px]:items-start max-[767px]:gap-5 motion-reduce:grid-cols-1">
            <ol className="flex flex-col gap-1.5">
              {principles.map((item) => (
                <li key={item.title}>
                  <div
                    data-hw
                    className="font-display text-[clamp(34px,6.2vw,100px)] font-bold leading-none tracking-[-.05em] text-[#2e2e2e] motion-reduce:text-foreground"
                  >
                    {item.title}
                  </div>
                  <p className="mb-6 mt-1.5 hidden max-w-[520px] text-lg text-[#aaa] motion-reduce:block">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
            <div
              className="relative min-h-[150px] max-[767px]:min-h-[130px] motion-reduce:hidden"
              aria-hidden="true"
            >
              {principles.map((item) => (
                <p
                  data-hdd
                  key={item.title}
                  className="absolute left-0 top-0 max-w-[480px] text-[clamp(20px,2.2vw,32px)] leading-[1.35] tracking-[-.02em]"
                >
                  {item.description}
                </p>
              ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-[clamp(20px,4.5vw,64px)] bottom-[7vh] h-px bg-[#2a2a2a] max-[767px]:bottom-[5vh] motion-reduce:hidden"
          >
            <i
              data-hf
              className="absolute inset-0 origin-left scale-x-0 bg-foreground"
            />
          </div>
        </div>
      </section>

      <section
        id="outside"
        data-out
        aria-label="Beyond the screen"
        className="relative h-[230vh] border-t border-line max-[767px]:h-[200vh] motion-reduce:h-auto"
      >
        <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative">
          <div data-ring className="absolute inset-0 bg-surface">
            <div data-ring-media className="absolute inset-0">
              <Image
                src="/motorbike_showcase_mobile.jpg"
                alt="Two sport motorcycles parked on a street at night"
                fill
                sizes="100vw"
                className="object-cover md:hidden"
              />
              <Image
                src="/motorbike_showcase.jpg"
                alt="Two sport motorcycles parked on a street at night"
                fill
                sizes="100vw"
                className="hidden object-cover md:block"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_8_8_/_92%),rgb(8_8_8_/_30%)_55%,transparent)]"
            />
          </div>
          <div
            data-out-copy
            className={`absolute inset-x-0 bottom-[9svh] flex items-end justify-between gap-[5vw] max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 ${pad}`}
          >
            <h2 className="max-w-[8em] font-display text-[clamp(38px,6.4vw,104px)] font-semibold leading-[.98] tracking-[-.05em]">
              There’s more to life than the screen.
            </h2>
            <div className="flex max-w-[460px] flex-col gap-4 text-[#d5d2cc]">
              {outside.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="future"
        aria-label="The future"
        className={`relative border-t border-line ${section}`}
      >
        <h2
          data-future-h
          className="font-display text-[clamp(40px,8vw,140px)] font-semibold leading-none tracking-[-.05em]"
        >
          <span data-ln className={lineClass}>
            <span className="block">I’m building toward</span>
          </span>
          <span data-ln className={lineClass}>
            <span className="block text-[#777]">something bigger.</span>
          </span>
        </h2>
        <ol className="mt-[100px] max-[767px]:mt-16">
          {directions.map((item) => (
            <li
              data-dir
              key={item.title}
              className="relative grid grid-cols-[1.1fr_1fr] items-baseline gap-6 pb-12 pt-10 max-[767px]:grid-cols-1 max-[767px]:gap-2 max-[767px]:pb-9"
            >
              <i
                data-dir-line
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
              />
              <h3
                data-dir-title
                className="font-display text-[clamp(40px,7.4vw,120px)] font-bold leading-[.9] tracking-[-.06em] text-[#2e2e2e] motion-reduce:text-foreground"
              >
                {item.title}
              </h3>
              <p data-dir-text className={`max-w-[420px] ${mutedText}`}>
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="end"
        data-end
        aria-label="Closing"
        className={`relative flex min-h-screen flex-col justify-end gap-14 overflow-hidden border-t border-line pb-[72px] pt-[140px] ${pad}`}
      >
        <div
          data-glow
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgb(70_100_170_/_32%),transparent_70%)]"
        />
        <h2
          data-big
          className="relative origin-bottom-left font-display text-[clamp(36px,9vw,150px)] font-bold uppercase leading-[.88] tracking-[-.06em]"
        >
          <span data-ln className={lineClass}>
            <span className="block">The journey</span>
          </span>
          <span data-ln className={lineClass}>
            <span className="block text-[#777]">continues.</span>
          </span>
        </h2>
        <div className="relative grid grid-cols-2 gap-x-8 border-t border-[#2a2a2a] max-[767px]:grid-cols-1">
          <Link data-end-link className={endLink} href="/projects">
            View Projects <span aria-hidden="true">↗</span>
          </Link>
          <Link data-end-link className={endLink} href="/#contact">
            Let’s Talk <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
