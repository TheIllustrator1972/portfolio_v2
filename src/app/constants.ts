import {
  SiPython,
  SiTypescript,
  SiReact,
  SiJavascript,
  SiSwift,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiXcode,
  SiGo,
  SiGnubash,
  SiWebgl,
} from "react-icons/si";

import { RiTailwindCssFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { GrSwift } from "react-icons/gr";
import { FaLinkedin, FaTwitter, FaGithub, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const skillsConfig = [
  {
    id: "python",
    skill: "Python",
    icon: SiPython,
    usage: 90,
    description:
      "I use Python for scripting, automation, and solving algorithmic problems.",
  },
  {
    id: "typescript",
    skill: "TypeScript",
    icon: SiTypescript,
    usage: 80,
    description:
      "I use TypeScript daily to build scalable, type-safe frontends at work.",
  },
  {
    id: "react",
    skill: "React",
    icon: SiReact,
    usage: 85,
    description:
      "My go-to library for building interactive, production-grade UIs.",
  },
  {
    id: "javascript",
    skill: "JavaScript",
    icon: SiJavascript,
    usage: 95,
    description: "The foundation of everything I build on the web, used daily.",
  },
  {
    id: "swift",
    skill: "Swift",
    icon: SiSwift,
    usage: 60,
    description: "I’ve used Swift for developing native iOS and macOS apps.",
  },
  {
    id: "cpp",
    skill: "C++",
    icon: SiCplusplus,
    usage: 65,
    description:
      "I use C++ for DSA practice, performance-focused code, and learning HFT concepts.",
  },
  {
    id: "html",
    skill: "HTML5",
    icon: SiHtml5,
    usage: 75,
    description: "I use HTML to craft accessible and semantic web layouts.",
  },
  {
    id: "css",
    skill: "CSS3",
    icon: SiCss3,
    usage: 72,
    description:
      "I design responsive layouts and micro-interactions using modern CSS.",
  },
  {
    id: "swiftui",
    skill: "SwiftUI",
    icon: GrSwift,
    usage: 55,
    description:
      "I’ve built multiple personal iOS and macOS apps using SwiftUI.",
  },
  {
    id: "vscode",
    skill: "VSCode",
    icon: VscVscode,
    usage: 98,
    description:
      "My primary editor for development and custom extension building.",
  },
  {
    id: "xcode",
    skill: "Xcode",
    icon: SiXcode,
    usage: 62,
    description:
      "I use Xcode to build and debug Swift-based iOS and macOS projects.",
  },
  {
    id: "go",
    skill: "Go",
    icon: SiGo,
    usage: 50,
    description:
      "I used Go for backend and WebSocket development in my Sudoku app.",
  },
  {
    id: "shell",
    skill: "Shell/Bash",
    icon: SiGnubash,
    usage: 70,
    description:
      "I use Shell scripts for automation and developer tooling tasks.",
  },
  {
    id: "tailwind",
    skill: "Tailwind",
    icon: RiTailwindCssFill,
    usage: 70,
    description: "I style modern, responsive UIs quickly with Tailwind CSS.",
  },
  {
    id: "webGL",
    skill: "WebGL",
    icon: SiWebgl,
    usage: 70,
    description:
      "I use WebGL for interactive visuals like the cursor animation on this site.",
  },
];

export const experiences = [
  {
    company: "TESSELL",
    role: "Software Development Engineer 2",
    period: "Mar 2025 - Present | Remote",
    points: [
      "Leading development of high-impact frontend initiatives, shaping product direction across customer and internal platforms.",
      "Driving performance optimization and UX polish, ensuring fast-loading, accessible, and reliable user experiences at scale.",
      "Mentoring junior engineers and reviewing code to uphold best practices in React, TypeScript, and design systems.",
      "Partnering with leadership on strategic feature planning, from technical design to production launch.",
    ],
  },
  {
    company: "TESSELL",
    role: "Software Development Engineer 1",
    period: "June 2023 - Feb 2025 | Remote",
    points: [
      "Built and shipped core product features in customer portals and SRE tools, laying the groundwork for scalable frontend development.",
      "Delivered interactive dashboards and cost analytics that transformed raw service data into actionable insights.",
      "Implemented multi-step workflows with advanced validations, streamlining operations and reducing user errors.",
      "Established a reusable component library and shared hooks, improving consistency and accelerating feature delivery.",
      "Collaborated cross-functionally with product and design teams to translate requirements into user-friendly interfaces.",
    ],
  },
  {
    company: "TESSELL",
    role: "Website Development Intern",
    period: "Jan 2023 - May 2023 | Remote",
    points: [
      "Built a cost calculator product that provided real-time pricing outputs based on multiple parameters.",
      "Maintained and enhanced the company’s website (Next.js), including the blogs section, signup, and key user flows, ensuring reliability and smooth onboarding experiences.",
      "Designed and implemented scalable, reusable frontend components, reducing duplication and speeding up iteration across projects.",
      "Gained hands-on experience with prototyping, testing, and refining UI flows in a fast-moving team.",
    ],
  },
];

export type SocialConfigItem = {
  name: string;
  url: string;
  icon: any;
  color: string;
  description: string;
  external: boolean;
};

export const socialConfig: SocialConfigItem[] = [
  {
    name: "X (Twitter)",
    url: "https://x.com/devillus1972",
    icon: FaTwitter,
    color:
      "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white",
    description: "Follow me on X",
    external: true,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nileshsk1/",
    icon: FaLinkedin,
    color:
      "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500",
    description: "Connect on LinkedIn",
    external: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/TheIllustrator1972",
    icon: FaGithub,
    color:
      "text-gray-800 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400",
    description: "View my code on GitHub",
    external: true,
  },
  {
    name: "App Store",
    url: "https://apps.apple.com/in/developer/nilesh-kamble/id1790227862",
    icon: FaApple,
    color:
      "text-gray-500 hover:text-green-600 dark:text-gray-500 dark:hover:text-green-400",
    description: "Download my App on the App Store",
    external: true,
  },
  {
    name: "Email",
    url: "mailto:nileshkamble54321@gmail.com",
    icon: MdEmail,
    color:
      "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600",
    description: "Send me an email",
    external: false,
  },
];
