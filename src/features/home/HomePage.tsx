"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import type { BioPart } from "./data";
import {
  aboutTimeline,
  bio,
  contact,
  engineeringPrinciples,
  howIWork,
  projects,
  technologyGroups,
} from "./data";
import { useHomeAnimations } from "./useHomeAnimations";
import { WhatIBuild } from "./WhatIBuild";

const pad = "px-[clamp(20px,4.5vw,64px)]";
const section = `${pad} py-[140px] max-[767px]:py-24`;
const lineClass = "block overflow-hidden pb-[.1em]";
const headingClass =
  "font-display font-semibold leading-none tracking-[-.04em] text-[clamp(36px,6.4vw,100px)]";
const btn =
  "inline-flex min-h-12 items-center justify-center rounded-[2px] border border-[#444] px-7 text-[15px] font-medium transition-[background-color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-foreground";
const btnPrimary =
  "border-foreground bg-foreground text-background hover:border-[#c9c6c0] hover:bg-[#c9c6c0]";
const fieldLabel =
  "flex flex-col gap-1.5 font-mono text-xs uppercase tracking-[.1em] text-muted";
const fieldInput =
  "rounded-none border-0 border-b border-[#444] bg-transparent py-2.5 font-body text-lg normal-case tracking-normal text-foreground outline-none transition-colors focus:border-foreground";

function Words({ parts }: { parts: BioPart[] }) {
  return (
    <>
      {parts.map((part, partIndex) =>
        part.text
          .split(" ")
          .filter(Boolean)
          .map((word, wordIndex) => (
            <span
              key={`${partIndex}-${wordIndex}`}
              data-word
              className={
                part.strong ? "inline font-semibold text-foreground" : "inline"
              }
            >
              {word}{" "}
            </span>
          )),
      )}
    </>
  );
}

