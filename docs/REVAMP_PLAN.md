# Portfolio Revamp Plan and Implementation Spec

This document is the source of truth for rebuilding [nileshkamble.co.in](https://nileshkamble.co.in). It is written for the agent implementing the revamp. Follow it exactly. Where something is marked **[CONFIRM]** or **[NEEDS NUMBER]**, use the draft text provided and leave a `TODO` in the content file, not in components.

---

## 1. Goal and positioning

**Goal:** make the portfolio persuasive to recruiters hiring for **remote frontend + AI engineering roles at US/EU companies**.

**Positioning:** a frontend engineer who ships AI-powered product features, proven with case studies rather than generic bullets.

A recruiter skimming for 30 seconds must leave knowing:

1. What role Nilesh wants (frontend + AI, remote).
2. Evidence he can do it (Tessell work, the on-call AI agent, 8 shipped apps).
3. How to act (download resume, email).

### Decisions (final)

| Topic | Decision |
| --- | --- |
| Primary role pitched | Frontend + AI engineer (React, TypeScript, LLM, MCP, agents) |
| Target market | Remote roles at US/EU companies |
| Structure | Scrollable home page plus separate case study pages |
| Visual direction | Minimal, typography-led (Linear/Vercel style), few signature interactions |
| Extras | Resume PDF download, rich indie apps showcase |
| Hosting | Vercel (replaces GitHub Pages) |
| Title history | Website Development Intern (Jan–May 2023), SDE 1 (Jun 2023 – Feb 2025), SDE 2 (Mar 2025 – present) |

### Problems with the current site (what this revamp fixes)

- Generic copy ("leading high-impact initiatives…") that a recruiter cannot verify.
- All content hidden behind three click-to-open cards.
- Projects section crashes (`next/image` without `width`/`height` or `fill` in `WebProjects.tsx`).
- No resume download, no case studies, no statement of the role being sought.
- The strongest resume work (on-call AI agent, onboarding re-architecture, role-based access control, shared NPM library, PR-aware CI) is missing.

---

## 2. Scope

### In scope

- New home page (`/`), case study pages (`/work/[slug]`), hosted resume (`/resume.pdf`), custom 404.
- Light and dark mode with a manual toggle.
- SEO, Open Graph images, structured data, analytics.
- Migration from GitHub Pages to Vercel.

### Removed

- Click-to-open section cards and `ExpandedSection`.
- `FluidCursor` / `use-FluidCursor` (WebGL cursor).
- `SkillsBubbleChart` and the `d3` dependency.
- `EmailInput` ("Email me" text field).
- The giant faded "Nilesh Kamble" background text.
- `.github/workflows/deploy.yml` (GitHub Pages deploy) and `public/CNAME`, once Vercel is live.

### Out of scope (do not build)

- Blog, AI chat, contact form, CMS, i18n, comments.

---

## 3. Style guide (final)

All values below are final. Define them once as design tokens (CSS variables) and reference tokens everywhere. **No raw hex values in components.**

### 3.1 Principles

1. **Content first.** Typography and spacing do the work; decoration is minimal.
2. **One accent, used sparingly.** Accent is for links on hover, focus rings and small highlights. Not for large surfaces or primary buttons.
3. **Borders over shadows.** Cards are defined by 1px borders. Shadows are subtle, light mode only.
4. **Quiet motion.** Motion confirms an interaction or reveals content once. It never loops (except the availability dot) and never blocks reading.
5. **Everything visible.** No accordions, tabs or carousels hiding recruiter-relevant content.

### 3.2 Color tokens

Theme is applied with a `dark` class on `<html>`. Default follows the system preference; the user can override with the toggle, persisted in `localStorage`.

| Token | Purpose | Light | Dark |
| --- | --- | --- | --- |
| `--bg` | Page background | `#FAFAFA` | `#0A0A0A` |
| `--surface` | Cards, header background base | `#FFFFFF` | `#111113` |
| `--surface-muted` | Card hover, tags, code blocks | `#F4F4F5` | `#18181B` |
| `--border` | Default 1px borders, dividers | `#E4E4E7` | `#27272A` |
| `--border-strong` | Hovered card borders, inputs | `#D4D4D8` | `#3F3F46` |
| `--text` | Headings, primary text | `#18181B` | `#FAFAFA` |
| `--text-secondary` | Body copy, descriptions | `#52525B` | `#A1A1AA` |
| `--text-tertiary` | Meta, dates, labels | `#71717A` | `#8A8A93` |
| `--accent` | Link hover, focus ring, highlights | `#4F46E5` | `#818CF8` |
| `--accent-hover` | Pressed/hovered accent | `#4338CA` | `#A5B4FC` |
| `--accent-subtle` | Accent-tinted backgrounds (callouts) | `#EEF2FF` | `rgba(129, 140, 248, 0.12)` |
| `--success` | Availability dot | `#16A34A` | `#22C55E` |
| `--inverse-bg` | Primary button background | `#18181B` | `#FAFAFA` |
| `--inverse-text` | Primary button text | `#FAFAFA` | `#0A0A0A` |
| `--selection` | Text selection background | `rgba(79, 70, 229, 0.18)` | `rgba(129, 140, 248, 0.28)` |

Rules:

- Body text uses `--text-secondary`; headings use `--text`. Never use `--text-tertiary` for paragraphs.
- Every text/background pair must meet **WCAG AA** (4.5:1 for normal text, 3:1 for text ≥ 24px or ≥ 19px bold). Verify each pair with a contrast checker during implementation; adjust the tertiary value if any pair fails.
- Set `color-scheme: light` / `color-scheme: dark` on `<html>` so scrollbars and form controls match.
- Set `<meta name="theme-color">` for both schemes (`#FAFAFA` light, `#0A0A0A` dark).

### 3.3 Typography

Fonts: **Geist Sans** for everything, **Geist Mono** for dates, tags, labels and code. Load both with `next/font` (already set up in `layout.tsx`). No other fonts.

| Style | Use | Mobile (< 768px) | Desktop (≥ 768px) | Weight | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| `display` | Hero name (`h1`), case study title (`h1`) | 32px / 38px | 44px / 50px | 600 | -0.025em |
| `headline` | Hero headline line | 20px / 28px | 24px / 32px | 500 | -0.015em |
| `h2` | Section headings | 20px / 28px | 22px / 30px | 600 | -0.01em |
| `h3` | Card titles, role titles | 16px / 24px | 17px / 26px | 600 | -0.005em |
| `body-lg` | Hero intro, case study summary | 17px / 28px | 18px / 30px | 400 | 0 |
| `body` | Paragraphs, bullets | 15px / 24px | 16px / 26px | 400 | 0 |
| `small` | Card descriptions, footer | 14px / 22px | 14px / 22px | 400 | 0 |
| `mono-label` | Dates, tags, eyebrow labels, stats labels | 12px / 18px | 13px / 20px | 500 | 0.01em |

Rules:

- Use `font-variant-numeric: tabular-nums` on dates and stats.
- Paragraph max width: `65ch`.
- Never use font weights other than 400, 500, 600.
- Never use all-caps body text. Eyebrow labels may be uppercase only if `mono-label` and ≤ 3 words.
- Heading hierarchy is strict: one `h1` per page, sections use `h2`, items use `h3`.

### 3.4 Layout, spacing and breakpoints

Spacing scale (4px base): `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`. Use only these values.

| Breakpoint | Width | Notes |
| --- | --- | --- |
| base | 0–639px | Single column, 20px side padding |
| `sm` | ≥ 640px | 24px side padding |
| `md` | ≥ 768px | Desktop type scale kicks in, nav links appear |
| `lg` | ≥ 1024px | Content column stays fixed; extra space is margin |

Containers:

- **Main column:** `max-width: 768px`, centered, side padding 20px (base) / 24px (`sm`+). Every home page section uses this column.
- **Prose column (case studies):** `max-width: 680px`.
- **Figures in case studies:** may extend to 768px.

Vertical rhythm:

- Gap between home sections: **64px** (base) / **96px** (`md`+).
- Section heading to content: **24px**.
- Between cards in a list: **12px**.
- Hero top padding (below header): **48px** (base) / **80px** (`md`+).

Test at widths **320, 360, 390, 768, 1024, 1440**. No horizontal scroll at 320px.

### 3.5 Radius, borders and elevation

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | 6px | Tags, small icon buttons |
| `--radius-md` | 8px | Buttons |
| `--radius-lg` | 12px | Cards, figures, code blocks |
| `--radius-full` | 9999px | Avatar, availability pill |
| App icon radius | 22.5% of icon size | iOS-style rounded square |

- Borders: 1px solid `--border`; hover `--border-strong`.
- Light mode card hover shadow: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)`.
- Dark mode: no shadows; hover changes background to `--surface-muted` instead.

### 3.6 Iconography

- Use `lucide-react` for UI icons (arrow, download, copy, check, sun, moon, external link, mail). Size 16px inline, 18px in icon buttons, stroke width 1.75.
- Use `react-icons/si` (Simple Icons) **only** for brand logos (GitHub, LinkedIn, X, App Store/Apple). Import icons individually.
- Icons inherit `currentColor`. Brand icons are monochrome (no brand colors).

### 3.7 Motion

Use the `motion` package (`motion/react`). Remove `framer-motion` (duplicate).

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | All enter/hover transitions |
| `--duration-fast` | 150ms | Color, border, background changes |
| `--duration-base` | 250ms | Transforms (arrow nudge, toggle icon) |
| `--duration-reveal` | 400ms | Scroll reveal |

Rules:

- **Scroll reveal:** sections below the hero fade from `opacity: 0; translateY(8px)` to `opacity: 1; translateY(0)` once, when 15% visible. Stagger child items by 40ms, max 6 staggered items per group. The hero never animates on load (it is the LCP element).
- **Hover:** cards change border and background (150ms); trailing arrows move `translateX(2px)` (250ms).
- **Reduced motion** (`prefers-reduced-motion: reduce`): disable all transforms and the availability pulse; reveals become instant (no opacity animation).
- Do not animate layout properties (`width`, `height`, `top`, `left`). Only `opacity`, `transform`, `color`, `background-color`, `border-color`.

### 3.8 Components

**Button (primary):** height 40px, padding 0 16px, `--radius-md`, background `--inverse-bg`, text `--inverse-text`, `small` size weight 500, optional 16px leading icon with 8px gap. Hover: opacity 0.9. Active: `scale(0.98)`.

**Button (secondary):** same size; background `--surface`; 1px `--border`; text `--text`. Hover: border `--border-strong`, background `--surface-muted`.

**Icon button:** 40×40px, `--radius-md`, transparent background, icon `--text-secondary`. Hover: background `--surface-muted`, icon `--text`. Must have `aria-label`.

**Text link:** `--text` with 1px underline in `--border-strong`, `text-underline-offset: 3px`. Hover: underline and text become `--accent`. External links show a 12px `ArrowUpRight` after the text.

**Tag:** `mono-label` text, color `--text-secondary`, background `--surface-muted`, 1px `--border`, padding 2px 8px, `--radius-sm`. Tags are not interactive.

**Card (link card):** the whole card is one `<a>`. Background `--surface`, 1px `--border`, `--radius-lg`, padding 20px (base) / 24px (`md`+). Hover/focus as in 3.5 and 3.7. Nothing inside a link card may be a separate link.

**Focus ring (global):** `outline: 2px solid var(--accent); outline-offset: 2px;` on `:focus-visible` for every interactive element. Never remove outlines without this replacement.

**Availability pill:** inline-flex, height 28px, padding 0 10px, `--radius-full`, 1px `--border`, background `--surface`, `mono-label` text `--text-secondary`, leading 8px dot in `--success` with a slow pulse (2s, opacity 1 → 0.4 → 1; disabled under reduced motion).

**Copy-email button:** icon button with `Copy` icon. On click, copy `nileshkamble54321@gmail.com` to the clipboard, swap icon to `Check`, and show "Copied" (`mono-label`) next to it for 2 seconds. Announce via an `aria-live="polite"` region. If the clipboard API fails, fall back to opening `mailto:`.

---

## 4. Site map and global behavior

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/` | Home page | Static, with App Store data revalidated every 24h |
| `/work/[slug]` | Case study | Static (generated from MDX at build) |
| `/resume.pdf` | Resume | Static file in `public/` |
| `not-found` | 404 | Static |

