import { projects, type Project } from "@/features/home/data";
import { toSlug } from "./slug";
import type { ProjectDetail } from "./types";

const DEFAULT_ACCENT = "#7f9cf5";

// Only facts confirmed from each project's README; anything else falls back to the shared project list.
const details: Record<string, Partial<ProjectDetail>> = {
  komorebi: {
    accent: "#ff9ecb",
    tagline: "Kawaii Gift Shop. A storefront, payments and an admin dashboard.",
    role: "Full-stack developer",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Docker",
    ],
    overview: {
      title: "From browsing products to managing a store.",
      body: "A gift and stationery shop built end to end: a Next.js storefront, an Express REST API and a PostgreSQL database, with Stripe handling payment.",
      points: [
        "Product browsing, cart and wishlist",
        "Registration, login and saved addresses",
        "Order history and account management",
        "Admin dashboard for products, categories, customers and orders",
        "Inventory and stock management",
      ],
      note: "Some storefront and dashboard screens still use mock or seeded data. There is no live demo; the source is on GitHub.",
    },
    architecture: {
      title: "Storefront, API, database and payments.",
      columns: [
        {
          label: "Client",
          nodes: [
            { title: "Storefront", sub: "Next.js" },
            { title: "Admin dashboard", sub: "Next.js" },
          ],
        },
        {
          label: "Server",
          nodes: [
            {
              title: "REST API",
              sub: "Express, proxied through Next.js rewrites",
            },
          ],
        },
        {
          label: "Data & services",
          nodes: [
            { title: "Database", sub: "PostgreSQL via Prisma" },
            { title: "Stripe", sub: "PaymentIntents and webhooks" },
          ],
        },
      ],
    },
    flow: {
      title: "From cart to confirmed order.",
      steps: [
        {
          title: "Checkout request",
          body: "The storefront asks the API to start a checkout.",
        },
        {
          title: "Server-side amount",
          body: "The API calculates the total itself instead of trusting client values.",
        },
        {
          title: "Stripe PaymentIntent",
          body: "A PaymentIntent is created and the customer pays through Stripe.",
        },
        {
          title: "Webhook verification",
          body: "Stripe reports the result to a verified webhook endpoint.",
        },
        {
          title: "Order fulfilment",
          body: "Successful payments create the order and update inventory in a Prisma transaction. A unique PaymentIntent ID keeps fulfilment idempotent.",
        },
      ],
    },
    decisions: {
      title: "Decisions that shaped it.",
      items: [
        {
          title: "Separate frontend and backend",
          body: "The Next.js app proxies API and upload requests to Express through rewrites, so each side keeps its own responsibilities.",
        },
        {
          title: "Cookie-based authentication",
          body: "Access and refresh tokens live in HTTP-only cookies, with protected routes for admin features.",
        },
        {
          title: "Transactions for consistency",
          body: "Inventory and order changes run in Prisma transactions so stock and orders stay in step.",
        },
        {
          title: "Payment confirmed by webhook",
          body: "Fulfilment is driven by Stripe events, not by the browser returning from checkout.",
        },
      ],
    },
  },
  pockettogether: {
    accent: "#2373f4",
    tagline: "Shared expenses for rooms of people, built on Firebase.",
    role: "Mobile developer",
    stack: [
      "Flutter",
      "Dart",
      "Firebase Auth",
      "Cloud Firestore",
      "Cloud Functions",
    ],
    overview: {
      title: "Making shared expenses easier to understand.",
      body: "Users create or join rooms and manage expenses together. Each room keeps its own members, expense history and spending summaries.",
      points: [
        "Create rooms and generate invitation codes",
        "Join a room through an invitation",
        "Add, edit and delete expenses",
        "Room summaries and per-member contributions",
        "Monthly expense statistics",
      ],
      note: "Still in development.",
    },
    architecture: {
      title: "Connecting users, rooms and financial records.",
      columns: [
        {
          label: "Client",
          nodes: [
            { title: "Flutter app", sub: "Dart" },
            { title: "Firebase Authentication", sub: "User identity" },
          ],
        },
        {
          label: "Server",
          nodes: [
            {
              title: "Callable Functions",
              sub: "Rooms, invitations and expense CRUD",
            },
            { title: "Summary rebuild", sub: "Recomputes existing statistics" },
          ],
        },
        {
          label: "Data",
          nodes: [
            {
              title: "Cloud Firestore",
              sub: "Expenses plus room, monthly and member summaries",
            },
          ],
        },
      ],
    },
    flow: {
      title: "From room to statistics.",
      steps: [
        {
          title: "Create a room",
          body: "A callable function creates the room and its invitation code on the server.",
        },
        {
          title: "Join with an invitation",
          body: "Joining is idempotent, so repeating it cannot create duplicate membership.",
        },
        {
          title: "Record an expense",
          body: "A Firestore transaction writes the expense and updates the derived statistics together.",
        },
        {
          title: "Read the summaries",
          body: "Room, monthly and member totals are kept alongside the expenses. Clients cannot write them directly.",
        },
      ],
    },
    decisions: {
      title: "Decisions that shaped it.",
      items: [
        {
          title: "Sensitive operations on the server",
          body: "Room creation, invitations and expense writes go through Callable Functions instead of direct client writes.",
        },
        {
          title: "Statistics that stay consistent",
          body: "Transactions update expenses and their derived summaries as a single unit, including on edits and deletes.",
        },
        {
          title: "Locked-down client writes",
          body: "Clients are restricted from writing server-managed statistics.",
        },
        {
          title: "Rebuilding existing data",
          body: "A summary rebuild function brings pre-existing expense records into the derived statistics.",
        },
      ],
    },
  },
  quizthis: {
    accent: "#a78bfa",
    tagline:
      "Test your knowledge. Challenge your understanding. Track your progress.",
    role: "Frontend developer",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Zustand",
      "Tailwind CSS",
      "DaisyUI",
      "Chart.js",
    ],
    overview: {
      title: "Turning questions into an interactive experience.",
      body: "An interactive quiz platform where developers test their programming knowledge across technologies and difficulty levels.",
      points: [
        "Topics: C++, C#, JavaScript, React, TypeScript, Web and Software Development",
        "Easy, Medium and Hard difficulty",
        "Topic and difficulty selection before each quiz",
        "Results with topic-wise performance analysis",
        "Chart.js visualisations of results",
      ],
    },
    architecture: {
      title: "From question data to a result.",
      columns: [
        {
          label: "Data",
          nodes: [{ title: "Topic JSON files", sub: "One file per subject" }],
        },
        {
          label: "State",
          nodes: [
            {
              title: "Zustand stores",
              sub: "Selection, difficulty and gameplay",
            },
          ],
        },
        {
          label: "Interface",
          nodes: [
            { title: "Next.js pages", sub: "Quiz flow" },
            { title: "Chart.js", sub: "Results visualisation" },
          ],
        },
      ],
    },
    flow: {
      title: "From topic to results.",
      steps: [
        { title: "Pick a topic", body: "Choose the subject to be tested on." },
        {
          title: "Pick a difficulty",
          body: "Easy, Medium or Hard before the quiz begins.",
        },
        {
          title: "Answer the questions",
          body: "Questions and answers are driven by the shared quiz state.",
        },
        {
          title: "Review the results",
          body: "A results page shows performance by topic with charts.",
        },
      ],
    },
    decisions: {
      title: "Decisions that shaped it.",
      items: [
        {
          title: "Questions as data",
          body: "Quiz content lives in topic-specific JSON files, separate from the components that render it.",
        },
        {
          title: "Dedicated stores",
          body: "Selected topic, difficulty and gameplay state are kept apart so they carry across pages cleanly.",
        },
        {
          title: "Typed models",
          body: "TypeScript types describe questions, answers, topics and game options.",
        },
      ],
    },
    gallery: [
      {
        src: "/project_showcase/img/quiz_app.png",
        alt: "QuizThis interface",
        caption: "QuizThis",
      },
    ],
  },
  notely: {
    accent: "#fb923c",
    tagline: "Your thoughts, always within reach.",
    role: "Mobile developer",
    stack: ["Flutter", "Dart"],
    overview: {
      title: "From a blank page to a saved note.",
      body: "A cross-platform note-taking app built around local-first storage, offline availability and privacy, with no dependency on cloud servers.",
      points: [
        "Create and manage notes",
        "Works offline",
        "Android and Windows desktop",
        "No third-party infrastructure",
      ],
    },
    decisions: {
      title: "Decisions that shaped it.",
      items: [
        {
          title: "Offline first",
          body: "Notes are available without a connection, so network access is never a prerequisite.",
        },
        {
          title: "One codebase with Flutter",
          body: "A single Dart codebase targets Android and Windows.",
        },
        {
          title: "Privacy by design",
          body: "Notes stay independent of cloud servers and third-party infrastructure.",
        },
      ],
    },
  },
  "pokemon-index": {
    accent: "#ef6b6b",
    tagline: "Explore the world of Pokémon, one entry at a time.",
    role: "Frontend developer",
    stack: ["TypeScript", "Vite", "ESLint", "Prettier"],
    overview: {
      title: "Turning data into a browsable index.",
      body: "Browse Pokémon by name and open an entry to see its types, stats and image, on both mobile and desktop layouts.",
      points: [
        "Browse by name",
        "Individual detail views",
        "Types, stats and images",
        "Responsive layout",
      ],
    },
    decisions: {
      title: "Decisions that shaped it.",
      items: [
        {
          title: "Search over scrolling",
          body: "Users can jump straight to a Pokémon instead of working through the full list.",
        },
        {
          title: "Consistent detail views",
          body: "Every entry follows the same layout, so the index stays easy to scan.",
        },
        {
          title: "Responsive by default",
          body: "The layout adapts across desktop and mobile screens.",
        },
      ],
    },
    gallery: [
      {
        src: "/project_showcase/img/pokedex.png",
        alt: "Pokémon Index interface",
        caption: "Pokémon Index",
      },
    ],
  },
  "tomato-clock": {
    accent: "#ff6b4a",
    tagline: "Focus on the moment. Make every session count.",
    role: "Mobile developer",
    stack: ["Flutter", "Dart"],
    overview: {
      title: "A focused rhythm of work and rest.",
      body: "A Flutter Pomodoro timer that structures work into focused sessions, each followed by a short break.",
      points: [
        "15-minute work sessions",
        "5-minute breaks",
        "Longer breaks after a set number of sessions",
        "Minimal, focus-oriented interface",
      ],
    },
    flow: {
      title: "One session at a time.",
      steps: [
        {
          title: "Focus session",
          body: "A 15-minute work interval starts the cycle.",
        },
        {
          title: "Short break",
          body: "A 5-minute break follows each work session.",
        },
        {
          title: "Long break",
          body: "After a set number of sessions, the break is longer.",
        },
      ],
    },
    gallery: [
      {
        src: "/project_showcase/img/tomato_count.png",
        alt: "Tomato Clock timer screen",
        caption: "Tomato Clock",
      },
    ],
  },
  "jklm-clone": {
    tagline: "Join the room. Answer fast. Compete together.",
    stack: ["Next.js", "Ably", "Redis", "Netlify Edge"],
    overview: {
      title: "Turning game rules into a shared experience.",
      body: "A real-time multiplayer trivia game. Ably syncs events and presence between players, Redis holds rooms and scores, and answers are validated on a Netlify Edge path.",
      points: [
        "Real-time multiplayer rooms",
        "Presence and event syncing through Ably",
        "Room and score storage in Redis",
        "Edge-validated answers",
      ],
    },
    architecture: {
      title: "From player input to shared state.",
      columns: [
        {
          label: "Client",
          nodes: [{ title: "Game client", sub: "Runs in the browser" }],
        },
        {
          label: "Realtime & edge",
          nodes: [
            { title: "Ably", sub: "Events and presence" },
            { title: "Netlify Edge", sub: "Answer validation" },
          ],
        },
        {
          label: "Data",
          nodes: [{ title: "Redis", sub: "Rooms, questions and scores" }],
        },
      ],
    },
    flow: {
      title: "From answer to shared score.",
      steps: [
        {
          title: "Join a room",
          body: "Players enter a room code, and room state is kept in Redis.",
        },
        {
          title: "Play a timed round",
          body: "Round events and presence are shared with players through Ably channels.",
        },
        {
          title: "Submit an answer",
          body: "The answer is sent for validation rather than judged in the browser.",
        },
        {
          title: "Validate on the server",
          body: "A Netlify Edge Function validates the answer in production, with an API route as fallback.",
        },
        {
          title: "Broadcast the score",
          body: "A correct answer updates the score in Redis and the change is sent to every player.",
        },
      ],
    },
    decisions: {
      title: "Decisions that shaped it.",
      items: [
        {
          title: "Realtime channels for sync",
          body: "Ably channels and presence keep each player's view of the room in step.",
        },
        {
          title: "Server-side answer checks",
          body: "Answers are validated on the server, so the client never decides the score.",
        },
        {
          title: "Redis as shared state",
          body: "Room metadata, questions and scores live in one store, with TTL-based room expiry.",
        },
      ],
    },
    gallery: [
      {
        src: "/project_showcase/img/jklm_showcase.jpg",
        alt: "JKLM Clone gameplay",
        caption: "JKLM Clone",
      },
    ],
  },
};

function resolveDetail(project: Project, slug: string): ProjectDetail {
  const custom = details[slug] ?? {};
  return {
    accent: custom.accent ?? DEFAULT_ACCENT,
    tagline: custom.tagline ?? project.description,
    role: custom.role ?? "Developer",
    stack: custom.stack ?? project.stack ?? [],
    overview: custom.overview ?? {
      title: "What it is.",
      body: project.summary ?? project.description,
      points: project.highlights ?? [],
    },
    architecture: custom.architecture,
    flow: custom.flow,
    decisions: custom.decisions,
    gallery: custom.gallery,
  };
}

export const projectSlugs = projects.map((project) => toSlug(project.name));

export function getProjectPage(slug: string) {
  const index = projects.findIndex((project) => toSlug(project.name) === slug);
  if (index === -1) return null;

  const project = projects[index];
  const nextProject =
    projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  return {
    project,
    detail: resolveDetail(project, slug),
    next: nextProject
      ? {
          slug: toSlug(nextProject.name),
          name: nextProject.name,
          description: nextProject.description,
        }
      : null,
  };
}
