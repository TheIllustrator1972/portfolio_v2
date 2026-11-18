export const work = [
  {
    slug: "on-call-ai-agent",
    title: "Slack on-call AI agent",
    label: "AI · Internal tooling",
    outcome:
      "A Slack agent that answers on-call questions from Jira and LogRocket, checked against the last 100 real incidents.",
    tags: ["MCP", "LLM", "Evals", "Slack"],
    order: 1,
  },
  {
    slug: "subscription-onboarding",
    title: "Subscription onboarding re-architecture",
    label: "Product · Frontend architecture",
    outcome:
      "Rebuilt database subscription setup so the form stays reliable and shows when the service is actually ready.",
    tags: ["React", "TypeScript", "WebSockets"],
    order: 2,
  },
  {
    slug: "operations-portal",
    title: "Operations Portal for SRE",
    label: "Internal platform",
    outcome:
      "The portal SRE uses every day to support customers, with access by role and dashboards for usage and cost.",
    tags: ["React", "RBAC", "Dashboards"],
    order: 3,
  },
] as const;

export type WorkItem = (typeof work)[number];
