# Nilesh Kamble

Personal site for [nileshkamble.co.in](https://nileshkamble.co.in). A recruiter-facing portfolio of frontend and AI work at Tessell, plus the indie apps shipped to the App Store.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run lint
```

## Stack

Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4. Light and dark follow the system theme. Indie app icons, screenshots, and ratings are loaded on the server from the iTunes Search API, with fallback icons in `public/apps`.

## Content

Copy lives in `src/content`. Change the text there and leave the components alone.

| File | What it drives |
| --- | --- |
| `profile.ts` | Name, headline, email, socials, availability |
| `proof.ts` | The three highlight stats |
| `work.ts` | Selected work cards |
| `experience.ts` | Tessell roles |
| `apps.ts` | Indie apps: name, tagline, platform, order |
| `skills.ts` | Skills and education |

Selected work links to `/work/[slug]`. Those routes are short holding pages until the case studies are written.

## Deploy

Run this on Vercel with the Next.js preset. App Store data and the Open Graph image need a server, so the app is not a static export.

`nileshkamble.co.in` is still served by GitHub Pages. `.github/workflows/deploy.yml` uploads an `out/` folder, which this app no longer builds. A push to `main` fails that workflow and leaves the current Pages site in place.

When the domain is serving from Vercel:

1. Point DNS at Vercel and redirect `www` to the apex.
2. Delete `.github/workflows/deploy.yml` and `public/CNAME`.
3. Turn off GitHub Pages in the repository settings.

The resume buttons link to `/Nilesh_Kamble_AI_Frontend_2026.pdf`.
