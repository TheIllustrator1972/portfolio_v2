import { education, skillGroups } from "@/content/skills";
import { Reveal } from "@/components/reveal";

export function Skills() {
  return (
    <section id="skills" className="section mt-16 md:mt-24">
      <Reveal>
        <h2 className="type-h2">Skills</h2>
        <dl className="mt-6 flex flex-col gap-4 md:gap-3">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="md:grid md:grid-cols-[160px_1fr] md:gap-4"
            >
              <dt className="type-mono text-text-tertiary">{group.name}</dt>
              <dd className="type-body mt-1 md:mt-0">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <h3 className="type-h3 mt-8">Education</h3>
        <p className="type-body mt-2">{education}</p>
      </Reveal>
    </section>
  );
}
