export const profile = {
  name: "Nilesh Kamble",
  headline: "Frontend engineer building AI-powered product experiences.",
  intro:
    "I've spent 3+ years shipping React and TypeScript at Tessell, from cloud database onboarding to an MCP-powered on-call agent. On the side, I've shipped 8 apps to the App Store.",
  availability: "Open to new roles",
  location: "Remote · India (IST, UTC+5:30)",
  email: "nileshkamble54321@gmail.com",
  resumePath: "/Nilesh_Kamble_AI_Frontend_2026.pdf",
  resumeFilename: "Nilesh_Kamble_AI_Frontend_2026.pdf",
  avatar: "/profilePic.jpg",
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nileshsk1/",
      target: "linkedin",
    },
    {
      name: "GitHub",
      href: "https://github.com/TheIllustrator1972",
      target: "github",
    },
    {
      name: "X",
      href: "https://x.com/devillus1972",
      target: "x",
    },
    {
      name: "App Store",
      href: "https://apps.apple.com/in/developer/nilesh-kamble/id1790227862",
      target: "app-store",
    },
  ],
} as const;

export type SocialTarget = (typeof profile.socials)[number]["target"];