export function HomePage() {
  const pageRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState("");
  useHomeAnimations(pageRef);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormStatus("Please complete every field with a valid email.");
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    setFormStatus("Opening your email app…");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${encodeURIComponent(`${message}\n\n${email}`)}`;
  }

  return (
    <main ref={pageRef}>
      <section
        id="top"
        data-hero
        aria-label="Hero"
        className={`relative flex h-svh min-h-[600px] flex-col justify-end overflow-hidden pb-[72px] ${pad}`}
      >
        <div data-hero-clip className="absolute inset-0 overflow-hidden">
          <div data-hero-bg className="absolute -inset-[4%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_90%,rgb(70_100_170_/_40%),transparent_70%)]" />
            <video
              className="absolute inset-0 h-full w-full object-cover md:object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source
                src="https://assets.ericman.dev/hero_bg_video.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_8_8_/_50%),rgb(8_8_8_/_10%)_40%,rgb(8_8_8_/_88%))]"
            aria-hidden="true"
          />
        </div>
        <div data-hero-copy className="relative flex flex-col gap-9">
          <h1 className="font-display text-[clamp(32px,7vw,112px)] font-bold uppercase leading-[.98] tracking-[-.04em]">
            <span data-ln className={lineClass}>
              <span className="block">I build ideas into</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block">real-world products.</span>
            </span>
          </h1>
          <div data-hero-cta className="flex flex-wrap gap-3">
            <a className={`${btn} ${btnPrimary}`} href="#work">
              Explore My Work ↗
            </a>
            <a className={btn} href="#contact">
              Get in Touch ↗
            </a>
          </div>
        </div>
        <div
          data-hero-scroll
          className="absolute bottom-0 right-[clamp(20px,4.5vw,64px)] h-16 w-px bg-[linear-gradient(#888,transparent)]"
          aria-hidden="true"
        />
      </section>

      <section
        id="intro"
        data-intro
        aria-label="Introduction"
        className={`relative flex min-h-screen items-center overflow-hidden border-t border-line py-[120px] ${pad}`}
      >
        <div
          data-grid
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(255_255_255_/_3.5%)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_3.5%)_1px,transparent_1px)] [background-size:80px_80px]"
          aria-hidden="true"
        />
        <h2
          data-intro-h
          className="relative font-display text-[clamp(40px,9vw,148px)] font-semibold leading-none tracking-[-.045em]"
        >
          <span data-ln className={lineClass}>
            <span className="block">Curious by nature.</span>
          </span>
          <span data-ln className={lineClass}>
            <span className="block text-[#777]">Driven to build.</span>
          </span>
          <span data-ln className={lineClass}>
            <span className="block">Always improving.</span>
          </span>
        </h2>
      </section>

      <section
        id="work"
        aria-label="Selected projects"
        className={`relative border-t border-line ${section}`}
      >
        <h2
          data-work-h
          className={`mb-[120px] max-[767px]:mb-16 ${headingClass}`}
        >
          <span data-ln className={lineClass}>
            <span className="block">Things I’ve brought to life.</span>
          </span>
        </h2>
        {projects.slice(0, 3).map((project, index) => {
          const reverse = index % 2 === 1;
          return (
            <article
              data-pr
              key={project.name}
              className="group relative mb-40 grid max-[767px]:mb-24"
            >
              <div
                data-mf
                className={`relative aspect-[16/10] w-[66%] overflow-hidden border border-[#222] bg-[#111] [grid-area:1/1] max-[767px]:w-full max-[767px]:aspect-[2/1] ${reverse ? "justify-self-end" : "justify-self-start"}`}
              >
                <div
                  data-mi
                  className="absolute -inset-y-[10%] inset-x-0"
                  style={{
                    background: `radial-gradient(ellipse 70% 70% at ${25 + index * 25}% ${80 - index * 20}%, rgba(70,100,170,.42), transparent 70%), linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)`,
                    backgroundSize: "auto, 48px 48px, 48px 48px",
                  }}
                >
                  {project.video && (
                    <video
                      src={project.video}
                      poster={project.img}
                      aria-label={`${project.name} showcase video`}
                      className="absolute inset-0 h-full w-full object-contain"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  )}
                  {!project.video && project.img && (
                    <Image
                      src={project.img}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(min-width: 768px) 66vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div
                className={`pointer-events-none relative z-[1] translate-y-[22%] self-end [grid-area:1/1] max-[767px]:mt-5 max-[767px]:translate-y-0 max-[767px]:!justify-self-start max-[767px]:[grid-area:2/1] ${reverse ? "justify-self-start" : "justify-self-end"}`}
              >
                <h3 className="font-display text-[clamp(44px,9vw,148px)] font-bold leading-[.95] tracking-[-.05em]">
                  <span data-ln className={lineClass}>
                    <span className="block">
                      <a
                        className="pointer-events-auto text-foreground after:absolute after:inset-0 after:content-['']"
                        href="#work"
                      >
                        {project.name}
                      </a>
                    </span>
                  </span>
                </h3>
                <p
                  data-pt-p
                  className="mt-3 font-mono text-[13px] uppercase tracking-[.06em] text-muted"
                >
                  {project.description}
                </p>
              </div>
            </article>
          );
        })}
        <a data-vall className={`${btn} w-fit`} href="#work">
          View All Projects ↗
        </a>
      </section>

      <WhatIBuild />

      <section
        id="eng"
        aria-label="Engineering mindset"
        className={`relative border-t border-line ${section}`}
      >
        <h2
          data-eng-h
          className={`mb-[120px] max-[767px]:mb-16 ${headingClass}`}
        >
          <span data-ln className={lineClass}>
            <span className="block">More than making it work.</span>
          </span>
        </h2>
        <ol>
          {engineeringPrinciples.map((item) => (
            <li
              data-eng-li
              key={item.number}
              className="relative grid grid-cols-[clamp(90px,16vw,240px)_1fr] items-baseline gap-6 py-10 pb-12 max-[767px]:grid-cols-[72px_1fr] max-[767px]:gap-3"
            >
              <i
                data-bl
                aria-hidden="true"
                className="absolute left-0 top-0 block h-px w-full origin-left scale-x-0 bg-foreground"
              />
              <span
                data-num
                className="font-display text-[clamp(56px,10vw,160px)] font-semibold leading-[.85] tracking-[-.06em]"
              >
                {item.number}
              </span>
              <span
                data-tt
                className="font-display text-[clamp(24px,3.8vw,56px)] font-medium leading-[1.1] tracking-[-.03em]"
              >
                {item.title}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="tech"
        aria-label="Technology"
        className={`relative border-t border-line ${section}`}
      >
        <h2
          data-tech-h
          className={`mb-[100px] max-[767px]:mb-16 ${headingClass}`}
        >
          <span data-ln className={lineClass}>
            <span className="block">The tools behind the work.</span>
          </span>
        </h2>
        {technologyGroups.map((group) => (
          <div
            data-tr
            key={group.label}
            className="grid grid-cols-[clamp(150px,22vw,320px)_1fr] gap-6 border-t border-line py-8 max-[767px]:block"
          >
            <p
              data-lb
              className="pt-3.5 font-mono text-xs uppercase tracking-[.1em] text-muted max-[767px]:pb-4"
            >
              {group.label}
            </p>
            <ul className="group/tools flex flex-wrap gap-x-7 gap-y-1">
              {group.items.map((item) => (
                <li
                  data-tn
                  key={item}
                  className="cursor-default font-display text-[clamp(24px,3.6vw,52px)] leading-[1.15] tracking-[-.035em] text-[#c9c6c0] transition-[color,translate] duration-300 group-hover/tools:text-[#555] hover:translate-x-1.5 hover:text-foreground!"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p
          data-fin
          aria-label="Tools matter. Understanding matters more."
          className="mt-[140px] font-display text-[clamp(32px,6vw,88px)] font-semibold leading-[1.05] tracking-[-.04em] max-[767px]:mt-24"
        >
          <span className="text-muted">
            <span data-fw className="inline">
              Tools
            </span>{" "}
            <span data-fw className="inline">
              matter.
            </span>
          </span>{" "}
          <span data-fw className="inline">
            Understanding
          </span>{" "}
          <span data-fw className="inline">
            matters
          </span>{" "}
          <span data-fw className="inline">
            more.
          </span>
        </p>
      </section>

      <section
        id="how"
        aria-label="How I work"
        className="relative h-[260vh] border-t border-line max-[767px]:h-[220vh] motion-reduce:h-auto motion-reduce:py-[100px]"
      >
        <div
          data-how-stage
          className={`sticky top-0 flex h-svh items-center overflow-hidden ${pad} max-[767px]:items-start max-[767px]:pt-[14vh] motion-reduce:relative motion-reduce:h-auto`}
        >
          <div className="grid w-full grid-cols-[1.15fr_1fr] items-center gap-[clamp(24px,5vw,80px)] max-[767px]:grid-cols-1 max-[767px]:items-start max-[767px]:gap-5 motion-reduce:grid-cols-1">
            <ol className="flex flex-col gap-1.5">
              {howIWork.map((stage, index) => (
                <li key={stage.title}>
                  <div
                    data-hw
                    className="flex items-baseline gap-5 font-display text-[clamp(34px,6.6vw,108px)] font-bold leading-none tracking-[-.05em] text-[#2e2e2e] max-[767px]:gap-3 motion-reduce:text-foreground"
                  >
                    <small className="font-mono text-[clamp(12px,1.3vw,18px)] font-normal tracking-[.1em] text-muted">
                      {`0${index + 1}`}
                    </small>
                    <span>{stage.title}</span>
                  </div>
                  <p className="mb-6 mt-1.5 hidden max-w-[520px] text-lg text-[#aaa] motion-reduce:block">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
            <div
              data-hdc
              className="relative min-h-[150px] max-[767px]:min-h-[130px] motion-reduce:hidden"
            >
              {howIWork.map((stage) => (
                <p
                  data-hdd
                  key={stage.title}
                  className="absolute left-0 top-0 max-w-[520px] text-[clamp(20px,2.2vw,32px)] leading-[1.35] tracking-[-.02em]"
                >
                  {stage.description}
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
        id="me"
        aria-label="About me"
        className={`relative border-t border-line ${section}`}
      >
        <p
          data-mep
          className="max-w-[1100px] font-display text-[clamp(26px,3.6vw,56px)] font-medium leading-[1.2] tracking-[-.035em] text-[#8a8a8a]"
        >
          <Words parts={bio} />
        </p>
        <ol data-mt className="mt-24 flex flex-wrap max-[767px]:mt-14">
          {aboutTimeline.map((item) => (
            <li
              data-mt-li
              key={item}
              className="relative flex-1 border-t border-line pr-3 pt-5 font-display text-[clamp(16px,1.6vw,22px)] max-[767px]:flex-[1_1_45%] max-[767px]:pb-5"
            >
              <i
                data-tb
                aria-hidden="true"
                className="absolute -top-px left-0 right-0 block h-px origin-left bg-foreground"
              />
              <i
                aria-hidden="true"
                className="absolute -top-1 left-0 block size-[7px] rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section
        id="about"
        data-about
        aria-label="About"
        className={`relative overflow-hidden border-t border-line bg-surface ${section}`}
      >
        <h2
          data-about-h
          className="mb-[72px] font-display text-[clamp(44px,10vw,160px)] font-semibold leading-[.98] tracking-[-.05em]"
        >
          <span data-ln className={lineClass}>
            <span className="block">A Different Path.</span>
          </span>
          <span data-ln className={lineClass}>
            <span className="block text-[#777]">A Decision to Try.</span>
          </span>
        </h2>
        <a data-sl className={`${btn} ${btnPrimary} w-fit`} href="/about">
          My Story ↗
        </a>
        <p
          data-qt
          className="mt-24 max-w-[1000px] font-display text-[clamp(28px,4.6vw,72px)] font-semibold leading-[1.08] tracking-[-.04em]"
        >
          <Words
            parts={[
              {
                text: "“I don’t want to look back at 40 and regret never trying.”",
              },
            ]}
          />
        </p>
      </section>

      <section
        id="contact"
        data-contact
        aria-label="Contact"
        className={`relative flex min-h-screen flex-col justify-end gap-14 overflow-hidden border-t border-line pb-[72px] pt-[140px] ${pad}`}
      >
        <div
          data-glow
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgb(70_100_170_/_32%),transparent_70%)]"
        />
        <h2
          data-big
          className="relative origin-bottom-left font-display text-[clamp(36px,10vw,170px)] font-bold uppercase leading-[.88] tracking-[-.06em]"
        >
          <span
            data-ln
            className="-mb-[.06em] -mt-[.08em] block overflow-hidden pb-[.12em] pt-[.08em]"
          >
            <span className="block">Have an idea?</span>
          </span>
        </h2>
        <p
          data-sub
          className="relative font-display text-[clamp(24px,3.4vw,48px)] font-medium tracking-[-.03em] text-muted"
        >
          Let’s build something meaningful.
        </p>
        <div className="relative grid grid-cols-2 gap-16 border-t border-[#2a2a2a] pt-9 max-[767px]:grid-cols-1 max-[767px]:gap-9">
          <div className="flex flex-col gap-4">
            <a
              data-link
              className="font-display text-[clamp(20px,2.2vw,28px)] tracking-[-.02em] text-foreground transition-colors hover:text-white"
              href={`mailto:${contact.email}`}
            >
              Email ↗
            </a>
            <a
              data-link
              className="font-display text-[clamp(20px,2.2vw,28px)] tracking-[-.02em] text-[#c9c6c0] transition-colors hover:text-white"
              href={contact.github}
            >
              GitHub ↗
            </a>
            <a
              data-link
              className="font-display text-[clamp(20px,2.2vw,28px)] tracking-[-.02em] text-[#c9c6c0] transition-colors hover:text-white"
              href={contact.linkedIn}
            >
              LinkedIn ↗
            </a>
          </div>
          <form
            data-form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-[18px]"
          >
            <label className={fieldLabel}>
              Name
              <input
                name="name"
                autoComplete="name"
                required
                className={fieldInput}
              />
            </label>
            <label className={fieldLabel}>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldInput}
              />
            </label>
            <label className={fieldLabel}>
              Message
              <textarea
                name="message"
                rows={3}
                required
                className={`${fieldInput} resize-none`}
              />
            </label>
            <button type="submit" className={`${btn} ${btnPrimary} self-start`}>
              Send Message
            </button>
            <p
              role="status"
              aria-live="polite"
              className="min-h-5 text-sm text-muted"
            >
              {formStatus}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
