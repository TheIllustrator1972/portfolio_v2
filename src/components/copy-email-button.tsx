"use client";

import { track } from "@vercel/analytics";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      track("email_copy");
    } catch {
      track("email_click");
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <span className="inline-flex items-center gap-2 self-start">
      <button
        type="button"
        className="icon-button"
        aria-label="Copy email address"
        onClick={onCopy}
      >
        {copied ? (
          <Check size={18} strokeWidth={1.75} aria-hidden />
        ) : (
          <Copy size={18} strokeWidth={1.75} aria-hidden />
        )}
      </button>
      {copied ? <span className="type-mono text-text-secondary">Copied</span> : null}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}
