/**
 * Draft experience copy from the revamp plan.
 * TODO [CONFIRM]: which bullets belong to SDE 1 vs SDE 2. The split below is the draft.
 * TODO [NEEDS NUMBER]: on-call agent accuracy or time saved (SDE 2, first bullet).
 * TODO [NEEDS NUMBER]: CI time saved by PR-aware workflows (SDE 2, third bullet).
 * TODO [NEEDS NUMBER]: re-renders reduced by the shared NPM library (SDE 1, fourth bullet).
 */

export const experience = {
  company: "Tessell",
  subtitle: "Cloud database platform · Remote",
  range: "Jan 2023 – Present",
  roles: [
    {
      title: "Software Development Engineer 2",
      dates: "Mar 2025 – Present",
      current: true,
      stack: ["React", "TypeScript", "MCP", "GitHub Actions"],
      bullets: [
        "Designed and shipped a Slack on-call agent using Augment, Jira and LogRocket MCP, evaluated on the last 100 on-call issues to return grounded answers.",
        "Re-architected cloud database subscription onboarding with a reducer-based state model, shared logic and real-time readiness as the service comes online.",
        "Built PR-aware GitHub Actions workflows that run only the automation suites affected by each change.",
        "Extended the config-driven demo platform to simulate real database workflows and auto-sync with product features for sales and marketing demos.",
      ],
    },
    {
      title: "Software Development Engineer 1",
      dates: "Jun 2023 – Feb 2025",
      current: false,
      stack: ["React", "TypeScript"],
      bullets: [
        "Built the internal Operations Portal SRE uses to support Tessell's cloud database customers, owning the UI for daily support workflows.",
        "Implemented role-based access control so routes, features and data views are gated by user role.",
        "Built dashboards and cost analytics on raw service data so operators could inspect usage and spend.",
        "Created a shared NPM component library for Tessell frontends, reducing duplicated UI and unnecessary re-renders.",
      ],
    },
    {
      title: "Website Development Intern",
      dates: "Jan 2023 – May 2023",
      current: false,
      stack: ["Next.js"],
      bullets: [
        "Built a cost calculator returning real-time pricing from configurable inputs.",
        "Owned key pages on the company Next.js site, including blogs, signup and onboarding.",
        "Added signup password validation that enforces strength rules before account creation.",
      ],
    },
  ],
} as const;
