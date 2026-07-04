export interface NavModule {
  key: string;
  href: string;
}

export interface NavPillar {
  key: string;
  modules: NavModule[];
}

export const navPillars: NavPillar[] = [
  {
    key: "explore",
    modules: [
      { key: "manuscripts", href: "/manuscripts" },
      { key: "library", href: "/explore/library" },
      { key: "archives", href: "/explore/archives" },
      { key: "museum", href: "/explore/museum" },
      { key: "collections", href: "/explore/collections" },
    ],
  },
  {
    key: "experience",
    modules: [
      { key: "exhibitions", href: "/experience/exhibitions" },
      { key: "timelines", href: "/experience/timelines" },
      { key: "restorationLab", href: "/experience/restoration-lab" },
    ],
  },
  {
    key: "engage",
    modules: [
      { key: "research", href: "/engage/research" },
      { key: "learn", href: "/engage/learn" },
      { key: "events", href: "/engage/events" },
      { key: "assistant", href: "/engage/assistant" },
    ],
  },
  {
    key: "access",
    modules: [
      { key: "membership", href: "/access/membership" },
      { key: "readingRoom", href: "/access/reading-room" },
      { key: "publications", href: "/access/publications" },
    ],
  },
];

export const utilityLinks = [
  { key: "about", href: "/about" },
  { key: "visit", href: "/visit" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
];