Anchor IDs on the home page: `#work`, `#experience`, `#apps`, `#skills`, `#contact`. Use `scroll-margin-top: 72px` on sections so the sticky header doesn't cover headings. Enable `scroll-behavior: smooth` only when reduced motion is not requested.

### 4.1 Header (all pages)

- **Position:** sticky, top 0, height 56px, z-index above content.
- **Background:** `--bg` at 80% opacity with `backdrop-filter: blur(12px)`. A 1px bottom border in `--border` appears only after the page scrolls more than 8px (fade in 150ms).
- **Inner width:** same 768px column as content.
- **Left:** "Nilesh Kamble" (`small`, weight 600, `--text`), links to `/`.
- **Center/right on `md`+:** text links "Work", "Experience", "Apps", "Contact" (`small`, `--text-secondary`, hover `--text`), pointing to the anchors. On case study pages they point to `/#work` etc.
- **Right (all sizes):** theme toggle (icon button: `Sun` in dark mode, `Moon` in light mode, icon rotates/crossfades 250ms) and a secondary button "Resume" with `Download` icon linking to `/resume.pdf`.
- **Below `md`:** nav text links are hidden. No hamburger menu (the page is a single scroll). Name, theme toggle and Resume button remain.
- **Active section highlight (md+):** the nav link for the section currently in view uses `--text` instead of `--text-secondary` (use `IntersectionObserver`).

