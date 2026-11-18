import { SiApple, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { profile, type SocialTarget } from "@/content/profile";
import { TrackedLink } from "@/components/tracked-link";

const icons: Record<SocialTarget, typeof SiGithub> = {
  linkedin: SiLinkedin,
  github: SiGithub,
  x: SiX,
  "app-store": SiApple,
};

export function SocialLinks() {
  return (
    <ul className="flex items-center">
      {profile.socials.map((social) => {
        const Icon = icons[social.target];
        return (
          <li key={social.target}>
            <TrackedLink
              href={social.href}
              external
              event="outbound_click"
              eventProps={{ target: social.target }}
              className="icon-button"
              ariaLabel={`${social.name} (opens in new tab)`}
            >
              <Icon size={18} aria-hidden />
            </TrackedLink>
          </li>
        );
      })}
    </ul>
  );
}
