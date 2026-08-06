# Making this the best pitch in the world — review panel findings & work plan

> **Panel:** seasoned entrepreneur/angel · chartered accountant (CA(SA),
> transaction advisory) · senior front-end designer. All three reviews complete.
> Every structural finding below was independently re-verified against the
> workbooks, the CSS tokens and `js/charts.js` before being written here.
>
> **Headline: 15 blockers across the three reviews.** The site should not go to
> an investor until B1–B6 and C1–C5 are resolved.

## Context

The site and dataroom price a R8.0m-for-15% round at R53.3m post, on four
revenue streams, with every forward milestone struck at a flat 3.0× revenue.
The numbers have been through six repricing passes in a short window and the
copy has been tightened twice. What has never happened is an **adversarial
read** — someone treating the site the way an investor's advisors will.

Three independent reviewers were briefed as domain experts and asked to find
what breaks: a seasoned entrepreneur/angel (narrative, price, credibility), a
chartered accountant (tie-out, arithmetic, disclosure), and a senior front-end
designer (hierarchy, mobile, accessibility, craft).

Facts confirmed by the founder during this review, which change several
findings from "soften the copy" to "produce the evidence":

- **No contact has been made with any simulator operator.** Not Golfzon, not
  anyone. The channel is a modelled scenario resting on Ernie's access, not on
  a conversation.
- **There is almost no recurring revenue today.** Entries are transactional;
  the subscription base is nascent.
- **The founder HAS, ready for the dataroom:** the cap table including Ernie's
  terms, management accounts and bank records, the signed Santam agreement, and
  a written legal opinion that the product is skill-based. None of these are
  currently published or referenced.

The user asked for a full, ranked list of updates to run back through Claude
Code. Scope: everything — numbers, design, narrative, and the items that need
the founder's own input.

---

## Workstream A — Credibility (from the entrepreneur review)

The single theme: **an investor will find the seam between what has been traded
and what has been forecast. Right now they find it by hunting, which reads as
concealment. The fix is to point at it first.**

### A1 — DEAL-LOSING: the R4.0m of actual trading appears nowhere

`data/model.json` carries `traction.turnoverZAR: 4000000` (R2.5m Santam
sponsorship + R1.5m of entries). Verified: the figure does not appear in
`index.html` or `dataroom.html` in any trailing-revenue context. Meanwhile
`index.html:515` heads the financials section **"R11.2m to R132m"**, directly
under a page that has just said "12 months. 10,000 entries."

A reader reasonably concludes R11.2m is history. It is not — roughly 61% of it
is a global subscription product with no paying users, which this round funds.
On trailing revenue the round prices at ~13× revenue, not the 4.77× stated.

**Fix:** add a traction line stating R4.0m actual on R3.0m of capital invested,
and label R11.2m as forecast with the split between traded and to-be-built.
This is the highest-leverage edit on the site — it converts a discovered
number into a disclosed one.

### A2 — DEAL-LOSING: R14.0m of the 2029 plan comes from unsigned counterparties, badged as revenue streams

Simulators (R12.0m) + territory sponsorship (R2.0m) = 27% of the R52.6m 2029
plan. The `#market` cards badge these "Revenue stream — proven, then repeated"
and "Revenue stream 4 — launching 2027", visually identical to the signed
Santam row. The disclosure survives in one trailing clause of one FAQ answer
and behind the NDA.

Given the founder's confirmation that **no contact has been made with any
operator**, the current copy — "Ernie has direct relationships across every
name on that list" — is the most exposed sentence on the site.

**Fix:** keep the streams, label them in the open, publish the downside case
(the no-simulator 2029 number) on the public page, and restate the Ernie claim
as access rather than relationship.

### A3 — DEAL-LOSING: the group-pot upsell contradicts itself two paragraphs later

`index.html:278` sells "closest to the pin takes it, we take a fee";
`index.html:280` explains a nearest-the-pin prize is parked because the rig
cannot measure proximity. Small money, total credibility cost. *(Known open
flag in `HANDOFF.md` — never resolved.)*

### A4 — DEAL-LOSING: the valuation comp band does not survive scrutiny

"Engaged-community businesses trade at 5–10× revenue (Strava, Peloton, Whoop)"
is repeated across `index.html`, `dataroom.html` and all three PDFs. Peloton
has traded near 1× revenue for years; Strava and Whoop are private, so "trade
at" does not apply. The entire valuation defence rests on one wrong data point
and two unobservable ones — and on US-dollar consumer comps for a rand-priced
round.

### A5 — MATERIAL: the best valuation argument is only behind the NDA

The 4.77×-entry-compressing-to-3.0×-forward story appears in the dataroom and
all three PDFs, never on `index.html`. A reader computes 53.3 ÷ 11.2 unaided
and concludes the forward multiple was reverse-engineered downward.

### A6 — MATERIAL: average entry price is R200 on the page, R150 in the trading data

`index.html:216` states "Average entry R200"; `model.json` traction implies
R1.5m ÷ 10,000 = **R150**. `unitEconomics.avgEntryZAR` carries 200. A 25%
overstatement in the model's favour, on the first number an investor checks.

### A7 — MATERIAL: no cap table, and the ribbon overclaims

`index.html:21` — "invest at the same stage as Ernie Els". Ernie is a
*founding* shareholder; a R53.3m-post investor is not at the same stage. The
founder has the cap table ready — publishing it removes the problem entirely.