### 4.2 Theme handling

- Use `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.
- Add `suppressHydrationWarning` to `<html>`. No flash of the wrong theme on load.
- The toggle switches between light and dark only (two states). Before mount, render a same-size placeholder to avoid layout shift.

---

## 5. Home page: section specs

Order is fixed: Header, Hero, Proof strip, Selected work, Experience, Indie apps, Other projects, Skills and education, Contact, Footer.

### 5.1 Hero

**Purpose:** answer "who, what role, how to contact" in the first viewport on a 390×844 phone and on a 1440×900 desktop.

**Content (draft copy, finalize in Phase 1):**

- Availability pill: "Open to remote roles".
- `h1` (`display`): "Nilesh Kamble".
- Headline (`headline`, `--text`): "Frontend engineer building AI-powered product experiences."
- Intro (`body-lg`, `--text-secondary`, max 2 sentences): "I've spent 3+ years shipping React and TypeScript at Tessell, from cloud database onboarding to an MCP-powered on-call agent. On the side, I've shipped 8 apps to the App Store."
- Meta line (`mono-label`, `--text-tertiary`): "Remote · India (IST, UTC+5:30)".
- Actions row: primary button "Download resume" (`Download` icon, `href="/resume.pdf"`, `download="Nilesh-Kamble-Resume.pdf"`); secondary button "Email me" (`Mail` icon, `mailto:nileshkamble54321@gmail.com`); copy-email icon button.
- Social row: icon buttons for LinkedIn (`https://www.linkedin.com/in/nileshsk1/`), GitHub (`https://github.com/TheIllustrator1972`), X (`https://x.com/devillus1972`), App Store (`https://apps.apple.com/in/developer/nilesh-kamble/id1790227862`). All open in a new tab with `rel="noopener noreferrer"`.
- Avatar: existing `public/profilePic.jpg` (illustrated portrait), circular, 1px `--border` ring.

