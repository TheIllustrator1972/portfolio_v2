export type AppPlatform = "iOS" | "macOS";

export type AppContent = {
  slug: string;
  name: string;
  tagline: string;
  platform: AppPlatform;
  trackId: number;
  featured: boolean;
  order: number;
  tags?: readonly string[];
};

export const apps: readonly AppContent[] = [
  {
    slug: "versus-sudoku",
    name: "Versus Sudoku",
    tagline: "Real-time 1v1 Sudoku over a shared link",
    platform: "iOS",
    trackId: 6746213774,
    featured: true,
    order: 0,
    tags: ["SwiftUI", "Go", "WebSockets"],
  },
  {
    slug: "ball-balance",
    name: "Ball Balance: Tilt Climb",
    tagline: "Two-thumb tilt arcade: climb and dodge lasers",
    platform: "iOS",
    trackId: 6807118225,
    featured: false,
    order: 1,
  },
  {
    // App Store name: "Word Puzzle: Letter Columns".
    slug: "word-woven",
    name: "Word Woven",
    tagline: "Swipe letter columns to spell hidden words",
    platform: "iOS",
    trackId: 6765878463,
    featured: false,
    order: 2,
  },
  {
    slug: "isometria",
    name: "Isometria",
    tagline: "Create isometric grid art and export as PNG",
    platform: "iOS",
    trackId: 6740491214,
    featured: false,
    order: 3,
  },
  {
    slug: "word-mean",
    name: "Word Mean +",
    tagline: "Instant definitions, synonyms and examples",
    platform: "iOS",
    trackId: 6744270167,
    featured: false,
    order: 4,
  },
  {
    slug: "set-square-classic",
    name: "Set Square Classic",
    tagline: "Place 1–9 so each cage hits its target",
    platform: "iOS",
    trackId: 6747139517,
    featured: false,
    order: 5,
  },
  {
    slug: "utilitybar",
    name: "UtilityBar",
    tagline: "Mac menu bar todos, clipboard and essentials",
    platform: "macOS",
    trackId: 6747776894,
    featured: false,
    order: 6,
  },
  {
    slug: "suko-classic",
    name: "Suko Classic",
    tagline: "Minimalist 3×3 number puzzle with sum clues",
    platform: "iOS",
    trackId: 6747990866,
    featured: false,
    order: 7,
  },
];
