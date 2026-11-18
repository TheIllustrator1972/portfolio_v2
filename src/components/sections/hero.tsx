import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { profile } from "@/content/profile";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SocialLinks } from "@/components/social-links";
import { TrackedLink } from "@/components/tracked-link";

export function Hero() {
  return (
    <section className="pt-12 md:pt-20">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <Image
          src={profile.avatar}
          alt="Illustrated portrait of Nilesh Kamble"
          width={112}
          height={112}
          priority
          sizes="(min-width: 768px) 112px, 72px"
          className="mb-4 size-[72px] rounded-full border border-border object-cover md:order-2 md:mb-0 md:size-[112px]"
        />
        <div className="min-w-0 flex-1">
          <p className="availability type-mono">
            <span className="availability-dot" aria-hidden />
            {profile.availability}
          </p>
          <h1 className="type-display mt-3">{profile.name}</h1>
          <p className="type-headline mt-2">{profile.headline}</p>
          <p className="type-body-lg measure mt-4">{profile.intro}</p>
          <p className="type-mono mt-3 text-text-tertiary">{profile.location}</p>
          <div className="@container mt-6">
            <div className="flex flex-col gap-2 @[340px]:flex-row @[340px]:items-center">
              <TrackedLink
                href={profile.resumePath}
                download={profile.resumeFilename}
                event="resume_download"
                eventProps={{ location: "hero" }}
                className="btn btn-primary w-full @[340px]:flex-1"
              >
                <Download size={16} strokeWidth={1.75} aria-hidden />
                Download resume
              </TrackedLink>
              <TrackedLink
                href={`mailto:${profile.email}`}
                event="email_click"
                className="btn btn-secondary w-full @[340px]:flex-1"
              >
                <Mail size={16} strokeWidth={1.75} aria-hidden />
                Email me
              </TrackedLink>
              <CopyEmailButton />
            </div>
          </div>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
