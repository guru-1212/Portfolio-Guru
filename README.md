# Portfolio-Guru

Hi, I'm Gurunath Tangawar, a Frontend Angular Developer dedicated to building fast, accessible, and user-centric web applications. I specialize in turning complex problems into clean, maintainable code that delivers real business value.

This repository is my personal portfolio site.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animation, [Lucide](https://lucide.dev) for icons
- [Resend](https://resend.com) for the contact form

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). To use another port: `npm run dev -- --port 3100`.

Other scripts: `npm run build` (production build), `npm run start` (serve the build), `npm run lint`.

## Editing content

All text lives in two files — components only render it:

| File | What it holds |
| --- | --- |
| `src/data/portfolio.ts` | Profile, stats, skills, experience, projects, education, navigation |
| `src/data/posts.ts` | Blog posts (simple blocks: paragraphs, headings, lists, code, notes) |

Images go in `public/`. The profile photo is `public/profile.jpg`.

The downloadable resume is served from `public/resume.pdf`. It is **not committed** (see `.gitignore`); add the file locally and on the host.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | for production | Public URL, used for SEO / social links |
| `RESEND_API_KEY` | for the contact form | Without it, the form shows an "email me directly" fallback |
| `CONTACT_TO_EMAIL` | no | Where messages go (defaults to the profile email) |
| `CONTACT_FROM_EMAIL` | no | Verified sender (defaults to Resend's shared sender) |

## Project structure

```text
src/
  app/                 routes: home, /blog, /blog/[slug], /api/contact
  components/
    sections/          one file per home-page section
    effects/           animation & interaction (particles, spotlight cards, marquee, …)
  data/                all site content
```

All animations respect `prefers-reduced-motion`.
