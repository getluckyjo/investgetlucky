# HANDOFF — Get Lucky × Ernie Els Investor Pitch Site

**Single source of truth for the final build session.** Everything decided, built,
and still to do is in this file. Read it fully before touching anything.

## Where things stand

- **Branch `claude/get-lucky-golf-pitch-fipqvp`** holds the complete, working,
  QA'd v1 site (static HTML/CSS/JS, no build step, Vercel-ready) **plus a
  half-finished brand restyle** (see "Remaining work"). The v1 was screenshot-QA'd
  at 4 breakpoints; NDA flow tested end-to-end headlessly.
- **`origin/main`** additionally holds the uploaded **Dean Burmester pitch-site
  source** (Next.js) — reference material only, do NOT merge its tsx/config into
  the static site. Its images/font/facts have already been copied/absorbed here.
- Two parallel Claude sessions worked on this project. This handoff comes from the
  session that built the site. If the other session produced work, it should be
  pushed to its **own branch** and reconciled by the final-build session.

## The site (v1, live on this branch)

- `index.html` — public pitch, 15 sections: hero → Ernie founding partner →
  how-it-works (3 phone-frame demo slots + video slot) → traction → money-model
  ladder → course logo wall → growth engines (golf-travel + simulators) → market →
  CFO/COO/CMO triangulation → interactive financials + investor calculator → deal →
  team → FAQ → contact.
- `dataroom.html` + `js/nda.js` — NDA wall (client-side session gate + local audit
  trail; set `NDA_ENDPOINT` at top of nda.js to a Formspree-style URL to receive
  signatures). Gated: 6 source docs (`assets/docs/`), model summary table, 22 cited
  sources rendered from `data/research.json`.
- `data/model.json` — canonical numbers (deal, traction, forecasts, 36-month
  subscriber array that reproduces the xlsx exactly: 2,000 → 9,720).
  `data/research.json` — every external market claim with named source + URL.
- Charts: vendored Chart.js 4 (`vendor/chart.umd.min.js`), palette for data marks
  `#478f41` green / `#b07c10` gold (validated for CVD + contrast — keep these).
- `vercel.json` noindexes `/dataroom*` and `/assets/docs/*`.
- `scripts/extract-assets.py` — PyMuPDF pipeline that pulled logos/photos from the
  PDFs (handles smask transparency).

## Locked decisions (user-confirmed)

1. **Money story = ladder**: SA installed courses (pay-per-swing) + R149/mo local
   membership = proven engine; **$10/mo global subscription for $10,000 insured
   prize** = the Ernie-unlocked scale story funded by this raise.
2. **Public pitch + NDA-gated dataroom** (no full-site gate).
3. **Ernie Els = confirmed Founding Partner**, 5% founding stake, full name/likeness
   treatment. "He doesn't endorse this business. He owns part of it."
4. **ZAR-led, USD alongside at FX 18.5.**
5. **Margin = 66%** everywhere, always paired with "prizes 100% underwritten by
   Santam". SUPERSEDED 2026-07-14: the entry split itself is now **66 / 10 / 24**
   (Get Lucky GP / course / Santam insurance) per the user — the old 78/10/12
   bar is retired and the split now matches the 66% margin and the model's 24%
   insurance premium. Do not reintroduce 78/10/12.
6. **Allocation meter parked** — `deal.allocation.show=false` in model.json until
   the user supplies committed amount + close date. No fabricated urgency ever.
7. **No fabricated quotes** from Ernie or anyone. The pull-quote slot stays a
   placeholder until the user supplies a real quote.
8. **No PR** — commit and push to the branch only.

## Facts that SUPERSEDE v1 copy (from the accepted Ernie page + Dean site CLAUDE.md)

The uploaded Dean-site `CLAUDE.md` (read it: `git show origin/main:CLAUDE.md`) and
the accepted Ernie proposal (`git show origin/main:ernie-els/page.tsx`) contain
hard rules. The v1 site predates them; the final build must apply:

1. **NO WhatsApp anywhere.** Deliberately replaced by the first-party platform
   story: **"Our own platform. No gatekeepers."** Installable web app (PWA), no app
   store, live at https://get-lucky-golf.vercel.app/home. Purge WhatsApp from:
   ladder rung 3, how-it-works step 1, COO lens, "Why these numbers hold", FAQ
   (two entries), market copy ("3bn users"), README.
