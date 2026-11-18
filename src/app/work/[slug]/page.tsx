import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { work } from "@/content/work";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) return { title: "Work" };

  return {
    title: item.title,
    description: item.outcome,
    robots: { index: false, follow: false },
  };
}

export default async function WorkHoldingPage({ params }: Props) {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <article className="column pt-12 pb-16">
      <a
        href="/#work"
        className="type-small text-text-secondary transition-colors duration-150 hover:text-text"
      >
        ← All work
      </a>
      <p className="type-mono mt-8 text-text-tertiary">{item.label}</p>
      <h1 className="type-display mt-3">{item.title}</h1>
      <p className="type-body-lg measure mt-4">{item.outcome}</p>
    </article>
  );
}
