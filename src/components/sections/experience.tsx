import Image from "next/image";
import { experience } from "@/content/experience";
import { Reveal } from "@/components/reveal";
import { cn } from "@/utils";

export function Experience() {
  return (
    <section id="experience" className="section mt-16 md:mt-24">
      <Reveal>
        <h2 className="type-h2">Experience</h2>
      </Reveal>
      <Reveal index={1} className="mt-6">
        <div className="flex gap-3">
          <Image
            src="/tessell-logo.svg"
            alt=""
            width={40}
            height={40}
            unoptimized
            className="size-10 shrink-0 rounded-md border border-border"
          />
          <div className="min-w-0 flex-1 md:flex md:items-start md:justify-between md:gap-4">
            <div>
              <h3 className="type-h3">{experience.company}</h3>
              <p className="type-small text-text-secondary">{experience.subtitle}</p>
              <p className="type-mono mt-1 text-text-tertiary md:hidden">
                {experience.range}
              </p>
            </div>
            <p className="type-mono hidden shrink-0 text-text-tertiary md:block">
              {experience.range}
            </p>
          </div>
        </div>
      </Reveal>
      <div className="relative mt-6">
        <div aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-border" />
        <div className="flex flex-col gap-8">
          {experience.roles.map((role, index) => (
            <Reveal key={role.title} index={Math.min(index + 2, 5)}>
              <article className="relative pl-[52px]">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-[7px] left-[15.5px] size-[9px] rounded-full border",
                    role.current
                      ? "border-text bg-text"
                      : "border-border-strong bg-surface",
                  )}
                />
                <div className="md:flex md:items-baseline md:justify-between md:gap-4">
                  <h3 className="type-h3">{role.title}</h3>
                  <p className="type-mono mt-1 text-text-tertiary md:mt-0">
                    {role.dates}
                  </p>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="type-body flex gap-2">
                      <span
                        aria-hidden
                        className="mt-[10px] size-1 shrink-0 rounded-full bg-text-tertiary"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {role.stack.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-[6px]">
                    {role.stack.map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
