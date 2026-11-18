"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/utils";

export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--spot-x",
    `${event.clientX - rect.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--spot-y",
    `${event.clientY - rect.top}px`,
  );
}

export function Spotlight({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "article";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("spotlight", className)} onPointerMove={trackSpotlight}>
      {children}
    </Tag>
  );
}
