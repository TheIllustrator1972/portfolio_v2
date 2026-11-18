import { profile } from "@/content/profile";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="column flex flex-col items-start gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="type-small text-text-tertiary">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
