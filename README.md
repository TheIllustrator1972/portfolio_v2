# Nilesh Kamble — Portfolio

Personal portfolio of [Nilesh Kamble](https://nileshkamble.co.in) — software engineer working across web and indie iOS apps.

Live site: **[nileshkamble.co.in](https://nileshkamble.co.in)**

## Features

- Intro, social links, and a contact field that opens a prefilled email
- Expandable **Projects**, **Experience**, and **Skills** sections
- Live indie apps pulled from the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html)
- Static web project cards
- Interactive skills bubble chart (D3)
- Fluid WebGL cursor
- Dark mode via system preference
- Static export, deployed to GitHub Pages

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router, static export) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Visualization | [D3](https://d3js.org/) |
| Language | TypeScript |

## Getting started

**Requirements:** Node.js 18+ (20 recommended) and npm.

```bash
git clone https://github.com/TheIllustrator1972/portfolio_v2.git
cd portfolio_v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Next.js server |
| `npm run build` | Production static export to `out/` |
| `npm start` | Serve a production build |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  app/                  # Layout, page, metadata, content constants
  components/           # Header, socials, contact, cursor, sections
    Sections/
      Experience.tsx
      SkillsBubbleChart.tsx
      Projects/         # Indie apps + web projects
  hooks/                # Fluid cursor hook
  utils.ts
public/                 # Images, CNAME, static assets
.github/workflows/      # GitHub Pages deploy
```

Most copy lives in `src/app/constants.ts`:

- `skillsConfig` — skills and usage values
- `experiences` — work history
- `socialConfig` — social / contact links
- `PROJECTS_CONFIG` — static web projects

Indie apps are fetched at runtime in `src/components/Sections/Projects/useFetchIndieApps.ts` using Apple developer ID `1790227862`.

## Deployment

The site is a static export (`output: 'export'` in `next.config.ts`) and deploys from `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Push to `main`, or run the **Deploy Next.js to GitHub Pages** workflow manually. The custom domain is set in `public/CNAME`.

To build locally:

```bash
npm run build
```

The static files are written to `out/`.
