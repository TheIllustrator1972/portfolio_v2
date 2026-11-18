"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import type { ReactNode } from "react";
import { trackSpotlight } from "@/components/spotlight";
import { cn } from "@/utils";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  event?: string;
  eventProps?: Record<string, string>;
  external?: boolean;
  download?: string;
  ariaLabel?: string;
  spotlight?: boolean;
};

export function TrackedLink({
  href,
  children,
  className,
  event,
  eventProps,
  external,
  download,
  ariaLabel,
  spotlight,
}: TrackedLinkProps) {
  const onClick = () => {
    if (event) track(event, eventProps);
  };
  const classes = cn(className, spotlight && "spotlight");
  const onPointerMove = spotlight ? trackSpotlight : undefined;

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        onPointerMove={onPointerMove}
        aria-label={ariaLabel}
        download={download}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      onClick={onClick}
      onPointerMove={onPointerMove}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