**Layout:**

- **Base (< 768px):** single column, left-aligned. Order: avatar (72px), 16px gap, availability pill, 12px gap, `h1`, 8px gap, headline, 16px gap, intro, 12px gap, meta line, 24px gap, actions row, 16px gap, social row. Actions row: primary and secondary buttons each `flex: 1` on one row; copy button at the end. If the row is narrower than 340px, buttons stack full width.
- **`md`+:** two columns. Left (flex 1): pill, `h1`, headline, intro, meta, actions, socials. Right: avatar at 112px, top-aligned with the pill. 32px gap between columns.
- Everything is left-aligned (no centered text).

**Behavior:** no load animation. Avatar uses `next/image` with `priority` and explicit width/height.

### 5.2 Proof strip

**Purpose:** three quick facts that make the hero claims credible.

**Content (draft):**

| Value | Label |
| --- | --- |
| 3+ years | Shipping production frontend at Tessell |
| 8 apps | Designed, built and shipped solo to the App Store |
| 100 issues | Eval set behind my on-call AI agent |

**Layout:** a single bordered container (`--radius-lg`, 1px `--border`, background `--surface`).

- **Base:** 3 rows stacked, each row padding 16px, separated by 1px `--border` dividers. Value on the left (`h3`, `--text`, tabular numbers), label to the right (`small`, `--text-secondary`).
- **`md`+:** 3 equal columns separated by vertical dividers; value on top (`h2` size), label below (`small`).

**Behavior:** non-interactive. Reveal on scroll as a group.

### 5.3 Selected work (`#work`)

**Purpose:** route recruiters to the case studies, ordered by relevance to the AI + frontend pitch.

**Content (in this order):**

1. **Slack on-call AI agent.** Label: "AI · Internal tooling". Outcome line: "Grounded answers for on-call engineers, built on Augment, Jira and LogRocket MCP and evaluated on the last 100 on-call issues." Tags: `MCP`, `LLM`, `Evals`, `Slack`.
2. **Subscription onboarding re-architecture.** Label: "Product · Frontend architecture". Outcome line: "Replaced fragile form state with a reducer-based model and real-time readiness as the database comes online." Tags: `React`, `TypeScript`, `WebSockets`.
3. **Operations Portal for SRE.** Label: "Internal platform". Outcome line: "The support portal SRE uses daily, with role-based access control and cost analytics." Tags: `React`, `RBAC`, `Dashboards`.

**Layout:** `h2` "Selected work", then a vertical list of link cards (one per row, full column width, 12px gap). Inside each card:

- Top: label (`mono-label`, `--text-tertiary`).
- Title (`h3`, `--text`) with a trailing `ArrowRight` icon (16px, `--text-tertiary`) pinned to the right edge.
- Outcome line (`small`, `--text-secondary`, max 2 lines on `md`+; no clamp on mobile).
- Tags row (wrap, 6px gap), 12px above.

**Behavior:** whole card links to `/work/[slug]`. Hover: border `--border-strong`, light-mode shadow / dark-mode `--surface-muted` background, arrow turns `--text` and moves 2px right. Cards are sourced from MDX frontmatter (section 7), sorted by `order`.

### 5.4 Experience (`#experience`)

**Purpose:** show promotion and ownership at a single company clearly.

**Structure:** grouped by company, with roles in a vertical timeline.

