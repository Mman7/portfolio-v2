export type Project = {
  name: string;
  description: string;
  summary?: string;
  status?: string;
  stack?: string[];
  highlights?: string[];
  featured?: boolean;
  img?: string;
  video?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type BioPart = {
  text: string;
  strong?: boolean;
};
export const projects: Project[] = [
  {
    name: "Komorebi",
    description: "E-commerce platform",
    summary:
      "A full-stack e-commerce web application covering the storefront, Stripe payments, and an admin dashboard for products, categories, and orders.",
    status: "Completed",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "REST API",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Docker",
      "Zustand",
      "TanStack Query",
    ],
    highlights: [
      "Product browsing and shopping cart",
      "Wishlist",
      "Checkout and payment processing",
      "Stripe PaymentIntent integration",
      "Stripe webhooks for order fulfillment",
      "Inventory reservation",
      "Order management",
      "Admin dashboard with product and category CRUD",
      "Customer and inventory management",
    ],
    featured: true,
    video: "https://assets.ericman.dev/e-commerce_showcase_vid.mp4",
    repoUrl: "https://github.com/Mman7/mini-ecommerce",
  },
  {
    name: "PocketTogether",
    description: "Shared expense management",
    summary:
      "A Flutter app for shared expenses: create rooms, invite members with codes, and track spending together.",
    status: "Ongoing",
    stack: [
      "Flutter",
      "Dart",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Cloud Functions",
      "Firebase Cloud Messaging (FCM)",
    ],
    highlights: [
      "User registration and login",
      "Create and join shared rooms",
      "Invite codes for joining rooms",
      "Record daily expenses",
      "Track room members",
      "Shared expense history",
      "Individual and room-level spending statistics",
      "Monthly and lifetime totals",
      "Room activity page",
    ],
    featured: true,
    video: "https://assets.ericman.dev/pocket_together_showcase_vid.mp4",
    repoUrl: "https://github.com/Mman7/PocketTogether",
  },
  {
    name: "QuizThis",
    description: "Quiz application",
    summary:
      "An interactive quiz application focused on programming knowledge.",
    status: "Completed",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    img: "/project_showcase/img/quiz_app.png",
    video: "https://assets.ericman.dev/quiz_this_showcase_vid.mp4",
    featured: true,
    liveUrl: "https://quiz-this.netlify.app/",
    repoUrl: "https://github.com/Mman7/programmer-quiz",
  },
  {
    name: "Notely",
    description: "Notes application",
    summary:
      "A note-taking application for creating and managing notes with rich-text editing.",
    status: "Completed",
    stack: ["Flutter", "Dart", "Local storage", "Rich-text editing"],
    video: "https://assets.ericman.dev/notely_showcase_vid.mp4",
    repoUrl: "https://github.com/Mman7/notely",
  },
  {
    name: "Pokémon Index",
    description: "Pokémon information app",
    summary:
      "A Pokémon information application that retrieves and displays data from an external API.",
    status: "Completed",
    stack: ["React", "External API integration", "TanStack Query"],
    img: "/project_showcase/img/pokedex.png",
    video: "https://assets.ericman.dev/pokemon_index _showcase_vid.mp4",
    repoUrl: "https://github.com/Mman7/pokemon_index",
    liveUrl: "https://pokedex-db.netlify.app/",
  },
  {
    name: "Tomato Clock",
    description: "Pomodoro timer",
    summary: "A productivity application based on the Pomodoro technique.",
    status: "Completed",
    img: "/project_showcase/img/tomato_count.png",
    stack: ["Flutter", "Dart", "Timer functionality", "Local notifications"],
    repoUrl: "https://github.com/Mman7/tomato_clock",
  },
  {
    name: "JKLM Clone",
    description: "Web game",
    status: "Built",
    img: "/project_showcase/img/jklm_showcase.jpg",
    video: "https://assets.ericman.dev/jklm_showcase_vid.mp4",
    repoUrl: "https://github.com/Mman7/jklm",
    liveUrl: "https://jklm-custom.netlify.app/",
  },
  {
    name: "Developer Portfolio",
    description: "Personal portfolio website",
    summary:
      "A cinematic, black-and-white portfolio with scroll-driven project showcases and animated section transitions.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "ScrollTrigger",
    ],
    highlights: [
      "Scroll-driven project showcases",
      "Animated section transitions",
      "Layered backgrounds and parallax effects",
      "Responsive layouts",
    ],
    repoUrl: "https://github.com/Mman7/portfolio-v2",
    liveUrl: "https://www.ericman.dev",
    video: "https://assets.ericman.dev/portfolio_showcase_vid.mp4",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

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
  email: "youzai0427@gmail.com",
  github: "https://github.com/Mman7",
  linkedIn: "https://www.linkedin.com/in/man-yee-you-2aa13b159/",
};
