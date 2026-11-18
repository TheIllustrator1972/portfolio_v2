import { proof } from "@/content/proof";
import { Reveal } from "@/components/reveal";
import { cn } from "@/utils";

export function ProofStrip() {
  return (
    <section className="mt-16 md:mt-24" aria-label="Highlights">
      <Reveal>
        <div className="grid overflow-hidden rounded-lg border border-border bg-surface md:grid-cols-3">
          {proof.map((item, index) => (
            <div
              key={item.value}
              className={cn(
                "flex items-baseline justify-between gap-4 px-4 py-4 md:flex-col md:items-start md:gap-2 md:px-5 md:py-5",
                index < proof.length - 1 &&
                  "border-b border-border md:border-r md:border-b-0",
              )}
            >
              <p className="proof-value shrink-0">{item.value}</p>
              <p className="type-small text-right text-text-secondary md:text-left">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
