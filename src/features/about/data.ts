export type JourneyStep = {
  title: string;
  description: string;
  tags: string[];
};

export const journey: JourneyStep[] = [
  {
    title: "Learning through experience.",
    description:
      "Before software, I worked with my hands. Those jobs taught me patience, discipline, and how to solve practical problems.",
    tags: ["Waiter", "Kitchen apprentice", "Furniture industry"],
  },
  {
    title: "Choosing a different path.",
    description:
      "I committed to software development. Learning independently meant starting with fundamentals and getting comfortable being a beginner again.",
    tags: ["Self-taught", "Personal projects", "Persistence"],
  },
  {
    title: "From learning to building.",
    description:
      "My software internship brought me closer to real systems, databases, and team workflows.",
    tags: ["Internship", "Databases", "Teamwork"],
  },
  {
    title: "Building beyond code.",
    description:
      "I want to understand problems, design thoughtful solutions, and build complete products, from the interface to the data behind it.",
    tags: ["Full-stack", "Product thinking"],
  },
];

export const discipline = [
  "I’m not always the fastest person in the room, and there will always be someone who knows more than I do. What matters is continuing to improve.",
  "When I encounter something I don’t understand, I dig deeper and figure out why it works instead of simply copying an answer.",
  "Progress doesn’t come from knowing everything. It comes from being willing to keep learning.",
];

export const principles = [
  {
    title: "Stay curious.",
    description: "Understand how things work, not just how to make them work.",
  },
  {
    title: "Keep going.",
    description:
      "When something doesn’t make sense, keep digging and change approaches.",
  },
  {
    title: "Build with intention.",
    description: "Every decision should have a reason.",
  },
  {
    title: "Stay honest.",
    description: "Recognize what I don’t know, and keep working to improve.",
  },
];

export const outside = [
  "I’m drawn to sport motorcycles for the speed, the engineering, and the feeling of freedom that comes with being on the road.",
  "Exploring unfamiliar places and leaving the familiar behind for a while reminds me that a meaningful life is bigger than a job title.",
];

export const directions = [
  {
    title: "Engineering",
    description:
      "Become technically strong and develop solid full-stack engineering skills.",
  },
  {
    title: "Building",
    description:
      "Create useful software products and eventually build something of my own.",
  },
  {
    title: "Freedom",
    description:
      "Build a life with independence, flexibility, and room to explore.",
  },
];
