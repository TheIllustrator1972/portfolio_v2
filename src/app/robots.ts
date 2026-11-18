import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nileshkamble.co.in/sitemap.xml",
    host: "https://nileshkamble.co.in",
  };
}