2. **Global product flow**: Subscribe $10/mo → **Pick** any course & par-3 →
   **Film & submit** in-app → **Verify** (video + witness review, most aces
   confirmed <24h) → **Win** $10,000 insured. Installed SA courses keep
   dual-camera + AI verification (that stays true).
3. **Traction upgrades**: **Top 100 courses live on the app · 25 partner courses
   installed · 20,000 members reached** (replaces "20+ courses / 15,000 members").
   Update hero stat strip, traction tiles, course-wall heading, model.json.
4. **Stake ladder** (installed product; add to money-model rung 1):
   R50→R25k · R100→R60k · R250→R200k · R500→R500k · R1,000→R1,000,000.
5. **New TAM layer** (add to market section + research.json with sources —
   verify via WebSearch, else attribute "company research"):
   hole-in-one/prize-indemnity insurance **$1.2B today → $2.4B by 2033 (8.1%
   CAGR)**; **38,000+ courses in 206 countries**; UK 3,101 / Germany 1,050 /
   France 804 courses.
6. **Insurance = Santam, "Authorised FSP 3416"** wording (user + Ernie page).
   The Dean CLAUDE.md says Indwe FSP 3425 — **overruled by the user; use Santam.**
7. **Ernie copy upgrades** from the accepted page worth folding in: "You're not an
   endorsement. You're the unlock." · the "résumé that opens doors" list · the
   **SA-major-champions leaderboard strip** (Player 9 · Els 4 · Locke 4 · Goosen 2 ·
   Oosthuizen 1 · Schwartzel 1 — "the lineage you carry") as a broadcast-style
   design moment (`.halftone` + `.tabular` utilities already in styles.css).

## Asset inventory (`assets/`)

- **Ernie (new, processed, ready):** `ernie-portrait.jpg` (864×1080, 4:5 fist-pump —
  for the Ernie-section portrait slot) · `ernie-headshot.jpg` (820² — team row) ·
  `ernie-open-bunker.jpg` (2200w, 151st Open — contact/CTA background with dark
  overlay) · `ernie-trophies.jpg` (2000w, SA Open trophies — deal/market accent) ·
  `ernie-swing.jpg` (1024×864, spare).
- **Brand (new):** `logo-color.png` (nav, light bg) · `logo-dark-bg.png` (hero/footer,
  dark bg) · `challenge-bordered.png` (Hole-in-1 Challenge badge — good in
  how-it-works) · `santam-logo-white.png` (traction Santam card) ·
  `assets/fonts/PosterGothicRoundATF-Heavy.woff2` (the real display font).
- **From the deck (v1):** `hero-course.jpg`, `logo-getlucky.png` (transparent),
  team photos (`team-johannes/andrew/inus.png`), 11 correctly-named course logos
  (incl. `course-clovelly.png`), Indwe lockups (now unused — Santam only).
- `assets/docs/` — the 6 dataroom documents.

## Remaining work (the final build session's checklist)

CSS **already done** in this branch (committed as WIP):
- `@font-face` PosterGothic + display stack swapped (Oswald removed from tokens)
- Body font → Inter; pull quotes → Georgia/Iowan italic (`--font-quote`)
- Exact brand palette tokens: green `#335231`, deep `#1e3120`, ink `#16261a`,
  cream `#f5f0e1`, warm `#e8e0cc`, gold `#c9a94e`, gold-soft `#e8d48b`,
  plus `--gold-text #94742a` for small gold text on light surfaces
- `.topo`, `.halftone`, `.bracket`, `.tabular` utilities added (verbatim from brand)

Still **TODO** (none started):
1. `index.html`: Google Fonts link → Inter only (drop Oswald + Source Serif).
2. Swap gold small-text usages on light surfaces to `var(--gold-text)` (`.tile .usd`,
   `.lens .role`, `.dealcard dt`, `.region .flagline`, `.eyebrow` on light sections)
   — contrast, then re-check.
3. Fill image slots: portrait slot → `ernie-portrait.jpg`; team slot →
   `ernie-headshot.jpg`; contact/CTA section → `ernie-open-bunker.jpg` bg + overlay;
   deal "Founding Investor Circle" → `ernie-trophies.jpg` accent; nav/hero/footer
   logos → `logo-color.png`/`logo-dark-bg.png`; add `challenge-bordered.png` +
   `santam-logo-white.png` where they fit.
4. Apply supersession facts 1–7 above across `index.html`, `dataroom.html`,
   `README.md` (WhatsApp purge, new flow, traction numbers, stake ladder, TAM,
   FSP 3416, Ernie copy upgrades incl. champions strip).
