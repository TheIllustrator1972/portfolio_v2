import { apps, type AppContent } from "@/content/apps";

const DEVELOPER_ID = "1790227862";

type StoreRecord = {
  trackId?: number;
  artworkUrl512?: string;
  artworkUrl100?: string;
  screenshotUrls?: string[];
  primaryGenreName?: string;
  averageUserRating?: number;
  userRatingCount?: number;
  trackViewUrl?: string;
};

export type IndieApp = AppContent & {
  iconUrl: string;
  screenshots: string[];
  genre?: string;
  rating?: number;
  ratingCount?: number;
  storeUrl: string;
};

async function lookup(entity: "software" | "macSoftware"): Promise<StoreRecord[]> {
  const url = `https://itunes.apple.com/lookup?id=${DEVELOPER_ID}&entity=${entity}&country=us&limit=200`;
  const response = await fetch(url, {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(5000),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`iTunes lookup failed (${response.status})`);
  }

  const data = (await response.json()) as { results?: StoreRecord[] };
  return (data.results ?? []).filter((item) => typeof item.trackId === "number");
}

export async function getIndieApps(): Promise<IndieApp[]> {
  const byId = new Map<number, StoreRecord>();

  const results = await Promise.allSettled([
    lookup("software"),
    lookup("macSoftware"),
  ]);

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const app of result.value) {
        if (app.trackId) byId.set(app.trackId, app);
      }
    }
  }

  return apps
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((app) => {
      const remote = byId.get(app.trackId);
      return {
        ...app,
        iconUrl:
          remote?.artworkUrl512 ||
          remote?.artworkUrl100 ||
          `/apps/${app.slug}.png`,
        screenshots: remote ? (remote.screenshotUrls ?? []).slice(0, 3) : [],
        genre: remote?.primaryGenreName,
        rating: remote?.averageUserRating,
        ratingCount: remote?.userRatingCount,
        storeUrl:
          remote?.trackViewUrl || `https://apps.apple.com/app/id${app.trackId}`,
      };
    });
}
