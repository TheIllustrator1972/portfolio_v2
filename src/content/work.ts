export const work = [
  {
    slug: "on-call-ai-agent",
    title: "Slack on-call AI agent",
    label: "AI · Internal tooling",
    outcome:
      "Grounded answers for on-call engineers, built on Augment, Jira and LogRocket MCP and evaluated on the last 100 on-call issues.",
    tags: ["MCP", "LLM", "Evals", "Slack"],
    order: 1,
  },
  {
    slug: "subscription-onboarding",
    title: "Subscription onboarding re-architecture",
    label: "Product · Frontend architecture",
    outcome:
      "Replaced fragile form state with a reducer-based model and real-time readiness as the database comes online.",
    tags: ["React", "TypeScript", "WebSockets"],
    order: 2,
  },
  {
    slug: "operations-portal",
    title: "Operations Portal for SRE",
    label: "Internal platform",
    outcome:
      "The support portal SRE uses daily, with role-based access control and cost analytics.",
    tags: ["React", "RBAC", "Dashboards"],
    order: 3,
  },
] as const;

export type WorkItem = (typeof work)[number];
