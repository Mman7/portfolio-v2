"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef } from "react";
import type { Project } from "@/features/home/data";
import { smoothScroll } from "@/lib/smoothScroll";
import { btn, btnPrimary } from "@/lib/styles";
import type { ProjectDetail } from "./types";
import { useProjectDetailAnimations } from "./useProjectDetailAnimations";

type NextProject = { slug: string; name: string; description: string };

type Props = {
  project: Project;
  detail: ProjectDetail;
  next: NextProject | null;
};

const HEX = /^#[0-9a-f]{6}$/i;
const sectionPad =
  "scroll-mt-[72px] px-[clamp(20px,4vw,64px)] py-[clamp(72px,12vh,140px)] max-[899px]:scroll-mt-[120px]";
const h2Class =
  "max-w-[20ch] font-display text-[clamp(30px,4.4vw,60px)] leading-[1.05] font-semibold tracking-[-.03em]";
const monoLabel = "font-mono text-xs tracking-[.16em] text-muted uppercase";
const isExternal = (url?: string) =>
  url?.startsWith("http") ? url : undefined;

function Title({ name }: { name: string }) {
  return (
    <h1
      aria-label={name}
      className="mt-2 font-display text-[clamp(38px,7.4vw,124px)] leading-[.98] font-bold tracking-[-.045em] uppercase"
    >
      {name.split(" ").map((word, w) => (
        <span
          key={`${word}-${w}`}
          aria-hidden="true"
          className="mr-[.25em] inline-block overflow-hidden pb-[.08em] align-top"
        >
          {Array.from(word).map((char, c) => (
            <span key={c} data-ch className="inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function HeroMedia({ project }: { project: Project }) {
  const poster = project.img?.startsWith("/") ? project.img : undefined;
  return (
    <div
      data-frame
      className="relative mt-14 aspect-[16/10] w-full overflow-hidden border border-line bg-surface max-[767px]:aspect-[4/3]"
    >
      <div
        {...(project.video ? {} : { "data-art": true })}
        className={`absolute ${project.video ? "inset-0" : "-inset-[7%]"}`}
      >
        {project.video ? (
          <video
            src={project.video}
            poster={poster}
            aria-label={`${project.name} showcase video`}
            className="absolute inset-0 h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : poster ? (
          <Image
            src={poster}
            alt={`${project.name} screenshot`}
            fill
            priority
            sizes="(min-width: 900px) 70vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,color-mix(in_srgb,var(--pd-accent)_30%,transparent),transparent_70%)]"
          />
        )}
      </div>
    </div>
  );
}

export function ProjectDetailPage({ project, detail, next }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  useProjectDetailAnimations(rootRef);

  const accent = HEX.test(detail.accent) ? detail.accent : "#7f9cf5";
  const repoUrl = isExternal(project.repoUrl);
  const liveUrl = isExternal(project.liveUrl);

  const sections = [
    { id: "overview", label: "Overview" },
    detail.architecture && { id: "architecture", label: "Architecture" },
    detail.flow && { id: "flow", label: "Flow" },
    detail.decisions && { id: "decisions", label: "Decisions" },
    detail.gallery?.length && { id: "gallery", label: "Gallery" },
    { id: "next", label: "Next" },
  ].filter((item): item is { id: string; label: string } => Boolean(item));

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target || !smoothScroll.current) return;
    event.preventDefault();
    const mobile = window.matchMedia("(max-width: 899px)").matches;
    smoothScroll.current.scrollTo(target, { offset: mobile ? -120 : -72 });
  };

  return (
    <div
      ref={rootRef}
      style={{ "--pd-accent": accent } as React.CSSProperties}
      className="mx-auto grid max-w-[1440px] grid-cols-[220px_minmax(0,1fr)] max-[899px]:block"
    >
      <aside className="sticky top-[72px] flex h-[calc(100svh-72px)] flex-col justify-between self-start py-10 pl-[clamp(20px,2.2vw,32px)] max-[899px]:top-[calc(72px+env(safe-area-inset-top,0px))] max-[899px]:z-20 max-[899px]:h-auto max-[899px]:border-b max-[899px]:border-line max-[899px]:bg-background/95 max-[899px]:px-5 max-[899px]:py-3">
        <div className="max-[899px]:hidden">
          <Link
            href="/projects"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Projects
          </Link>
          <p className="mt-3 font-brand text-xl font-extrabold tracking-[-.02em]">
            {project.name}
          </p>
        </div>

        <nav
          data-pd-nav
          aria-label="Case study sections"
          className="flex flex-col gap-0.5 max-[899px]:flex-row max-[899px]:gap-5 max-[899px]:overflow-x-auto max-[899px]:[scrollbar-width:none]"
        >
          {sections.map((section, index) => (
            <a
              key={section.id}
              data-pd-link
              href={`#${section.id}`}
              onClick={(event) => jump(event, section.id)}
              className="group flex gap-3 py-1.5 text-sm whitespace-nowrap text-muted transition-colors hover:text-foreground aria-[current=true]:text-foreground"
            >
              <span className="pt-0.5 font-mono text-[11px] transition-colors group-aria-[current=true]:text-(--pd-accent)">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.label}
            </a>
          ))}
        </nav>

        <div
          aria-hidden="true"
          className="h-28 w-0.5 bg-line max-[899px]:absolute max-[899px]:inset-x-0 max-[899px]:bottom-0 max-[899px]:h-0.5 max-[899px]:w-auto"
        >
          <i data-pd-bar className="block h-full w-full bg-(--pd-accent)" />
        </div>
      </aside>

      <main>
        <header
          id="top"
          data-pd-section
          className="px-[clamp(20px,4vw,64px)] pt-[calc(72px+clamp(40px,9vh,100px))] pb-10"
        >
          <p
            data-fade
            className="font-mono text-xs tracking-[.14em] text-(--pd-accent) uppercase"
          >
            {project.description}
          </p>
          <Title name={project.name} />
          <p
            data-fade
            className="mt-5 max-w-[38ch] font-display text-[clamp(18px,2vw,24px)] leading-[1.45] text-[#aaa]"
          >
            {detail.tagline}
          </p>

          <dl
            data-fade
            className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-6 border-t border-line pt-6"
          >
            <div>
              <dt className={monoLabel}>Role</dt>
              <dd className="mt-1.5 font-display text-[15px]">{detail.role}</dd>
            </div>
            {project.status && (
              <div>
                <dt className={monoLabel}>Status</dt>
                <dd className="mt-1.5 font-display text-[15px]">
                  {project.status}
                </dd>
              </div>
            )}
            {detail.stack.length > 0 && (
              <div>
                <dt className={monoLabel}>Stack</dt>
                <dd className="mt-1.5 font-display text-[15px] leading-[1.5]">
                  {detail.stack.join(" / ")}
                </dd>
              </div>
            )}
          </dl>

          <HeroMedia project={project} />
        </header>

        <div
          data-ghost
          aria-hidden="true"
          className="overflow-hidden border-y border-line py-9 whitespace-nowrap"
        >
          <span className="inline-block font-display text-[clamp(72px,14vw,210px)] leading-none font-bold tracking-[-.04em] text-transparent uppercase opacity-60 [-webkit-text-stroke:1px_#666]">
            {`${project.name} — `.repeat(4)}
          </span>
        </div>

        <section
          id="overview"
          data-pd-section
          aria-labelledby="overview-title"
          className={sectionPad}
        >
          <h2 id="overview-title" data-rv className={`mb-12 ${h2Class}`}>
            {detail.overview.title}
          </h2>
          <div className="grid grid-cols-[1.3fr_1fr] gap-[clamp(24px,5vw,72px)] max-[899px]:grid-cols-1">
            <div>
              <p
                data-rv
                className="font-display text-[clamp(21px,2.5vw,32px)] leading-[1.3] font-medium"
              >
                {detail.overview.body}
              </p>
              {detail.overview.note && (
                <p data-rv className="mt-8 max-w-[56ch] text-[15px] text-muted">
                  {detail.overview.note}
                </p>
              )}
            </div>
            {detail.overview.points.length > 0 && (
              <ul data-rv className="border-b border-line">
                {detail.overview.points.map((point) => (
                  <li
                    key={point}
                    className="border-t border-line py-2.5 text-[15px] leading-[1.45] text-[#c9c6c0]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {detail.architecture && (
          <section
            id="architecture"
            data-pd-section
            aria-labelledby="architecture-title"
            className={`${sectionPad} border-y border-line bg-surface`}
          >
            <h2 id="architecture-title" data-rv className={`mb-14 ${h2Class}`}>
              {detail.architecture.title}
            </h2>
            <div
              data-arch
              className="flex flex-col md:flex-row md:items-center"
            >
              {detail.architecture.columns.map((column, index, all) => (
                <Fragment key={column.label}>
                  <div data-arch-col className="min-w-0 flex-1">
                    <p className={`mb-4 ${monoLabel}`}>{column.label}</p>
                    <div className="flex flex-col gap-3">
                      {column.nodes.map((node) => (
                        <div
                          key={node.title}
                          className="border border-line bg-background p-5"
                        >
                          <p className="font-display text-xl font-semibold tracking-[-.02em]">
                            {node.title}
                          </p>
                          <p className="mt-1 text-sm text-muted">{node.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < all.length - 1 && (
                    <div
                      aria-hidden="true"
                      data-arch-link
                      className="my-3 h-10 w-px shrink-0 self-center bg-(--pd-accent) md:mx-3 md:my-0 md:mt-9 md:h-px md:w-[clamp(24px,4vw,72px)]"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </section>
        )}

        {detail.flow && (
          <section
            id="flow"
            data-pd-section
            aria-labelledby="flow-title"
            className={sectionPad}
          >
            <h2 id="flow-title" data-rv className={`mb-14 ${h2Class}`}>
              {detail.flow.title}
            </h2>
            <div data-flow className="relative">
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-line"
              >
                <b
                  data-flow-fill
                  className="absolute inset-0 origin-top bg-(--pd-accent)"
                />
              </div>
              <ol className="list-none pl-14">
                {detail.flow.steps.map((step, index) => (
                  <li
                    key={step.title}
                    data-step
                    className="group relative max-w-[60ch] py-6"
                  >
                    <span className="absolute top-7 -left-14 grid size-8 place-items-center rounded-full border border-line bg-surface font-mono text-[11px] text-muted transition-colors duration-300 group-data-[on]:border-transparent group-data-[on]:bg-(--pd-accent) group-data-[on]:text-background">
                      {index + 1}
                    </span>
                    <h3 className="font-display text-[clamp(20px,2.2vw,28px)] font-semibold tracking-[-.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {detail.decisions && (
          <section
            id="decisions"
            data-pd-section
            aria-labelledby="decisions-title"
            className={`${sectionPad} border-t border-line`}
          >
            <h2 id="decisions-title" data-rv className={`mb-14 ${h2Class}`}>
              {detail.decisions.title}
            </h2>
            {detail.decisions.items.map((item, index) => (
              <div
                key={item.title}
                data-rv
                className="grid grid-cols-[clamp(80px,12vw,180px)_1fr] gap-6 border-t border-line py-9 max-[767px]:block max-[767px]:py-7"
              >
                <p className="pt-2 font-mono text-xs text-(--pd-accent) max-[767px]:pb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-[clamp(24px,3vw,40px)] leading-[1.1] font-medium tracking-[-.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] text-lg text-[#aaa]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {detail.gallery && detail.gallery.length > 0 && (
          <section
            id="gallery"
            data-pd-section
            aria-labelledby="gallery-title"
            className={`${sectionPad} border-y border-line bg-surface`}
          >
            <h2 id="gallery-title" data-rv className={`mb-14 ${h2Class}`}>
              Screens.
            </h2>
            <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
              {detail.gallery.map((shot, index) => (
                <figure
                  key={shot.src}
                  data-tile
                  className={
                    index === 0 ? "col-span-2 max-[767px]:col-span-1" : ""
                  }
                >
                  <div className="relative aspect-[16/9]">
                    <div
                      data-tile-mask
                      className="absolute inset-0 overflow-hidden border border-line bg-background"
                    >
                      <div data-tile-in className="absolute inset-0">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 900px) 70vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <figcaption className={`mt-3 ${monoLabel}`}>
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section
          id="next"
          data-pd-section
          aria-labelledby="next-title"
          className={sectionPad}
        >
          <h2 id="next-title" data-rv className={`mb-10 ${h2Class}`}>
            Want to know more?
          </h2>
          <div data-rv className="mb-20 flex flex-wrap gap-3">
            {repoUrl && (
              <a
                className={`${btn} ${btnPrimary}`}
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code ↗
              </a>
            )}
            {liveUrl && (
              <a
                className={btn}
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo ↗
              </a>
            )}
            <Link
              className={repoUrl ? btn : `${btn} ${btnPrimary}`}
              href="/contact"
            >
              Get in Touch ↗
            </Link>
          </div>

          {next && (
            <Link
              data-next
              href={`/projects/${next.slug}`}
              className="group block overflow-hidden border-t border-line pt-7"
            >
              <p className={monoLabel}>Next project</p>
              <p
                data-next-title
                className="my-2 font-display text-[clamp(32px,6vw,96px)] leading-none font-bold tracking-[-.04em] whitespace-nowrap uppercase transition-colors group-hover:text-(--pd-accent)"
              >
                {next.name}
              </p>
              <p className="text-lg text-muted">{next.description}</p>
            </Link>
          )}
        </section>
      </main>
    </div>
  );
}