### A8 — MATERIAL: Santam concentration is never named as a risk

~63% of trailing revenue, 100% of prize risk, and the template for a whole
revenue line — presented purely as a strength.

### A9 — MATERIAL: no engineer on the team page, for an entirely software plan

`#team` lists MD (beverages), Marketing Director (beverages), a *fractional*
Creative Director, Ernie, and a PE advisor. The round funds a global PWA, a
verification/claims flow and a simulator SDK. The "owned verification
technology" moat has no named owner.

### A10 — MATERIAL: further contradictions and stale figures

Simulator EBITDA margin 42% vs 50% in different files; the `$1.2bn` insurance
stat footnotes to an unverified, URL-less source amid 22 properly cited ones;
two different things labelled "Revenue stream 4"; a stale "2.74×" column header
in `doc-market`. *(Overlaps the accountant's tie-out — to be merged.)*

### A11 — OPPORTUNITY: the per-course unit economics are the most investable fact in the business and appear nowhere

Derivable from the model: ~R40k camera capex per course, ~R40k of annual gross
profit per course, i.e. roughly **twelve-month payback**, with the course
paying nothing and the prize risk carried by the insurer. Needs the founder's
real numbers to publish.

### A12 — OPPORTUNITY: the rest, ranked by impact per unit of effort

LTV/CAC (already in the model, invisible) · one 40-second video of a real
verified ace · a named course-partner testimonial · a dated use-of-funds
milestone plan with volunteered checkpoints · an explicit exit narrative naming
plausible acquirers · a "what your R1m buys" block covering rights and
protections · a live entries counter.

### A13 — The risk section that does not exist

There is no risk disclosure anywhere on `index.html` beyond a footer legal
formality. The reviewer drafted a five-risk section (Santam concentration;
nothing signed with an operator; the global product has not launched;
per-country regulatory treatment; a founding team from consumer brands
building a software and insurance product) — each with the mitigation that is
actually true. Expected to win more money than the billion-rand card.

### A14 — Price and structure (founder's decision, not a code change)

The reviewer's verdict: R45.3m pre is ~11× trailing revenue for a 12-month-old
company; the SA market in 2026 prices this stage at R18m–R35m pre. Suggested
structure if the headline price is to be kept: half now, half on a milestone
tranche released against a signed operator agreement or a paying-subscriber
threshold. Flagged for the founder — no code change proposed.

---

## Workstream B — Numbers integrity (chartered accountant)

The accountant rebuilt both workbooks' entire formula dependency graph in Python
(neither carries cached values) and reproduced every figure in `model.json` to
within 0.01% — so the findings below are the workbooks' actual arithmetic, not
inference. **I independently re-verified B2, B4, B6 and M1 against
`GetLucky_Valuation_Model.xlsx` before writing them here.**

Totals: **6 blockers, 14 material, 9 minor.** The mechanical drift is cheap to
fix. The structural findings are not.

### B1 — BLOCKER: four revenue streams are stated on two different bases, then added together

| Stream | Basis | Get Lucky's actual share |
|---|---|---|
| Courses & app | **gross** — 24% insurance + 10% course sit inside it | 66% |
| Simulators | **net** — `Simulator!C27 = gross × 46%` | 46% |
| Territory sponsorship | gross (no third-party share) | 100% |
| In-play upsells | **net** — `Upsells!C29 = gross × 55%` | 55% |

Put on a consistent net basis, 2029 total revenue is **R40.6m, not R52.6m**; the
3.0× milestone **R121.7m, not R157.7m**; the investor multiple **2.28×, not
2.96×**. The presentation is not wrong so much as unlabelled — but an analyst
who spots it will assume the flattering basis was chosen per stream.

**Fix:** add a basis column and a footnote to every trajectory table, plus a
memo row: "Total revenue, all streams net of third-party shares: R11.2m →
R40.6m → R101.7m."

### B2 — BLOCKER: R32.2m of 2032 revenue is South African sponsorship extrapolated to 9× the contracted amount — and labelled "contracted"

**Verified.** `Valuation!E8 = Assumptions!$C$34 * E6/$C$6` — SA sponsorship =
R3.0m/yr × (subscribers ÷ 2,130). It scales sponsorship linearly with the
subscriber count, a mechanism no sponsor has ever agreed to.

| | Subscription | SA sponsorship | Stated "Courses & app" |
|---|---|---|---|
| 2026 | R6.84m | **R4.34m** | R11.19m |
| 2029 | R21.58m | **R13.69m** | R35.27m |
| 2032 | R50.81m | **R32.23m** | R83.04m |

The Santam contract is R9m total, R2.5m → R3.0m → R3.5m, **expiring 2028**. The
model carries R13.7m in 2029 and R32.2m in 2032 — 9.2× the contracted peak year,
from a contract that has already expired. `Valuation!G9` (verified verbatim)
calls it "plus **contracted** South African sponsorship". Meanwhile
`index.html:584` says "Santam is signed through 2028 — a floor, not a pipeline"
directly beside a forecast treating it as a 9× pipeline.

Total sponsorship in the 2032 plan is R32.2m hidden + R9.0m disclosed = **R41.2m,
31% of revenue**, while the site presents sponsorship as an R9.0m line.

**Fix:** split SA sponsorship into its own row in all four trajectory tables;
delete "contracted" from `Valuation!G9` and `model.json:172`; then either cap it
at the contracted R3.5m run-rate (2029 → R42.4m revenue / R127.1m milestone /
**2.38×**; 2032 → R103.4m / R310.1m / **5.82×**) or disclose the renewal
assumption explicitly.

### B3 — BLOCKER: the live, proven business generates zero revenue in the forecast

`Valuation!C9 = C7 + C8` — subscription ARR plus sponsorship. **There is no
pay-per-swing entry line and no R149 membership line anywhere in either
workbook.** Yet the stream is labelled "Installed courses, membership and the
global app subscription", and `index.html:206-237` presents installed courses
(the R200 entry, the R50→R1,000 stake ladder) and R149 membership as rungs 1 and
2. Rungs 1 and 2 contribute **R0 at every milestone**.

Stated plainly: of R52.6m of 2029 revenue, nothing is contracted and nothing
comes from the existing business — R21.6m from a global app that does not exist,
R13.7m from an expired sponsorship extrapolated 4×, R12.0m from an operator with
no agreement, R2.0m from an unappointed partner, R3.3m from an unbuilt menu.

**This supersedes the framing in A1.** The user chose "only label the forecast"
rather than publish the R4.0m trailing figure — but the issue is not merely that
R11.2m reads as history. It is that the two rungs the site leads with are not in
the plan at all. Whichever disclosure route is taken, that has to be resolved.

**Fix:** rename the stream "Global app subscription + South African sponsorship"
everywhere, and either build on-course entry and membership revenue into the
model (it is R1.5m of real trailing revenue) or state on the site that rungs 1
and 2 are the proof of concept and are not carried in the forecast.

### B4 — BLOCKER: the workbook double-deducts the 24% insurance premium; every EBITDA figure on the site is wrong

**Verified.** `Valuation!D15 = D14 − opex − D9*Assumptions!$C$23`, where
`D14 = D9 × C21`. And on the Assumptions tab: `C21` gross margin **0.66** ("66%
to Get Lucky"), `C22` on-course marketing **0.10**, `C23` insured prize risk
**0.24**. They sum to 100% — the 24% is already removed inside the 66%.
Deducting it again charges the premium twice.

| | Published | Insurance counted once | Understated by |
|---|---|---|---|
| 2026 | −R0.70m (−6.3%) | **+R1.98m (+17.7%)** | R2.69m |
| 2029 | R7.70m (14.7%) | **R16.17m (30.8%)** | R8.46m |
| 2032 | R30.71m (23.2%) | **R50.64m (38.3%)** | R19.93m |

It errs *against* the company — but a formula error of this size in the only P&L
in the dataroom destroys confidence in every other cell. And the headline claim
that **"2026 loses money on purpose"** (`index.html:516, 530`) is an artefact of
a bug, not a design choice. The 2026 plan is actually profitable.

**Fix:** drop the `− C9*Assumptions!$C$23` term from `Valuation!C15/D15/E15` in
both workbooks; restate `ebitdaProxyZAR` to `[1983820, 16167119, 50640195]` and
`ebitdaMarginPct` to `[17.7, 30.8, 38.3]`; rewrite every "2026 loses R0.7m by
design" reference and the "modest margins" framing at `index.html:543`.

### B5 — BLOCKER: "the single source for every cashflow" contains no cashflow statement

`dataroom.html:76` sells the workbook as a "3-year cashflow"; `:91` calls it the
single source for every cashflow figure. The workbook has **no cashflow
statement, no capex, no tax, no working capital, no funding schedule, and no
2027 or 2028 columns** — Valuation jumps 2026 → 2029 → 2032.
`fundingPlan.peakDrawdownZAR = 5000000` is a hardcoded input with no supporting
calculation anywhere.

Reconstructing 2027/2028 on the model's own formulas gives a peak cumulative
deficit of **~R6.4m at end-2027**, not R5.0m — leaving ~R1.6m of headroom, not
the "~R3m" claimed at `dataroom.html:123`, and that is before the R1.6m
simulator integration, any capex or any working capital.

**Fix:** add 2027 and 2028 columns and a cash rollforward, or remove the
drawdown/headroom claims and relabel the doclist entry.

### B6 — BLOCKER: the ~44% IRR depends on a period the site never states, and the files disagree on which year the milestone is

**Verified.** `Assumptions!C31` is labelled "Pitch valuation **2028**"; the HTML
calls the same milestone **2029**; `model.json` names the fields `value2028ZAR`
/ `multiple2028`. The build is 36 months from Jan 2026, so `Valuation!D7 =
'Build'!AL11*12` is the **December-2028 run rate annualised**, not calendar-2029
revenue. `js/calculator.js:35` computes `2.96^(1/3) − 1 = 43.6%`, hardcoding
three years.

| Period | Years | IRR |
|---|---|---|
| Jan-2026 → Dec-2028 (what the workbook computes) | 3.0 | **43.6%** ← published |
| Aug-2026 close → Dec-2028 | 2.4 | 55.9% |
| Aug-2026 close → Dec-2029 (what an investor reads) | 3.4 | **37.5%** |
| Aug-2026 close → Dec-2029 as a 2029 milestone | 4.0 | **31.6%** |

An investor reading "2029 — 3-yr plan" against an August 2026 close computes
31.6–37.5%, not 44%. There is also no liquidity event at 2029 — this is a
mark-to-model on an unrealised private holding, not an IRR.

**Fix:** state the period and the basis explicitly, and settle on one milestone
year across `model.json` keys, both workbooks, all HTML and `charts.js`.

### B7 — MATERIAL: mechanical drift from the repricing cascade (cheap, do all of it)

- **Both workbooks' cover tab quotes the superseded milestones.** Verified:
  `Valuation!G24` reads "Headline figures from the pitch: R53.3m / **R147m** /
  **R807m**". Current milestones are R157.7m and R396m — R807m is 2.04× the
  actual figure. Also `Read Me!B7` and `B20` in both files.
- **Simulator EBITDA margin 42% vs 50%** — `dataroom.html:128` contradicts
  `dataroom.html:122` six rows above it; `doc-market.html:102` also says 50%.
  The workbook computes 42%.
- **Sensitivity totals wrong in three files.** R44.6m should be **R43.8m**;
  R67.0m should be **R65.7m** (`dataroom.html:146,148`,
  `doc-market.html:108,110`, `doc-simulator.html:77,79`). The valuation column
  is right, so the table **fails its own 3.0× test on two of three rows** — the
  first check a diligence analyst runs. `model.json` already holds the correct
  values; the HTML drifted.
- **Stale 2.74× column header** at `doc-market.html:107`.
- **Comp-band upside computed off superseded revenue** — R673m–R1,346m should be
  **R661m–R1,321m**; `model.json:485` still says "against the R404m carried
  here" when every other field says R396m.
- **`js/calculator.js:26` fallback reinstates the entire withdrawn round**
  (R40m post, 2.42×, 12.5×, 34%) if `model.json` fails to load — silently, with
  no staleness warning. Directly contrary to the standing instruction to remove
  every mention of the old price. Its two self-checks (lines 41-42) also assert
  against the old round and **fail on every page load**, printing two red
  console errors on the pitch page.
- **`model.json:463-467`** carries superseded `valuationUSD` figures anchored to
  the withdrawn R40m round; `valuationModel.revenueUSD` holds courses-and-app-only
  figures under a key name that means *total* revenue elsewhere in the same file.
- **Workbook stake tabs:** `Investor's Stake!B9` labelled "Entry investment —
  **R4m**" (the formula is right, the label is the old round); `F11` on both
  stake tabs says "CAGR ~34%" against a computed 43.6%.
- **`Valuation!C39`** cites the pre-park attach rates (12% / 5%) against the
  9% / 4% the workbook actually computes on.
- Minor: "60× the size" matches no market (actual 67×–321×); the $1.2bn→$2.4bn
  CAGR needs 9.05% not the stated 8.1%; the course wall shows 24 logos under a
  "25 installed" heading while `model.json` lists 11; `Build!B7` mislabelled
  "net" when it holds the gross rate; two computed Build rows feed nothing;
  typos on the first tab of both workbooks ("histroric", "diffirent", "The Ernie
  affect"); 4.8× vs 4.77× entry multiple stated both ways.

### B8 — MATERIAL: undisclosed load-bearing assumptions

- **Upsell attempt frequency.** `Upsells!F26 = Valuation!D6 × 4 × 12` — year-end
  subscribers × 4 rounds/month × 12 = 466,560 attempts in 2029. **The
  48-attempts-per-subscriber-per-year assumption appears on no published
  surface**, and it is the load-bearing input: at 2 rounds/month, 2029 upsell
  revenue halves. It also uses year-end rather than average subscribers, and
  presumes 466,560 verifiable attempts a year from a company that processed
  10,000 entries in the trailing twelve months — a 47× step-up in verification
  throughput with no operational plan in the dataroom.
- **The 24% insurance premium implies an ~82% loss ratio** before the insurer's
  expenses, commission or margin (466,560 attempts × 1/12,500 × $10,000 =
  $373k of expected claims against $458k of premium). No insurer writes to that.
  The premium base also includes sponsorship revenue, which carries no prize
  exposure, so the true ratio on exposed premium is higher. For simulators the
  same 24% is applied at a $1,000 prize, while `doc-simulator.html:90` honestly
  admits simulator ace rates are materially higher — with no separate pricing
  and no sensitivity.
- **"Annual operating cost" and "EBITDA" do not reconcile** on the page: R52.6m
  − R15.2m = R37.4m, 4.9× the stated EBITDA, with no bridging line. Worse, the
  R15.2m is charged only against the courses & app stream, so it is not a group
  opex figure despite being labelled one. And 2026 opex scales off **month-1**
  subscribers while 2029/2032 scale off **end-of-period** — making the 2026
  scaler exactly 1.00 by construction. On a consistent basis 2026 opex is
  **R8.65m, not R5.4m**.
- **"No new assumption is introduced"** (the billion-rand horizon) is not true.
  The 1.8%/month rate is genuinely the workbook's own — but it is a *subscriber*
  rate applied to *total revenue*, which implies simulator attach rising to
  **11.7% of every simulator round played in South Korea**, territory
  sponsorship at R26.2m/yr and SA sponsorship at R94.0m/yr by 2037.

### B9 — MATERIAL: the NDA is cosmetic

`js/nda.js` gates on `sessionStorage`; `vercel.json` adds only
`X-Robots-Tag: noindex`. Every "confidential" document is publicly fetchable at
its direct URL without signing. Signatures are stored in the visitor's own
`localStorage`, so **the company holds no record of who accepted** — and
`dataroom.html:55` tells signers their details are retained "for audit
purposes", which is not true as built.

**Fix:** either move documents behind a server-side check, or stop calling it an
NDA and remove the audit claim. The workbook contains Santam commercial terms;
it should not sit behind a gate that does not exist.

### B10 — The three assumptions a real DD will attack hardest

1. **That an underwriter prices this at 24% of revenue, at scale, in four
   jurisdictions.** The whole 66% margin and the "prize risk is Santam's" pillar
   hang on a number implying an 82% loss ratio, agreed by nobody beyond the
   current small book. *Evidence needed:* the policy schedule with the actual
   rate, limits, aggregate cap and expiry; written confirmation at 50× current
   volume; a broker indication for a $1,000 simulator prize at simulator ace
   frequency; claims history to date.
2. **That R32.2m of 2032 "contracted" SA sponsorship falls out of a R9m deal
   expiring in 2028.** *Evidence needed:* the agreement itself with renewal and
   escalation terms; a written renewal indication for 2029+; an LOI from one
   new-territory anchor insurer.
3. **That 2,000 paying subscribers exist today for a product that does not.**
   `Assumptions!C13 = 2000`, described in the workbook as "**Current
   subscribers**" and billed $10/month from month 1 — while `dataroom.html:118`
   calls the same figure a *launch base* to be converted from the 60,000 members
   reached. The founder has confirmed there is almost no recurring revenue
   today. Every milestone compounds off that opening balance for 36 months.
   *Evidence needed:* a billing-processor subscriber report as at the raise
   date, split local/global, with cohort retention against the 4% churn
   assumption. **If the true global-subscriber count is zero, the model needs a
   ramp from zero and every milestone falls materially.**

## Workstream C — Design and front-end craft (senior designer)

Measured on the live build at 390×844 (primary) and 1440×900. Page height at
390px: **24,094px = 28.5 phone screens.** Total weight **~4.66MB**. Contrast
ratios computed from the actual tokens including alpha compositing —
**I re-derived the key ones and they are exact.**

### C1 — BLOCKER: the deal is 22 screens down, behind an attention cliff

Measured section offsets at 390px:

| Section | y (px) | screens down |
|---|---|---|
| Hero CTAs | ~900 | 1.1 |
| **Course photo wall (24 photos)** | **2,500–4,600** | **3.0 – 5.5** |
| Ernie's face | 4,700 | 5.6 |
| Charts | ~15,000 | 17.8 |
| **THE DEAL — R8m / 15% / R53.3m** | **18,015** | **21.3** |

The cliff is the course wall: ~2,100px (2.5 full screens) of 165px thumbnails
carrying no argument, repeating a number the reader has already seen twice.
Everything that prices the round sits on the far side of it.

**Fix:** cut the wall to 6 courses + the `--more` card (this was already the
decision in `HANDOFF.md` and has since regressed to 24); insert a compact terms
band immediately after `</header>` reusing the existing `.dealcard dl` markup;
add a mobile-only sticky footer CTA. Target: the ask fully visible by y≈1,300.

### C2 — BLOCKER: nothing sells in screen one

At 390×844 the first screen carries only ribbon, nav, logo, H1 and lead. The
CTAs start at y≈900 and the stat strip runs 1,000–1,250 — so **10,000 entries,
R9m contracted Santam and Ernie Els are all below the fold**, on desktop too.
The ask *is* above the fold, in the ribbon — at 13.1px, wrapped to two lines,
styled exactly like a cookie bar, i.e. the smallest text on the screen and the
one pattern users are trained to skip.

**Fix:** reclaim ~260px (smaller hero logo, `--step-0` lead, 2-col stat strip,
`min-height: min(88vh, 60rem)`) to land the CTAs at y≈700 and the first stats at
y≈790. Add a fifth stat cell — **"Ernie Els — founding shareholder"** — since
the most valuable fact on the cap table is currently a photo and a word in the
H1, not a stat.

### C3 — BLOCKER: the keyboard focus ring is invisible on every light section

`--gold #c9a94e` on `--cream` = **1.99:1** (verified). Non-text UI needs 3.0:1.
A keyboard user gets no usable indicator on ~70% of the page. Worse, `summary`
and `input` are missing from the selector list — so the FAQ disclosures and the
investor slider, the two most interactive elements, fall back to the UA default.

**Fix:** a two-tone ring (gold outline + a 6px halo that inverts per surface).
Gold-on-ink 6.99:1, ink-on-cream 13.90:1 — always visible. No single colour
passes on both light and dark; the halo is the only correct answer.

### C4 — BLOCKER: every gold label on a light surface fails WCAG 1.4.3

**Verified:** `--gold-text #94742a` on `--cream` = **3.85:1**, on `--cream-warm`
= **3.33:1**. Needs 4.5:1. This affects ~60 usages including `.eyebrow`, the
`.team .role`, all six `.more` summaries, the dataroom `.doclist .type` — and
**the deal card's own field labels** ("RAISING", "EQUITY OFFERED").

**Fix is one token:** `--gold-text: #7a5d20` (verified **4.68:1** on the worst
background, passes everywhere), plus `--green-soft: #437036`,
`.section--green .eyebrow { color: var(--gold-soft) }` and
`.appdemo__note { opacity: .75 }`.

### C5 — BLOCKER: the revenue chart prints "R-50000000" on the y-axis

**Verified in `js/charts.js:21-26`** — `fmtR()` handles `v >= 1e6` and
`v >= 1e3` only, so negatives fall through to `"R" + v`. EBITDA 2026 is −R0.7m,
so the axis extends to −50,000,000 and renders **`R-50000000`** on the flagship
chart. Three further defects in the same chart: the −50m band eats ~20% of the
plot for a −R0.7m value, squashing the 2026 bar to ~4% of plot height (the year
the whole "costed" argument rests on); the margin label collides with the R0
gridline on the negative bar; and territory sponsorship and upsells render as
1–2px slivers, so the legend promises four streams and shows two.

*Note: the B4 EBITDA fix makes 2026 positive, which removes the negative axis
entirely — but `fmtR` must still be fixed, since it is wrong regardless.*

### C6 — MATERIAL: correctness and comprehension

- **The calculator's failure mode republishes the retired R40m price** — same
  finding as B7, independently reproduced. Delete the fallback; the static HTML
  is already correct and is the right no-JS state.
- **`.mathpanel` rows collapse into two ragged 17ch columns** on mobile (used
  5×). Every figure in the sponsorship, simulator, travel, cost-base and billion
  tables reads like broken markup. Fix: stack label-over-value below 560px.
- **The funnel inverts at the punchline** — `.f-plan { min-width: min(22rem,
  100%) }` forces the *narrowest* rung to 100% width, so the taper runs
  100% → 84% → 68% → **100%**. Taper by margin, not width.
- **`.usebar` clips its own labels** at 390px (five segments × 68px holding
  11.5px uppercase). The use-of-funds breakdown is illegible on a phone.
- **The `.econbar` legend conveys nothing** — literal `■` glyphs inherit text
  colour, so all three swatches are identical, and the mapping inverts between
  rung 1 and rung 4.
- **The investor slider has a 16px hit area** (WCAG 2.5.8 needs 24px, Apple
  44pt) and its four output cells have no live region, so a screen-reader user
  hears nothing change.
- **The app-demo carousel auto-advances with no pause on touch** — WCAG 2.2.2
  Level A fail; pause is bound to `pointerenter` only.
- **Heading levels skip in three sections; `#contact` has no heading at all**
  and `dataroom.html` has no `h1`.
- **Alt text duplicates adjacent visible text 29 times** — 24 course photos
  announce name-then-caption, four team photos announce name-then-heading.
- **Six read-mores and two contact links are 34px tall**; the footer dataroom
  link is 15px.
- **Charts have no visible fallback** — if `model.json` fails, both chart cards
  render as empty white boxes. *(Credit where due: the canvas `aria-label` text
  equivalents at `index.html:521,525` are better than most funded startups
  ship — keep them.)*
- **The dataroom's three model tables are keyboard-inaccessible scroll
  regions** (WCAG 2.1.1) with no accessible name and no scroll affordance.
- **Hero count-up animates the *contracted* Santam figure through wrong
  numbers** — the tile literally reads "R1m", "R2m", "R5m" during the ramp.
  Start from 88% of target, or drop the count-up on contracted figures.

### C7 — MATERIAL: 4.66MB page weight, ~690kB avoidable in ten minutes

| Asset | size | rendered at | verdict |
|---|---|---|---|
| `logo-color.png` | 105kB @ 700×524 | **46px tall** | 20× oversized, eager |
| `logo-dark-bg.png` | 128kB | 150–250px | 5× oversized, eager |
| team PNGs × 3 | 457kB | 176px | PNG for photographs |
| `challenge-bordered.png` | 236kB | 170px, hidden <640px | 30× needed pixels |
| `intl/*.jpg` × 5 | 971kB | ≤280px frame | 15× oversized |
| `courses/*.jpg` × 24 | 1.67MB | 165px | 800px sources |
| `chart.umd.min.js` | 208kB | two bar charts | loaded on every page |

Above-the-fold cost today ≈ **570kB over the wire** before a single pixel of
proof renders. Ranked fixes: logos → WebP (saves 219kB), team → WebP (412kB),
challenge badge → WebP (218kB), intl → WebP (850kB), courses → WebP (1.39MB, or
moot if the wall is cut), and lazy-load Chart.js via IntersectionObserver on
`#financials`.

Also: **the display font is not preloaded**, so every heading FOUTs through
Impact and reflows; the Google Fonts stylesheet is render-blocking on a
third-party origin; `vercel.json` sets **no cache headers**; images lack
intrinsic `width`/`height` (CLS); and Chart.js animations ignore
`prefers-reduced-motion` (the CSS and reveal handlers respect it — canvas does
not).

### C8 — POLISH: craft

- **Ernie's photography — the highest-leverage item on the whole review.**
  Three things wrong at once with the image that justifies the pitch: it carries
  a **baked-in blue "24TH CAREER ACE!" banner** from a PGA Tour Champions social
  post — foreign blue, foreign typeface — so on a page premised on *"he doesn't
  endorse it, he owns part of it"* the hero asset reads as a re-share; it is
  430px wide in a 1,440px layout and the crop cuts the top of his cap; and the
  `.bracket` corner marks render asymmetrically (the image paints over `::before`
  and under `::after`, so only one corner shows). Meanwhile
  `ernie-open-bunker.jpg` — 2,200px, the 151st Open — is being used as 0.87-opacity
  wallpaper. **Recommendation: make the Ernie section a full-bleed image band.**
  *(`HANDOFF.md` also flags an unresolved rights question on this exact file —
  EY/SAP/Boeing/Stanley/Srixon branding. Resolve both before launch.)*
- **Everything is emphasised, so nothing is:** 8 badges, 7 gold icon circles,
  5 gold step icons, 3 gold-bordered cards, ~40 `<strong>` spans. Gold does
  badge, icon, rule, border, number and emphasis duty simultaneously. And the
  type scale collapses in the middle — `h3`, `h4`, `.faq summary`, `.lead` and
  `.section-head .sub` are **four different roles at ~19.5px**.
- **Five of six section headlines end on a one-word orphan.** `text-wrap:
  balance` is used exactly once, on the hero H1. `#deal` runs four lines for six
  words.
- **Line measure:** `.hero .lead` and `.section-head .sub` sit at ~33ch, below
  the 45ch floor; the footer legal text has the **longest measure on the page at
  the smallest type size**.
- **The cream/green alternation has become a metronome** — nine bands, three
  different dark greens, two creams differing by 7% luminance. Make it mean
  something: dark = Ernie and the money, light = the business.
- **The traction section repeats four of the six hero stats verbatim.** Cut the
  duplicates and put the ~600px into the Ernie photograph.
- Smaller: card borders at 1.20:1 are invisible; `.btn:hover` transform sticks
  after tap on touch (no `@media (hover: hover)` guard); the valuation-bridge
  bars are all one green when they represent three different *kinds* of claim
  (priced / modelled / projected); the bridge label says `R396.4m` while all
  body copy says R396m; two FAQ items duplicate content elsewhere on the page;
  Ernie is the fourth of four identical team cards after being the entire
  premise of the hero; the mobile team section is 2,070px for four people;
  there is no skip link and the hero sits outside `<main>`.

### C9 — The one to remove and the one to add

**Remove:** the 24-photo course wall — 2.5 phone screens placed exactly where
attention breaks, restating a number already seen twice. Six + "19 more" makes
the identical point in 400px.

**Add:** a deal band directly under the hero. R8.0m · 15% · R53.3m post · R1.0m
minimum, plus "Open the dataroom". It costs ~180px and moves the ask from screen
22 to screen 2. Every other fix improves the page; this one is the difference
between an investor knowing the terms and not.

## Workstream D — Evidence to publish (founder-supplied, confirmed available)

Cap table incl. Ernie's terms · management accounts and bank records · the
signed Santam agreement · the written legal opinion on skill-vs-gambling.

All four are ready and **none are currently referenced anywhere on the site or
in the dataroom.** Each one directly closes a finding above: the cap table
closes A7, the management accounts close A1/B10.3, the Santam agreement closes
B2/B10.2, the legal opinion closes A13's regulatory risk. Publishing them is the
cheapest credibility gain available and requires no modelling work.

---

## Decisions taken during this review

| Question | Decision |
|---|---|
| The R4.0m trailing vs R11.2m forecast | Label the forecast clearly; do not headline the R4.0m. **Note:** finding B3 partly overrides this — the deeper issue is that rungs 1 and 2 contribute R0 to the forecast, which must be disclosed either way. |
| Ernie's operator relationships | He genuinely knows them; no approach made to date. Copy stands, plus an explicit "no approach made as at August 2026". |
| The Strava/Peloton/Whoop comp band | Research defensible comparables and restate accurately; keep the multiple method. |
| Price | **R8m for 15% at R53.3m post is fixed.** The pricing critique is logged, not actioned. |
| Month-0 subscribers | The 2,000 is a **conversion target**, not a current base. The workbook label "Current subscribers" is wrong and the build needs a conversion ramp in front of it. |
| The double-counted insurance premium | Fix the formula and restate every EBITDA figure upward. |
| The milestone year | **Re-anchor the model to Dec 2029.** Site labels stay; IRR restates to ~37.5%. |
| The NDA gate | **Build a real one** — server-side check with signed URLs, and capture signatures somewhere the company actually holds them. |
| World-class additions | **All four in scope:** per-course unit economics panel · risk section · dated milestone plan + exit narrative · ace video + course testimonial. |

### What these decisions cost — read this before approving

Three of them move the headline numbers, and the price is fixed, so the
**investor multiple absorbs the change**:

- Re-anchoring to Dec 2029 restates the IRR from 44% to **~37.5%** on the
  current multiple.
- Putting a conversion ramp in front of the 2,000 lowers every subscriber-driven
  figure — which is most of the model.
- Capping or disclosing the SA sponsorship extrapolation (B2) reduces 2029
  revenue to R42.4m and 2032 to R103.4m if capped.

Against that, correcting the insurance double-count raises EBITDA materially at
every milestone. **The net direction is not knowable until the model is rebuilt**
— which is why the sequencing below rebuilds and re-derives before any published
figure is touched. Expect R157.7m, R396m, 2.96×, 7.4× and 44% to all move.

---

## Sequencing — the order Claude Code should run this

The dependency runs one way: **workbooks → `model.json` → HTML → PDFs.** Every
previous drift bug in this repo came from editing those out of order.

**Phase 1 — rebuild the model (nothing published changes yet).**
Fix the insurance double-count; add the conversion ramp ahead of month 0; extend
the build to Dec 2029 and re-derive 2032; resolve the SA sponsorship
extrapolation; split SA sponsorship out of "Courses & app"; decide the gross/net
basis presentation; add 2027/2028 columns and a cash rollforward. Then produce a
**written before/after table of every headline figure** for approval before
anything else moves.

**Phase 2 — propagate.** `model.json` from the rebuilt workbooks, then HTML from
`model.json`, then regenerate all three PDFs. Fix the stale workbook cover cells
and stake-tab labels in the same pass.

**Phase 3 — credibility and disclosure.** The risk section (A13); the unsigned-
counterparty labelling (A2); the group-pot contradiction (A3); the comp band
(A4); the entry-multiple compression argument moved onto the public page (A5);
R150 vs R200 (A6/B7); the ribbon wording and the cap table (A7); the calculator
fallback and its failing self-checks (B7); the NDA claim (B9).

**Phase 4 — design and craft.** C1–C5 (the blockers) first, then C6–C8. The
deal band and the course-wall cut (C9) are the two highest-value moves and are
independent of everything else — they can run at any point.

**Phase 5 — the four additions.**
- **Per-course unit economics panel** — needs your real figures: capex per
  install, entries per course per month, gross profit per course per year,
  payback, courses live, courses in pipeline, and the spread between best and
  worst of the 25. Both reviewers independently called this the most investable
  fact in the business. Everything else in this phase is optional; this is not.
- **Risk section** — five named risks with true mitigations, placed between
  `#financials` and `#deal`. The entrepreneur drafted it; B10 sharpens it
  (Santam concentration is now evidenced, not asserted).
- **Dated milestone plan + exit narrative** — use of funds becomes a dated
  checklist with volunteered checkpoints; plus who plausibly acquires this in
  2032 and why (the simulator networks, a prize-indemnity carrier, a golf-media
  group), with the honest line that a dividend-paying private company is also an
  acceptable outcome. Pure writing, no new data.
- **Ace video + course testimonial** — you supply a 40-second verified-ace clip
  and two lines from a named GM at Metropolitan or Boschenmeer. Slot the video
  where the concept-phone mockup currently sits: today an investor leaves the
  page having seen only a mockup of a product you have been running for a year.

**Phase 6 — the NDA gate.** Vercel middleware with a server-side check and
signed URLs for `/assets/docs/*`, and a real signature store. Until it ships,
correct the "audit purposes" wording immediately — that claim is untrue as
built, and the workbook behind the gate contains Santam's commercial terms.

---

## Verification

1. **Formula-graph evaluation.** Both workbooks carry no cached values and
   LibreOffice does not work in this container. Reuse the evaluator approach
   already proven here (`evalwb.py` in the scratchpad — openpyxl reads the
   formula strings, build the dependency graph, evaluate). Required result:
   **0 formula failures, 0 bad sheet references**, and every workbook output
   tying to `model.json` to within 0.01%.
2. **Automated tie-out sweep.** Extract every currency figure, percentage and
   multiple from `index.html`, `dataroom.html` and the three `doc-*.html` files
   and assert each against `model.json`. This check does not exist today and is
   the reason drift keeps recurring — it should be committed as
   `scripts/tie-out.py` and run before every PDF regeneration.
3. **Self-check the arithmetic that failed this audit:** each sensitivity row
   must satisfy `valuation = 3.0 × total revenue`; stream components must sum to
   the stated total; post = pre + raise; stake = equity% × milestone;
   multiple = stake ÷ R8m; use-of-funds must sum to 100.
4. **Browser console clean** on `index.html` — `js/calculator.js` currently
   prints two assertion failures on every load; both must be gone.
5. **Grep for the withdrawn round** (R4m / R40m / R36m / 2.42× / 12.5× / 34% /
   R147m / R807m / 2.74×) across every file including both workbooks. Only the
   unrelated 10% course revenue-share hits should remain.
6. **Render and read.** Serve on `python3 -m http.server`, screenshot at 390px
   and 1440px, and read the deal section as an investor who has just been handed
   the management accounts. If the seam between traded and forecast is not
   something the page points at itself, Phase 3 is not done.
7. **Regenerate all three PDFs** per `scripts/docs/README.md` and diff every
   figure against the site.
8. **Accessibility pass:** compute every text/background contrast pair against
   4.5:1 (and 3.0:1 for UI); tab the whole page and confirm a visible ring on
   every control on both light and dark surfaces; check heading order has no
   skips; confirm the carousel can be paused by touch.
9. **Measure, don't assume:** re-measure page height at 390px (currently
   24,094px), the y-offset of the deal band (currently 18,015px — target under
   1,500px), and total transferred bytes (currently ~4.66MB).

---

## What to run first

If only one thing gets done: **Phase 1**. Four of the six accounting blockers
are model-level, and every published surface is downstream of them — fixing copy
before the model is rebuilt means fixing it twice.

If two: Phase 1, then **C1 + C9** (cut the course wall, add the deal band). The
numbers being right does not help if the terms are 22 screens down.

The single cheapest credibility gain in the whole plan is Workstream D — you
already have the cap table, the management accounts, the Santam agreement and
the legal opinion. Publishing them closes A7, A13, B2, B10.2 and B10.3 and
requires no modelling work at all.
