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

**Parked for the app build — the Srixon optic-yellow ball colour (2026-08-04).**
User asked whether to make it the highlight colour on the investment page, then
decided against it: *"let's stick to the current more grounded visual identity
and bring the ball colour into the app later."* Nothing was changed — the gold
tokens (`--gold` #c9a94e / `--gold-soft` #e8d48b / `--gold-text` #94742a) are
untouched.

Why it was the right call for the pitch page, and why the app is different: the
accent has ~60 usages in `css/styles.css` and roughly half are small text on
cream — eyebrows, `.usd` sub-labels, `.modeltable .mut`, `.doclist .type`,
`.upsell__price`. Optic yellow cannot carry small text on a light surface, so
each of those would need a dark olive derivative — meaning the ball colour would
only ever show on badges and buttons while the text stayed dark. Cost of a
rebrand, a fraction of the effect.

In the app it earns its place, because the surfaces are dark and it can be a
state signal rather than decoration: the shot tracer (`.appfilm__tracer`
stroke + the drop-shadow glow), the live/filming state, and the win screen
(`.appwin__ace`). Ernie plays a yellow ball, so on a dark viewfinder it reads as
a product detail, not a palette choice. Sample the exact hex from the ball
image the user supplied rather than guessing — it is a green-leaning fluorescent
yellow, not a warm yellow.

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

## RAISE REPRICED TO R8m / 15% (2026-08-04)

User: "We want to push the raise to R8M for 15% ... to make sense of the higher
valuation we want to build in the income projection from partnering with a
global simulator like golf zon."

**New terms.** R8.0m for 15% — R45,333,333 pre / R53,333,333 post (exact:
8 ÷ 0.15). Minimum ticket unchanged at R1m. Independent DCF unchanged at
R57–78m, so the round *still* prices ~20% below the DCF floor — that is the
lead justification for the price, ahead of the simulator story.

**The simulator channel moved from uncounted upside into the model.** Built as
a separable layer, never blended:
- Unit: $1 entry, $1,000 insured prize, split **46 / 30 / 24** (Get Lucky /
  operator / insurer). Operator gets more than a course's 10% because it brings
  venues, software and distribution; Get Lucky installs no hardware.
- Volume: attach rate against **South Korea's ~94M annual sim rounds only**.
  0.3% (2027) → 0.8% (2028) → 1.5% (2029) → 4.0% (2032). Golfzon's non-Korea
  venues and every other operator are excluded.
- Revenue to Get Lucky: R2.4m / R6.4m / **R12.0m (2029)** / R32.0m (2032),
  at ~50% EBITDA margin.

**Resulting numbers.** Base plan unchanged (R11.2m → R35.3m → R83.0m). Totals
R11.2m → R47.3m → R115.0m. EBITDA ~4.5% → ~20% → ~27%. Milestones R53.3m →
R129.7m (2.7446× revenue — the multiple implied by the published R96.8m base-plan milestone) → R690m (6× revenue).

**Why the investor return is unchanged — this is the point of the reprice.**
2.43× at three years and ~34% IRR, identical to the R4m/10% round. The higher
price is offset exactly by the higher plan. Lead with this on any investor call
where the R40m number was already quoted.

**Honesty guardrails (do not remove).**
- `growthEngines.sim.status` stays **"In development — not yet contracted"**.
  Nothing is signed with Golfzon. Badge on the public panel reads "In the plan
  — target partner, not yet contracted".
- The **0% attach sensitivity row is published** — dataroom table 3, the
  simulator PDF, and the FAQ: no partnership → R35.3m 2029 revenue, R96.8m
  milestone, 1.82× not 2.43×.
- Base plan and simulator layer are reported **separately everywhere** — site
  chart is stacked, dataroom trajectory table has three revenue rows, and
  `model.json` carries `revenueZAR` / `simRevenueZAR` / `totalRevenueZAR`.
- `index.html` no longer claims "every upside is uncounted" — that bullet was
  false once simulators entered the plan. Replaced with two bullets: the sim
  line is deliberately small, and travel/cross-sport/other operators remain out.

**Use of funds rebalanced** to 20 / 25 / 20 / 20 / 15 — course expansion,
global platform, **simulator integration**, market entry, ops. The 20%
(~R1.6m) simulator slice is what makes the new revenue line defensible.

**New dataroom document**: `scripts/docs/doc-simulator.html` →
`assets/docs/get-lucky-simulator-channel.pdf` (market, target operators, unit
economics, ramp, sensitivity, what the raise funds, principal risks). All three
dataroom PDFs regenerated; `doc-style.css` now carries an `@page` rule so
`chrome --headless --print-to-pdf` reproduces A4 without margin flags.

## WORKBOOKS REBUILT FOR THE SIMULATOR CHANNEL (2026-08-04)

`GetLucky_Pro Forma .xlsx` (shipped to the dataroom as
`assets/docs/get-lucky-pro-forma.xlsx`) and `GetLucky_Valuation_Model.xlsx`
both gained a **Simulator** tab and a rewritten **Valuation** tab.

- **Simulator tab**: status block (NOT CONTRACTED, lead target Golfzon, Ernie
  route), unit economics ($1 entry / $1,000 prize / 46-30-24 split with a
  shares-total-100% check), volume basis (94M Korea rounds), the annual attach
  ramp 2026–2032, and the four-row 2029 sensitivity. Every figure is a formula
  off blue input cells, so an investor can change the attach rate and watch the
  whole model move.
- **Valuation tab** now reports `Base plan revenue` → `Simulator channel
  revenue` → `Total annual revenue`, with EBITDA split base / simulator / total,
  and a `base plan only, no simulator` ZAR memo.
- Deal inputs updated: 15% / R8m / R53.3m post; near-term multiple set to
  **2.744619**, the exact multiple implied by the published R96.8m base-plan
  milestone (R96.8m ÷ R35.3m). That choice makes the base-plan-only memo land on
  R96.8m exactly and the 2029 milestone on **R129.7m** — the site was moved from
  R129.5m to R129.7m to match. Sensitivity valuations likewise R107.8m / R162.7m.

**Verification note:** LibreOffice in the build container cannot open any xlsx
(it fails on a trivial one-cell file too), so `scripts/recalc.py` could not run
and the files carry **no cached formula values** — Excel will compute on first
open, which is normal for openpyxl output. In its place the formula graph was
evaluated independently (`evalwb.py`, a small spreadsheet evaluator): 0 formula
failures, 0 bad sheet references, and every 2026/2029/2032 output tied to
`data/model.json` within 0.3%. If you have a working Excel/LibreOffice, opening
and re-saving each workbook once will bake the cached values back in.

## SIMULATORS MOVED INTO THE CORE PLAN + TERRITORY SPONSORSHIP (2026-08-04, later)

User: *"Build the simulator into the core plan from the start and don't make it
feel like its an add on or may not happen."* Then: *"take out independent DCF as
its no longer current"* and *"work in market related sponsorship revenue per
target territory with Santam partner brands in each."*

**Simulators are now a revenue stream, not a growth engine.**
- `growthEngines.sim` → top-level **`simulatorChannel`**. Status changed from
  "In development — not yet contracted" to **"Launching 2027 — integration
  funded by this round"**.
- Added as **rung 4** of the ladder in `#model`, a peer of the global
  subscription, with its own 46/30/24 split bar. Section sub now reads "Four
  ways to sell that swing".
- `#market` reordered: sponsorship and simulators (both in plan) first, travel
  (still uncounted) last. Heading: "Two streams in the plan. One still uncounted."
- Removed everywhere: the base-plan-vs-layer split, "strip it out", the
  "what happens if the partnership never lands" FAQ (replaced with **"How real
  is the simulator business?"**), the 0% sensitivity row on the public site, and
  the repeated "not contracted" badges.
- **One honest disclosure retained, deliberately** — do not delete: operator
  agreements are not yet signed. It appears once each in the dataroom
  assumptions, the simulator PDF risk table, the doc footers, and the workbook
  Simulator tab. The 0% attach case survives as a *live input* on that tab
  ("set the attach rate to zero"), not as a headline caveat.

**Territory sponsorship is a third reported stream.** Sized off the one hard
precedent — Santam's signed R9m over three years in a ~150k-golfer market:
- United States R2.0m/yr from 2029 → R4.0m by 2032 · Europe R3.0m/yr from 2030
  · Japan R2.0m/yr from 2031. Total in plan: **R2.0m (2029) → R9.0m (2032)**.
- Set deliberately BELOW the SA run-rate at entry in markets many times the
  size. Not scaled linearly off golfer counts — that produces numbers no sponsor
  would sign. Every figure is a live input on the new **Sponsorship** tab.
- South African sponsorship stays inside the coursesAndApp stream (off the
  monthly build), so nothing is double-counted.
- **These per-territory figures are Claude's proposal, not user-supplied.**
  If Johannes wants different numbers, change the Sponsorship tab and
  `territorySponsorship.territories` in `model.json`.

**Independent DCF removed.** `deal.dcfLowZAR` / `dcfHighZAR` deleted; the deal
card row is now Minimum ticket; the FAQ and doc-faq answers rebuilt. The price
argument is now carried entirely by the plan. **Do not reinstate the R57–78m
range without a fresh valuation.**

**Resulting numbers.** Revenue R11.2m → **R49.3m** → **R124.0m** (courses & app
R11.2/35.3/83.0 + simulators 0/12.0/32.0 + sponsorship 0/2.0/9.0). EBITDA ~4.5%
→ ~22% → ~30%. Milestones R53.3m → **R135.2m** → **R744m**. Investor return
**2.54× and ~36% IRR** (up from 2.42×/~34% at the old R4m price) — the headline
argument for the reprice is now "you pay more and get a better return, because
the bigger cheque funds the two streams that produce it".

**Workbooks**: new **Sponsorship** tab; Valuation tab rebuilt to report
courses & app / simulators / territory sponsorship / total, with EBITDA split
three ways. Six tabs now. Same verification caveat as before — LibreOffice in
the container cannot open any xlsx, so `recalc.py` cannot run and the files
carry no cached values; the formula graph was evaluated independently
(0 failures, 0 bad refs, every output tied to `model.json`).

## IN-PLAY UPSELLS ADDED AS A REVENUE STREAM (2026-08-04, later still)

User: *"I also want to add on upsells as a revenue stream - like buy a shot at
$100 000 now for $100 / Double up your winnings for $5... come up with more
ideas and build into the model."*

**The menu** (six items, `inPlayUpsells.menu` in model.json, block under the
ladder in `#model`): jackpot upgrade $100 for a $100,000 shot · double up $5 ·
three swings for the price of two · **nearest the pin $3** (a guaranteed prize
inside three feet — the one that monetises the 12,499 shots in 12,500 that are
not an ace, and the biggest lever on perceived value) · the highlight reel $3
(no insurance component, so pure margin, and every share is marketing) · the
group pot $10 a head (turns one purchase into four).

**Modelling discipline — the important part.** Upsells attach to attempts
**already in the model** (subscriber rounds + simulator challenges) and never
create new volume, so they cannot double-count another stream. Split by price
point, because a golfer paying ~R200 a swing is a different buyer to one paying
$1 in a sim:
- Course & app: **12% attach at $5 average**, on subscribers x 4 rounds/month x 12
- Simulators: **5% attach at $2**
- Get Lucky nets **55%** (higher than the 46% sim entry share — part of the menu
  carries no insurance), at a **65% EBITDA margin**. Launches 2027 with the app.
- **These attach rates are Claude's proposal, not user-supplied.** Live inputs
  on the new Upsells tab.

**Resulting numbers.** Upsells R4.3m (2029) / R10.5m (2032). Revenue R11.2m →
**R53.6m** → **R134.6m**. EBITDA ~4.5% → ~25% → ~32%. Milestones R53.3m →
**R147m** → **R807m**. Investor return **2.76× and ~40% IRR**.

**Watch the IRR.** Stacking four streams has walked the three-year return from
34% → 36% → 40%. Each step is defensible on its own inputs, but ~40% is high
enough that a sceptical investor may discount the whole model rather than argue
a line item. If it needs tempering, the cleanest lever is the upsell attach rate
on the Upsells tab, not the multiple.

**Workbook**: seven tabs now — new **Upsells** tab (menu, attach assumptions,
volume and revenue) and the Valuation tab rebuilt to five revenue rows with
EBITDA split four ways.

## COST BASE RAISED TO FUND THE PLAN (2026-08-04, later still)

User first asked to cut upsell attach to bring the IRR into the mid-30s, then
changed direction mid-task: *"Instead of pulling back on real opportunities
rather increase the expenses & budgets to make sure we get the revenue... show
real revenue potential across all channels but increase the expenses to make it
feasible."* The revenue cuts were reverted before they shipped.

**Revenue and valuation milestones are UNCHANGED** — R11.2m / R53.6m / R134.6m,
milestones R53.3m / R147m / R807m, investor return 2.76x and ~40% IRR.

**Read this before anyone asks why the IRR did not move.** The valuation
milestones are struck off *revenue* multiples (2.744619x near-term, 6x exit),
not EBITDA. A heavier cost base therefore cannot change the milestones or the
investor IRR — it makes the plan deliverable, not smaller. If the IRR itself
ever needs to come down, the only levers are lower revenue or a switch to an
EBITDA-based valuation method; adding cost will not do it.

**What changed.** Base opex R350k -> **R450k/month**, ops scaling 0.65 -> 0.68,
and per-stream EBITDA margins cut to carry delivery cost: simulators 50% ->
**42%** (integration engineering, operator marketing support), territory
sponsorship 60% -> **52%** (local activation, partner servicing), upsells 65% ->
**60%** (product build, payment costs).

**Resulting shape.** Annual operating cost R5.4m -> R15.2m -> R27.1m (roughly
double the old plan by 2029). EBITDA **-R0.7m (-6.3%) in 2026**, R8.3m (15.5%)
in 2029, R32.2m (23.9%) in 2032. 2026 is now a deliberate loss year.

**Why R450k/month specifically.** Sized against funding, not feel. At R500k the
peak cumulative drawdown across 2026-28 is ~R7.9m against an R8.0m raise — no
headroom, not defensible. At R450k it is **~R5.0m, leaving ~R3m of headroom**,
and the plan is cash-generative from 2029 without a further round. That claim is
now made on the public page, so do not raise opex further without re-running the
drawdown check.

New `fundingPlan` block in model.json carries the drawdown and profitability
figures. New "The plan is costed, not just forecast" block on the public page
(`#financials`). `.mathpanel` CSS was unscoped from `.engine` so it can be
reused there.

## VALUATION MULTIPLE FLATTENED TO 2.5x (2026-08-04, last change of the day)

User: *"Let's bring down the revenue multiples and make them linear as an
investor would expect... But still market related."*

**The problem.** The multiples were 4.77x implied at entry, **2.744619x** at
2029, then **6x** at 2032 — dipping and then spiking. That shape reads as three
numbers chosen to hit a target rather than a method, and it is the first thing
a sceptical investor picks at.

**Now: one flat 2.5x revenue multiple at every forward milestone.** The entry
multiple stays whatever the round implies (R53.3m post / R11.2m revenue =
**4.77x**), so the multiple **compresses** as the company scales — the direction
an investor expects — and no multiple expansion is assumed anywhere. The
milestones move only with revenue.

**Why 2.5x is still market-related.** Engaged-community subscription businesses
(Strava, Peloton, Whoop) trade at 5-10x revenue. The plan applies roughly half
the bottom of that band, discounted for being private, pre-scale and
mid-execution. Anchored to the market, deliberately on the conservative side of
it. Framed on the site as: if the business were ever rated at the comp band,
2032 would be R673m-R1,346m against the R336m carried — explicitly not in the
plan.

**Numbers.** Milestones R53.3m -> **R133.9m** -> **R336m** (was R147m / R807m).
Investor return **2.51x at three years, ~36% IRR**, 6.3x at 2032. Revenue,
EBITDA and the cost base are untouched.

Note this also delivers the mid-30s IRR the user asked for earlier, which
cutting the upsell attach could not reach (that lever floors at 36.4% because
simulators and sponsorship already carry 2029). The multiple was the right lever
all along.

`valuationModel` gained `_multiplePolicy`, `multipleBasis`, `entryMultipleImplied`
and `compUpside`; the old `downside` block (3-4x) was removed, since 3-4x now
sits *above* the base case and reads as upside rather than downside.

## MULTIPLE SETTLED AT 3.0x + THE BILLION-RAND HORIZON (2026-08-04, final)

Trialled 2.5x, then 3.5x on the user's instruction (*"SA investors like to see
blue sky vision and its not at all over ambitious - plus I would like to get to
a billion valuation"*), then **settled at 3.0x**. The 3.5x version was never
merged; only 3.0x reached a PR.

Multiple settled at **3.0x**, still flat at every forward milestone and still
below the comp band: engaged-community businesses (Strava, Peloton, Whoop) trade
at 5-10x, so 3.0x sits **40% under the bottom** of it. Entry stays at the 4.77x
the round implies, so the multiple still compresses.

Milestones R53.3m -> **R160.7m** -> **R404m**. Investor return **3.01x at three
years, ~44% IRR**, 7.6x at 2032.

**Watch the IRR — it is now ~44%.** It has travelled 34 -> 36 -> 40 -> 36 -> 52
-> 44 across the day as levers moved. Each step is arithmetically sound, but the
higher end of that range is where an institutional investor may stop engaging
with the line items and discount the model wholesale. The user's judgement is that SA angel/HNW
investors respond to vision, and that call is theirs — but if a future reader
wonders why the return looks aggressive, the multiple is the single lever: 2.5x
gives ~36%, 3.0x gives ~44%, 3.5x gives ~52%. Nothing else needs to move.

**The billion-rand horizon.** Handled as a dated trajectory, NOT a modelled
milestone, and it must stay that way. At a flat 3.0x, R1bn needs ~R333m of
revenue against the R134.6m modelled for 2032. Carrying the plan's own long-term
growth rate (1.8% monthly — the same rate already used to extend 2029 to 2032)
revenue passes that level a little over four years later, so **R1bn lands around
2037 (R392m revenue -> R1.18bn)**. No new assumption is introduced and no
multiple expansion is assumed.

It is presented on the public page as "The billion-rand mark is a trajectory,
not a slogan", with the arithmetic shown line by line and an explicit statement
that it sits **outside the plan being underwritten** — the deal is priced
against the R404m 2032 figure. Keep that separation: the moment R1bn is
presented as a modelled milestone, the model stops being defensible.

New `valuationModel.billionHorizon` block carries the figures.

## TWO UPSELLS PARKED (2026-08-04)

User: *"remove upsell: nearest to the pin (no way to verify) and highlights reel
for now."*

Both removed from the plan and from every published surface. **Parked, not
deleted** — they live on in `inPlayUpsells.parkedMenu` with the reason each is
out, so they can come back when they can actually be delivered:

- **Nearest the pin** — on-course proximity cannot be measured with the current
  camera rig. Worth noting a simulator *can* measure it precisely, so this may
  return on the simulator stream first even while it stays impossible on course.
- **The highlight reel** — no video production pipeline exists yet.

**Attach rates cut with the menu.** Core 12% -> **9%**, simulator 5% -> **4%**.
A four-item menu without the two broadest-appeal items converts fewer buyers.
Average spend held flat at $5 / $2, since the remaining items are the pricier
ones. Upsell revenue R4.3m -> **R3.3m** (2029) and R10.5m -> **R8.1m** (2032).

**Knock-on numbers.** Revenue R11.2m -> **R52.6m** -> **R132.1m**. EBITDA -6.3%
-> **14.7%** -> **23.2%**. Milestones R53.3m -> **R157.7m** -> **R396m** at the
unchanged flat 3.0x. Investor return **2.96x at three years, ~44% IRR**, 7.4x at
2032.

**One inconsistency left for the user to resolve.** The surviving *group pot*
upsell is described as "closest to the pin takes it" — which needs the same
proximity call that got nearest-the-pin parked. It is arguably fine because the
fourball adjudicates among themselves rather than Get Lucky verifying for a
payout, but if Get Lucky holds the pot and takes a fee it is the same problem.
Either reframe it (pot goes to a verified ace, rolls over otherwise) or park it
too. Raised with the user 2026-08-04; not changed unilaterally.

## SITE TIGHTENED FOR A SEASONED-INVESTOR READ (2026-08-04)

User: *"We have added a lot and I am worried it reads too long. Run through the
site and make it super tight — as if seasoned investors are looking at the
opportunity. Also remove any mention of old price — this is the new deck (the
old one never went out). Use read more dropdowns as needed."*

**The old price is gone everywhere.** The R4m / R40m round and every "against
2.42x and ~34% at the old price" comparison is removed from the site and the
FAQ PDF — including the whole "Why is the price higher now?" Q&A, which only
made sense against a deck that was never sent. **Do not reintroduce it.** The
deal now stands on its own terms rather than as a comparison.

**Word count 3,470 -> ~2,900** on `index.html` without losing a single number.
The cuts were prose, not substance.

**New `.more` component** in `css/styles.css` — an inline "read more" that
collapses supporting detail while leaving the claim visible. Gold on light
surfaces, brighter gold on dark ones. Used three times:
- Costed-plan card -> the funding detail behind "How it is funded"
- Billion-rand card -> the arithmetic table behind "The arithmetic"
- Upsell block -> the four menu cards behind "See the menu"

The pattern to follow if more collapsing is needed: **the number stays visible,
the reasoning goes behind the toggle.** Never hide a figure an investor needs to
evaluate the deal.

**Extended 2026-08-05** to the three `#market` engine cards, on the same rule:
the `.mathpanel` table (and the simulator operator chiprow) stay open, the
trailing paragraph beneath each one now sits behind a toggle — "Why it repeats"
(territory sponsorship), "Why Golfzon" (simulators), "Why it matters" (travel).
`.engine__body .more { margin-top: 0 }` added so the card's 1.4rem grid gap
isn't doubled. Site markup only — no numbers moved, PDFs unaffected.

**Also fixed:** the FAQ still asked "How do the two entry models fit together?"
when there are four rungs. The simulator answer had grown to 203 words and is
now ~130.

## 2026-08-05 — Model rebuilt on the insurance structure; review blockers cleared

The founder supplied `GetLucky_Insurance_Model.xlsx` (the Santam underwriting
submission) and asked for a middle path between it and the site: the insurance
model charges **per entry with no subscription**; the site sold a subscription
with **unlimited attempts**. Those are not two presentations of one business —
they are incompatible, and the site's version is the uninsurable one.

**Why.** A subscription buying unlimited insured swings fixes the premium and
leaves exposure open-ended. At 16 par-3 attempts a month against a $10
subscription the cover runs above a 100% loss ratio. That is the mechanism
behind the chartered accountant's D1 finding. Charging for the swing closes it:
the premium arrives with the risk, every time.

**The structure now published — three parts, one product:**
1. **Membership** — R149/month locally, $10/month globally. Access only: the
   app, the courses, member pricing. **Carries no prize risk.**
2. **The entry** — one swing at one insured prize, at the tier the golfer
   picks. 24% ceded as premium on that same swing.
3. **Upsells** — added in the moment, on top of an entry.

Sold in three places: installed courses, the global app, simulators.
Verified from the insurance workbook: weighted average entry $17.00, premium
$4.08, expected claim $1.30, **loss ratio 31.9%**, breakeven at **2.51×**
amateur ace frequency.

### The model was rebuilt, not patched

`GetLucky_Pro_Forma_v2.xlsx` is new and is now the shipped pro forma. 84-month
build (Jan 2026 – Dec 2032), calendar-year revenue, annual roll-up, cash
rollforward. Evaluated independently: **0 formula failures, 0 bad sheet
references**, and every output ties to `data/model.json`.

| | 2026 | Dec 2029 | 2032 |
|---|---|---|---|
| Revenue (net of third-party shares) | R11.95m | R59.18m | R123.72m |
| EBITDA | −R0.04m | R12.54m | R34.39m |
| Margin | −0.4% | 21.2% | 27.8% |
| Members / paid entries | 3,436 / 23,805 | 9,715 / 104,946 | 18,465 / 199,474 |
| Milestone at flat 3.0× | R53.3m (round) | **R177.5m** | **R371.2m** |
| Investor multiple on R8m | — | **3.33×** | **6.96×** |

IRR **42.4%**, stated on its real basis: money in Q3 2026 to the 31 Dec 2029
milestone, 3.4 years, an unrealised mark on a private holding. Entry multiple
4.46×, so it still compresses. Peak cumulative drawdown **R4.04m**.

### Blockers cleared from the three-reviewer audit

- **Insurance premium was double-deducted** in both legacy workbooks (the 24%
  is already inside the 66% gross margin; C21+C22+C23 = 100%). Fixed. "2026
  loses money on purpose" was an artefact of that bug and is gone.
- **SA sponsorship was extrapolated to 9× the contracted amount** by
  `Valuation!E8 = C34 * E6/$C$6`, inside a stream labelled "contracted". Now
  held flat at the R3.5m run-rate after the deal expires in 2028.
- **Rungs 1 and 2 contributed R0** to the old forecast while leading the page.
  The rebuild has pay-per-play as a real line.
- **Milestone year** was 2028 in the workbooks and 2029 on the site. Re-anchored
  to Dec 2029 throughout; `model.json` keys renamed `*2028` → `*2029`.
- **Trailing R4.0m is now on the page** with the forecast explicitly labelled.
- **Comp band removed.** Peloton trades near 1×; Strava and Whoop are private.
  The multiple is now argued from evidence, not borrowed.
- **Calculator fallback deleted** — it silently republished the withdrawn R40m
  round whenever `model.json` failed to load, and its two self-checks failed on
  every page load.
- **`fmtR()` printed `R-50000000`** on the revenue chart's y-axis. Fixed.
- **Contrast:** `--gold-text` → `#7a5d20` (4.68:1 on the worst background, was
  3.33:1 across ~60 usages). Focus ring given a two-tone halo — the old gold
  ring was 1.99:1 on cream, invisible on ~70% of the page.
- **The ask moved from screen 22 to screen 2** — deal band under the hero,
  sticky mobile bar, course wall cut 24 → 6.
- **Risk section added** (`#risk`): five named risks with true mitigations,
  including the no-simulator case (2029 → R47.2m, 2.65×).
- **Group pot** no longer claims to adjudicate proximity.
- **NDA gate is now real** — `middleware.js` + `api/nda-accept.js`, signed
  cookie, fails closed if `NDA_SECRET` is unset. **Not yet verified on a
  deploy.**

### New: `scripts/tie-out.py`

41 checks, run before any PDF regeneration. Asserts model internal consistency
(streams sum to revenue, cost stack sums to cost, milestones = 3.0× revenue,
insurance ladder arithmetic) and greps every surface for withdrawn figures. It
caught two live stragglers on its first run — this is the check whose absence
caused every drift bug in this repo.

### Open — needs the founder

- **The insurance submission and the investment plan assume different worlds.**
  The submission carries a 200,000-player Ernie Partner Network (PGA, Golf
  Breaks, YGT, 100 partner courses) reaching **144,091 registered players** and
  **R403m of year-3 entry revenue**. The investment plan has no partner network
  and reaches 9,715 members. Both are 36-month views of the same company. If
  Santam and an investor ever compare documents, that gap needs an answer.
  The plan deliberately takes the conservative side; the network is upside that
  is **not counted anywhere**.
- Cap table, management accounts, signed Santam agreement and the written legal
  opinion are all confirmed available and **still not published**. Each closes a
  named finding.
- Per-course unit economics need real figures before the panel can be built.
- Ace video and a named course-partner testimonial need assets.
- `NDA_SECRET` must be set in Vercel or the dataroom documents return 503.

### 2026-08-05 (later) — the blend: capped allowance, not unlimited

The founder asked for a structure that keeps subscription revenue (what
investors pay for) without unlimited insured swings (what no insurer will
write). The resolution is that **"unlimited" was the problem, not
"subscription"**.

**Membership now includes 4 insured swings a month at the $500 tier.** A capped
allowance is a known exposure, so it can be priced: 4 x $500 x 8e-5 = $0.16 of
expected claim, covered by ceding **5% of the subscription** ($0.50). Everything
above that is a **trade-up bought on the tee** at the submission's own ladder —
$5 for $2,500 up to $100 for $100,000 — carrying the full 24% premium.

| per member per month | |
|---|---|
| included-swing expected claim | $0.16 |
| premium ceded on the membership (5%) | $0.50 |
| trade-up premium (24% of $17 avg) | $4.08 |
| trade-up expected claim | $1.30 |
| **blended loss ratio** | **31.9%** |

**The blend is neutral to the insurer** — 31.9% is identical to pay-per-play
alone, because the included swings are priced at the same target. The
counterfactual is now published: 16 attempts a month at the $10,000 tier is
$12.80 of expected claim against $2.40 of premium, a **533% loss ratio**. That
is the version the site used to sell.

Restated (membership now reported net of the 5% premium):

| | 2026 | Dec 2029 | 2032 |
|---|---|---|---|
| Revenue | R11.73m | R58.21m | R121.87m |
| EBITDA margin | −2.1% | 20.0% | 26.8% |
| Milestone at 3.0x | R53.3m | R174.6m | R365.6m |
| Investor multiple | — | 3.27x | 6.86x |

IRR 41.7%. Entry multiple 4.55x. Peak drawdown R4.25m. EBITDA positive 2028,
cumulative cash positive 2029. Workbook ties to `model.json` **to the rand**.

`scripts/tie-out.py` now has 43 checks, including one that allows the word
"unlimited" only inside a 220-character window containing the counterfactual —
so the explanation can stay and the product claim cannot come back.

### Video

`golf-day-video.mp4` (uploaded to main, 32.8s, 1280x720, 14.2MB) is now
`assets/video/golf-day.mp4`, embedded in `#traction` with `preload="metadata"`
so it costs nothing until played, and a one-year immutable cache header.

**Not verified in this environment, and not compressed.** Both the bundled
ffmpeg (a stripped Playwright screen-recording build) and headless Chromium
lack H.264 decoders, so playback could not be confirmed, no poster frame could
be extracted, and no transcode was possible. Before launch: confirm it plays,
generate a poster, and re-encode at CRF ~26 — 14MB is heavy even lazy-loaded.
It is captioned as an activation day, not as an ace; do not relabel it without
watching it.

### 2026-08-05 (v3) — founder review comments applied

Nine comments came back on `INVESTOR-REVIEW.md`. Three changed the model
materially, and the return moved a long way as a result. That is stated up
front because it is the most important consequence of the session.

**Model changes**
- **Build now starts January 2027** (was Jan 2026), so **Dec 2029 is a true
  three-year milestone**. IRR is a clean 3-year figure, no longer 3.4 years.
- **Play frequency cut from 4 rounds a month to 2** — 48 insured attempts a
  year was not defensible. 8 par-3 attempts a month, 6.25% converted, so 0.5
  paid trade-ups per member per month.
- **Installed courses are now a modelled revenue line**: 25 today, +25 a year
  (100 by 2029, 175 by 2032), 400 entries per course per year at the realised
  R150 average, 66% retained. Positioned as proof and brand — R3.5m of the
  R37.7m 2029 forecast — with the digital channel carrying R22.1m.
- **The billion-rand horizon is removed** everywhere, on instruction.
- SA sponsorship stays flat at ~R3.5m; growth comes from new territories
  (confirmed).

| | 2027 | Dec 2029 | 2032 |
|---|---|---|---|
| Revenue | R11.19m | R37.70m | R96.32m |
| EBITDA margin | −6.5% | 20.7% | 29.3% |
| Milestone at 3.0x | R53.3m | **R113.1m** | **R288.9m** |
| Investor multiple | — | **2.12x** | **5.42x** |

**IRR 28.5%, down from 41.7%.** The price is fixed at R53.3m post, so the
whole effect of a realistic play frequency and a later start lands on the
return. Entry multiple 4.76x. Peak drawdown R4.22m against the R8m raise.
The workbook (`GetLucky_Pro_Forma_v3.xlsx`) ties to `model.json` **to the
rand**, 0 formula failures.

Cost base was retuned twice: the first pass put peak drawdown at R17.1m,
which is not fundable by an R8m raise; the second overcorrected to R1.4m with
47% margins. Central budget settled at R9.5m / R24m / R55m.

**Content changes**
- Risk section trimmed to **three questions with clear answers** (Santam,
  simulator operators, regulators). The two without clean answers — the
  unlaunched global product and the founding team's software background —
  move to the dataroom rather than sitting on the public page.
- **Cloud & Things added as technology partner**, led by the former CTO of
  Capitec Bank. This closes the "no engineer on an entirely software plan"
  finding: the engineering is a partner already in place, not a hire.
- Added **LTV/CAC** (~$378 against $12, ~31x), **"What your R1m buys"**
  (rights and protections), and **"Who buys this in 2032"** (named acquirers
  plus the honest dividend-paying option).
- **The $1.2bn insurance stat is defensible after all.** 1.2 x 1.081^9 = 2.41,
  so the 8.1% CAGR is right off a **2024** base — the site simply never stated
  the base year. Now it does. Note the published range is wide: other reports
  put the prize-indemnity market at $12.7bn and $22.4bn on broader
  definitions.

**Design**
- All images converted to WebP at display size: **3.6MB -> 0.89MB (75%)** on
  the bulk set, plus the hero and Ernie images. Intrinsic width/height stamped
  on every `<img>` (CLS). Originals deleted.
- Carousel now pauses on touch (WCAG 2.2.2). Count-up starts at 88% of target
  so a contracted R9m never briefly renders as "R1m". Bracket corners fixed
  (the image painted over `::before`). Math panel on light cards fixed from
  1.91:1.
- `scripts/tie-out.py` is up to **51 checks**.

**Still open**
- The second video is "saved in downloads" — not reachable from this
  container. `assets/video/golf-day.mp4` is the one from `main`, still
  unverified and uncompressed (no H.264 decoder here).
- Per-course economics panel deliberately NOT built: the founder notes not all
  courses perform alike and wants the emphasis on digital.
- Chart.js is still eager-loaded; the chart no-JS fallback tables are still
  not built.

### 2026-08-05 (v4) — repriced to hold a 40% IRR

The v3 rebuild dropped the IRR to 28.5%. The founder asked what gets it back
to 40%. There are only four levers, and they were sized before anything moved:

| Lever | What 40% over 3 years costs |
|---|---|
| Revenue | 2029 must be R48.8m, up 29% |
| Multiple | 3.88x instead of 3.0x |
| Price | 19.4% for R8m — a 23% cut |
| Time | Does not work: 2030 gives 32.3%, 2032 gives 32.5% |

**Decision: change the price, not the assumptions.** Plus one sequencing
change the founder backed.

**Simulators launch H2 2027, not 2028.** When the build moved to Jan 2027 the
simulator ramp slid with it, costing R5.6m of 2029 revenue. The integration is
engineering funded on close (Q4 2026), so it can be built while member growth
ramps — making 2029 year three of the channel at 1.5% attach. **This is a
judgement about sequencing, not a correction**; it was nearly written up as a
bug fix and it is not one. A simulator delivery cost of 30% of channel revenue
was added at the same time — the stream previously flowed to EBITDA carrying
only brand and central.

**New terms: R8.0m for 16.9% at R47.3m post (R39.3m pre)** — an 11% cut from
R53.3m.

| | 2027 | Dec 2029 | 2032 |
|---|---|---|---|
| Revenue | R13.59m | R43.29m | R96.32m |
| EBITDA margin | 5.6% | 21.6% | 28.7% |
| Milestone at 3.0x | R47.3m | **R129.9m** | **R288.9m** |
| Investor multiple | — | **2.74x** | **6.10x** |

**IRR 40.0%** over three years. Entry multiple **3.48x** compressing to a flat
3.0x forward. R1m buys 2.11%. Peak drawdown R2.7m.

The multiple stayed at 3.0x deliberately. `HANDOFF.md` already records it
moving 2.744 -> 2.5 -> 3.5 -> 3.0 in a single day; moving it again to land on
a target IRR is the reverse-engineering the reviewer warned would make an
investor discount the whole model. The price is the honest lever.

Central budget retuned in the tail (R30m/R37m/R46m for 2030-32) because the
first pass had EBITDA margin *falling* 2029 -> 2032.

Workbook `GetLucky_Pro_Forma_v3.xlsx` ties to `model.json` to the rand,
0 formula failures. `scripts/tie-out.py` at 55 checks — note the 2.74x stale
check had to be rescoped, since 2.74x is now the investor multiple while the
retired one was a revenue multiple.

### 2026-08-05 (v5) — made the numbers look arrived-at rather than solved

The founder asked whether the deck reads naturally to an investor. It did not:
the arithmetic was right but several figures carried the fingerprints of being
reverse-engineered from a target return. Six tells, all fixed.

| Tell | Fix |
|---|---|
| Equity **16.9%** | Nobody prices a round to a tenth of a percent |
| Post **R47,337,278** | Solved, not negotiated |
| IRR exactly **40.0%**, multiple **2.74x** | 1.40^3 = 2.744 — visible from orbit |
| Milestone **R129,883,965** | Spurious precision to the rand |
| Multiple a bare **3.0x** | A point estimate with no stated alternative |
| **R8m** raise against a **R2.7m** drawdown | Unanswered "why do you need R8m?" |

**The round is now quoted the way rounds are actually quoted: R8.0m at R39m
pre-money.** That gives R47m post and 17.0% of the company — all round numbers
that fall out of a pre-money, rather than an equity percentage solved backwards.
Returns are unchanged in substance: **2.76x at Dec 2029, ~40% IRR, 6.15x at
2032.** Entry multiple 3.5x compressing to 3.0x. R1m buys 2.13%.

**Multiple sensitivity is now published** — 2.5x / 3.0x / 3.5x giving 2.30x /
2.76x / 3.22x — so the 3.0x reads as a choice with a stated consequence.

**The R8m question is answered where it gets asked**, in the use-of-funds
block: R8m is investment *spend*, R2.7m is peak *drawdown*, and the gap is
operating cash arriving while that spend happens. Both numbers are true.

**LTV/CAC was republished stressed.** A bare 31x on an unlaunched product is
not a credible number to put in front of an investor. It now shows contribution
(~$357 after payment processing and claims handling) against $12 / $40 / $80
CAC — 30x / 9x / 4.5x — and says the plan works at $80.

**Two live errors that only rendering caught**, both invisible to a text sweep:
the deal card still showed **pre-money R45.3m** (the withdrawn price) and the
section sub still carried the **"40% below where engaged-community businesses
trade"** comp band that was supposedly removed two commits earlier.

`scripts/tie-out.py` is now at **64 checks**, including a new one that
recomputes **every published USD conversion** against the ZAR figure at the
stated FX. That check would have caught the R45.3m/$2.45m pair on its own.

### 2026-08-05 (v6) — back to R8m for 15%

The founder reinstated the original term. **R8.0m for 15% — R45.3m pre, R53.3m
post.** Quoted equity-first, which is the convention for a round this size;
R53.3m is the arithmetic consequence of a round 15%, not a number solved
backwards, so it does not carry the tell that 16.9% did.

**The return goes back to ~34%.** At a flat 3.0x, 2029 marks at 2.44x and 2032
at 5.42x. The 40% shown a revision earlier required either 17% equity or a
3.4x multiple; the founder chose the price over the return, knowingly.

| | at 15% | at 17% (superseded) |
|---|---|---|
| Post-money | R53.3m | R47m |
| 2029 multiple | **2.44x** | 2.76x |
| IRR (3 yrs) | **~34%** | ~40% |
| 2032 multiple | **5.42x** | 6.15x |
| Entry multiple | 3.9x | 3.5x |

Entry still compresses (3.9x -> 3.0x forward). R1m buys 1.88%. Multiple
sensitivity republished: 2.5x / 3.0x / 3.5x -> 2.03x / 2.44x / 2.84x.

**If 40% is wanted again at 15%,** the honest levers are 2029 revenue at R48.8m
(+13%) or a 3.38x multiple. Both were priced and neither was taken.

**Note on `scripts/tie-out.py`.** The hand-maintained retired-figure list
collided **three times** this session with values that were later reinstated —
2.74x, 5.42x, ~34% and R53.3m all had to be un-guarded when the price moved
back. A comment now warns to check a pattern against the current model before
adding or removing it. If the price moves again, expect the same friction: the
guards are string-matched, not derived. Anchoring them to `model.json` values
would be the better design and is not done.

## 2026-08-05 (v7) — THE PIVOT: peer-to-peer golf games as the core product

The founder pinned the product-market-fit problem: filming a swing for a
1-in-12,500 prize is high effort against a reward 99% of members would never
experience. New core product, founder's sketch: "a golf day in your pocket" —
the fourball's bet slip (skins, formats, stakes), live ledger, 19th-hole
settlement, with the insured hole-in-one as the house jackpot on the slip.

A product-strategist review (consumer audit, competitive scan, SA/US
regulatory analysis) shaped the final structure. Decisions locked:

- **No rake, ever, anywhere — modelled at zero.** SA's informal-bet exemption
  (NGA s4) dies the moment anyone takes a fee from the bet; the US precedent
  (BetOpenly C&D, Arizona) hit a 1% commission. Every durable competitor
  (Skins App $40/yr flat, 18Birdies, Beezer, SettleUp) converged on
  track-and-settle, no custody, no cut. Get Lucky adopts that structure.
- **Monetisation: $10/mo subscription for APP ACCESS (organizer-pays, no
  bundled swings) + insured jackpot entries.** The swing-bundle blend and its
  5%-ceded maths die; insurance reverts to the pure Santam submission
  ($17 avg entry, $4.08 premium, 31.9% loss ratio, 2.51x breakeven).
- **Jackpot is GROUP-POOLED** — the fourball buys in together at slip
  creation; filming collapses 16 events/round -> 4 swings on one staged hole.
- **USD-led global launch, honour mode first** (no custody anywhere; wallet
  is a geo-flagged licensed-market unlock). Pride Mode (points) is the
  default state and the restrictive-market fallback.
- **Deal unchanged: R8m for 15%.** Ernie participates in THIS round
  (founder's clarification — "same stage as Ernie" framing sanctioned).
- **Verified: Ernie Els was the first official investor in 18Birdies**
  (Forbes, 2017-07-31); 18Birdies claims 10m+ golfers (own site/App Store).
  The founder's "20m+ subscribers" figure did NOT verify — use 10m+.
- **The decisive metric is jackpot attach on a group slip** (modelled
  20/35/55%). A 90-day manual pilot across the 25 installed courses measures
  it before the app is finished — named investor-visible milestone.
- Gating items before launch: P2P legal opinion (the existing HIO opinion
  does NOT cover it), Santam written sign-off on the wrapper, Ernie's counsel
  sign-off, geo-flags from commit one.

**Delivery sequence (founder-approved): D1 business plan -> founder review ->
D2 model rebuild -> D3 site rebuild.** D1 is `GetLucky_Business_Plan.md`
(this commit). D2/D3 DO NOT START until the founder signs off D1 — the site
still carries the pre-pivot product and numbers, deliberately.

## 2026-08-05 (v8) — D2+D3 SHIPPED: the site, model and dataroom are the pivot

The founder approved the business plan verbatim and said run to done. Done.

**D2 — the model.** `GetLucky_Pro_Forma_v4.xlsx` (v3 deleted): 72-month build
from Jan 2027, subscribers from zero at 12/9.5/8% gross with churn WORSENED to
5.5%, actives at 2.8x, slips at 1 money round per active per month, jackpot at
35% attach x $10 ticket net 66%, peer GMV a zero-revenue memo. Ties to
`model.json` to the rand, 0 formula failures, first evaluation. Insurance tab
is the pure Santam submission (blend deleted). Numbers:
R14.1m -> R44.4m -> R97.2m; EBITDA 8.7/24.1/26.9%; milestones R53.3m / R133.1m
/ R291.6m at flat 3.0x; investor 2.50x / IRR ~36% / 5.47x; entry 3.77x; peak
drawdown R2.3m.

**D3 — the surfaces.** index.html rebuilt: hero "A golf day in your pocket";
the Slip walkthrough (build/send/play/jackpot hole/settle) replaces the old
three-part model; three-layer money story (peer free forever / $10 sub /
group-pooled jackpot); engines = sponsorship, simulators (indoor money game),
and "Peer stakes — the line we never touch" (GMV at R0 by design; travel
engine deleted); risk section = attach->pilot / Santam sign-off / the
two-layer gambling answer; deal = same terms, Ernie INVESTING IN THIS ROUND
(founder-sanctioned framing restored), use-of-funds re-cut (app build 35 /
pilot 10 / sims 15 / market 25 / legal&ops 15), milestone list now leads with
the P2P opinion + Santam sign-off + 90-day pilot; FAQ rewritten incl. the
18Birdies question; appdemo re-scripted; footer carries the peer-money
disclaimer. charts.js on the new five streams. All four PDFs regenerated,
including the NEW `get-lucky-business-plan.pdf` (from `doc-plan.html`).
Dataroom: three tables restated, assumptions table rewritten for the pivot,
business plan added to the doclist.

**tie-out.py: 60 checks green.** Pivot guards: no rake language anywhere, no
blend/"included swings"/533%, no trade-up, the unverified "20m+" 18Birdies
figure banned (verified figure 10m+ — Ernie was its FIRST official investor,
Forbes 2017). One catch during renders: the deal band still showed R47m post
(the 17%-era price) — the guard only matched "R47m post"; fixed and the guard
widened to ">R47m<". The stakes ladder also went invisible when it moved onto
the dark rung — `.rung--hot .stakes` override added.

### Open for the founder
- The pilot, the P2P legal opinion, Santam's written sign-off and Ernie's
  counsel sign-off are now PUBLISHED milestones — they need to actually happen.
- Cap table, management accounts, Santam agreement and the existing HIO
  opinion: still unpublished in the dataroom, all confirmed available.
- The appdemo concept screens still show the old solo-challenge UI imagery;
  captions are re-scripted but new slip/ledger mock screens are an asset ask.
- Ernie-in-this-round framing is used site-wide on the founder's instruction;
  the subscription agreement in the dataroom should evidence it.
- ~~NDA_SECRET still unset in Vercel — dataroom docs 503 on the preview.~~
  **RESOLVED 2026-08-06**: founder dropped the hard gate — see v10 below.

## 2026-08-06 (v9) — FOUNDER POLISH ROUND: 18 updates, Ernie corrected, 100k model

The founder reviewed the pivot preview and returned 18 changes. Two were
material fact corrections, one was a model rebuild; the rest copy/design.

### The two fact corrections (supersede v8)
- **Ernie does NOT invest cash in this round.** He holds **5% NON-DILUTING
  for name, likeness and network** — stated once, softly (deal card, FAQ,
  docs, `model.json` deal note). All "invests in this round" phrasing
  removed site-wide; tie-out now BANS it. v8's "Ernie-in-this-round" flag
  is dead.
- **18Birdies dialled way back** — it's a third-party investment of
  Ernie's, not our channel. One soft line survives, in Ernie's credibility
  list ("first official investor in 18Birdies"). Standalone FAQ deleted;
  market framing back to the 160M total golfer funnel. "10m+" verified;
  "20m+" was never verifiable and is banned by tie-out.

### The model (recalibrated: pivot.py → model.json → workbook v4)
- **100,183 subscribers by Dec 2032** (founder: "more aggressive — 100 000
  by 2032"): growth 13/12/11% gross monthly, LT 10.9%, churn held 5.5%.
- **CAC $24** (was $12), brand 15% of revenue, CENTRAL front-loaded
  (R11m/28m/88m in 2027/29/32) → **peak drawdown R6.03m** (founder asked
  ~R6m; the delta vs the R8m raise is labelled acceleration capital).
- Headlines: revenue R14.5m → R61.7m → R322.6m; EBITDA −11.2/24.2/38.9%;
  milestone R185.0m · **3.47×** · IRR ~51%; 2032 R967.8m · **18.15×**.
  2029: subs 15,085 · actives 42,237 · slips 93,508 · GMV $3.7m (rev zero).
- **Use of funds: App 25 · Legal & ops 25 · Market & brand 25 · Sims 15 ·
  Pilot 10.** Workbook v4 retuned and re-evaluated: 0 failures, ties exact.

### Copy & design (index.html + css)
- Hero H1: "Invest with **Ernie** in the future of golf gamification";
  lead leads with "a golf day in your pocket… $100,000 for a hole-in-one".
- "$100K for a hole-in-one" naming (insured jackpot survives only where
  "insured" does legal work). Santam strip redesigned ("R9m over three
  years — signed" + schedule). Course wall restored to ALL 24 courses.
- Video moved to a fun-extra section just above CONTACT. Risk = exactly
  3 straight cards, each with "The solution:". Small copy → `.more`
  dropdowns. App screens rebuilt to the slip flow (Slip → live ledger →
  the $100K shot filmed → ACE). Calculator redesigned (white card, big
  figure, tabular numerals). Footer tightened, logo 120px.
- Simulator stream clarified as TWO routes: modelled operator integration
  (Korea attach, R12m 2029) + the organic route (any sim bay, no deal
  needed, counted in app numbers) — no double count.
- **Cloud & Things tile**: rebuilt from WebSearch facts (cloudandthings.io
  unreachable from the container; AWS Partner, SA engineering firm). Dark
  tile with a text wordmark — **the real logo file is a founder asset ask**.

### Verification
- `scripts/tie-out.py` reworked: 62 checks green; guards ban pre-100k
  figures (R133.1m/R291.6m/2.50×/5.47×/14,061…), Ernie cash-investment
  claims, rake language, 18Birdies 20m+.
- Business plan §7 restated to the pro forma (was preliminary ~R48m/7,500
  subs; LTV/CAC now against the $24 CAC).

## 2026-08-06 (v10) — Cloud & Things logo redrawn; NDA gate becomes notify-on-open

- **Cloud & Things logo**: the founder supplied the mark (stacked cloud /
  ampersand / pill, line art). Redrawn as a clean SVG at
  `assets/img/cloudandthings-logo.svg` (cloud + pill stroked, ampersand
  glyph outline from Liberation Sans via fontTools) and placed on a white
  tile in the team section — replaces the text-wordmark placeholder. The
  v9 "real logo is an asset ask" flag is closed. Also caught and fixed:
  Ernie's team-card role still read "Founding Partner & Investor" —
  now "Founding Partner".
- **NDA gate**: founder decision — *"no need for NDA secret — just send me
  an email if someone opens it."* `middleware.js` (the fail-closed signed-
  cookie gate) is DELETED; documents are no longer server-locked.
  `/api/nda-accept.js` now records the acceptance and emails
  johannes@getluckygolfclub.com via Resend when `RESEND_API_KEY` is set in
  Vercel (key created 2026-08-06, send-only, domain-locked; founder added
  it to Vercel the same day — sender dataroom@getluckygolfclub.com). Without the key, every acceptance still logs to the Vercel
  function log. `js/nda.js` now fails OPEN — a failed notify never blocks
  an investor. Note: anyone with a direct file URL can now fetch a
  document without touching the form; the founder accepted that trade.

## 2026-08-07 (v11) — App UX & technical requirements: master spec + dataroom PDF

The founder asked to build the full app-flow UX and technical requirements
from the approved business plan. Decisions confirmed with him first:
master spec + condensed dataroom PDF; PWA-first web core with wrapped
iOS/Android store builds (one codebase, guests always join by link); scope =
golfer app + 90-day pilot instrumentation + verification/claims ops console,
simulator SDK as a forward-compatibility outline only.

- **`GetLucky_App_Requirements.md`** (repo root, new): the master working
  spec v1.0 for the founder and Cloud & Things. §0–§26 + glossary: the legal
  spine as numbered product principles; roles/account model (guests are the
  same account later promoted); the four-tab IA mapped line-by-line to the
  six concept screens plus a 34-screen inventory; fifteen end-to-end flows
  (slip → guest accept → lock → one-enters-one-confirms scoring → live
  ledger → The Shot → claim → settlement → season, plus Pride Mode,
  responsible play, mid-round edges, offline); the rules/handicap/netting
  engines; the jackpot layer (USD ladder only — the ZAR stake ladder is the
  installed-course product, never mixed); verification + claims state
  machine; settlement rails as unilateral public link formats; data model
  (~28 entities); analytics with **the pinned attach definition** (paid
  ticket ÷ locked slips) shared verbatim by app, pilot and readouts; NFRs;
  anti-fraud; ops console; pilot instrumentation (capture instrument = the
  guest PWA slip-lite writing the same records, so pilot metric == app
  metric structurally); the v1.0 cut against Q4 2026 / Q1 2027 / Q4 2027;
  and an open-decisions register (§25) that flags rather than invents the
  founder's calls: WHS/GHIN licensing, group-claim ownership/tax, billing
  processor + store IAP posture, R149-vs-$10 price architecture, guest data
  retention, refund terms, per-market Pride/jackpot interplay.
- **New dataroom document**: `scripts/docs/doc-app.html` →
  `assets/docs/get-lucky-app-requirements.pdf` (4 pages, house doc style,
  printed via the README pipeline). Registered in `dataroom.html` directly
  under the business plan: "App requirements — the build blueprint". Reads
  as evidence the app this raise builds is specified before it is built.
- **tie-out.py**: `doc-app.html` AND `GetLucky_App_Requirements.md` added to
  `SURFACES` — both fact-bearing, both now protected by the full must_not
  battery — plus 8 new must_have anchors (attestation line, never-touch,
  Pride Mode, ride free, jackpot attach, zero prize risk). 76 checks, all
  green. Consequence for future editors: the master spec cannot use the
  banned framings (the p-word, "included swings", competitor names, etc.);
  its traceability table therefore refers to the model.json launch block
  descriptively rather than by that block's literal key name.
- **`.vercelignore`**: `/GetLucky_App_Requirements.md` added — the master
  spec carries the anti-fraud model and ops internals, so it stays off the
  public deploy; investors get the gated PDF. **Flag for the founder**:
  `GetLucky_Business_Plan.md` and `INVESTOR-REVIEW.md` at the root are NOT
  ignored and are publicly fetchable on the deployed site today. Same
  treatment (add to .vercelignore) is a one-line change if unintended.
- Deliberately untouched: `index.html` (the six concept screens already
  agree with the spec and are cited by line), `data/model.json`,
  `vercel.json` (assets/docs inherits noindex + no-store). No PR opened.

## 2026-08-07 (v12) — The investor demo: a tappable MVP of The Slip

Founder ask: "build a demo of the app to show investors — make sure it
looks like a real MVP — taking golfers UX as the most important thing."
Built as a standalone, dependency-free web app at **`/demo.html`**
(+ `css/demo.css`, `js/demo.js`), phone-first: full-bleed app on mobile,
framed device + context rail on desktop. Guided story ("Tap through
Saturday") with a coach bar and skip, or free-roam across the four tabs.

- **The story**: Thursday slip builder (rematch prefill, live stake
  steppers, tier sheet, the $187 exposure line with a worked breakdown
  sheet — table-stakes caps doing the maths) → accepts streaming in
  ("guests ride free") → lock → Saturday live ledger thru 6 → the 7th:
  arming checklist (GPS ✓ · ball GL-07 ✓ · tee cam ✓), filmed swings with
  an animated tracer, **Dave's verified ace** ($100,000 count-up, claim
  checklist to FSP 3416, confetti) → hole-7 score entry with the
  attestation handoff (**"Confirm as Markus"** — one enters, one
  confirms; Dave's 1 locked by the tee cam) → back-nine feed → settlement
  (insurer card separate, netted to 3 transfers, rail chips with
  mark-as-paid and an IOU carry) → season (crest, pair bars, the IOU and
  the snake riding forward) → one-tap rematch → end card.
- **The maths is real**: standings fold from per-hole events, settlement
  nets from standings, and a load-time self-check throws if the script
  drifts. The canonical path reproduces the public concept screens to the
  dollar (+16/+9/−4/−21 thru 6; final +$41; Piet→Johannes $28,
  Dave→Johannes $13, Markus→Dave $6; exposure $187). If a viewer changes
  hole-7 scores or dots, the ledger and settlement recompute honestly
  (greedy minimal netting) and stay zero-sum.
- **The optic yellow is now sampled, not parked**: `#eefa5a`, taken from
  the ball in the founder's supplied ace photo (`24th career ace.png`),
  green-leaning fluorescent exactly as v4 predicted. Used strictly as the
  state signal — tracer, live/recording, verified badge — never
  decoration. The v4 "parked for the app build" flag is now resolved.
- **Integration**: linked from the `#app` section of `index.html` ("Hold
  it yourself — tap through the live demo →") and as a `Live` row in the
  dataroom doclist. `demo.html` + `js/demo.js` added to tie-out SURFACES
  with three new must_have anchors — **79 checks, all green**. The demo
  carries `noindex` and a favicon; Google Fonts is blocked in-sandbox as
  ever (Inter falls back; PosterGothic is local and renders).
- **QA**: driven end-to-end headless (390×844 touch + 1440×900 desktop),
  16 screenshots reviewed, zero console/page errors beyond the known
  sandbox font block. Two UX bugs found by the driver and fixed: the
  coach bar intercepted taps (now pointer-transparent with scroll
  clearance) and stacked toasts (now single-instance).

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
- ~~**Golfzon relationship status unconfirmed.**~~ **RESOLVED 2026-08-04**: user
  confirmed *"Ernie has direct links to the simulator partners and opens the
  door."* Copy now states that Ernie has direct relationships with the target
  operators and opens the door himself. Still **nothing signed** — the badge,
  the status row and every "not contracted" disclosure stay exactly as they are
  until an agreement exists.
- ~~**The pro forma workbook does not contain the simulator channel.**~~
  **RESOLVED 2026-08-04**: both workbooks now carry a **Simulator** tab (status,
  unit economics, attach ramp, 2029 sensitivity) and the Valuation tab reports
  base plan / simulator / total separately. Dataroom wording restored to "the
  single source for every cashflow, forecast and simulator figure".
- "90% founder ownership" wording: now also diluted by the 15% round (founder
  ~76.5% if Ernie holds 5% pre-round). Recheck alongside the cap-table flag above.

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
