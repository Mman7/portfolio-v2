export type Project = {
  name: string;
  description: string;
};

export type BioPart = {
  text: string;
  strong?: boolean;
};

export const projects: Project[] = [
  { name: "Komorebi", description: "E-commerce platform" },
  { name: "PocketTogether", description: "Shared expense management" },
  { name: "QuizThis", description: "Quiz application" },
];

export const technologyGroups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  { label: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  {
    label: "Database & Data",
    items: ["PostgreSQL", "Prisma", "Firebase / Firestore"],
  },
  { label: "Additional", items: ["Flutter / Dart", "Stripe", "Docker"] },
];

export const engineeringPrinciples = [
  { number: "01", title: "Understand the Problem" },
  { number: "02", title: "Build With Intention" },
  { number: "03", title: "Improve Through Iteration" },
];

export const howIWork = [
  {
    title: "Understand",
    description:
      "Understand the business problem, requirements, and user needs.",
  },
  {
    title: "Architect",
    description:
      "Plan the system architecture, database structure, and technical approach.",
  },
  {
    title: "Build",
    description:
      "Develop the frontend, backend, integrations, and user experience.",
  },
  {
    title: "Refine & Deliver",
    description:
      "Test, optimize, deploy, and continuously improve the product.",
  },
];

export const bio: BioPart[] = [
  { text: "I’m a " },
  { text: "self-taught full-stack developer", strong: true },
  { text: " based in " },
  { text: "Malaysia", strong: true },
  {
    text: ". I started learning to code at 17, worked across hospitality and furniture, and moved into software through an internship. My focus is ",
  },
  {
    text: "React, Next.js, TypeScript, Tailwind CSS, Express and PostgreSQL",
    strong: true,
  },
  { text: " — building products from interface to database." },
];

export const aboutTimeline = [
  "Waiter",
  "Kitchen apprentice",
  "Furniture industry",
  "Self-taught programming",
  "Internship in software",
];

export const contact = {
  email: "hello@example.com",
  github: "https://github.com/",
  linkedIn: "https://www.linkedin.com/",
};
