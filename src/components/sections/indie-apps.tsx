import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { profile } from "@/content/profile";
import { getIndieApps, type IndieApp } from "@/lib/apps";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";
import { TrackedLink } from "@/components/tracked-link";

function appMeta(app: IndieApp) {
  const base = app.genre ? `${app.genre} · ${app.platform}` : app.platform;
  if (
    app.ratingCount !== undefined &&
    app.ratingCount >= 5 &&
    app.rating !== undefined
  ) {
    const rating = Math.round(app.rating * 10) / 10;
    return `${base} ★ ${rating}`;
  }
  return base;
}

function AppIcon({ app, size }: { app: IndieApp; size: 48 | 64 }) {
  return (
    <Image
      src={app.iconUrl}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className="shrink-0 rounded-[22.5%] border border-border object-cover"
      style={{ width: size, height: size }}
    />
  );
}

export async function IndieApps() {
  const indieApps = await getIndieApps();
  const featured = indieApps.find((app) => app.featured);
  const rest = indieApps.filter((app) => !app.featured);
  const store = profile.socials.find((social) => social.target === "app-store");

  return (
    <section id="apps" className="section mt-16 md:mt-24">
      <Reveal>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="type-h2">Indie apps</h2>
            <p className="type-small mt-2 text-text-secondary">
              8 apps designed, built and shipped solo.
            </p>
          </div>
          {store ? (
            <TrackedLink
              href={store.href}
              external
              event="outbound_click"
              eventProps={{ target: "app-store" }}
              className="text-link type-small inline-flex items-center gap-1"
            >
              View on the App Store
              <ArrowUpRight size={12} strokeWidth={1.75} aria-hidden />
              <span className="sr-only">(opens in new tab)</span>
            </TrackedLink>
          ) : null}
        </div>
      </Reveal>

      <div className="mt-6 flex flex-col gap-3">
        {featured ? (
          <Reveal index={1}>
            <Spotlight as="article" className="card">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <AppIcon app={featured} size={64} />
                    <div className="min-w-0">
                      <h3 className="type-h3">{featured.name}</h3>
                      <p className="type-small mt-1 text-text-secondary">
                        {featured.tagline}
                      </p>
                    </div>
                  </div>
                  {featured.tags ? (
                    <ul className="mt-4 flex flex-wrap gap-[6px]">
                      {featured.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <TrackedLink
                    href={featured.storeUrl}
                    external
                    event="outbound_click"
                    eventProps={{ target: featured.slug }}
                    className="btn btn-secondary mt-4"
                  >
                    View on App Store
                    <span className="sr-only">(opens in new tab)</span>
                  </TrackedLink>
                </div>
                {featured.screenshots.length > 0 ? (
                  <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:shrink-0 md:overflow-visible md:px-0">
                    {featured.screenshots.map((src, index) => (
                      <div
                        key={src}
                        className="relative aspect-[9/19.5] w-[120px] shrink-0 snap-start overflow-hidden rounded-md border border-border bg-surface-muted"
                      >
                        <Image
                          src={src}
                          alt={`${featured.name} screenshot ${index + 1}`}
                          fill
                          sizes="120px"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Spotlight>
          </Reveal>
        ) : null}

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rest.map((app, index) => (
            <li key={app.slug}>
              <Reveal index={Math.min(index + 2, 5)}>
                <TrackedLink
                  href={app.storeUrl}
                  external
                  event="outbound_click"
                  eventProps={{ target: app.slug }}
                  spotlight
                  className="link-card flex items-start gap-3"
                >
                  <AppIcon app={app} size={48} />
                  <span className="min-w-0 flex-1">
                    <span className="type-h3 block">{app.name}</span>
                    <span className="type-small clamp-2 mt-1 block text-text-secondary">
                      {app.tagline}
                    </span>
                    <span className="type-mono mt-2 block text-text-tertiary">
                      {appMeta(app)}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="card-arrow mt-1 shrink-0"
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="sr-only">(opens in new tab)</span>
                </TrackedLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
