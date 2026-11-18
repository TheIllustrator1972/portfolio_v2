import { profile } from "@/content/profile";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";
import { TrackedLink } from "@/components/tracked-link";

export function Contact() {
  const linkedin = profile.socials.find((social) => social.target === "linkedin");

  return (
    <section id="contact" className="section mt-16 md:mt-24">
      <Reveal>
        <Spotlight className="card px-8 py-8 md:px-10 md:py-10">
          <h2 className="type-h2">Let&apos;s work together</h2>
          <p className="type-body measure mt-4">
            I&apos;m open to frontend and AI engineering roles. Email is the fastest
            way to reach me.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <TrackedLink
              href={`mailto:${profile.email}`}
              event="email_click"
              className="text-link type-headline [overflow-wrap:anywhere]"
            >
              {profile.email}
            </TrackedLink>
            <CopyEmailButton />
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <TrackedLink
              href={profile.resumePath}
              download={profile.resumeFilename}
              event="resume_download"
              eventProps={{ location: "contact" }}
              className="btn btn-primary"
            >
              Download resume
            </TrackedLink>
            {linkedin ? (
              <TrackedLink
                href={linkedin.href}
                external
                event="outbound_click"
                eventProps={{ target: "linkedin" }}
                className="btn btn-secondary"
              >
                LinkedIn
                <span className="sr-only">(opens in new tab)</span>
              </TrackedLink>
            ) : null}
          </div>
        </Spotlight>
      </Reveal>
    </section>
  );
}
