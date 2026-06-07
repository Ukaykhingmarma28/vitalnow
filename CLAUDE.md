# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: non-standard Next.js

Per `AGENTS.md`, this is **Next.js 16.2.6** with breaking changes from older versions. Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/`. Note: `node_modules` may not be installed in a fresh checkout — run `npm install` first (the docs directory only exists after install). Don't rely on training-data Next.js conventions.

## Commands

```bash
npm install        # required first — node_modules is not committed
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config, next core-web-vitals + typescript)
```

There is no test framework configured.

## Architecture

A single-page marketing / waitlist landing site for "Vital AI" (a health-report analysis product). App Router, almost entirely presentational — the one piece of backend is the waitlist submission route (see **Forms & waitlist backend**).

- **`src/app/`** — App Router root. `layout.tsx` loads two fonts via `next/font/google` (Geist + Montaga) and mounts `<SmoothScroll />` globally. `page.tsx` is the only page route and composes the landing sections in order (Navbar → Hero → Features → Stats → TrustSection → CtaSection → Footer).
- **`src/app/api/waitlist/route.ts`** — the single API route (POST), Node runtime.
- **`src/components/`** — One file per section, all `"use client"`. Several components exist but are NOT wired into `page.tsx` (e.g. `how-it-works.tsx`, `footer-cta.tsx`, `faq.tsx`, `particle-field.tsx`); treat the imports in `page.tsx` as the source of truth for what's live.
- Path alias: `@/*` → `./src/*`.

### Styling — Tailwind v4, CSS-first

There is **no `tailwind.config`**. The design system lives in `src/app/globals.css`:
- Design tokens are CSS custom properties under `:root` (colors like `--brand`, `--ink-hero`; easing curves like `--ease-out-expo`).
- They are exposed to Tailwind via the `@theme inline { ... }` block, which maps them to utility names (`bg-brand`, `text-ink-hero`, `font-display`, etc.). Add or change theme tokens here, not in a JS config.
- Fonts are a two-font system wired as CSS vars in `globals.css`: `--font-sans` → `--font-geist-sans` (Geist, body) and `--font-display` → `--font-montaga` (Montaga, serif display). The font loader vars (`--font-geist-sans`, `--font-montaga`) come from `layout.tsx`.

### Animation & motion

- `SmoothScroll` (`src/components/smooth-scroll.tsx`) initializes **Lenis** smooth scrolling and intercepts `a[href^="#"]` clicks for anchor scrolling. It bails out under `prefers-reduced-motion`; `globals.css` also neutralizes animations under that query. Respect this pattern in new motion code.
- Available animation libs: `motion` (Framer Motion successor), `animejs`, and `three` (used by `particle-field.tsx`).
- Icons: `@phosphor-icons/react`.

### Forms & waitlist backend

`waitlist-form.tsx` is the shared email-capture component (`variant`: `"hero" | "default" | "split"` — three different layouts, same logic). The flow is:

1. The form validates the email client-side, then opens `consent-dialog.tsx` (a `motion`-animated dialog portaled to `<body>`). Terms acceptance is required; marketing opt-in is optional.
2. On confirm it POSTs `{ email, marketingOptIn, terms }` to `/api/waitlist`.
3. `route.ts` re-validates, then **(a)** saves the row to a Google Sheet via an Apps Script webhook (`GOOGLE_SHEETS_WEBHOOK_URL`) — this is business-critical, a failure fails the request; **(b)** sends a confirmation email via **Resend** (`RESEND_API_KEY`) — best-effort, failure is logged but the request still succeeds.

Env vars are documented in `.env.example`; full setup (Google Sheet + Apps Script + Resend) is in `setup/WAITLIST_SETUP.md`, with the Apps Script source at `setup/waitlist-google-apps-script.gs`. Copy `.env.example` → `.env.local` and restart the dev server after editing.

### Images

Remote images are restricted in `next.config.ts` to `picsum.photos`. Add hostnames to `images.remotePatterns` before using other sources.

## Notes

- `graphify-out/` is generated output from the graphify skill (a code knowledge graph), not application code.
