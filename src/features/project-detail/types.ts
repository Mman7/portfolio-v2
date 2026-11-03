export type ArchNode = { title: string; sub: string };
export type ArchColumn = { label: string; nodes: ArchNode[] };
export type TitledText = { title: string; body: string };

export type ProjectDetail = {
  accent: string;
  tagline: string;
  role: string;
  stack: string[];
  overview: { title: string; body: string; points: string[]; note?: string };
  architecture?: { title: string; columns: ArchColumn[] };
  flow?: { title: string; steps: TitledText[] };
  decisions?: { title: string; items: TitledText[] };
  gallery?: { src: string; alt: string; caption: string }[];
};

export type ProjectLinks = { repoUrl?: string; liveUrl?: string };
