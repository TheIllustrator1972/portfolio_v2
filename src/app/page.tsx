import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { IndieApps } from "@/components/sections/indie-apps";
import { ProofStrip } from "@/components/sections/proof-strip";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Frontend Engineer",
  url: "https://nileshkamble.co.in",
  sameAs: profile.socials.map((social) => social.href),
  worksFor: {
    "@type": "Organization",
    name: "Tessell",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="column pb-16 md:pb-24">
        <Hero />
        <ProofStrip />
        <SelectedWork />
        <Experience />
        <IndieApps />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
