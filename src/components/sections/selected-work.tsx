import { ArrowRight } from "lucide-react";
import { work } from "@/content/work";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";

export function SelectedWork() {
  const items = work.slice().sort((a, b) => a.order - b.order);

  return (
    <section id="work" className="section mt-16 md:mt-24">
      <Reveal>
        <h2 className="type-h2">Selected work</h2>
      </Reveal>
      <div className="mt-6 flex flex-col gap-3">
        {items.map((item, index) => (
          <Reveal key={item.slug} index={index + 1}>
            <TrackedLink
              href={`/work/${item.slug}`}
              event="case_study_open"
              eventProps={{ slug: item.slug }}
              spotlight
              className="link-card block"
            >
              <p className="type-mono text-text-tertiary">{item.label}</p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <h3 className="type-h3">{item.title}</h3>
                <ArrowRight
                  className="card-arrow mt-1 shrink-0"
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <p className="type-small clamp-2-md mt-2 text-text-secondary">
                {item.outcome}
              </p>
              <ul className="mt-3 flex flex-wrap gap-[6px]">
                {item.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </TrackedLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