- **Company header row:** Tessell logo (40px, rounded `--radius-md`, 1px `--border`; asset needed, otherwise use a monogram "T" tile), "Tessell" (`h3`), subtitle "Cloud database platform · Remote" (`small`, `--text-secondary`), and the total range "Jan 2023 – Present" (`mono-label`, `--text-tertiary`) right-aligned on `md`+, below the subtitle on mobile.
- **Timeline:** a 1px vertical line in `--border` at 20px from the left (aligned with the logo center), with a 9px circular node per role (`--surface` fill, 1px `--border-strong` border; the current role's node is filled `--text`).
- **Each role:** title (`h3`), dates (`mono-label`, `--text-tertiary`; right-aligned on `md`+, below the title on mobile), then 3–4 bullets (`body`, `--text-secondary`, 8px between bullets, custom 4px dot markers in `--text-tertiary`). Optional "Stack" line under bullets as tags.

**Draft bullets (rewritten from the 2026 resume; split across roles is [CONFIRM]):**

*Software Development Engineer 2 · Mar 2025 – Present*

- Designed and shipped a Slack on-call agent using Augment, Jira and LogRocket MCP, evaluated on the last 100 on-call issues to return grounded answers. [NEEDS NUMBER: accuracy or time saved]
- Re-architected cloud database subscription onboarding with a reducer-based state model, shared logic and real-time readiness as the service comes online.
- Built PR-aware GitHub Actions workflows that run only the automation suites affected by each change. [NEEDS NUMBER: CI time saved]
- Extended the config-driven demo platform to simulate real database workflows and auto-sync with product features for sales and marketing demos.

*Software Development Engineer 1 · Jun 2023 – Feb 2025*

- Built the internal Operations Portal SRE uses to support Tessell's cloud database customers, owning the UI for daily support workflows.
- Implemented role-based access control so routes, features and data views are gated by user role.
- Built dashboards and cost analytics on raw service data so operators could inspect usage and spend.
- Created a shared NPM component library for Tessell frontends, reducing duplicated UI and unnecessary re-renders. [NEEDS NUMBER]

*Website Development Intern · Jan 2023 – May 2023*

- Built a cost calculator returning real-time pricing from configurable inputs.
- Owned key pages on the company Next.js site, including blogs, signup and onboarding.
- Added signup password validation that enforces strength rules before account creation.

**Behavior:** all content visible, no accordions. Reveal per role (stagger 40ms).

### 5.5 Indie apps (`#apps`)

**Purpose:** prove product sense and the ability to ship end to end, without distracting from the frontend + AI pitch (so it sits after Experience).

**Header:** `h2` "Indie apps", subtitle (`small`, `--text-secondary`): "8 apps designed, built and shipped solo." and a text link "View on the App Store" (external) aligned right on `md`+, below on mobile.

**Featured app card (Versus Sudoku):** a non-link container card with:

- Left: app icon 64px, name (`h3`), tagline "Real-time 1v1 Sudoku over a shared link" (`small`), tags `SwiftUI`, `Go`, `WebSockets`, and a secondary button "View on App Store".
- Right on `md`+ / below on mobile: up to 3 iPhone screenshots from the App Store, each 120px wide on `md`+ (aspect ratio preserved, `--radius-md`, 1px `--border`). On mobile, screenshots sit in a horizontal row with `overflow-x: auto`, `scroll-snap-type: x mandatory`, hidden scrollbar, and 12px gap. This is the only horizontal scroller on the site.

**Grid of the other 7 apps:**

| App | Tagline (use these, not App Store descriptions) | Platform |
| --- | --- | --- |
| Ball Balance: Tilt Climb | Two-thumb tilt arcade: climb and dodge lasers | iOS |
| Word Woven | Swipe letter columns to spell hidden words | iOS |
| Isometria | Create isometric grid art and export as PNG | iOS |
| Word Mean + | Instant definitions, synonyms and examples | iOS |
| Set Square Classic | Place 1–9 so each cage hits its target | iOS |
| UtilityBar | Mac menu bar todos, clipboard and essentials | macOS |
| Suko Classic | Minimalist 3×3 number puzzle with sum clues | iOS |

- **Layout:** base 1 column (compact rows); `sm`+ 2 columns; 12px gap.
- **App card (link card to the App Store listing, new tab):** icon 48px (22.5% radius, 1px `--border`), name (`h3`), tagline (`small`, `--text-secondary`, clamp 2 lines), meta line (`mono-label`, `--text-tertiary`): "{Genre} · {iOS|macOS}" plus "★ {rating}" only if `userRatingCount ≥ 5`. Trailing `ArrowUpRight` icon.

**Data:**

- Fetch on the server: `https://itunes.apple.com/lookup?id=1790227862&entity=software&country=us` **and** `…&entity=macSoftware` (UtilityBar is a Mac app and won't appear in the iOS query). Merge by `trackId`.
- Cache with `next: { revalidate: 86400 }`.
- Keep a local `apps.ts` content file as the source of truth for order, tagline, platform, featured flag and `trackId`. API data only adds icon URL, screenshots, genre, rating and store URL.
- Commit fallback icons to `public/apps/{slug}.png` (512px). If the API fails or times out (5s), render from local data and local icons; never show an error state to visitors.
- Allow `is1-ssl.mzstatic.com` (and other `*.mzstatic.com` hosts) in `images.remotePatterns`.

### 5.6 Other projects

**Purpose:** show breadth compactly; replaces the broken web projects grid.

**Content (order):** Xcode → Mockup (GitHub), Indie App Landing Page Template (live), ASCII Art Generator (live), Sorting Visualizer (live). Reuse the URLs in the current `constants.ts`. Descriptions shortened to one line each:

- Xcode → Mockup: "macOS utility that turns simulator screenshots into App Store-ready device mockups."
- Indie App Landing Page Template: "Responsive React + Tailwind landing page template for indie apps."
- ASCII Art Generator: "Converts images to ASCII art in real time, with adjustable density and export."
- Sorting Visualizer: "Interactive visualizations of classic sorting algorithms."

**Layout:** `h2` "Other projects" (visually smaller section, 48px top gap instead of 96px is acceptable). A plain list, no card backgrounds. Each row: title (`body`, weight 500, `--text`) + `ArrowUpRight`, description below (`small`, `--text-secondary`). Rows separated by 1px `--border` dividers, 16px vertical padding. Whole row is the link.

### 5.7 Skills and education (`#skills`)

**Purpose:** a scannable, text-based skills list (readable by recruiters and applicant tracking systems).

**Content:**

| Group | Items |
| --- | --- |
| Frontend | React, Next.js, TypeScript, JavaScript, Material UI, Tailwind CSS |
| AI | LLM APIs, MCP, agent evaluation |
| Testing | Jest, React Testing Library, Playwright |
| APIs and real-time | REST, WebSockets |
| CI/CD | GitHub Actions |
| Apple platforms | Swift, SwiftUI |
| Backend (side projects) | Go |

**Layout:** `h2` "Skills". A definition list (`<dl>`):

- **`md`+:** two columns per row; group name (`mono-label`, `--text-tertiary`) in a 160px left column, items (`body`, `--text-secondary`) as comma-separated text in the right column. Rows separated by 12px.
- **Base:** group name stacked above items, 16px between groups.

**Education** (directly after skills, under a `h3` "Education"): "SVNIT, Surat — BTech, Electronics and Communication Engineering · 2023" in one line (`body`), wrapping naturally on mobile.

### 5.8 Contact (`#contact`)

**Purpose:** close with a clear call to action.

**Content:**

- `h2`: "Let's work together".
- Text (`body`, `--text-secondary`): "I'm open to remote frontend and AI engineering roles. Email is the fastest way to reach me."
- Large email link: `nileshkamble54321@gmail.com` (`headline` size, text link style) with the copy-email button next to it.
- Buttons: "Download resume" (primary), "LinkedIn" (secondary, external).

**Layout:** single bordered card (`--radius-lg`, `--surface`, padding 32px base / 40px `md`+). On base, the email text may wrap; use `overflow-wrap: anywhere`.

### 5.9 Footer

- 1px top border, 32px vertical padding, 768px column.
- Left: "© 2026 Nilesh Kamble" (`small`, `--text-tertiary`). Use the current year dynamically.
- Right: social icon buttons (same set as the hero).
- Base: stacked, left-aligned, 16px gap.

---

## 6. Case study page (`/work/[slug]`)

### 6.1 Layout

1. Header (global).
2. Back link: "← All work" (`small`, `--text-secondary`), linking to `/#work`. 48px top padding.
3. Eyebrow label (`mono-label`, `--text-tertiary`), e.g. "AI · Internal tooling".
4. `h1` (`display`): title.
5. Summary (`body-lg`, `--text-secondary`): 1–2 sentences.
6. **Meta grid:** Role, Timeline, Team, Stack. Each: label (`mono-label`, `--text-tertiary`) above value (`small`, `--text`). Base: 2×2 grid; `md`+: 4 columns. 1px `--border` top and bottom, 20px vertical padding.
7. **Outcome callout:** `--accent-subtle` background, `--radius-lg`, padding 20px, `h3` "Outcome" and 1–3 bullet results.
8. MDX body in the 680px prose column.
9. **Next case study** link card (title + arrow), then the Contact section from the home page (reuse the component).

### 6.2 Body sections (template, in this order)

Every case study MDX file uses these `h2` headings: **Context**, **Problem**, **My role**, **Approach**, **Key decisions**, **Outcome**, **What I'd do next**. Keep each case study to 600–1,000 words.

### 6.3 Prose styles

- `h2`: 40px top margin, 12px bottom. `h3`: 28px top, 8px bottom.
- Paragraphs and lists: `body`, `--text-secondary`, 16px between blocks.
- Inline code: Geist Mono 0.9em, `--surface-muted` background, 1px `--border`, padding 1px 5px, `--radius-sm`.
- Code blocks: Shiki with `github-light` / `github-dark` themes switched by the theme class, `--radius-lg`, 1px `--border`, padding 16px, horizontal scroll (never wrap), 14px font.
- Figures: `<figure>` with `next/image`, 1px `--border`, `--radius-lg`, caption below (`small`, `--text-tertiary`, centered). Support a light and dark variant of diagrams (`srcLight`, `srcDark` props on a custom `Figure` MDX component).
- Blockquote: 2px left border `--border-strong`, 16px left padding, `--text-secondary`, italic not allowed.

### 6.4 NDA constraints

No customer names, internal URLs, real data or internal screenshots. Diagrams are redrawn (e.g. in Excalidraw or Figma) using neutral labels.

---

## 7. Content and data model

All copy lives in typed content files, not in components.

```text
src/
  content/
    profile.ts        # name, headline, intro, availability, location, email, socials, resume path
    proof.ts          # proof strip items
    experience.ts     # company + roles + bullets + stack
    apps.ts           # trackId, slug, tagline, platform, featured, order
    projects.ts       # other projects
    skills.ts         # groups + items, education
    work/
      on-call-ai-agent.mdx
      subscription-onboarding.mdx
      operations-portal.mdx
```

MDX frontmatter for each case study:

| Field | Type | Example |
| --- | --- | --- |
| `title` | string | "Slack on-call AI agent" |
| `slug` | string | "on-call-ai-agent" |
| `label` | string | "AI · Internal tooling" |
| `summary` | string | 1–2 sentences for the page header and meta description |
| `outcome` | string | One line for the home card |
| `outcomes` | string[] | 1–3 bullets for the Outcome callout |
| `role` | string | "Lead frontend engineer" [CONFIRM] |
| `timeline` | string | "2025" [CONFIRM] |
| `team` | string | "Solo" / "2 engineers" [CONFIRM] |
| `stack` | string[] | ["MCP", "LLM", "Slack API"] |
| `tags` | string[] | Max 4, shown on the home card |
| `order` | number | Sort order on the home page |
| `draft` | boolean | Excluded from build when true |

Validate frontmatter with a schema (e.g. Zod) at build time; fail the build on missing fields.

---

## 8. Technical constraints

### 8.1 Stack

- Next.js (latest stable) App Router, React 19, TypeScript strict, Tailwind CSS v4.
- Define tokens in `globals.css` with `@theme` and CSS variables; add `@custom-variant dark (&:where(.dark, .dark *));` for class-based dark mode.
- MDX via `@next/mdx` or `next-mdx-remote`; Shiki for code highlighting.
- `next-themes` for theme, `motion` for animation, `lucide-react` + `react-icons/si` for icons, `@vercel/analytics` and `@vercel/speed-insights`.
- Remove: `d3`, `@types/d3`, `framer-motion`, unused `@radix-ui/react-slot` / `class-variance-authority` if no longer needed.
- `next.config.ts`: remove `output: 'export'` and `images.unoptimized`; add `images.remotePatterns` for `*.mzstatic.com`.

### 8.2 Component boundaries

- Server components by default. Client components only for: theme toggle, copy-email button, header scroll/active-section behavior, scroll-reveal wrapper.
- No data fetching in client components.

### 8.3 Performance budgets

| Metric | Budget |
| --- | --- |
| Lighthouse (mobile) Performance, Accessibility, Best Practices, SEO | ≥ 95 each |
| Largest Contentful Paint | < 1.8s (mobile, 4G) |
| Cumulative Layout Shift | < 0.05 |
| Interaction to Next Paint | < 200ms |
| Home page client JS | < 100 KB gzipped |

- All images via `next/image` with explicit `width`/`height` or `fill` + `sizes`.
- Only the avatar uses `priority`.
- No web fonts other than Geist via `next/font`.

### 8.4 Accessibility

- WCAG 2.2 AA.
- Remove `maximum-scale=1.0, user-scalable=no` from the viewport (use Next's `viewport` export instead of a manual `<meta>`).
- Skip link ("Skip to content") as the first focusable element, visible on focus.
- Interactive targets ≥ 40×40px.
- All icon-only buttons have `aria-label`; decorative icons have `aria-hidden`.
- External links: `target="_blank" rel="noopener noreferrer"` and visually hidden text "(opens in new tab)".
- `lang="en"` on `<html>`. Landmarks: `header`, `main`, `footer`, `nav`.
- Full keyboard navigation with visible focus ring.

### 8.5 SEO and sharing

- Use the Next.js Metadata API. Title template: `%s · Nilesh Kamble`; home title: "Nilesh Kamble · Frontend + AI Engineer".
- Home description: "Frontend engineer building AI-powered product experiences. React, TypeScript, LLMs and MCP. Open to remote roles."
- Case study descriptions come from `summary`.
- `metadataBase: https://nileshkamble.co.in`, canonical URLs on every page.
- **Open Graph images** via `next/og` (`opengraph-image.tsx`), 1200×630: background `#0A0A0A`, 64px padding, name in `#FAFAFA` (Geist 600, 64px), headline in `#A1A1AA` (32px), small accent bar (`#818CF8`, 48×4px) above the name. Case studies render their title instead of the headline.
- JSON-LD `Person` on the home page: name, jobTitle "Frontend Engineer", url, sameAs (LinkedIn, GitHub, X, App Store), worksFor "Tessell".
- `app/sitemap.ts` and `app/robots.ts`.
- Favicon: replace `profilePic.jpg` favicon with a generated `icon.png` (monogram "NK", 32px and 180px Apple touch icon).

### 8.6 Analytics events

Track with Vercel Analytics `track()`:

| Event | When |
| --- | --- |
| `resume_download` | Any resume link clicked (prop: `location` = header / hero / contact) |
| `email_click` | `mailto:` link clicked |
| `email_copy` | Copy-email button used |
| `outbound_click` | LinkedIn, GitHub, X, App Store links (prop: `target`) |
| `case_study_open` | Selected work card clicked (prop: `slug`) |

### 8.7 Deployment

1. Import the repo into Vercel; framework preset Next.js.
2. Add `nileshkamble.co.in` and `www` in Vercel; update DNS at the registrar as Vercel instructs.
3. Redirect `www` → apex.
4. After the domain is live, delete the GitHub Pages workflow and `public/CNAME`; disable GitHub Pages in the repo settings.
5. Update the README deployment section.

---

## 9. Phases

1. **Content first:** finalize all copy in the content files (hero, proof, experience, case study drafts). Resolve [CONFIRM] / [NEEDS NUMBER] items with Nilesh.
2. **Foundation:** Vercel setup, dependency cleanup, tokens in `globals.css`, fonts, theme provider, header, footer, layout primitives.
3. **Home page:** sections 5.1–5.9.
4. **Case studies:** template and the three MDX pages.
5. **Apps showcase:** server fetch, fallback data, icons, screenshots.
6. **Polish and launch:** SEO, OG images, accessibility audit, performance budgets, analytics, domain cutover.
7. **Off-site consistency:** align LinkedIn headline and GitHub bio with the new headline.

---

## 10. Acceptance criteria

The revamp is done when all of these are true:

- [ ] Hero (name, headline, availability, resume and email actions) is fully visible without scrolling at 390×844 and 1440×900.
- [ ] No horizontal scroll at 320px; layouts match section 5 at 360, 768 and 1440px.
- [ ] Light and dark mode both match the token table; no theme flash on reload; toggle persists.
- [ ] All text/background pairs pass WCAG AA (verified with a contrast checker).
- [ ] Keyboard-only navigation reaches every interactive element with a visible focus ring; skip link works.
- [ ] `prefers-reduced-motion` disables transforms and the availability pulse.
- [ ] Resume downloads as `Nilesh-Kamble-Resume.pdf` from header, hero and contact.
- [ ] Copy-email shows "Copied" and announces it to screen readers.
- [ ] Apps section renders correctly with the iTunes API blocked (fallback data and icons).
- [ ] All three case studies render with the template headings, meta grid and outcome callout.
- [ ] Lighthouse mobile ≥ 95 in all four categories on home and one case study page.
- [ ] OG image previews correctly (check with an Open Graph debugger) for home and a case study.
- [ ] Analytics events fire for each action in 8.6.
- [ ] Site is live on `nileshkamble.co.in` via Vercel; GitHub Pages is disabled.

---

## 11. Inputs needed from Nilesh

- **Numbers wherever possible**, even rough: on-call agent eval accuracy or time saved, CI minutes saved, re-renders reduced, onboarding drop-off or support tickets before/after.
- **Role split:** confirm which resume bullets belong to SDE 1 vs SDE 2 (draft split in 5.4).
- **Case study details:** role, timeline and team size for each case study.
- **NDA check:** confirm the Tessell projects can be described publicly at this level.
- **Tessell logo** (or approval to use a monogram tile).
- **App screenshots**, unless the App Store ones are good enough.
- **Resume fix:** the 2026 resume says "SDE 2 since June 2023"; update to SDE 1 (Jun 2023 – Feb 2025), SDE 2 (Mar 2025 – present) and export as `public/resume.pdf`.
- **LinkedIn extras:** recommendations, About section or posts not on the resume.

---

## 12. Visual references

| Site | What to take from it |
| --- | --- |
| [Magic UI portfolio template (Dillion Verma)](https://portfolio-magicui.vercel.app) | Closest overall layout: hero with avatar right, experience list with logos and dates, project cards with tags, single scroll |
| [Emil Kowalski](https://emilkowal.ski) | Typography and whitespace; title + one-line description list pattern (used for Other projects) |
| [Rauno Freiberg – Craft](https://rauno.me/craft) | Visual cards that open into their own pages (model for apps showcase and case studies) |
| [Paco Coursey](https://paco.me) | Short, confident copy in a typography-led layout |
| [Lee Robinson](https://leerob.com) | Intro that states role and credibility in two sentences |
| [Delba](https://delba.dev) | Direct "I'm looking for my next role in…" hiring line |
| [Brian Lovin](https://brianlovin.com) | Clear sectioning and one-line project descriptions |
| [Vercel Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) | Technical baseline: MDX, sitemap, JSON-LD, dynamic OG images, analytics |
