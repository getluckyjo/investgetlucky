# CLAUDE.md — Get Lucky × Dean Burmester Pitch Site

## What this is

A **private, single-page pitch microsite** built to convince South African golfer
**Dean Burmester** to join **Get Lucky Golf** as a founding **brand ambassador** in
exchange for a **5% equity stake**. He invests his name, reach and global doors;
he is not paid a cash fee. It is NOT the public marketing site and must not be
indexed (`robots: noindex` is set in `layout.tsx`).

Goal of the page: prove the model works in SA, sell the global opportunity, and
show Dean how the value (and dividends) of his share grow with global adoption.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (config via `@import "tailwindcss"` + `@theme inline` in `globals.css`)
- `lucide-react` for icons
- Fonts: **PosterGothic Round ATF Heavy** (display/headings, local woff2) + **Inter** (body), loaded in `layout.tsx`
- Dev server runs on **port 3005** (`npm run dev`)

## ⚠️ First thing to do on this machine

`node_modules` was installed in a Linux sandbox and has the wrong native binaries
for macOS. Before running anything:

```bash
rm -rf node_modules .next && npm install && npm run dev
```

## Project structure

- `src/app/layout.tsx` — fonts, metadata (noindex)
- `src/app/globals.css` — brand tokens + custom utilities (`.font-display`, `.eyebrow`, `.topo`, `.halftone`, `.bracket`, `.tabular`, `.reveal`)
- `src/app/page.tsx` — the entire page (all sections inline)
- `src/components/Nav.tsx` — sticky client-side nav
- `src/components/Reveal.tsx` — IntersectionObserver scroll-reveal wrapper
- `public/` — brand assets copied from the main `www` site (logos, fonts, hero, team photos)

## Brand system (do not drift from this)

- **Forest green** is the brand. Keep it. Do NOT switch to the brighter green
  (#007728) used in the live web app, even though they differ.
- Palette (CSS vars in `globals.css`): `--green #335231`, `--green-dark #1e3120`,
  `--green-deep #16261a`, `--cream #f5f0e1`, `--cream-dark #e8e0cc`, `--gold #c9a94e`.
- Headlines: PosterGothic, uppercase, condensed, heavy. Body: Inter.
- Tone: confident, premium, warm, direct. Personal letter to Dean — not a generic VC deck.

## Hard content rules / decisions already made

- **Equity framing is ASPIRATIONAL.** Show the business valuation trajectory
  (R40M today → R96.8M 2028 → R500M 2032 vision) and dividend potential, but do
  NOT stamp a hard rand figure on Dean's 5% slice. Keep a visible disclaimer that
  these are company milestones illustrating the curve, not a guaranteed return.
- **No WhatsApp.** The platform is now Get Lucky's own web app (installable PWA),
  live at https://get-lucky-golf.vercel.app/home. The old deck's "WhatsApp / 3B
  users" angle was deliberately removed and replaced with a first-party-platform
  story ("our own platform, no gatekeepers"). Do not reintroduce WhatsApp.
- **No fabricated quotes** from Dean or any real person. Career facts only.
- The live-app flow is: Pick a course & par-3 → Choose stake → Film & submit →
  Verify → Win. Keep the product section consistent with this.

## Verified facts used on the page (refresh before sending to Dean)

- Dean Burmester (note spelling: **Burmester**, one "i" — the folder is misspelled
  "Burmeister"). Born Mutare, Zimbabwe; SA citizen; turned pro 2010.
- 2× LIV Golf champion: Miami 2024 (beat Sergio García in a playoff), Chicago 2025
  (beat Jon Rahm in a playoff). 4× DP World Tour (incl. back-to-back Joburg Open +
  Investec SA Open 2023). 11× Sunshine Tour. One of the game's longest hitters (~323 yd avg).
- Plays LIV for **Southern Guards GC** — the all-SA team (rebranded from Stinger GC
  for 2026), with Louis Oosthuizen, Charl Schwartzel, Branden Grace. Team ethos:
  Ubuntu — **"I am because we are."** Rhino logo (don't copy team IP — stylistic cues only).
- 2026 LIV individual standings used in the team strip (Dean 9th, Grace 14th,
  Oosthuizen 30th, Schwartzel 36th) are a **point-in-time snapshot** and drift weekly.

## Get Lucky business facts (from the 2025 raise deck + landing copy)

- SA traction: 100+ courses live, 20+ partner courses, 15,000 members reached.
- Insurance: underwritten by **Indwe Risk Services**, Authorised **FSP 3425**,
  100+ years heritage; 3-year R9m naming-rights sponsorship; max prize R1M.
- Stake ladder: R50→R25k, R100→R60k, R250→R200k, R500→R500k, R1 000→R1M.
- Model: avg entry R200/$10; 78% gross margin (78% Get Lucky / 10% course / 12% insurance).
- Forecast: 2026 R10.2M (~20% EBITDA) → 2027 R20.3M (~40%) → 2028 R30.8M (~45%).
  20 courses today, on track for 80+ by 2028.
- Global TAM: prize-indemnity / hole-in-one insurance $1.2B today → $2.4B by 2033
  (8.1% CAGR). 108M golfers (R&A 2024, +3M YoY), ~150M incl. USA, 38,000+ courses, 206 countries.
- Founders: Johannes le Roux (Founder & MD), Andrew Davenport (Founder & Marketing
  Director), Inus Smuts (Fractional Creative Director). Contact:
  johannes@getluckygolfclub.com · +27 60 961 5091.

## Page sections (in order) — comprehensive draft; Johannes may trim

Hero → The invitation (one-line ask + Ubuntu nod) → The product (web app, 5 steps,
stake ladder) → SA proof/traction → Global opportunity → Why now → Business model →
Why you, Dean (résumé + Southern Guards team strip) → The role (4 ways he drives growth) →
The deal (5% rides the curve + dividend/alignment) → Team → Close/CTA → Footer.

## Design cues borrowed (subtly) from LIV / Southern Guards GC

Corner-bracket framing (`.bracket`), halftone dot texture (`.halftone`), broadcast
leaderboard-style team strip, tabular numerals (`.tabular`), Ubuntu pull-quote.
Keep these subtle and keep the forest-green brand — don't turn it into a LIV clone.

## Verify before shipping

Run `npm run build` — it must pass TypeScript and static generation cleanly.
