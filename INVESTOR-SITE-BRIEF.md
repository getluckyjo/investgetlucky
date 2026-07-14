# Get Lucky Investment Site — Consolidated Build Brief

> **Purpose:** Single source of truth for building the Get Lucky **investor** site in this
> repo. All research is done — the build session should work from this file and NOT need to
> re-read the PDFs/xlsx. Prepared 2026-07-14 on branch `claude/pitch-site-structure-uawt94`.
>
> **Context:** Johannes runs two Claude Code sessions on this project. This session extracted
> everything; a fresh session does the build. Structure is modelled on the Doña Fuego pitch
> site (`getluckyjo/donafuego`, analysed below) — a public pitch page + an NDA-gated dataroom.

---

## 1. What to build

Two pages, Next.js 16 (App Router) + Tailwind v4, same stack and brand as the existing
Get Lucky × Ernie Els ambassador pitch site whose source files sit in this repo:

1. **`/` — public investor pitch page.** Hero → the pitch in one line → SA traction/proof →
   market opportunity → business model (two engines) → product → founders → the ask
   (R4m for 10%) → footer with dataroom link.
2. **`/dataroom` — NDA-gated dataroom.** Gate (name / company / email + NDA acceptance) →
   exec summary → what you're investing in → product & pricing → market → competition →
   go-to-market → financials (inline SVG charts + document downloads) → team → the ask → FAQ.

Private site: `robots: { index: false, follow: false }` in metadata (already the pattern in
`layout.tsx`; donafuego does the same via `X-Robots-Tag`).

## 2. Repo state & required restructure

The repo is currently a **flat upload** of the Ernie ambassador-site files (no `src/`
folders). The build session must restructure into a working project:

| Current (root)                        | Move to                                      |
| ------------------------------------- | -------------------------------------------- |
| `layout.tsx`, `page.tsx`, `globals.css` | `src/app/` (keep `layout.tsx` + `globals.css`; **write a new** `page.tsx` for the investor pitch — the current one is the Ernie ambassador page and is reference material) |
| `Nav.tsx`, `Reveal.tsx`, `PhoneShowcase.tsx` | `src/components/` (reusable as-is or lightly adapted) |
| `PosterGothicRoundATF-Heavy.woff2`    | `public/fonts/` (layout.tsx expects `../../public/fonts/…`) |
| `logo-color.png`, `logo-dark-bg.png`, `santam-logo-white.png`, `challenge-bordered.png`, `ernie-*.jpg`, `ernie-els/` | `public/img/` (adjust paths) |
| PDFs + `GetLucky_Valuation_Model.xlsx` | `public/downloads/` (served from the dataroom) |
| `package.json`, `package-lock.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts` | stay at root |

- `package.json` name is `get-lucky-dean-pitch` — rename to e.g. `get-lucky-investor-site`.
- Needs `tsconfig.json` (missing from the upload — generate a standard Next.js one).
- Dev port 3005. Verify with `npm install && npm run build` before pushing.
- Update `layout.tsx` metadata: title/description are still Dean Burmester — rewrite for
  "Get Lucky Golf — Investor Overview" (keep noindex).

## 3. Brand system (from `globals.css` — do not drift)

