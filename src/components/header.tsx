"use client";

import { Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { TrackedLink } from "@/components/tracked-link";

const nav = [
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "Apps", id: "apps" },
  { label: "Contact", id: "contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }

    const elements = nav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      {
        rootMargin: "-80px 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="site-header" data-scrolled={scrolled ? "true" : "false"}>
      <div className="column flex h-full items-center gap-3">
        <Link href="/" className="type-small min-w-0 font-semibold text-text">
          {profile.name}
        </Link>
        <nav className="ml-auto hidden items-center gap-5 md:flex" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.id}
              href={onHome ? `#${item.id}` : `/#${item.id}`}
              className="nav-link type-small"
              data-active={active === item.id ? "true" : "false"}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-4">
          <ThemeToggle />
          <TrackedLink
            href={profile.resumePath}
            download={profile.resumeFilename}
            event="resume_download"
            eventProps={{ location: "header" }}
            className="btn btn-secondary"
          >
            <Download size={16} strokeWidth={1.75} aria-hidden />
            Resume
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
