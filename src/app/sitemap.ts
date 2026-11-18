import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nileshkamble.co.in",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