- Palette: `--green #335231` (forest — NOT the app's #007728), `--green-dark #1e3120`,
  `--green-deep #16261a`, `--cream #f5f0e1`, `--cream-dark #e8e0cc`, `--gold #c9a94e`.
- Headings: PosterGothic Round ATF Heavy (`.font-display`), uppercase condensed. Body: Inter.
- Existing utilities to reuse: `.eyebrow`, `.rule-gold`, `.topo`, `.halftone`, `.bracket`,
  `.tabular`, `.reveal` (+ `Reveal.tsx` IntersectionObserver wrapper).
- Section rhythm from the Ernie page: alternating `bg-cream` / `topo bg-green-deep` bands,
  `py-24 sm:py-32`, eyebrow → display heading → body.
- Tone: confident, premium, warm, direct. Investor-facing but human — not a generic VC deck.

## 4. Donafuego structural blueprint (what we're borrowing)

Repo: `getluckyjo/donafuego`, static HTML in `site/`, deployed by `vercel.json`
(`outputDirectory: "site"`, cleanUrls, `X-Robots-Tag: noindex, nofollow`).

**index.html (public pitch)** — sections in order: hero (big display headline) → `#pitch`
one-liner band → `#opportunity` (traction proof + "why it matters" sub-block) → `#market`
(tailwinds) → `#business` ("Three engines. One tequila machine.") → `#product` →
founder profile → full-width textured pull-quote band → `#ask` ("One strategic partner.
Capital plus capability.") → footer.

**dataroom.html (gated)** — NDA gate first: form (name, company, email), scrollable NDA text
with live prefill of the visitor's details, acceptance checkbox, then hidden `<main>`
reveals with banner "Private & confidential · NDA accepted by [name] · Download your NDA
copy". Sections behind the gate: exec summary ("The whole pitch, in one page") → company →
product/pricing → market → competition → GTM → financials (2 inline-SVG charts + download
cards) → team → ask → FAQ.

**Gate mechanics (`dataroom.js`) — port to a React client component:**
- localStorage key (`df_nda_v1` → use `gl_nda_v1`), record: `{name, company, email, acceptedAt, ndaVersion}`.
- Returning visitor with a record skips the gate.
- Live NDA prefill while typing (`data-fill` spans for name/company/email/date).
- On accept: store record, **fire-and-forget POST** of the acceptance record to
  `https://formsubmit.co/ajax/<email>` (donafuego emails danielle@; use
  **johannes@getluckygolfclub.com** — must be confirmed/activated with formsubmit once).
  Access is not blocked on network success.
- Printable NDA copy via `window.print()` + a print-only clone of the agreement with the
  acceptor's details filled in.
- Charts: dependency-free inline SVG (stacked monthly revenue bars + cumulative cash line,
  with hover tooltips). Rebuild with Get Lucky numbers from §6.

**Downloads for the Get Lucky dataroom** (all already in repo, move to `public/downloads/`):
deck (`the-get-lucky-deck-2025.pdf` — mark as "2025 raise deck"), `GetLucky_Valuation_Model.xlsx`,
`Get Lucky Investor FAQ (1).pdf`, `Get Lucky App Market Analysis.pdf`, and optionally the two
Ernie one-pagers. Rename files web-safely (no spaces/parens) when moving.

## 5. UPDATED FACTS — supersede the 2025 deck where they conflict

### 5.1 Commercial traction (Investor FAQ — first 6 months, Jul–Dec 2025)

- Capital invested to date: **R3.0m**. Total turnover: **R3.1m** (R2.5m sponsorship +
  R600k direct player entries).
- Monthly revenue grew **R10,000 (Jul) → R250,000 (Dec)**.
- **~R1.0m** in proprietary camera & installation assets, **20 permanent installations**
  at premium courses nationwide. (Deck's "100+ courses / 15,000 members" framing is the
  older story — lead with 20 owned installs + the phone-based model for reach.)
- **Santam** 3-year sponsorship **signed, R9m total**: Y1 R2.5m · Y2 R3.0m · Y3 R3.5m.
- Course deal: **10% revenue share** to the club, 2-year auto-renewing exclusive
  partnerships with a 2-year restraint of trade; Get Lucky covers installation, insurance,
  tech, ops — no upfront cost to the club. Clubs signing faster than expected.
- Two live challenge holes at both **The Metropolitan GC** and **Boschenmeer GC** (usually
  one signature par-3 per course).
- **Regulatory:** structured as a purely skill-based competition, not gambling — no
  randomness/odds-based payout; prizes fully insured and pre-funded.
- **Competition:** only meaningful local competitor was **acquired and rebranded into
  Get Lucky**. Globally the category is event-based/manual — first-mover advantage.
- Conversion levers: money-back-if-you-hit-the-green promo days (**entries +100%, ~25% hit
  the green**); Shanky's Whip sponsored shot per entrant (**1,800 bottles committed for
  2025 = R900k sponsorship value**).
- Entity: **Get Lucky Golf Club (Pty) Ltd · Reg 2025/047585/07**.

### 5.2 The two entry models (Investor FAQ — core business-model story)

1. **Premium Course Installation Model** (flagship): dual-camera verification + physical
   entry board on the signature par-3; owned assets; 10% club rev share; brand billboard,
   defensible contracted distribution.
2. **Phone-Based Global Model** (scale): whole challenge runs on the golfer's phone; any
   par-3 anywhere; no installation cost, no club rev share; activated via YouTube golfers /
   social / digital partnerships.
   Together: installs create legitimacy, phone entries create exponential reach and margin.

### 5.3 Ernie Els era numbers (one-pagers + valuation model — the newest material)

- Product headline: **subscribe $10/month, play for a $10,000 prize on any verified ace,
  underwritten by Santam**.
- **~2,000–2,100 paying subscribers today.**
- Trajectory (Ernie commercial one-pager; model-verified):

  | | 2026 (today) | 2029 — 3-yr plan | 2032 — exit vision |
  |---|---|---|---|
  | Company valuation | **R40m** | **R96.8m** | **R500m** |
  | Subscribers/entries | ~2,100 | ~9,700 | ~22,900 |
  | Total annual revenue | R7.7m | R35.3m | R83.0m |

- Model assumptions (valuation xlsx): FX 18.5; monthly sub growth 10.5% Y1 / 8% Y2 / 7% Y3;
  churn 4%/mo; CAC $12; gross margin 66% (see conflict §7); on-course marketing 10% of rev;
  insured prize risk 24% of rev (100% cover); opex base R350k/mo scaling at 0.65; exit
  multiple **6× revenue** (engaged-community comps Strava/Peloton/Whoop at 5–10×; risk note:
  pure-SaaS compression to 3–4× lands 2032 at R250–335m).
- Ernie's founding 5% (non-dilutive, zero cash): R2.0m → R4.84m → R25.0m (**12.5× on entry**).
- **Required disclaimer (keep visible wherever the trajectory appears):** "Figures reflect
  the company's stated valuation milestones from the 2025 raise and 3-year plan. They
  illustrate the trajectory — not a guarantee of return."

### 5.4 The raise (2025 deck — still the live deal terms unless Johannes updates)

- **Raise R4.0m for 10%** · pre-money R36m · post-money R40m.
- Independent DCF values the business at **R57–78m today** (built-in upside).
- 2028 view: R96.8m valuation → 10% ≈ R9.7m → **2.4× in 3 years (~30% IRR)**.
- 90% founder ownership after the raise. Vision: R500m exit by 2032; cross-sport expansion
  optionality (fishing next via same API).
- Deck forecast: 2026 R10.2m rev (~20% EBITDA) → 2027 R20.3m (~40%) → 2028 R30.8m (~45%);
  opex scaling R8m → R17m; profitability from 2026. (Note §7 conflict with Ernie one-pager's
  R7.7m 2026 revenue.)

### 5.5 Market (market-analysis PDF + CLAUDE.md refresh)

- Regional TAM/SAM/SOM (market analysis doc, optimistic 1-yr forecast):
  USA 25M golfers → $11–12M/yr · Europe 12M → $3.5M+ · SA 150k → $0.8M+ · Japan 10M →
  $5.8M+ · **combined $21–22M annual revenue potential**.
- Growth metrics targets: CAC $5–10, CLTV $60–150, repeat entry 40–70%, K-factor 0.7–1.0.
- Category numbers (newer, from CLAUDE.md): prize-indemnity/hole-in-one insurance market
  **$1.2B today → $2.4B by 2033 (8.1% CAGR)**; **108M golfers** (R&A 2024, +3M YoY, ~150M
  incl. USA), 38,000+ courses, 206 countries. Deck's "60M golfers / $20bn industry" is stale.

### 5.6 Team & contact

- **Johannes le Roux** — Founder & MD. Serial entrepreneur behind The Duchess (backed by
  AB InBev & RMB); beverage & lifestyle brand builder.
- **Andrew Davenport** — Founder & Marketing Director. Founder of DOPE Drinks, member of
  AKING; 15+ yrs beverage & entertainment marketing.
- **Inus Smuts** — Fractional Creative Director. The Duchess, Suncamino Rum, Platō Coffee.
- Contact: **johannes@getluckygolfclub.com · +27 60 961 5091**.
- Ambassador: **Ernie Els** founding-partner offer (5%, name & story, no cash, 1–2 days/yr,
  warm intros opt-in). The repo's `ernie-*.jpg` images support an ambassador section if the
  investor site mentions the partnership — check with Johannes whether the Ernie deal is
  signed or still an offer before presenting it as fact.

## 6. Chart data for the dataroom (replaces donafuego's numbers)

- **Revenue trajectory bar/line:** R7.7m (2026) → R35.3m (2029) → R83.0m (2032), or the
  deck's 2026–2028 path (R10.2m/R20.3m/R30.8m with EBITDA 20/40/45%) — pick per §7.1.
- **Valuation walk:** R40m → R96.8m → R500m (with the §5.3 disclaimer).
- **Monthly momentum:** R10k (Jul 2025) → R250k (Dec 2025) actuals — strongest proof chart.
- **Subscriber build:** 2,000 → ~9,700 → ~22,900 (from the model's monthly build).
- Keep donafuego's implementation style: inline SVG, no chart library, hover tooltips.

## 7. CONFLICTS — resolve with Johannes before final copy (defaults suggested)

1. **2026 revenue:** deck says R10.2m; Ernie one-pager/model says R7.7m. *Default: R7.7m
   (newer, model-backed).*
2. **Gross margin:** deck says 78% (78/12/10 split); valuation-model assumptions use 66%.
   *Default: present the 78/12/10 split for the entry model story, avoid stamping a single
   "gross margin %" on the subscription model, or confirm with Johannes.*
3. **R96.8m milestone year:** deck & CLAUDE.md say 2028; Ernie one-pager labels it "2029 —
   3-yr plan". *Default: "3-year plan" without a hard year, or confirm.*
4. **Platform story:** Investor FAQ still sells a WhatsApp-native journey; CLAUDE.md (newer
   decision) says the platform is Get Lucky's **own web app / installable PWA**
   (https://get-lucky-golf.vercel.app/home) and WhatsApp was deliberately removed.
   *Default: first-party platform story, no WhatsApp.*
5. **Insurer naming:** deck/CLAUDE.md say Indwe Risk Services (FSP 3425); FAQ + Ernie
   one-pagers + repo logo say **Santam**. *Default: Santam (newest, signed deal).*
6. **Pricing model:** deck's per-entry R200 avg / stake ladder (R50→R25k … R1,000→R1M) vs
   Ernie-era $10/mo subscription for $10k prize. *Default: lead with subscription; the
   installed-course entry model remains as engine #1 per §5.2.*
7. **Ernie partnership status:** offer or signed? Affects whether the investor site says
   "founding partner Ernie Els" or stays silent.

## 8. Hard rules (carried over from CLAUDE.md — still apply)

- Forest green brand, never the app's #007728. No fabricated quotes from any real person.
- Equity/valuation framing is aspirational — always show the disclaimer (§5.3).
- Live app flow: Pick a course & par-3 → Choose stake → Film & submit → Verify → Win.
- `npm run build` must pass cleanly before pushing. Never push to a branch other than
  `claude/pitch-site-structure-uawt94` without permission.

## 9. Build checklist for the new session

1. Restructure repo per §2; add `tsconfig.json`; `npm install`.
2. Port `Nav.tsx` (anchor links for the new sections + "Dataroom" CTA).
3. Build `/` per §1 using §5 facts (resolve §7 defaults or ask).
4. Build `/dataroom` gate + content per §4/§5/§6; wire downloads from `public/downloads/`.
5. `npm run build` clean → commit → push `claude/pitch-site-structure-uawt94`.
