const iconClass = "text-white";

const areas = [
  {
    title: "Web Applications",
    items: [
      "Ecommerce Platforms",
      "SaaS Applications",
      "Admin Dashboards",
      "Business Management Systems",
    ],
    icon: (
      <>
        <rect x="3" y="5" width="26" height="22" />
        <path d="M3 11h26" />
      </>
    ),
  },
  {
    title: "Backend Systems",
    items: [
      "REST APIs",
      "Authentication Systems",
      "Database Design",
      "Backend Architecture",
    ],
    icon: (
      <>
        <ellipse cx="16" cy="8" rx="11" ry="4" />
        <path d="M5 8v16c0 2.2 5 4 11 4s11-1.8 11-4V8" />
      </>
    ),
  },
  {
    title: "Realtime Applications",
    items: [
      "Live Updates",
      "Multiplayer Experiences",
      "Realtime Data Synchronization",
    ],
    icon: (
      <>
        <circle cx="16" cy="16" r="3" />
        <path d="M9 9a10 10 0 0 0 0 14M23 9a10 10 0 0 1 0 14" />
      </>
    ),
  },
  {
    title: "Mobile Applications",
    items: ["Flutter Applications", "Cross-platform Interfaces"],
    icon: (
      <>
        <rect x="9" y="3" width="14" height="26" rx="2" />
        <path d="M14 25h4" />
      </>
    ),
  },
];

export function WhatIBuild() {
  return (
    <section
      data-build-section
      className="relative overflow-hidden border-t border-line bg-surface"
      aria-label="What I build"
    >
      <div
        data-build-track
        className="flex h-screen min-h-[640px] w-max items-center pr-[clamp(20px,4.5vw,64px)] motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-col motion-reduce:items-stretch motion-reduce:py-20"
      >
        <div
          data-build-first
          className="flex w-[min(60vw,820px)] flex-col justify-center pl-[clamp(20px,4.5vw,64px)] max-[899px]:w-[86vw] motion-reduce:w-full"
        >
          <h2
            data-build-heading
            className="origin-left font-display text-[clamp(48px,7vw,104px)] font-semibold leading-none tracking-[-.045em]"
          >
            What I <span className="text-[#777]">build.</span>
          </h2>
        </div>
        {areas.map((area) => (
          <div
            data-build-panel
            className="flex h-[70%] w-[min(42vw,560px)] min-w-[340px] flex-col justify-end gap-6 border-l border-[#2a2a2a] px-10 max-[899px]:w-[78vw] max-[899px]:min-w-0 max-[899px]:px-6 motion-reduce:h-auto motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:border-l-0 motion-reduce:border-t motion-reduce:px-5 motion-reduce:py-10"
            key={area.title}
          >
            <svg
              data-build-icon
              className={iconClass}
              width={72}
              height={72}
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              {area.icon}
            </svg>
            <h3
              data-build-title
              className="font-display text-[clamp(30px,3vw,44px)] font-medium leading-[1.05] tracking-[-.03em]"
            >
              {area.title}
            </h3>
            <ul
              data-build-list
              className="flex flex-col gap-2.5 text-[#c9c6c0]"
            >
              {area.items.map((item) => (
                <li className="border-b border-[#262626] pb-2.5" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
