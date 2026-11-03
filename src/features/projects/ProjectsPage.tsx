"use client";

import Image from "next/image";
import Link from "next/link";
import { Code, Globe } from "lucide-react";
import { useRef } from "react";
import { contact, projects } from "@/features/home/data";
import {
  btn,
  btnPrimary,
  headingClass,
  lineClass,
  pad,
  section,
} from "@/lib/styles";
import { toSlug } from "@/features/project-detail/slug";
import { beyondPrinciples } from "./data";
import { useProjectsAnimations } from "./useProjectsAnimations";

const linkClass =
  "font-display text-[clamp(20px,2.2vw,28px)] tracking-[-.02em] text-[#c9c6c0] transition-colors hover:text-white";

function frameArt(index: number) {
  const step = index % 4;
  return {
    background: `radial-gradient(ellipse 70% 70% at ${25 + step * 25}% ${80 - step * 20}%, rgba(70,100,170,.42), transparent 70%), linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)`,
    backgroundSize: "auto, 48px 48px, 48px 48px",
  };
}

export function ProjectsPage() {
  const pageRef = useRef<HTMLElement>(null);
  useProjectsAnimations(pageRef);

  return (
    <main ref={pageRef}>
      <section
        id="top"
        data-hero
        aria-label="Projects hero"
        className={`relative flex h-[56svh] min-h-[420px] flex-col justify-end overflow-hidden pt-[120px] pb-[56px] ${pad}`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_70%_100%,rgb(70_100_170_/_28%),transparent_70%)]"
        />

        <div data-hero-copy className="relative flex flex-col gap-9">
          <h1 className="font-display text-[clamp(32px,7vw,112px)] leading-[.98] font-bold tracking-[-.04em] uppercase">
            <span data-ln className={lineClass}>
              <span className="block">Built with curiosity.</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block text-[#777]">Shaped by engineering.</span>
            </span>
          </h1>
          <div data-hero-cta className="flex flex-wrap gap-3">
            <a className={`${btn} ${btnPrimary}`} href="#showcase">
              View Projects ↓
            </a>
            <Link className={btn} href="/contact">
              Get in Touch ↗
            </Link>
          </div>
        </div>

        <div
          data-hero-scroll
          aria-hidden="true"
          className="absolute right-[clamp(20px,4.5vw,64px)] bottom-0 h-16 w-px bg-[linear-gradient(#888,transparent)]"
        />
      </section>

      <section
        id="showcase"
        data-showcase
        aria-label="Selected projects"
        className="relative border-t border-line motion-reduce:h-auto!"
        style={{ height: `${projects.length * 160}svh` }}
      >
        <div
          className={`sticky top-0 flex h-svh items-center overflow-hidden ${pad} max-[767px]:items-start max-[767px]:pt-[max(10vh,5.5rem)] motion-reduce:relative motion-reduce:h-auto motion-reduce:py-[100px]`}
        >
          <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-[clamp(28px,4vw,72px)] max-[767px]:grid-cols-1 max-[767px]:gap-6 motion-reduce:gap-12">
            <nav
              data-sc-nav
              aria-label="Project index"
              className="relative flex flex-col items-start gap-[clamp(8px,1.8vh,16px)] max-[767px]:flex-row max-[767px]:gap-5 max-[767px]:overflow-x-auto max-[767px]:pb-2 max-[767px]:[scrollbar-width:none]"
            >
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  type="button"
                  data-sc-pick={index}
                  data-sc-name
                  aria-current={index === 0 ? "true" : undefined}
                  className="group flex cursor-pointer items-center gap-2.5 font-mono text-xs whitespace-nowrap text-[#555] motion-reduce:text-foreground"
                >
                  <span
                    aria-hidden="true"
                    data-sc-tick
                    className="block h-px w-9 origin-left scale-x-[.4] bg-current motion-reduce:scale-x-100 max-[767px]:hidden"
                  />
                  <span className="transition-colors group-hover:text-foreground">
                    {project.name}
                  </span>
                </button>
              ))}
            </nav>

            <div className="grid max-[767px]:order-3">
              {projects.map((project) => (
                <div
                  key={project.name}
                  data-sc-detail
                  className="max-w-[560px] [grid-area:1/1]"
                >
                  <h2 className="font-display text-[clamp(30px,min(4.2vw,7.5vh),80px)] leading-[.95] font-bold tracking-[-.05em]">
                    {project.name}
                  </h2>
                  {project.status && (
                    <p className="mt-5 font-mono text-xs tracking-[.1em] text-muted uppercase">
                      {project.status}
                    </p>
                  )}
                  <p className="mt-4 text-lg leading-[1.55] text-[#c9c6c0]">
                    {project.summary ?? project.description}
                  </p>
                  {project.stack && (
                    <p className="mt-6 font-mono text-xs tracking-[.08em] text-muted uppercase [@media(max-height:700px)]:hidden">
                      {project.stack.join(" / ")}
                    </p>
                  )}
                  {project.highlights && (
                    <ul className="mt-6 grid grid-cols-2 gap-x-6 border-b border-line max-[767px]:hidden [@media(max-height:700px)]:hidden">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="border-t border-line py-1.5 text-[14px] leading-[1.4] text-[#c9c6c0]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      className={`${btn} ${btnPrimary}`}
                      href={`/projects/${toSlug(project.name)}`}
                    >
                      View Case Study ↗
                    </Link>
                    {project.repoUrl && (
                      <a
                        className={`${btn} max-[767px]:w-12 max-[767px]:px-0`}
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} repository`}
                      >
                        <Code
                          size={18}
                          aria-hidden="true"
                          className="hidden max-[767px]:block"
                        />
                        <span className="max-[767px]:hidden">Github ↗</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        className={`${btn} max-[767px]:w-12 max-[767px]:px-0`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live site`}
                      >
                        <Globe
                          size={18}
                          aria-hidden="true"
                          className="hidden max-[767px]:block"
                        />
                        <span className="max-[767px]:hidden">Live ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 max-[767px]:order-2">
              <div className="relative aspect-[16/10] w-full max-[767px]:aspect-[2/1] motion-reduce:flex motion-reduce:aspect-auto motion-reduce:flex-col motion-reduce:gap-6">
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    data-sc-frame
                    className="absolute inset-0 overflow-hidden border border-[#222] bg-surface motion-reduce:relative motion-reduce:aspect-[16/10]"
                  >
                    <div
                      data-sc-art
                      className={
                        project.video
                          ? "absolute inset-0"
                          : "absolute -inset-[8%]"
                      }
                      style={
                        project.img || project.video
                          ? undefined
                          : frameArt(index)
                      }
                    >
                      {project.video ? (
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
                      ) : (
                        project.img && (
                          <Image
                            src={project.img}
                            alt={`${project.name} screenshot`}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="flex gap-1.5 motion-reduce:hidden"
              >
                {projects.map((project) => (
                  <i
                    key={project.name}
                    className="relative block h-0.5 flex-1 overflow-hidden bg-line"
                  >
                    <b
                      data-sc-seg
                      className="absolute inset-0 origin-left bg-accent"
                    />
                  </i>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="beyond"
        aria-label="Beyond the interface"
        className={`relative border-t border-line ${section}`}
      >
        <h2
          data-beyond-h
          className={`mb-[100px] max-[767px]:mb-16 ${headingClass}`}
        >
          <span data-ln className={lineClass}>
            <span className="block">I care about how things work.</span>
          </span>
        </h2>

        {beyondPrinciples.map((item) => (
          <div
            key={item.title}
            data-bp
            className="grid grid-cols-[clamp(150px,22vw,320px)_1fr] gap-6 border-t border-line py-10 max-[767px]:block max-[767px]:py-8"
          >
            <p
              data-bp-code
              className="pt-3 font-mono text-xs tracking-[.06em] text-muted max-[767px]:pb-4"
            >
              {item.code}
            </p>
            <div>
              <h3
                data-bp-title
                className="font-display text-[clamp(28px,3.8vw,56px)] leading-[1.05] font-medium tracking-[-.035em]"
              >
                {item.title}
              </h3>
              <p className="mt-4 max-w-[560px] text-lg text-[#aaa]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section
        id="contact"
        data-contact
        aria-label="Contact"
        className={`relative flex min-h-screen flex-col justify-end gap-14 overflow-hidden border-t border-line pt-[140px] pb-[72px] ${pad}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgb(70_100_170_/_32%),transparent_70%)]"
        />

        <h2
          data-big
          className="relative origin-bottom-left font-display text-[clamp(36px,9vw,150px)] leading-[.88] font-bold tracking-[-.06em] uppercase"
        >
          <span data-ln className={lineClass}>
            <span className="block">Have an idea?</span>
          </span>
          <span data-ln className={lineClass}>
            <span className="block text-[#777]">Let’s build it.</span>
          </span>
        </h2>

        <div className="relative flex flex-col gap-12">
          <p className="max-w-[560px] text-lg leading-[1.6] text-[#aaa]">
            I’m interested in meaningful challenges, interesting ideas, and
            opportunities to turn concepts into useful products.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-8 border-t border-[#2a2a2a] pt-9">
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <a className={linkClass} href={`mailto:${contact.email}`}>
                Email ↗
              </a>
              <a className={linkClass} href={contact.github}>
                GitHub ↗
              </a>
              <a className={linkClass} href={contact.linkedIn}>
                LinkedIn ↗
              </a>
            </div>
            <Link className={`${btn} ${btnPrimary}`} href="/contact">
              Get in Touch ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