5. Update `data/model.json` (traction 100/25/20,000; stake ladder object) and
   `data/research.json` (insurance TAM, course counts — with sources).
6. Add textures/brackets tastefully: `.halftone` on hero/deal, `.topo` on dark
   sections, `.bracket` on deal card + Ernie portrait, `.tabular` on stat tiles.
7. `js/charts.js`: INK constant → `#16261a` (cosmetic).
8. Re-QA: local server + Playwright (`/opt/pw-browsers/chromium`,
   `--no-sandbox`) screenshots at 360/768/1200/1600; horizontal-overflow check;
   link check; numbers grep vs model.json; NDA flow. Commit + push.

## Ernie stake disclosure (2026-07-14, user decision)

The public page no longer states Ernie's 5% figure anywhere — he is described
as founding partner / founding owner / founding investor / "the top-playing
South African golfer of all time" instead. The number remains only in the
NDA-gated dataroom documents and internal model.json fields. Do not reintroduce
the percentage into public copy.

## Traction facts v3 (2026-07-14, user-supplied — supersede everything above)

Twelve months July 2025 → July 2026: **10,000 entries · 800 golf course
activations · 60,000 members reached · 25 premium courses installed (top 100
on the app) · R9m Santam · Ernie Els founding partner**. Turnover R4.0m
(R2.5m sponsorship + R1.5m entries) — deliberately NOT shown on the public
page: revenue-led proof reads weak against the R40m ask, so the page leads
with the qualitative wins and small absolutes (R3.1m, 25× monthly chart,
R1.0m assets, R900k Shanky's figure) were removed from public copy. Full
figures remain in model.json + the NDA dataroom.

## Copy-tightening pass (2026-07-14, user-approved brief)

The public page was restructured 14 → 9 bands for a 60–90-second investor
read: Distribution folded into Traction; How-it-works + Money-model merged;
Growth engines + Market merged into one Upside section; CFO/COO/CMO
triangulation merged into Financials ("Why these numbers hold", 6 bullets).
Copy cut ~50%; CTAs unified ("Open the dataroom" / "Book a call with the
founder"); course wall cut to 6 names + "+ 19 more"; subscriber chart and
empty phone-demo placeholders removed (slots documented in README; charts.js
no-ops on the missing canvas). All contracted numbers, disclaimers,
"not yet contracted" labels and the skill-not-gambling wording preserved.
Old anchor ids (#how #growth #courses #doneDeal) alias into the merged
sections.

## App demo phone (2026-07-14, user request)

The product section (`#model`) now ends with `#app` — an auto-advancing phone
mockup of the global app (one frame, four concept screens, story-style progress
bar, clickable synced step cards; `js/appdemo.js`): 1 Home (logo over Pebble
Beach's 7th, $10/mo → win $10,000) · 2 Choose course & par-3 (international
list with photo thumbs — Pebble Beach, Dubai Creek, The Preserve Japan
(selected), Royal Melbourne, Zimbali Lakes) · 3 Film the shot (Mt-Fuji
viewfinder, hole + distance overlay, animated shot tracer) · 4 Verified ace,
$10,000 won, with **course-certificate upload** at the bottom. The five
international course photos were uploaded by the user to the repo root
(2026-07-14) and processed to `assets/img/intl/` (root originals kept but
excluded from deploy via .vercelignore). Screens are HTML/CSS concepts; the
user may still upload real app screens + a video — swap instructions in README
"Assets wanted". Pauses on hover, stops off-screen, no autoplay under reduced
motion.

## Upside section redesign (2026-07-14, user request)

`#market` rebuilt for scannability: funnel (widened bars) beside a 3-stat
gold-rule stack, then "Two engines, one funnel — both feed the $10
subscription" with two matching `.engine` panels. Travel is reframed as
**the download engine** — the ~$1/booked-golfer ace-refunds-the-trip hook
exists to drive **200,000+ year-1 app installs (company target)** that
convert to subscribers; the fee is not the story. Simulators reframed as
**the global multiplier** using the already-cited global data ($2.4bn→$4.8bn
market, 94M Korean rounds, 19M US off-course, Golfzon 6,500 venues/~60%
share) plus a named operator chip row (Golfzon, Trackman, Full Swing,
Foresight, X-Golf, Topgolf Swing Suite, Kakao VX) and the Ernie-opens-doors
line. Both panels keep the "In development — not yet contracted" badge.
Footer source ⁴ now includes Grand View Research.

## Dataroom refresh (2026-07-14, user request)

- **2025 deck removed** from the dataroom (file deleted from assets/docs;
  root copy still in git history). The model-summary intro no longer
  references it.
- **`get-lucky-pro-forma.xlsx`** (user-uploaded "GetLucky_Pro Forma .xlsx",
  same driver model: Read Me / Assumptions / 36-month Build / Valuation /
  Investor's Stake) replaces BOTH the old valuation-model entry and the
  "3-year cashflow — Soon" slot as one doclist row.
- **Investor FAQ + Global Market Scenarios PDFs regenerated** with the
  latest site data (traction v3, 66/10/24 split, R1m minimum ticket,
  use-of-funds 25/30/25/20, 200k-installs travel target, global sim data,
  R11.2m→R83m model) in the Ernie one-pager style (centered logo, green
  heads, gold italic subtitle + rule, shaded-label tables). Sources live in
  `scripts/docs/` with regeneration instructions; keep them in sync with
  model.json / research.json when figures change.

## Fine-print trim (2026-07-14, user decision)

Per the user ("these are professional investors"), the three small-print
notes in the Numbers section were REMOVED from the public page: both
chart-notes (P&L + valuation bridge) and the calculator's #calc-note
disclaimer. The comprehensive legal disclaimer in the page footer remains
and is the sole risk/forward-looking statement on the public page — do not
re-add per-component disclaimers without the user asking.

## PROJECT PAUSED (2026-07-14) — state at pause

User: "hold on the project for now while we wait on next steps." Everything
is committed and live: branch `claude/mobile-mockup-course-flow-dtipge` =
`main` = `origin/main` at `1ec1fef`; Vercel deploys main. Session highlights
beyond the sections above: app-demo phone (`#app`), Ernie ace portrait,
Upside redesign (22,886-to-exit funnel), typography tiers, full-width Santam
tile, why-list icons, use-of-funds 25/30/25/20, R1m minimum ticket, dataroom
refresh (pro forma + two regenerated PDFs from `scripts/docs/`), model
summary as trajectory+assumptions tables, public fine-print removed, nav CTA
resized. Awaiting next steps: possible real app screenshots/video for the
phone demo (swap instructions in README), plus the open flags below.

## Open flags for the user (unresolved)

- **"90% founder ownership"** on the deal card predates Ernie's 5% (and possibly
  Dean Burmester's 5% — the Dean pitch offers him 5% too). Confirm the cap-table
  wording before investor calls.
- ~~**2026 revenue**: deck R10.2m vs Ernie one-pager R7.7m vs model ~R11.2m.~~
  **RESOLVED 2026-07-14**: user confirmed the valuation workbook
  (GetLucky_Valuation_Model.xlsx) is the only source for cashflow/forecast
  figures. Public page + dataroom now quote the model everywhere: revenue
  R11.2m (2026) → R35.3m (2029) → R83.0m (2032), EBITDA proxy ~4.5% → ~10% →
  ~18%, IRR ~34%. The 2025 deck forecast is retired from copy.
- Ernie photos show sponsor logos (SAP, Boeing, Stanley, XXIO) — confirm usage
  rights/licensing before the site goes public. This now includes
  `ernie-24th-ace.jpg` (now THE Ernie-section portrait, per the user
  2026-07-14, replacing `ernie-portrait.jpg` which is free again; cropped
  from a PGA Tour Champions Instagram post of the user-uploaded
  `24th career ace.png`): shows EY/SAP/Boeing/Stanley/Srixon branding —
  confirm the photo itself may be used.
- 3-Year Cashflow Projections PDF still missing from the dataroom ("Soon" slot).
- NDA endpoint key (Formspree/similar) not yet provided — signatures currently
  stored browser-side only.

## Environment notes (for the next session)

- Remote container: network policy allows **GitHub + package registries only**;
  WebSearch works (server-side); WebFetch/curl to other domains is blocked.
- MCP tools needing interactive approval (add_repo, Google Drive, send_later)
  fail instantly in this surface — don't rely on them; ask the user to attach
  extra repos as session sources at session start instead.
- Playwright: use `executablePath: '/opt/pw-browsers/chromium'` with
  `--no-sandbox`; never `playwright install`.
- PDF assets: `pip install pymupdf pillow` then `scripts/extract-assets.py`.
- Google Fonts is blocked in-sandbox (screenshots show fallbacks) but fine for
  real visitors. PosterGothic is local, so headings render correctly everywhere.
