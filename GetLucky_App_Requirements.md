# Get Lucky Golf Club — App UX & Technical Requirements

**The Slip, specified: slip to settlement, verification to claim, pilot to launch.**
August 2026 · Confidential — working spec v1.0 for Johannes le Roux and Cloud & Things

---

## Contents

- **Part A — Foundation**: §0 How to read this · §1 Product principles & the legal spine · §2 Roles & the account model · §3 Information architecture & screen inventory
- **Part B — Flows and engines**: §4 End-to-end flows (F1–F15) · §5 Game rules engine · §6 Handicap & fairness engine · §7 Groups beyond the fourball · §8 The jackpot layer · §9 Verification & claims · §10 Settlement & money UX · §11 Season & social · §12 Pride Mode & responsible play
- **Part C — Commercial and platform**: §13 Subscription & billing · §14 Platform & architecture · §15 Push & the Thursday-night moment · §16 Data model · §17 Integrations
- **Part D — Measurement and quality**: §18 Analytics & the attach metric · §19 Non-functional requirements · §20 Security & anti-fraud
- **Part E — Operations and delivery**: §21 Ops console · §22 Pilot instrumentation · §23 Phasing & the v1.0 cut · §24 Simulator forward-compatibility · §25 Open decisions register · §26 Traceability
- Appendix: Glossary

---

# Part A — Foundation

## §0. How to read this spec

| | |
|---|---|
| Status | Working spec v1.0 — the document the build is held to |
| Owner | Johannes le Roux (product decisions) · Cloud & Things (build decisions) |
| Derived from | `GetLucky_Business_Plan.md` (founder-approved) — §3 is the product's source of truth |
| Figures | `data/model.json` is canonical for every number. This spec restates only what it needs and cites the JSON key. If a figure here ever disagrees with the JSON, the JSON wins and this file has a bug |
| Screens | The six concept screens at `index.html:284–467` are the visual reference investors have already seen. This spec extends them; it does not contradict them |

**Requirement language.** MUST = non-negotiable, ships in the stated phase. SHOULD = the default; deviation needs a written reason. MAY = allowed, builder's judgement. Requirements are numbered (`P-1`, `F2-3`, …) so build tickets can cite them.

**Decided vs OPEN.** Everything in this spec is decided unless tagged **OPEN**. OPEN means the call belongs to the founder (usually with counsel, the insurer or the build partner) and this spec deliberately does not make it — it states the question, the options and the deadline in §25. Where a flow needs *some* behaviour before an OPEN is resolved, the spec marks a **holding position**: build this, expect it to be confirmed or swapped.

**Change control.** This file lives at the repo root beside the business plan. Changes are commits; the changelog is git. Anything that changes a published figure must pass `scripts/tie-out.py` before it lands.

---

## §1. Product principles & the legal spine

The product in one line: **the fourball's money game — skins, nassau, dots — with a $100,000 insured hole-in-one on the slip, underwritten by Santam.** The principles below are the constitution. Every flow, screen and API in this spec is downstream of them; when a design question has no answer in its section, the answer is here.

**P-1 · Two kinds of money, two regimes, never mixed.** This division is the product's legal spine as much as its operational one:

| Whose money | Who verifies | Get Lucky's role |
|---|---|---|
| The players' — skins, nassau, dots, teams, peer-verified CTP and longest drive | The fourball: one enters, one confirms | **None. We keep score. We never adjudicate, hold or touch peer money** |
| The insurer's — the jackpot | Get Lucky: filmed, verified, claims process | Full verification, exactly as proven on the 25 installed courses |

**P-2 · The peer layer is free, forever.** No fee, no cut, no share of any pot, anywhere — zero rake, permanently. Peer GMV is a KPI with zero revenue attached (`model.json` `_note`). No feature, experiment, sponsor deal or growth idea may introduce a charge on, percentage of, or float over peer stakes. Any build ticket that would touch peer money in transit is rejected by principle, not by review.

**P-3 · No custody, no routing.** The app computes who owes whom and deep-links into payment rails the players already use. Money moves player-to-player outside the app. Get Lucky routes nothing, holds nothing, escrows nothing — in every market, in every phase of this plan.

**P-4 · The subscription buys the app, and only the app.** $10/month (`unitEconomics.globalSubUSDpm`) buys access — games, ledger, handicaps, history, group management. It includes no swings and carries **zero prize risk**. Every insured swing is a separate paid entry with 24% of that entry ceded as premium on the same swing that creates the risk (`insuranceModel`). Nothing in the product, the copy or the code may bundle insured attempts into the subscription.

**P-5 · The jackpot is group-pooled.** The fourball buys in together at slip creation; any participating player's ace pays the buyers of the ticket. This is the design decision the product turns on: partners become co-investors in the swing, and filming collapses to four swings on one staged hole.

**P-6 · One enters, one confirms.** Every peer result is attested by two different players. The app records attestations; it never referees them. There is no support queue for "he didn't make that putt."

**P-7 · The app must never argue with the group.** Every fourball has a house rule. Handicaps, allowances, stakes and formats are all visible and all overridable; overrides win, always, and are shown to everyone before they accept. The app's defaults are suggestions with good manners.

**P-8 · Exposure before acceptance.** Each player sees their maximum possible loss for the round, in plain currency, before they accept the slip. No accepted slip may ever cost a player more than the number they accepted.

**P-9 · Guests ride free.** Invited players get the full product for the round — slip, ledger, settlement, season — with nothing to download and nothing to pay. The only monetisation touchpoint a guest ever sees is a dismissible subscribe prompt after their first settlement. A paywall in a guest's path is a build error.

**P-10 · Pride Mode is the default state.** The identical game scored in points instead of money. A new slip starts in Pride Mode; real-money play is the organiser's explicit choice where the market allows it — and unavailable where it doesn't. Pride Mode is a first-class product, not a legal apology.

**P-11 · Launch is USD-led, global, honour mode.** The full experience — slip, ledger, settlement maths — works everywhere from day one because the app never touches money. Wallets and custody are a later, market-by-market unlock behind geo-gated feature flags, only where a licensed route exists, and never load-bearing in this plan.

**P-12 · Geo-gating feature flags from the first commit.** Market × feature × mode gating is architecture, not an afterthought — it is a named gating milestone in the business plan (§6). The restrictive default for an unknown market is Pride Mode with no jackpot.

**P-13 · Responsible play ships in v1** regardless of what any regulator requires: exposure preview, table-stakes caps, self-set loss limits with cooling-off, "even it up" prompts (§12).

**P-14 · Never overstate the paperwork.** As at August 2026 the P2P counsel opinion and Santam's written sign-off on the peer-game wrapper are *gating milestones, not facts* (`insuranceModel.status`: no revised policy is bound on these terms). Product copy, App Store metadata and investor surfaces must carry the milestone framing until each is signed.

---

## §2. Roles & the account model

The business plan describes organisers and guests in monetisation terms (§7: organizer-pays). This section turns that into an account model.

### 2.1 Roles

| Role | Who | What they can do |
|---|---|---|
| **Organiser** | A subscriber | Everything: create slips, invite, set games/stakes/handicaps, designate the jackpot hole, send, trigger settlement, rematch. The one who pays $10/month |
| **Guest** | An invited player without a subscription | Full playing experience for the round: view the whole slip, accept/decline, enter and confirm scores, film a jackpot swing, appear in settlement and the season ledger. Cannot create slips |
| **Confirmer** | Any accepted player, per result | The second attestation on a peer result (P-6). Not a persistent role — a hat any player wears for a given entry |
| **Ops** | Get Lucky staff | Verification review, claims handling, course/rig admin, refunds, responsible-play operations (§21). Insurer-money matters only — ops has no tools to touch a peer game, by design |

**R-1** A subscription is the entitlement to *create* slips (and only that). Everything else in the golfer app MUST work identically for subscribers and guests. **R-2** Any player MAY be a member of many groups and many slips concurrently. **R-3** Ops roles are separate accounts in a separate console (§21) — there is no "admin mode" inside the golfer app.

### 2.2 Identity & lifecycle

**R-4** A guest identity MUST be creatable from an invite link in one step: display name + one verified contact handle (phone or email — the invite channel pre-fills it). No password on day one; possession of the handle is the credential (magic link / OTP).
**R-5** A guest identity persists across rounds. The same handle re-invited next Saturday is the same player: same season ledger, same IOUs, same crest. This is what makes "You are $67 up on Dave since March" possible — Dave has never paid and has never downloaded, and his ledger is still real.
**R-6** Guest → organiser conversion MUST be a promotion of the *same* account (subscribe = add billing to the existing identity), never a new account. All history carries.
**R-7** The conversion prompt appears after a guest's first settlement — and only then (business plan §7). It is dismissible and never blocks any guest action (P-9).
**R-8** Account merge: if one human ends up with two identities (phone and email), a verified merge MUST combine slips, ledgers and IOUs with a full audit trail. Season pair records merge by re-keying.
**R-9** Deletion: any player (guest included) can delete their account. Peer-game history they appear in survives in *other* players' ledgers as an anonymised counterparty ("a former player"), because a ledger with holes in it is wrong for the players who remain. Verification media follows the §19 retention schedule, not the account.
**R-10 OPEN** — guest data retention: how long an inactive guest identity (and its contact handle) is kept before anonymisation. Holding position: 24 months of inactivity, then anonymise. Founder + counsel confirm in §25.

### 2.3 Permission matrix

| Action | Organiser | Accepted guest | Invited (not yet accepted) |
|---|---|---|---|
| Create slip / set games & stakes | ● | — | — |
| Edit slip before lock | ● | — | — |
| View full slip incl. everyone's exposure | ● | ● | ● (the invite shows the whole slip) |
| Accept / decline | ● (implicit) | ● | ● |
| Opt in to the group jackpot ticket | ● | ● | with accept |
| Enter a score | ● | ● | — |
| Confirm a score (not their own entry) | ● | ● | — |
| Film / submit a jackpot swing | ● | ● (if opted in) | — |
| Trigger settlement view · mark-as-paid | ● | ● | — |
| Rematch (recreate slip) | ● | prompted to subscribe | — |
| See season ledger vs named mates | ● | ● | — |

---

## §3. Information architecture & screen inventory

### 3.1 The four tabs

The IA is already public on the concept screens: a bottom tab bar — **Slip · Ledger · The Shot · Season** (`index.html` `.ap-tabs`). It survives contact with the spec unchanged:

| Tab | Job | Home state |
|---|---|---|
| **Slip** | Build, send, accept, and read the bet card | The next upcoming slip; else the builder (organisers) / an empty state with your groups (guests) |
| **Ledger** | The live round: standings, hole feed, score entry | The active round; else last round's final ledger |
| **The Shot** | Everything insurer-side: the jackpot ticket, arming, filming, verification, claim status | The armed/next jackpot hole; else ticket history |
| **Season** | The memory: season ledger per mate, groups, order of merit, rematch | Season ledger list |

The tab bar is the golfer app's whole top-level surface. Settlement is not a fifth tab — it is the Ledger's end state (screen 6 of the concept row confirms this reading: settlement renders under the Season-highlighted tab only because the rematch card sits on it; in the build, settlement lives at the end of Ledger and pushes its season update into Season).

### 3.2 Concept screens → spec screens

| Concept screen (`index.html`) | Lines | Spec screens it seeds |
|---|---|---|
| 1 · The Slip | 334–355 | S-03 Slip builder · S-06 Slip summary |
| 2 · Slip sent | 358–377 | S-07 Acceptance tracker · S-20 Guest accept (web) |
| 3 · Live ledger | 380–400 | S-08 Standings · S-09 Round feed · S-10 Score entry |
| 4 · The $100K hole | 403–423 | S-13 Armed hole · S-14 Filming viewfinder |
| 5 · The ace | 426–442 | S-15 Verified-ace celebration · S-16 Claim tracker |
| 6 · Settlement | 445–463 | S-11 Settlement card · S-17 Season ledger |

### 3.3 Screen inventory

Golfer app, v1.0. ~34 screens. States listed are the ones a designer must draw, not an exhaustive enum.

| # | Screen | Tab / stack | Purpose · key states |
|---|---|---|---|
| S-01 | Welcome / sign-in | onboarding | OTP or magic link; store-build and PWA share it. States: new, returning, link-expired |
| S-02 | Subscribe paywall | onboarding (organisers only) | Shown only on *create slip* without a subscription. $10/mo, what it buys, restore purchase |
| S-03 | Slip builder | Slip | The seven steps of §4-F2 as one scrolling card, matching concept screen 1. States: draft, ready-to-send |
| S-04 | Game picker sheet | Slip modal | Add/edit a game: format, stake, options (carryovers, presses, dots catalogue) |
| S-05 | Handicap sheet | Slip modal | Per-player playing handicaps, allowance preset, stroke-index preview, override editor (§6). States: fetched, manual, overridden |
| S-06 | Slip summary | Slip | The card as it will render in the chat; exposure line; send. States: sent, partially accepted, locked |
| S-07 | Acceptance tracker | Slip | Concept screen 2: who's in, exposure shown, lock countdown. States: pending, all-in, lock-warning, locked |
| S-08 | Standings | Ledger | Concept screen 3 top card: running P&L per player with reason strings |
| S-09 | Round feed | Ledger | Hole-by-hole events: skins carried, presses, dots, jackpot-hole-next |
| S-10 | Score entry | Ledger | Per-hole gross scores + dot toggles; enter → awaiting confirm → confirmed. Offline badge state |
| S-11 | Settlement card | Ledger (end state) | Concept screen 6: insurer card separate, netted transfers with rail chips, mark-as-paid states, IOU rows |
| S-12 | Dispute sheet | Ledger modal | A contested entry: both attestors, re-enter or scrub-hole actions (§4-F5). Never an appeal to Get Lucky |
| S-13 | Armed hole | The Shot | Concept screen 3 gold card + screen 4 top: the designated hole, group ticket, who's in, arming checklist (GPS, ball-ID) |
| S-14 | Filming viewfinder | The Shot | Concept screen 4: rec state, swing n of m, per-player swing order, tee-cam status on installed courses |
| S-15 | Verified ace | The Shot | Concept screen 5: celebration, verification checklist, "$25,000 each" split display |
| S-16 | Claim tracker | The Shot | Claim state machine surface (§9): submitted → review → insurer → paid; documents needed |
| S-17 | Season ledger | Season | Per-mate lifetime P&L, IOU balance, rounds count |
| S-18 | Group page | Season | Named group, crest, members, order of merit (v1.x), rematch |
| S-19 | Rematch confirm | Season modal | One tap rebuilds last slip: same four, games, stakes; edit before send |
| S-20 | Guest accept | web (PWA) | The invite link target: full slip, exposure in plain currency, one-tap accept, add-to-round. No download, no store detour |
| S-21 | Guest post-settlement | web (PWA) | Settlement view + the one conversion prompt (R-7) |
| S-22 | Profile & settings | stack | Name, avatar, handicap source, preferred payment rail (one-time setup the settlement card reuses), notifications |
| S-23 | Responsible play settings | stack | Loss limits, cooling-off, caps; always reachable in ≤ 2 taps from any money surface (§12) |
| S-24 | Pride/real-money selector | Slip step | The mode choice at slip creation; locked markets show Pride only (P-10, P-12) |
| S-25 | Jackpot opt-in sheet | Slip modal | Tier choice, per-player buy-in, what's insured, who verifies; per-player opt-in states |
| S-26 | Ball registration | The Shot modal | Photograph the marked ball (the "GL-07" pattern), tie it to the ticket (§8) |
| S-27 | Course picker | Slip step | Installed courses flagged (their designated hole pre-set); any course searchable; par-3 picker for open-course jackpot |
| S-28 | Offline banner / sync state | global | Queued entries count, "will sync", conflict prompt (§4-F15) |
| S-29 | Notifications inbox | stack | The push taxonomy of §15, in-app mirror |
| S-30 | Exposure explainer | modal | The maths behind "your max today: $187", per game (P-8) |
| S-31 | IOU list | Season | Open IOUs by mate, nudge, mutual write-off |
| S-32 | Subscription management | stack | Plan, renewal, cancel; store-billing hand-off where required (§13) |
| S-33 | Legal & about | stack | Terms, privacy, responsible play, licences; per-market variants via flags |
| S-34 | Empty/first-run states | all tabs | Each tab's zero state sells the next action (build a slip, invite the four, arm a hole, start a season) |

### 3.4 Design system constraints

- **Chrome**: dark-green app surfaces — `linear-gradient(175deg, #1e3120, #16261a)` as coded in `css/styles.css` (`.appscreen`). Cards are translucent cream hairlines (`.ap-card`), gold variant for anything insurer-side.
- **Money semantics**: winning = gold (`--gold-soft`), losing = the muted clay `#dc9885` (`.ap-dn`). Insurer money is *always* visually separate from peer money (concept screen 6: "From the insurer · separate from your game" — this separation is a P-1 requirement, not a styling choice).
- **Type**: PosterGothic for display (uppercase, tight leading), Inter for UI. Both already licensed and in the repo.
- **The state-signal accent**: the Srixon optic-yellow ball colour is reserved for *state*, not decoration — the shot tracer, the live/recording indicators, the win moment. The exact hex MUST be sampled from the founder's supplied ball photography (a green-leaning fluorescent yellow, not a warm yellow) — do not guess it (HANDOFF, 2026-08-04 decision). On the dark viewfinder it reads as a product detail: Ernie plays a yellow ball.
- **Tone**: plain-spoken and wry, named characters, short declaratives — "Dave → Johannes $13. Done." Copy that argues with the group, hedges, or sounds like a terms sheet is off-brand everywhere except S-33.

---

# Part B — Flows and engines

## §4. End-to-end flows

Fifteen flows cover the golfer app. Each is specified as trigger → steps → states → edge cases → acceptance criteria (AC). Screens reference §3.3; rules reference §5–§12.

### F1 · Organiser onboarding & subscription

**Trigger**: a golfer wants to create a slip. **Steps**: S-01 sign-in (handle + OTP) → profile basics (name, avatar optional) → handicap source (§6: connect, or manual, or skip) → preferred payment rail (one-time, reused on every settlement card; skippable) → first *create slip* tap raises S-02 subscribe → billing (§13) → S-03 builder.
**States**: new, returning, lapsed subscriber (history intact, create disabled).
**Edge cases**: a guest with history subscribing (R-6 — same account promoted); subscription fails mid-checkout (return to builder in draft, nothing lost); a subscriber whose payment lapses mid-slip (existing slips run to settlement; only *new* creates gate).
**AC**: a returning subscriber reaches a ready-to-send slip in under a minute (§19 perf budget); no flow ever asks a guest to subscribe except R-7's prompt; a lapsed organiser's guests are unaffected.

### F2 · Slip creation — the seven steps

The business plan §3 fixes the steps; this flow fixes their behaviour. All seven live on one scrolling builder (S-03), not a wizard — the golfer can hop between them, and the slip is screenshot-ready at every moment.

1. **The round** — course (S-27), date, tee time. Installed courses are flagged and carry their designated jackpot hole.
2. **The four** — from recents/groups; "Rematch" pre-fills everything from the last slip with this group (F10). 2–4 players in v1 (§7 for larger).
3. **Handicaps** — pulled automatically where a source is connected (WHS/GHIN via the §17 adapter), manual otherwise; every allowance visible and overridable (S-05, §6). The app must never argue with the group (P-7).
4. **The games** — a stack (S-04): skins (gross/net, carryovers), nassau (presses), team better-ball, dots (greenies, sandies, barkies, the snake). Each with its own stake. Rules in §5.
5. **The jackpot** — the house layer, visually distinct (gold): tier choice from the §8 ladder, per-player buy-in, opt-in per player (S-25). Only offered where the market flag allows and a par-3 is designated (§8). Skippable in one tap — the peer slip stands alone.
6. **Send** — the slip renders as an image (§11.4) into the group's chat, plus in-app invites. Every invitee sees the *full* slip and their own maximum exposure before accepting (P-8, S-20).
7. **Lock** — at the first tee (F4).

**States**: draft → sent → locked. Draft slips are private to the organiser.
**Edge cases**: no par-3 data for an open course (jackpot step hidden, peer slip unaffected); market flag denies real money (builder opens in Pride Mode, money fields become points — P-10); stakes exceeding a player's self-set limit (§12 — the slip can still be sent; the affected player sees the conflict at accept).
**AC**: building the concept-screen slip (four players, three games, jackpot) takes < 60 seconds for a returning organiser; the rendered card is pixel-identical to S-06; a slip with zero games and only a jackpot is valid (the group that just wants the swing); a slip with games and no jackpot is valid.

### F3 · Guest invite & accept

**Trigger**: the slip image + link lands in the group chat. **Steps**: tap → S-20 in any mobile browser, instantly (no store, no install): the full slip — the four, the games, the stakes, the jackpot, *and this player's maximum exposure in plain currency* → one-tap accept (creates/loads the guest identity, R-4) → optional home-screen add (PWA) → done; the acceptance tracker (S-07) updates for everyone.
**States** (per player): invited → viewed → accepted / declined.
**Edge cases**: an invitee opens the link after lock (read-only view: "locked at the first tee — catch the next one"); a declined player before lock (organiser can replace — F4); the same handle invited to two slips at the same tee time (both open; scoring presence is per-slip); a forwarded link reaching a stranger (the invite is bound to a handle: OTP on accept keeps Dave's slip Dave's).
**AC**: cold tap → accepted in < 60 s on a mid-tier phone over course LTE; the exposure figure a guest accepts equals what settlement can maximally charge them (P-8, property-tested against §5's engines); nothing in the flow asks a guest for money (P-9).

### F4 · Lock at the first tee

**Trigger**: tee time reached, or the organiser locks manually. **Steps**: lock warning to non-responders at T-12h and T-1h (§15) → at lock, unaccepted invitees drop off the slip → exposure recomputed for the remaining field if any game's maths depends on player count (§5 flags which do) → any player whose exposure *increased* by the drop MUST re-accept before their games arm; games un-armed by a missing re-accept are removed from the slip for everyone → locked.
**States**: sent → lock-warning → locked (immutable: no games, stakes, handicaps or players change after lock; the only post-lock mutations are scores, attestations and §8 ticket events).
**Edge cases**: nobody accepted (slip expires quietly, organiser nudged to rematch another day); jackpot opted-in but payment incomplete at lock (§8 — the peer slip locks, the unpaid ticket lapses); organiser no-show (any accepted player can run scoring; the slip stands).
**AC**: no accepted player's exposure ever exceeds the figure they last accepted; a locked slip serialises to an immutable record (the settlement and any dispute reference exactly one canonical slip).

### F5 · Scoring & attestation — one enters, one confirms

**Trigger**: a hole is finished. **Steps**: any accepted player enters gross scores + dot events for the hole (S-10) → the entry is *provisional* → any *other* accepted player confirms (one tap; the confirm screen shows exactly what was entered) → confirmed; the ledger recomputes (F6).
**States** (per hole): unscored → entered (provisional, shown hollow in the ledger) → confirmed (solid) → contested (F5a).
**F5a · Dispute**: any accepted player can contest an entered *or* confirmed hole before settlement → S-12 shows the entry and both attestors → resolution is one of: re-enter + re-confirm (fresh pair of attestations), or **scrub the hole** for a named game (that hole scores as halved/void for that game; needs enter + confirm like any result). There is no third path: Get Lucky adjudicates nothing (P-1); the dispute UI's job is to make the group's own resolution frictionless, and the round feed shows a contested hole to all four — sunlight is the referee.
**Edge cases**: the same player trying to confirm their own entry (blocked — the pair must differ, P-6); edit after confirm (allowed until settlement; re-opens the pair: edit + fresh confirm); a hole left unscored at settlement (F9 treats it as halved/void per game and says so on the card); two players entering the same hole concurrently (first write wins, second sees a merge prompt — F15 rules).
**AC**: no result affects the ledger as *confirmed* without two distinct attestors; the full attestation trail (who entered, who confirmed, edits, disputes) is on the record for every settled slip; scoring a typical hole takes ≤ 3 taps for scores plus one per dot.

### F6 · Live ledger

**Trigger**: any confirmed (or provisional) result changes. **Steps**: the engines (§5) recompute the full slip state → standings (S-08) show per-player running P&L with reason strings ("2 skins · greenie"); the feed (S-09) shows the hole-by-hole story ("6th halved — skin carries, $20 rides on the 7th").
**Rules**: the ledger is **derived, never hand-edited** — there is no "adjust balance" anywhere in the product; the only inputs are attested results. Provisional entries render distinctly and are labelled. Carryovers and presses surface as feed events the moment they arm.
**Edge cases**: offline devices show their local ledger with the sync badge (F15); Pride Mode shows points with identical mechanics (§12).
**AC**: ledger recompute is deterministic and pure (same slip + same results = same ledger, on any device); online propagation of a confirmed score to the other three phones in ≤ 5 s (§19); the "nobody argues on the 18th" claim holds — the final card's every line traces to attested results.

### F7 · The Shot — arming and filming

Two lanes, one flow. Installed course: the rig does the watching. Open course: the phone does.

**Trigger**: the round approaches the designated hole (GPS) or a player opens The Shot tab.
**Steps (common)**: the armed-hole screen (S-13) shows the ticket (tier, who's in, the prize), the arming checklist — ball registration done (S-26), GPS inside the hole's geofence, and (installed) tee-cam heartbeat — then the swing order.
**Installed lane**: the rig films continuously; the app arms the ticket, tags each player's swing window (concept screen 4: "Tee cam locked · ball GL-07 · GPS ✓"), and the phone viewfinder is a bonus angle, not the evidence.
**Open lane**: a playing partner films each participating swing in-app (S-14): continuous clip, tee visible, ball flight to outcome; the app watermarks time + GPS into the capture and queues the upload (F15 handles no-signal — capture is fully offline-capable).
**States** (per ticket): unarmed → armed → swings in progress (n of m filmed) → complete / lapsed.
**Edge cases**: the group reaches the hole with no connectivity (arming pre-fetched at lock: geofence, ball-IDs, swing order all work offline; uploads queue); a player skips their swing (their entry lapses — §8 refund posture); weather abandonment before the hole (§8: entries for unattempted swings follow the refund posture); phone dies mid-swing on the open lane (the swing counts only if the clip meets the §9 evidence bar — the checklist warned before the first swing).
**AC**: on installed courses, arming adds zero interruptions to pace of play; on open courses, filming four swings adds ≤ 4 minutes total; every completed swing yields an evidence package meeting §9 or is flagged *before the group leaves the tee*.

### F8 · Ace → verification → claim → payout

**Trigger**: a filmed swing holes out. **Steps**: the group marks the swing as an ace in the moment → celebration state renders *provisionally* ("pending verification" — the concept screen's "Verified ace" badge appears only after §9 review) → the evidence package auto-submits → verification (§9: installed = same-day target; open lane = reviewed inside 24 hours) → verified: S-15 celebration finalises, the claim opens with the insurer via the broker (concept screen 5: "Claim opened with Santam · FSP 3416") → S-16 claim tracker walks the winners through KYC and payee details → **the insurer pays the winners directly** — prize money never routes through Get Lucky (P-3 applies to insurer money too; "never from anyone's pocket" and never through ours) → paid; the settlement card shows the insurer line *separate from the peer game* (concept screen 6).
**Split display**: the app displays the group split (e.g. "$100,000 — $25,000 each") for the ticket's participating players. **OPEN**: the legal owner of the claim and the tax treatment of the split (one claimant redistributing vs four co-claimants) — counsel + insurer decide; the claim UI is built to name 1–4 payees so either answer fits (§25).
**Rejection path**: verification fails → the ticket resolves unpaid with the reason shown plainly (evidence bar not met / fraud indicators → §20 hold); the peer game is *untouched* — the slip settles normally. Appeal is a §21 ops re-review with any additional evidence, once.
**AC**: a winner reaches "claim opened" without leaving the app; every state change notifies all ticket participants (§15); rejection copy never accuses — it states what the evidence didn't show; the peer settlement is never blocked by any jackpot state.

### F9 · Settlement — the 19th hole

**Trigger**: 18 confirmed holes, or any accepted player ends the round early (with the group's usual confirm pair on the final state).
**Steps**: the engines finalise → unscored holes resolve per F5 edge rule and are labelled on the card → netting (§5.6) reduces the web of results to the minimum transfers → S-11 renders: the insurer card first if there was an ace (separate, gold), then "The money game · netted to N transfers", each row deep-linked into the payee's preferred rail (§10) with amount and reference pre-filled → payer taps the rail chip, pays outside the app, returns → **mark-as-paid**: payer marks; payee confirms; unconfirmed marks auto-confirm after 72 h unless the payee objects (§10 holding position) → any transfer left unpaid becomes an **IOU** (F10, §10.3) — carried forward, not nagged to death: the strongest reason the group returns next Saturday.
**States** (per transfer): due → marked → confirmed / contested → IOU.
**Edge cases**: a payer with no rail set (copy-details fallback always present); partial payment agreed in the car park (payee confirms a hand-edited received amount; the remainder IOUs — the *transfer* can be adjusted by the payee downward, never the ledger, F6); Pride Mode (no transfers — the card shows points and the season ledger updates in points, §12).
**AC**: netted transfers are provably minimal and deterministic (§5.6); the sum of transfers equals the sum of net positions to the cent; the settlement card renders as a shareable image (§11.4) — the second Thursday-night artefact; no rail integration is load-bearing: every transfer has a works-everywhere copy path (P-3).

### F10 · Season & rematch

**Trigger**: settlement confirmed, or the Season tab.
**Steps**: season ledger (S-17) updates per pair ("You vs Dave · all-time · 27 rounds · +$240" — concept screen 6); open IOUs sit against the pair; the rematch card offers "Same four, Saturday 07:30?" → one tap (S-19) rebuilds the entire slip — players, games, stakes, jackpot tier — for the organiser to adjust or send as-is (business plan §3 step 2).
**Edge cases**: rematch by a guest (the subscribe moment, R-7 — the prompt explains *why*: creating is the organiser's seat); a mate who deleted their account (R-9 — the pair renders anonymised); season rollover (the ledger is lifetime; "season" views are date-windowed, order of merit in v1.x per §23).
**AC**: rematch → ready-to-send in ≤ 3 taps; season figures always reconcile to the sum of settled slips minus written-off IOUs (§16 integrity rule).

### F11 · Pride Mode

**Trigger**: slip creation (default state, P-10), or a market flag forcing it.
**Steps**: the builder opens in Pride Mode — identical games, points not money ("10 points" where "$10" would sit) → switching a slip to real money is an explicit organiser action (S-24), available only where the market flag allows → from that point the flow is identical.
**Rules**: no mid-slip mode switch after send — the thing players accepted is the thing that settles (P-8). The jackpot is governed separately: it is insurer-side and appears only where its own flag allows (§8); a Pride Mode slip MAY still carry a real jackpot ticket where lawful — the peer game is points, the swing is insured (**OPEN** with counsel per market, §25; holding position: jackpot availability follows its own flag, independent of slip mode).
**AC**: Pride Mode is feature-complete (ledger, settlement card in points, season in points) — a lifetime Pride player misses nothing mechanical; the mode is legible on every money surface (nobody screenshots a points slip believing it's dollars).

### F12 · Mid-round edge cases

The round survives contact with reality. All resolutions follow one meta-rule: **the slip's accepted terms never silently change** (P-8).

| Event | Resolution |
|---|---|
| Late join (a fifth arrives, or the fourth shows up after lock) | A locked slip's field is fixed (F4). The latecomer joins the *next* slip; v1 does not splice players into live games |
| Drop-out mid-round (injury, called home) | Their scored holes stand; remaining holes score per format default (§5: skins — absent player can't win a skin; nassau/better-ball — their side concedes holes they don't play; dots — no new dots). The card labels the early exit |
| No-show at lock | F4 drop rules (they were never in) |
| Round abandoned (weather, course closed) | Any player proposes abandon; one other confirms (the attestation pattern). Games settle on holes completed if ≥ 9 confirmed, else the slip voids to a $0 card; jackpot entries follow §8's unattempted-swing posture. House-rule override at proposal time (settle-as-played vs void) — shown to all before confirm |
| Wrong course / tee data | Before lock: edit freely. After lock: the slip stands as accepted; handicaps do not silently recompute (P-8). The card notes a data correction for the *next* slip |

**AC**: every resolution lands in the feed as an event with its attestation pair; no mid-round event can create money exposure beyond what was accepted.

### F13 · Responsible-play interventions

The §12 controls, as moments. **Triggers and behaviour**:

| Trigger | Intervention |
|---|---|
| Accepting a slip that would breach the player's self-set monthly loss limit | Hard stop with the number ("this slip could take October to −$260, past your −$200 limit"); the player can decline, or raise the limit *after* a 24 h cooling-off (never in the accept flow) |
| A slip whose stakes exceed the table-stakes cap for the group | The builder flags it at creation; each accepter sees it plainly |
| A season pair drifting lopsided (default: one mate down > 10× the group's median stake across ≥ 5 rounds) | An "even it up" prompt to the *group* — suggested friendlier stakes or a Pride round; never a public shaming, always dismissible |
| Cooling-off active | Real-money accept disabled until it lapses; Pride Mode always available |

**AC**: every intervention is auditable (§16); limits are self-set and private to the player; no intervention leaks a player's limits to the group beyond the minimum ("Piet can't accept at these stakes" — never the number).

### F14 · Guest → subscriber conversion

**Trigger**: a guest's first settlement confirms (and only that — R-7).
**Steps**: S-21 shows the settled card, then one prompt: what the organiser's seat unlocks (create, rematch, arm jackpots), $10/month, one tap to S-02 billing → convert (same account, R-6) or dismiss (never re-shown on a settlement again; the standing entry point is the create/rematch affordances they'll naturally hit — F10).
**AC**: conversion never interrupts play, never gates a settlement view, and the dismissal is one tap; the funnel events land in §18 (`guest_convert_prompt_shown` → `subscription_started`).

### F15 · Offline & reconnect

Golf courses have dead zones; the product's core loop MUST complete without signal (§19 sets the tolerance windows).

**Rules**: the locked slip, engines, geofences and ball-IDs are on-device from lock (F4/F7); scoring, confirming, disputing, filming and the local ledger work fully offline; every mutation is a queued, signed event. On reconnect the queue syncs; the server's event log is authoritative *ordering*, and conflicts resolve by the attestation model, not by clock: a result is whatever the latest complete enter+confirm pair says. Concurrent divergent entries for the same hole surface as F5a disputes rather than silently merging. Money-state events (ticket payment, claim states, subscription) are **online-only** and never resolved by last-write-wins — the UI says so at the moment it matters, not after.
**AC**: a full 18 in airplane mode from the first tee yields a complete, confirmable, settle-able slip on reconnect; no sync ever produces a ledger the four phones disagree on once the queue drains; the sync badge (S-28) is honest — counts, not spinners.

## §5. Game rules engine

The formats named in the plan (§3 step 4), specified so two engineers and four golfers get the same answer. The engine is a pure module: `(locked slip, attested results) → (per-player P&L, feed events)`. Deterministic, replayable, unit-testable against the worked examples below — and venue-agnostic by design (§24).

**G-1** All stakes are whole units of the slip currency (or whole points). The engines are constructed so no peer game ever produces a fractional balance: skins pay whole pots to one winner; halves carry; team games pay per side. **G-2** One currency per slip, chosen at creation; the settlement card and season ledger convert nothing. **G-3** Every game in the stack computes independently; the slip's P&L is the sum. **G-4** Every payout emits a feed event with its reason string — the ledger explains itself (S-08's "2 skins · greenie").

### 5.1 Skins

Stake `s` per player per hole. Each hole: one **outright** best score (gross or net per config) wins the skin — `s` from each other player. Tied best = halved: no payment, and with **carryovers on** (default) the skin rides: the next outright winner takes the accumulated pot (concept screen 3: "6th halved — skin carries, $20 rides on the 7th"). Carryovers still riding after 18 pay nobody and the feed says so. Max exposure per player: `18 × s × (n−1)` worst case, computed exactly for the exposure line (P-8).

### 5.2 Nassau

Three match-play bets — front nine, back nine, overall — each at stake `n`, singles or pairs per config. **Presses**: a side that is 2 down in any bet MAY press (opening a new bet on the remaining holes at the same stake); pressing is offered in-app to the side entitled to it, is declinable, and is capped (default: 2 presses per nine, configurable at the builder; a cap is required — it is what makes exposure computable, P-8). Auto-press at 2-down is a config option, visible on the slip before acceptance.

### 5.3 Team better-ball

2v2 (the fourball's natural team game). Each hole, the better net (or gross) ball of each side counts; match play or per-hole stakes per config. Teams are fixed at lock. With three players, better-ball is unavailable (1v1v1 formats are skins/nassau territory — §7).

### 5.4 Dots

The micro-wins layer — per-event payouts of stake `d` from every other player to the earner, entered alongside scores (S-10) and attested like any result (P-6):

| Dot | Earned by | v1 |
|---|---|---|
| Greenie | On the green in one on a par-3, and no three-putt | ● |
| Sandie | Up-and-down from a bunker for par or better | ● |
| **The snake** | *A liability, not a win*: the last player to three-putt **holds** the snake; whoever holds it at the 18th pays `d` to each other player (concept screen 3: "holds the snake") | ● |
| Barkie | Par or better after striking a tree | v1.x |
| Extended catalogue (Arnies, sandies variants, group house dots) | Configurable custom dots: name + trigger entered by the organiser, attested like the rest | v1.x |

Dots are bounded for exposure: greenies ≤ par-3 count, snake ≤ `d × (n−1)`, sandies capped at a configurable per-player max (default 3) so P-8 stays computable.

### 5.5 Peer-verified CTP & longest drive

Closest-to-the-pin (named par-3s) and longest drive (named holes) as **peer games**: the fourball is standing on the green and can see — the winner is entered and confirmed like any result. The company never measures proximity (business plan: the whole point). Flat stake per event from each player to the winner. These are peer money, regime one, always (P-1) — the machine-measured insured CTP is a simulator-era product (§24), a different regime entirely.

### 5.6 Netting

After the engines finalise, net positions are reduced to the minimum transfer set:

1. Compute each player's net position; positives are owed, negatives owe. (Sum is zero by construction.)
2. Repeatedly match the largest debtor to the largest creditor for `min(|debt|, |credit|)`; ties broken by slip join order. This yields at most `n−1` transfers — the provable minimum when all positions are nonzero.
3. Emit transfers in descending amount: the card reads biggest first.

Worked example (the concept slip): final nets Johannes +$41, Dave +$?… the canonical test vector is concept screen 6 — Piet → Johannes $28, Dave → Johannes $13, Markus → Dave $6: three transfers from four players, every line traceable to feed events, and the punchline holds: "Dave → Johannes $13. Done."

**G-5** Netting is deterministic: same slip, same results, same transfers, on every device. **G-6** The netting step MUST verify `Σ transfers = Σ positive nets` exactly before rendering; a mismatch is a build error, never a rounding note on the card.

## §6. Handicap & fairness engine

The business plan (§12) names this the make-or-break component and staffs it accordingly. The reason: money games die on the first accusation of an unfair stroke. The engine's job is to make the strokes *explainable*, and then get out of the way (P-7).

**H-1** Handicap sources, in order: connected federation index (WHS/GHIN via the §17 adapter — **OPEN** licensing, §25), else manual index entered by the player or organiser, else "no handicap" (plays gross). The source is *labelled* on the slip — everyone sees whose number came from where.
**H-2** Playing handicap: from index + course/tee data (slope, rating, par) per the WHS course-handicap method where tee data exists; from index directly where it doesn't. The computation is shown, not just the result (S-05: tap the number, see the maths).
**H-3** Allowances per format, as visible presets: singles match/skins net 100% difference off the low man; better-ball pairs 90%; defaults follow published WHS recommendations — and every preset is a suggestion (P-7).
**H-4** Strokes fall on the card by stroke index (concept screen 1: "HC 18 · gets 6 strokes" — the six lowest-index holes). No tee data → strokes fall on the odd-index holes by convention, labelled as such.
**H-5** Overrides win, always: any player's playing handicap, any allowance, any stroke placement is editable by the organiser before send; edits are highlighted to every accepter ("Dave plays off 15 today — house rule"), and an override after any acceptance re-opens that player's acceptance (P-8's fairness cousin: nobody discovers an edit on the 18th).
**H-6** After lock, handicaps are frozen for the slip (F12). Federation sync updates the *next* slip.
**H-7** The engine is test-vectored: a published table of index × tee × format → strokes ships with the build and is the acceptance test — and doubles as the support page when a fourball wants to check the maths (they will).

## §7. Groups beyond the fourball

Everything assumes a fourball; reality sends threes. v1 supports 2–4; v1.x opens 5+ and societies (§23).

| Field | What changes |
|---|---|
| 2 players | Skins = holes (winner takes `s`); nassau singles; better-ball off; dots pairwise; jackpot ticket = the two of them |
| 3 players | Skins/nassau/dots as specified; better-ball off (G-3.3); the exposure maths use `n=3` throughout |
| 4 players | The designed centre of gravity — everything above |
| 5+ (v1.x) | Skins and dots generalise by the same formulas; nassau/better-ball become multi-pair configs; slip UX paginates the field |
| Societies & leagues (v1.x) | Many slips under one banner: an order of merit aggregates settled slips into season standings (§11); club/society admin surfaces ride on the group model, not a new object |

**Jackpot pooling by size**: the group ticket is `k × tier entry` where `k` = opted-in players (1 ≤ k ≤ field). "The four buy in together" is the designed default, not a constraint — a three-ball's ticket is `3 ×` (§8.3).

## §8. The jackpot layer

The house layer on the slip — insurer money, regime two, gold on every surface.

### 8.1 The ladder

Per-player entry tiers, exactly `insuranceModel.ladder`:

| Entry | Insured prize | Modelled mix |
|---|---|---|
| $1 | $500 | 25% |
| $5 | $2,500 | 25% |
| $10 | $10,000 | 30% |
| $50 | $50,000 | 15% |
| $100 | $100,000 | 5% |

One tier per ticket (the group buys at one level). 24% of every entry is ceded as premium on the same swing that creates the risk (`premiumPctOfEntry`); the subscription includes no swings and carries zero prize risk (P-4). The USD ladder above is the app's ladder; the legacy ZAR stake ladder in `unitEconomics.stakeLadderZAR` belongs to the installed-course walk-up product and MUST NOT be mixed into the app.

### 8.2 Hole designation

- **Installed course** (25 flagship holes, +25/year): the designated hole is fixed in the course DB (§21) with its rig, geofence and yardage. The builder shows it as a made bed: "the 7th — tee cam, Santam, done."
- **Open course**: the organiser designates any par-3 from course data at slip build. No par-3 data → no jackpot on this slip (F2); the peer game is untouched.
- One designated hole per slip; four swings means four entries on *one staged hole* (`engagement.swingsPerAttachedSlip`), not a per-hole product.

### 8.3 The ticket

**J-1** Opt-in is per player at accept time (concept screen 2 marks the jackpot "opt-in"); the ticket = the opted-in players at one tier, `k × entry`. **J-2** Payment is per player, online, before lock (§13 rails); an unpaid opt-in lapses at lock (F4) — no IOUs against insurer money, ever. **J-3** Any participating player's verified ace pays **the ticket's participants** (equal split display; legal owner of the claim **OPEN**, §9). A non-participant's ace on the same hole pays nothing and the feed congratulates them anyway. **J-4** Each participating player swings once on the designated hole, filmed (F7); their entry attaches to that swing. **J-5** A swing not attempted (skip, walk-off, abandonment): the entry was for a swing that never created risk — **holding position**: auto-refund of unattempted entries; **OPEN** to confirm against final policy terms (§25). **J-6** Where a market flag restricts the jackpot, the layer is simply absent — the slip builds without it (P-12).

### 8.4 Arming & the ball

**J-7** Arming (F7) requires, before the first swing: GPS fix inside the hole's geofence, ball registration (S-26: photograph the marked ball; the mark ties ball to ticket — the "GL-07" pattern from concept screen 4), and on installed holes a rig heartbeat. **J-8** All arming artefacts are captured into the evidence package (§9). **J-9** Arming is pre-fetched at lock and works offline except the rig heartbeat, which degrades the installed lane to the open lane rather than blocking the swing (F7).

### 8.5 What the numbers mean (context, not restated economics)

Attach (35% base; 20/55 sceptic/bull), average ticket ($10) and the underwriting book ($17.00 weighted entry, $4.08 premium, $1.30 expected claim, 31.9% loss ratio, 2.51× breakeven) live in `model.json` and the pro forma; the app's job is to *measure* attach honestly (§18) and never to nudge it dishonestly: the jackpot step is one tap to skip (F2), and no dark pattern ever guards it. The pilot decides the number (§22).

## §9. Verification & claims

Regime two in full. The promise on the concept screens — "Every swing filmed & verified — underwritten by Santam" — is an operations system:

### 9.1 Evidence package (per swing)

| Artefact | Installed lane | Open lane |
|---|---|---|
| Continuous video, address → outcome | Rig footage (primary) + optional phone angle | In-app phone capture (primary), time + GPS watermarked |
| Ball identity | Registration photo at arm; mark visible on retrieval | Same |
| Location | Rig = fixed; phone GPS at arm and at swing | Phone GPS at arm and at swing |
| Witnesses | The other players' attestations (auto-requested in-app) | Same — and here they carry more weight |
| Chain | Hash + timestamp at capture; upload integrity check | Same, upload deferred offline |

**V-1** The package is assembled by the app, not the golfer — the flow (F7) makes the right evidence the path of least resistance, and warns *at the tee* if the package will be short. **V-2** Media chain-of-custody per §20.

### 9.2 Review

**V-3** Installed lane: rig + AI shot tracer confirmation, same-day target — most aces near-instant, exactly as proven over 10,000 entries. **V-4** Open lane: human review in the §21 queue against a published checklist — target **inside 24 hours**, the clock shown to the winner (S-16). **V-5** Outcomes: verified / not verified (reason stated plainly) / fraud hold (§20 — different queue, different tone, no promises). **V-6** One re-review on appeal with new evidence, then final (F8).

### 9.3 Claims state machine

`ticket → ace_marked → evidence_submitted → under_review → verified → claim_opened (broker: Indwe → Santam, Authorised FSP 3416) → kyc_pending → payee_confirmed → paid_by_insurer → closed`, with `rejected` (from review) and `fraud_hold` (from anywhere) as exits. Every transition timestamped, auditable (§16), and pushed to all ticket participants (§15).

**V-7** KYC collects the minimum the insurer requires, in-app, once per winner. **V-8** Payout is insurer → winner(s), directly; Get Lucky is never in the funds flow (F8). **V-9** Payees: 1–4 per claim so the OPEN ownership/tax answer (§25) fits without a rebuild. **V-10** The v1 insurer handoff is operational (ops console assembles the claim package for the broker; §17) — no API dependency on the insurer is assumed anywhere.

## §10. Settlement & money UX

### 10.1 Rails

The settlement card deep-links each transfer into the rail the *payee* prefers (set once, S-22):

| Market | Rails (v1) | Mechanism |
|---|---|---|
| US | Venmo, Cash App — pay links; PayPal.Me alongside; Zelle as copy-details fallback | Public link formats, prefilled amount + reference |
| South Africa | SnapScan link; instant EFT / PayShap / Capitec Pay as copy-details with bank reference | Same posture |
| Anywhere | Copy details — always present, works for any bank on earth | The universal fallback |

**M-1** Rails are used unilaterally via their public link formats: no partnership, no API contract, no OAuth — that absence *is* the design (no formal integrations are needed or sought; it keeps the no-custody position clean). **M-2** A rail that changes its link format degrades to copy-details, silently, the same day — the card never breaks on a third party. **M-3** The app never displays a balance it holds, because it holds none (P-3); the card's verbs are "pay Dave", never "withdraw".

### 10.2 Mark-as-paid

**M-4** Payer marks a transfer paid → payee sees it instantly; payee confirm closes it (concept screen 6's "Paid ✓"). **M-5** Holding position: unconfirmed marks auto-confirm after 72 h unless the payee objects (objection reopens the transfer as due; repeated objections between a pair surface in their season view — sunlight again). **M-6** The payee MAY confirm a different received amount downward (car-park partials, F9); the remainder IOUs. **M-7** All of it is attestation, none of it is truth-by-platform: Get Lucky records what the pair says happened and adjudicates nothing (P-1).

### 10.3 IOUs

**M-8** An unsettled transfer becomes an IOU on the pair: visible in Season (S-31), folded into the pair's running balance, surfaced on the *next* slip between the same pair ("carrying $13 from last Saturday — fold it in?"), nudged gently (§15: one nudge at 7 days, then silence — the ledger does the remembering). **M-9** Mutual write-off: either proposes, other confirms; logged. **M-10** IOUs are social debt, not platform debt: no interest, no enforcement, no collections — the design bet (business plan §3) is that an open IOU is the strongest reason the group returns next Saturday.

## §11. Season & social

**11.1 Season Ledger.** Per-pair lifetime P&L across every settled slip (money and points ledgers kept separate), rounds count, open IOU balance — "You are $67 up on Dave since March." **S-1** Figures reconcile exactly to settled slips minus write-offs (§16 integrity rule); the pair view lists the receipts (every slip, tappable). **S-2** A pair spanning modes shows money and points side by side, never summed.

**11.2 Groups & crests.** Named groups ("The Saturday Regulars") with a crest (v1: preset crest library; custom upload v1.x), membership, and the group's slip history. Groups are addressing sugar over the same four accounts — no group wallet, no group money object, ever (P-3).

**11.3 Order of merit (v1.x).** A season standings table over a group or society's settled slips: points-based (configurable: wins, skins count, net winnings), date-windowed seasons, a champion at the yearly close. Ships after launch (§23) — the retention spine's second year.

**11.4 The cards.** Two renderable artefacts, engineered as first-class outputs (they are the product's distribution): the **slip card** (F2 step 6) and the **settlement card** (F9). **S-3** Both render server-side to a share-ready image (9:16-friendly, brand-correct in both modes, gold insurer separation intact) with a deep link back; the image is the ad, the link is the funnel — every slip is three product demos (business plan §9). **S-4** Banter cards (v1.x): auto-generated moments — "Dave holds the snake", "Piet's greenie streak: 3" — one tap to the group chat, tone per §3.4, always about the game and never about the money owed (the app never embarrasses a debtor — M-8's job is quieter).

## §12. Pride Mode & responsible play

### 12.1 Pride Mode

The identical game, points instead of money, **default state** for every new slip (P-10). **PM-1** Feature parity is a hard requirement: every format, the ledger, settlement (a points card), season, rematch — nothing about the mechanics knows it isn't money except the absence of transfers and rails. **PM-2** Real-money slips are an explicit organiser choice at creation (S-24), available only where the market flag allows; restricted markets see Pride Mode with no toggle and no apology — it's the product, not the consolation. **PM-3** No mode switch after send (F11). **PM-4** Pride Mode is the compliant fallback everywhere by construction: a market flag flip to points-only requires zero code.

### 12.2 Responsible play — ships in v1 (P-13)

| Control | Spec |
|---|---|
| Exposure preview | P-8, every accept, every player, plain currency — already on the concept screens ("Your max exposure today · $187") |
| Table-stakes caps | A per-slip total-exposure cap; defaults on (suggested $200/slip), organiser-adjustable within a hard product ceiling (**holding position**: $1,000/slip real-money exposure per player; founder confirms in §25) |
| Self-set loss limits | Per-player monthly net-loss limit, private; breach blocks accepting further real-money slips (F13); raising the limit takes effect after 24 h cooling-off |
| Cooling-off | Player-triggered pause on real-money play (7/30/90 days); Pride Mode remains |
| "Even it up" | The lopsided-pair prompt (F13's trigger table); social-first, dismissible, never automatic action on stakes |
| Self-exclusion | Full real-money self-exclusion per market where required by the §25 legal review; the geo-flag system carries it |

**RP-1** All controls live in S-23, ≤ 2 taps from any money surface. **RP-2** Interventions are measured (§18) — the responsible-play dashboard (§21) is an ops surface, not an afterthought. **RP-3** Copy is a mate, not a ministry: plain, warm, no lectures — but the hard stops are hard (F13).

---

# Part C — Commercial and platform

## §13. Subscription & billing

**B-1** One plan at launch: **$10/month** (`unitEconomics.globalSubUSDpm`), organizer-pays. The subscription buys app access — creating slips is the entitlement; everything else is free for everyone (P-4, P-9). **B-2** Monthly only in v1; annual MAY follow (v1.x) once churn data exists. No free-trial mechanic in v1 — the guest experience *is* the trial (three of every four players ride free; the funnel is F14). **B-3** Cancellation is one screen (S-32), effective at period end, history intact, guests unaffected; win-back is a §15 notification, not a retention maze.

**B-4 OPEN — processor.** Criteria the choice must satisfy (decision: founder + Cloud & Things, §25): USD-primary with multi-currency presentment; ZAR acquiring for South Africa; subscription lifecycle (dunning, proration, tax/VAT handling) out of the box; jackpot entries as one-off charges on the same customer object (J-2); South African entity friendliness. Candidates are deliberately not named here.

**B-5 OPEN — store IAP posture.** The wrapped iOS build sells a digital subscription, which walks into Apple's IAP rules; options (StoreKit subscription in the wrapper vs web-checkout postures under the evolving external-purchase rules vs PWA-only organisers on iOS) carry different margins and different UX. The spec's requirement is only this: guests never touch billing, so the guest flow is store-neutral by construction; the organiser checkout is a swappable module; the decision is made with counsel + Cloud & Things before store submission (§25).

**B-6** Jackpot entries (J-2) are one-off charges, receipted per swing, refundable per J-5 — and always distinct from the subscription on the statement and in the books: the two revenue lines never blur (P-4, and the accountant will thank us).

**B-7 OPEN — the R149 question.** `unitEconomics.membershipZARpm` (R149/month, the South African membership) and the $10/month global subscription must be reconciled into one price architecture before launch — one product at local price points, or a legacy SKU ring-fenced to the installed-course estate. This spec builds one entitlement (create slips) and leaves the price table to the founder (§25).

**B-8** Failed renewals: 7-day grace (full access), then create-gate only (F1's lapsed state). Dunning is the processor's job (B-4); the app's job is to never punish the other three players for the organiser's expired card.

## §14. Platform & architecture

### 14.1 The platform stance

**A-1** **PWA-first web core + wrapped store builds, one codebase.** The web app is the product: the guest flow *requires* join-by-link with nothing to download (P-9 — it is the distribution strategy, not a convenience), and the same core serves organisers in a Capacitor-class wrapper on iOS and Android for the three things the wrapper does better: reliable push (§15), first-class camera capture (F7), and home-screen presence with a store identity. **A-2** Feature parity rule: anything a guest can do works in every mobile browser the §19 support matrix names; wrapper-only capabilities are limited to push fidelity and capture ergonomics — never game mechanics. **A-3** No second codebase, no "native rewrite later" assumption anywhere in the plan.

### 14.2 Offline-first

**A-4** The client is local-first for the round loop: locked slips, engines, scoring, ledger, filming and arming artefacts live on-device (F15); the server's event log is the ordering authority on sync. **A-5** Conflict doctrine: peer results resolve by the attestation model (latest complete enter+confirm pair wins; divergence surfaces as a dispute) — never by wall clock, never silently. **A-6** Money state (ticket payments, claims, subscriptions) is online-only, transactional, and never last-write-wins (F15). **A-7** The engines (§5–§6) are one pure, shared module executed identically client- and server-side; the server's recompute on sync is the source of the *canonical* settlement, and any client/server divergence is a build error by G-5's determinism rule.

### 14.3 Geo-gating flags

**A-8** The flag system ships in the first commit (P-12, a named gating milestone). Taxonomy: `market × feature × mode` — e.g. `ZA: real-money slips ON · jackpot ON`, `US-<state>: real-money slips ON · jackpot flagged per state`, `unknown: Pride ON · jackpot OFF`. **A-9** Resolution: market from account country + play location per the §25 legal review's rule (the review decides which governs when they differ; the architecture carries both). **A-10** Flags are server-authoritative, cached signed on-device for offline (F15 never grants what the last sync didn't), auditable (§16), and default-restrictive (unknown market = Pride, no jackpot). **A-11** Wallets/custody: no code, no schema, no stub in this plan — the flag taxonomy reserves the space (P-11) and nothing else does.

### 14.4 Backend shape

Requirements, not a stack mandate — Cloud & Things owns the build and the stack (business plan §10):

**A-12** An API layer + an event log per slip (the sync substrate of F15) + a realtime channel for ledger propagation (§19's 5-second budget) + a media pipeline (resumable uploads, hash-at-capture, §20 chain-of-custody, lifecycle per §19 retention). **A-13** The engines as a versioned pure library (A-7): a slip records the engine version that settled it — replays stay honest forever. **A-14** Multi-currency money as integer minor units everywhere; no floats touch money. **A-15** Every state transition in §4's flows is an auditable domain event (§16 AuditLog) — the attestation trail is the product's spine and the ops console's raw material. **A-16** Environments: the pilot (§22) runs on production infrastructure with a `pilot` flag, not a fork — the metric identity depends on it.

## §15. Push & the Thursday-night moment

The slip lands in the group chat on Thursday night — the one moment social contagion sells for us (business plan §2). Notifications *support* that moment; the group's own chat carries it. The share card (§11.4) is the hero; push is the drumbeat.

**N-1** Taxonomy (v1):

| Event | To | Default |
|---|---|---|
| Slip invite (in-app echo of the chat link) | Invitees with accounts | on |
| Acceptance ("Dave's in") | The slip | on |
| Lock warnings (T-12h, T-1h) | Non-responders, organiser | on |
| Round start / it's-the-hole (GPS, The Shot) | The slip | on |
| Score confirmed milestones (front nine, presses armed) | The slip | quiet (in-app feed only) |
| Verification & claim transitions (§9) | Ticket participants | on, high priority |
| Settlement ready / marked / confirmed | The slip / the pair | on |
| IOU nudge (one, at 7 days — M-8) | The pair | on |
| Rematch prompt (Thursday after a settled Saturday) | The group | on |
| Subscription lifecycle (B-3, B-8) | The organiser | on |
| Order of merit / banter (v1.x) | The group | opt-in |

**N-2** Channels: wrapper push (APNs/FCM) for organisers and any guest who installed; web push where the platform allows (home-screen PWA on iOS — offered, never demanded); in-app inbox (S-29) always; the chat card remains the primary social channel by design. **N-3** Quiet hours per player timezone (default 21:30–07:00) — nothing but claim-critical crosses it; the *Thursday 19:00–21:00 local* window is the one send-time the growth loop is allowed to prefer (the rematch prompt). **N-4** Every notification deep-links to its exact surface; none exists that a player can't turn off (claim-critical excepted); frequency caps per player per day. **N-5** Notification events land in §18 — the Thursday loop is measured, not vibes.

## §16. Data model

Entities, purpose, key relations, retention class (classes defined in §19.5). Integer minor units for money (A-14); every table event-sourced or audit-shadowed (A-15).

| Entity | Purpose · key relations | Retention |
|---|---|---|
| Account | A human: handle(s), auth, market, prefs. Guests and organisers are the same entity (R-6) | Life + R-10 |
| Subscription | Billing state on an Account (B-x); processor refs, entitlement | Financial |
| Group | Named social wrapper: members, crest, history (§11.2) | Life |
| Slip | The bet card: course, tee time, mode (money/points), currency, state (draft→sent→locked→settled/void), engine version (A-13) | Core |
| SlipPlayer | Account × Slip: invite state, acceptance (with the exposure figure accepted, P-8), role | Core |
| GameConfig | A game on a slip: format, stake, options (§5) — immutable at lock | Core |
| HoleScore | Gross scores + dot events per hole: state (entered/confirmed/contested), attestor pair (P-6) | Core |
| Attestation | The signature object: who, what, when, device — scores, disputes, abandons, marks, write-offs all carry them | Core |
| LedgerEntry | Derived per-player P&L lines with reason strings (F6) — recomputable, cached for display | Derived |
| Press | A nassau press: opener, bet, holes remaining (§5.2) | Core |
| JackpotTicket | The group ticket: slip, designated Hole, tier, state (§8.3) | Financial |
| JackpotEntry | One player's paid entry on a ticket: charge ref, swing link, refund state (J-5) | Financial |
| SwingRecord | One filmed swing: player, ticket, arming artefacts, outcome | Financial |
| MediaAsset | Video/photo evidence: hash at capture, chain-of-custody log (§20), storage lifecycle | Evidence |
| VerificationCase | The §9 review: lane, checklist results, reviewer, outcome, SLA clock | Evidence |
| Claim | §9.3 state machine: broker refs, payees (1–4, V-9), KYC state, payout confirmation | Financial |
| Settlement | The finalised card: netted state, engine version | Core |
| Transfer | One netted obligation: payer, payee, amount, rail used, mark/confirm states (§10.2) | Core |
| IOU | An unsettled Transfer promoted to the pair (§10.3): balance, nudge state, write-off | Core |
| SeasonPair | Account × Account rollup: lifetime P&L (money and points separately), rounds, IOU balance — reconciles to Settlements (S-1) | Derived |
| Course · Hole | Course data: tees, ratings, stroke index, par-3s; Hole carries designation eligibility | Reference |
| InstalledRig | A flagship hole's kit: rig identity, heartbeat, geofence (§21 admin) | Reference |
| MarketPolicy / FeatureFlag | The §14.3 taxonomy: market × feature × mode, versioned, signed | Reference |
| ResponsiblePlayLimit | Per-player caps, loss limits, cooling-off, exclusions (§12.2) — private | Life |
| AnalyticsEvent | The §18 taxonomy — append-only | Analytics |
| OpsUser | Console identities & roles (§21) — separate auth realm (R-3) | Staff |
| AuditLog | Every privileged/ops action and every domain state transition worth disputing (A-15) | Audit |

**D-1** Integrity rules enforced in the schema, not just the app: Transfer sums equal Settlement nets (G-6); SeasonPair reconciles to Settlements (S-1); no JackpotEntry without a paid charge (J-2); no Claim payee outside the ticket's participants (J-3); HoleScore confirmed ⇒ two distinct attestor Accounts (P-6).

## §17. Integrations

The integration surface is deliberately small; the moat is operational, not API-shaped.

| Integration | Posture | Spec |
|---|---|---|
| WHS / GHIN handicaps | **OPEN** (licensing path, §25) | An adapter interface (`fetch index by player consent`) with the manual path as the universal fallback (H-1). v1 launches manual-first; the adapter slots in without a flow change. No scraping, ever |
| Santam / Indwe claims | Operational handoff, v1 | The console assembles the claim package (evidence, KYC, payees) for the broker; states tracked internally (V-10). A portal/API integration is a v1.x nicety, never a launch dependency |
| Payment rails | Unilateral link formats (M-1) | Venmo/Cash App/PayPal.Me link construction; Zelle/EFT/PayShap/Capitec copy-details; SnapScan links. Contract: a per-rail formatter + capability table, feature-flagged per market, degrading to copy (M-2) |
| Billing processor | **OPEN** (B-4) | One subscription + one-off charges; webhooks drive Subscription and JackpotEntry state |
| Stores & push | Standard | APNs/FCM via the wrapper; StoreKit/Play Billing per the B-5 decision; store review posture in §25's legal items |
| Course data | Licensed dataset + own DB | Installed courses are first-party records (§21); the open-course catalogue (names, tees, ratings, par-3s) comes from a licensed source picked by Cloud & Things against §19 coverage targets; organiser-submitted corrections queue to ops |
| Analytics backend | Build-partner choice | Ingests §18's taxonomy; product analytics + the pilot readout (§22) run on the same events |

---

# Part D — Measurement and quality

## §18. Analytics & the attach metric

The jackpot attach rate on a group slip is the number the whole model swings on (business plan §8). This section exists so that number is *defined once*, measured identically in the pilot and the app, and impossible to fudge later.

### 18.1 The pinned definitions

This table is the single source. §22 and every readout cite it verbatim; nothing redefines it downstream.

| Metric | Definition | Notes |
|---|---|---|
| **Jackpot attach rate** | Locked slips with ≥ 1 **paid** JackpotEntry ÷ all **locked** slips, per period | Paid, not toggled — an opt-in that never paid is not attach. Locked, not draft — abandoned drafts don't dilute. Pride and money slips both count in the denominator (the jackpot is insurer-side either way, F11) |
| **Average ticket** | Σ paid entry USD ÷ participating players, per period | Per player, not per slip (`engagement.avgTicketUSD` is $10 base) |
| **Slip-creation share** | Pilot: slips created ÷ fourballs *offered* the product on-course (§22 counts offers). App: slip-builder funnel (started ÷ …) | The two contexts measure different denominators; readouts never blend them and always label which |
| **Swings per attached slip** | Filmed swings ÷ attached slips | Base 4 (`engagement.swingsPerAttachedSlip`) |

Decision thresholds carried verbatim from the plan: modelled 20 / **35** / 55% (sceptic/base/bull); **above ~30% attach this is a very good business; below ~15% we course-correct with the capital intact** — measured by the pilot before the app ships, and investors hold us to it.

### 18.2 Event taxonomy

Naming: `object_verb`, snake_case, one event per state transition, properties never PII beyond an account ref. Core set (~28):

`account_created` · `guest_identity_created` · `subscription_started/renewed/cancelled` · `slip_started` · `slip_game_added` · `slip_mode_set` (pride/money) · `jackpot_offered` (builder reached step 5 with an eligible hole) · `jackpot_opted_in` · `jackpot_entry_paid` · `slip_sent` · `invite_opened` · `slip_accepted/declined` · `slip_locked` · `score_entered/confirmed` · `dispute_opened/resolved` · `jackpot_armed` · `swing_filmed` · `swing_submitted` · `verification_completed` (outcome) · `claim_opened/paid/rejected` · `settlement_rendered` · `transfer_marked/confirmed` · `iou_created/cleared` · `rematch_sent` · `guest_convert_prompt_shown` · `rp_intervention` (type) · `notification_sent/opened`

**AN-1** The funnel that matters is instrumented end-to-end from day one of the *pilot*, not the app: `jackpot_offered → opted_in → entry_paid` is the attach funnel, and its events are identical in pilot capture and app (§22, A-16). **AN-2** Events are append-only, schema-versioned, and owned in code review like API contracts — a renamed event is a breaking change. **AN-3** Dashboards ship with the build: the attach funnel, the Thursday loop (N-5), guest conversion (F14), responsible-play interventions (RP-2). **AN-4** No third-party ad-tech SDKs inside the app; analytics is first-party infrastructure (privacy posture, §19.4).

## §19. Non-functional requirements

### 19.1 Performance budgets

| Surface | Budget |
|---|---|
| Guest accept (S-20), cold, mid-tier Android, course LTE | Interactive < 3 s; critical path ≤ 500 KB; accept round-trip < 1 s |
| Slip build (F2), returning organiser | Ready-to-send in < 60 s of user time — the "built in under a minute" promise is a requirement |
| Ledger propagation (F6) | Confirmed score visible on the other phones ≤ 5 s online |
| App cold start (wrapper) | < 2.5 s to interactive on the reference device |
| Score entry (F5) | ≤ 3 taps a hole + one per dot; never blocks on network |
| The Shot capture (F7) | Ready-to-film < 3 s from tap; zero dropped frames at capture bitrate |

### 19.2 Field conditions

**Q-1** Offline: the full round loop for a 5-hour round with zero connectivity (F15). **Q-2** Battery: a full 18 with the app foregrounded for scoring plus four filmed swings ≤ 25% battery on the reference device; filming sessions budget ≤ 8% each; GPS duty-cycled (geofence wake, not continuous track). **Q-3** Storage: queued evidence for one round ≤ 2 GB, with capture bitrate adaptive to free space and the warning at the tee, not at upload. **Q-4** Reference devices named per launch market by Cloud & Things; budgets bind to the *cheapest* named device.

### 19.3 Accessibility & environment

**Q-5** WCAG 2.2 AA across app and PWA — with three golf-specific hard cases first-class: sunlight legibility (contrast beyond minimums on money figures), gloved/one-hand operation (score entry reachable and ≥ 44 pt targets), and glare-mode ledger (the §3.4 dark chrome carries a high-contrast toggle). **Q-6** Dynamic type without layout breakage on every money surface; screen-reader labels carry the *reason strings*, not just numbers (the ledger explains itself aloud too).

### 19.4 Privacy & compliance engineering

**Q-7** POPIA (home market), GDPR (EU launch surface) and CCPA postures from day one: lawful bases mapped per data class; guest minimalism (R-4 — a handle and a name run the whole guest experience); consent for handicap fetch (H-1) and media capture (F7) explicit and logged. **Q-8** DSAR: export and deletion self-serve (R-9); pair-ledger anonymisation rule as specified. **Q-9** No sale of personal data, no third-party trackers (AN-4); sponsor surfaces (v1.x) are served first-party. **Q-10** Data residency: single primary region at launch with the §25 legal review owning any localisation triggers (POPIA s72 transfers documented).

### 19.5 Retention classes (referenced by §16)

| Class | Rule (holding positions where marked) |
|---|---|
| Core (slips, scores, settlements) | Life of the accounts party to them; anonymised on deletion per R-9 |
| Financial (tickets, entries, claims, subscriptions) | 7 years (SA financial-records norm; confirm in §25 legal review) |
| Evidence (media, verification) | Winning/contested swings: insurer-required period — **OPEN** with policy terms. Non-winning, unchallenged clips: auto-delete at 30 days (holding position) |
| Analytics | 25 months rolling, then aggregate-only |
| Life / Audit / Staff / Reference | Account-lifetime + R-10 · 7 years · employment + 2 · maintained |

### 19.6 Reliability

**Q-11** Targets: 99.9% monthly on the API and accept path (a failed Saturday is the product failing at its only moment); settlement and claims flows degrade read-only, never lossy. **Q-12** The event queue (F15) survives app kill, device restart and reinstall-with-login. **Q-13** Backups + tested restore for every Financial/Evidence class store; RPO ≤ 1 h, RTO ≤ 4 h at launch scale.

## §20. Security & anti-fraud

Two threat surfaces, sized honestly: peer games move mates' money between mates (low incentive, self-policing — the attestation trail is the control); the jackpot moves the insurer's $100,000 on our verification (the real target). Fraud economics matter because the underwriting book prices aces at amateur odds — the system's job is to keep *engineered* aces out of the claims funnel.

### 20.1 The insurer-side fraud model

| Vector | Controls |
|---|---|
| Staged/edited video | Hash at capture (V-2); continuity checks (uncut clip address→outcome); capture-app-only ingest on the open lane (no gallery uploads); forensic review flags in the §21 queue |
| Wrong ball / dropped ball | Ball registration photo at arm (J-7); mark visible on retrieval footage; tee-cam cross-check on installed holes |
| Location spoofing | Geofence at arm and swing; GPS consistency vs course record; device-integrity signals (rooted/emulated flagged); installed-lane rig is location truth |
| Identity fraud (ringer swings) | Swing order bound to accounts at arm (F7); faces/swing continuity across the ticket's clips; KYC at claim (V-7) |
| Collusion & velocity | Rate rules per account/group/course (tickets per period, aces per cohort vs `acePerAttempt` base rate 8e-05); anomaly review triggers; repeat-winner escalation is automatic, polite and human-reviewed |
| Inside jobs (course staff, rigs) | Rig heartbeat + tamper logging (§21); dual-control on verification overrides; full AuditLog on every ops action (A-15) |

**X-1** Fraud holds pause the claim, never the peer game (F8). **X-2** Controls are proportionate by tier: a $1→$500 ticket rides the automated bar; $50/$100 tiers always get human review (the queue prices review cost against `largestSingleEventUSD`). **X-3** False-positive posture: the honest golfer's ace is the product's best moment — review language and SLAs (V-4) protect it; fraud tooling never makes the celebration screen hedge.

### 20.2 Application security

**X-4** OWASP MASVS/ASVS baseline; magic-link/OTP auth hardening (rate limits, link expiry, device binding offer); session and token hygiene per standard practice. **X-5** Media store: signed URLs, least privilege, chain-of-custody log append-only (V-2). **X-6** Attestations are signed client events (F15) — replay-protected, device-attributed. **X-7** Secrets, dependency and supply-chain hygiene per Cloud & Things' standards; pen test before launch and before each new market's jackpot flag flips on. **X-8** Ops console: SSO + hardware-key MFA, role-scoped (R-3), every action audited (A-15), no production data egress beyond the claim package (V-10).

---

# Part E — Operations and delivery

## §21. Ops console

The insurer-side back office. A separate web application, separate auth realm (R-3, X-8) — the golfer app has no admin mode, and the console has no reach into peer games beyond reading the audit record (P-1 is enforced by absence of tooling, not by policy).

### 21.1 Roles & queues

| Ops role | Owns |
|---|---|
| Verification reviewer | The open-lane review queue (V-4): evidence viewer, checklist, verdicts, the 24-hour SLA clock |
| Claims handler | Claim state machine (§9.3): broker package assembly, KYC tracking, payout confirmation, rejection comms |
| Course admin | Course/Hole/InstalledRig records: designations, geofences, rig health, the +25/year onboarding pipeline |
| Billing ops | Subscription lookups, refunds (J-5, B-6), processor disputes |
| Responsible-play ops | The RP-2 dashboard: intervention volumes, exclusion requests, market-rule changes |
| Console admin | OpsUser lifecycle, roles, audit review |

### 21.2 Screen inventory (~12)

O-01 Verification queue (SLA-sorted) · O-02 Case detail (synchronized evidence viewer: clips, arming artefacts, checklist, verdict + dual-control override) · O-03 Claims list · O-04 Claim detail (package builder, payees, KYC, broker states) · O-05 Course DB · O-06 Hole & rig config (designation, geofence editor, heartbeat history) · O-07 Refund console · O-08 Subscription lookup · O-09 Responsible-play dashboard · O-10 Pilot dashboard (§22 readouts) · O-11 Flag manager (§14.3 — dual-control on any market flag change) · O-12 Audit log browser

**O-1** Every verdict, override, refund and flag change is dual-attributed (actor + audit) and, for overrides and flags, dual-controlled (two ops identities). **O-2** The SLA clock (V-4) is visible on every queue row; breaches page a human. **O-3** The console ships in v1.0 at the minimum set {O-01, O-02, O-03, O-04, O-05, O-06, O-12} — the rest may trail by weeks, not months (§23).

## §22. Pilot instrumentation — Q4 2026, 90 days

The pilot measures the decisive number before the app is finished (business plan §8): across the 25 installed courses, with real money on the jackpot through the existing verified product. The output is three numbers — what share of fourballs create a slip, what share of slips add the jackpot, and what they pay — and the first is only meaningful if capture is designed, not improvised.

**PI-1 · The capture instrument is the guest PWA, cut down.** A "slip-lite": course, four names/handles, the games (labels and stakes only — no live engine needed), the jackpot opt-in + tier, per-player payment for entries through the existing installed-course rails. Same schema (Slip, SlipPlayer, JackpotTicket, JackpotEntry), same events (`slip_started … slip_locked, jackpot_offered/opted_in/entry_paid`), production infrastructure behind a `pilot` flag (A-16). **The metric identity between pilot and app is structural, because the events are literally the same events** — §18.1 is not translated for the pilot; it just runs.
**PI-2 · The offer is counted.** Slip-creation share needs a denominator: course activation staff log every fourball *offered* the product (one tap: offered / declined / created) — the §18.1 pilot definition depends on this and it is the one number a spreadsheet would have fudged.
**PI-3 · Paper fallback**: a printed slip pad + staff data entry into the same forms within 24 h, used only where the on-course moment demands it; entries are flagged `capture=assisted` so the readout can segment.
**PI-4 · The jackpot swing** runs on the installed rigs exactly as the product has run for a year — verification, claims and payouts through the existing operation; the pilot adds the *slip context* around the swing, not a new insurance product.
**PI-5 · Weekly readout** (O-10, auto-generated): the three numbers with confidence intervals, the attach funnel, tier mix vs the modelled 25/25/30/15/5, ticket size vs the $10 base, segment cuts (course, day, group size, assisted vs self-serve). Definitions cited from §18.1 verbatim; any week the numbers move > 10 pts, the readout says which segment moved them.
**PI-6 · Decision gates** at day 90, carried verbatim (business plan §8): **> ~30% attach — build with confidence; ~15–30% — the base case holds, proceed; < ~15% — course-correct with the capital intact.** The pilot also banks the side prizes: the first 1,000 fourballs, the app waiting list, and the tier mix that tunes §8's defaults.
**PI-7** Pilot data is production data: privacy posture (§19.4), retention (§19.5) and the audit trail apply from the first slip.

## §23. Phasing & the v1.0 cut

The recommendation this spec makes. Each line is vetoable individually — the founder edits the cut, the spec records it.

### Phase 0 — pilot kit & foundations (Q4 2026)

Alongside the named gating milestones (P2P counsel opinion; Santam sign-off on the wrapper; Ernie Els counsel sign-off — none of which this build waits on to *start*, all of which gate public launch):
Flag system (A-8) · analytics spine + §18 taxonomy · slip-lite capture (PI-1) + offer logging (PI-2) · ops console {O-01…O-06, O-10, O-12} · the engines (§5–§6) as the shared library, test-vectored — built first because everything sits on them.

### v1.0 — app launch, honour mode (Q1 2027)

| Ships | Why it's in |
|---|---|
| PWA core + iOS/Android wrappers (A-1) | The guest flow is the distribution strategy; push needs the wrapper |
| Organiser subscription ($10/mo) + guest-by-link | The revenue line and the funnel (P-9) |
| The 7-step slip (F2) with 2–4 players | The product |
| Skins (gross/net, carryovers) · nassau + presses · better-ball · dots {greenie, sandie, snake} | The formats a Saturday fourball actually plays (§5) |
| Handicaps manual-first; WHS/GHIN adapter behind the OPEN flag (H-1) | Launch can't wait on a licence; the flow doesn't change when it lands |
| One-enters-one-confirms + disputes (F5) | The legal spine, live |
| Live ledger + feed (F6) | The Saturday experience |
| Jackpot: installed **and** open-course lanes (F7–F8) | USD-led global launch needs the open lane; the installed lane is the proof estate |
| Claims v1 (ops-manual broker handoff, V-10) | No insurer API dependency at launch |
| Settlement + rails + mark-as-paid + IOUs (F9–F10) | "Dave → Johannes $13. Done." |
| Season ledger + rematch (F10) | The retention spine's core |
| Pride Mode default (F11) + full responsible-play set (§12.2) | P-10, P-13 — non-negotiable v1 |
| Offline round loop (F15) | Golf courses have dead zones |
| Wrapper push + N-1 taxonomy | The Thursday loop |
| Analytics complete (§18) | Attach is measured from the first real slip |

### v1.x — fast follows

Group crests (custom) · order of merit + societies/leagues (§11.3, §7) · 5+ fields · barkies + custom dots · banter cards (S-4) · annual plan (B-2) · additional rails · localisation beyond en · sponsor surfaces (first-party, §19.4) · self-serve refunds · WHS/GHIN adapter live (when §25-1 resolves) · insurer portal integration (V-10)

### v2.0 — the simulator era (Q4 2027, with the SDK)

§24's interfaces made real: the slip inside operator software, machine-verified insured CTP. A separate spec, gated on operator agreements (none signed as at August 2026 — `simulatorChannel.agreementStatus`).

### Never in this plan

Wallets or custody in any form (P-11 — market-by-market, licensed-only, geo-flagged, and not in this plan's scope) · formal payment-rail integrations (M-1's absence is the design) · any monetisation of peer stakes (P-2) · native rewrites (A-3).

## §24. Simulator SDK — forward-compatibility outline

Not a spec — an interface discipline v1 maintains so 2027's drop-in is a drop-in (`simulatorChannel`: the slip inside operator software from 2027; lead conversations targeted at the major operators; entry $1 → prize $1,000 at launch; split 46/30/24 Get Lucky/operator/insurer vs the on-course 66/10/24):

**K-1** The engines (§5–§6) stay venue-agnostic: nothing in scoring, netting or handicap allowance may assume grass, GPS or a camera — a sim bay reports results through the same attestation interface. **K-2** The verifier is an interface with three implementations: fourball attestation (peer money) · tee-cam/AI (installed) · **machine truth** (simulator telemetry — which is what makes insured CTP possible indoors, §5.5's excluded case). **K-3** `Course` generalises to `Venue` (course | bay) in the schema now (§16 carries it) — a one-column decision today, a migration in 2027 otherwise. **K-4** The entry/premium engine (§8) parameterises the revenue split; 24% cession is constant across venues. **K-5** The SDK's consumer is operator software, not golfers: auth, slip context and result ingest as a partner API surface — designed in 2027, *not* pre-built now beyond K-1…K-4.

## §25. Open decisions register

The calls this spec deliberately does not make. Each: the question, why it matters, the options, the owner, and when it blocks.

| # | Decision | Why it matters | Options on the table | Owner | Needed by |
|---|---|---|---|---|---|
| 1 | WHS/GHIN licensing path — and the no-handicap posture until then | H-1; auto-handicaps are the "under a minute" slip's best friend | Federation data licence · aggregator licence · manual-first launch (the holding position) | Founder + Cloud & Things | v1.x — v1.0 launches manual-first |
| 2 | Legal owner & tax treatment of the group claim split | J-3/V-9; $100,000 across four mates is four tax events or one | Single claimant + private redistribution · co-claimants named on the policy · per-market hybrid | Counsel + Indwe/Santam | Before first app-era claim; pilot runs on the existing single-winner product |
| 3 | Billing processor + store IAP posture | B-4/B-5; margin and checkout UX | Per B-4 criteria; StoreKit vs web-checkout postures per B-5 | Founder + Cloud & Things (+ counsel for store rules) | Before store submission |
| 4 | R149/mo SA membership vs $10/mo global price architecture | B-7; one product, one story, two current price points | Single global price with local presentment · local price points per market · legacy SKU ring-fenced to installed courses | Founder | Before launch pricing goes public |
| 5 | Guest data retention period | R-10; POPIA/GDPR minimisation vs the season ledger's memory | 12 / 24 (holding) / 36 months inactive | Founder + counsel | Before launch (privacy policy) |
| 6 | Unattempted-entry refund terms | J-5; weather and walk-offs happen weekly | Auto-refund (holding) · credit toward next ticket · per policy terms | Founder + Indwe/Santam | With the bound policy |
| 7 | Pride-Mode slips carrying a real jackpot, per market | F11/PM; the swing is insured even where the game is points | Follows the jackpot flag independently (holding) · money-mode markets only | Counsel, per market | Per market launch |
| 8 | Product ceiling on per-slip exposure | §12.2 table-stakes cap ($1,000 holding) | $500 / $1,000 / configurable per market | Founder | v1.0 config |
| 9 | Evidence retention for winning swings | §19.5; insurer's records requirement | Per bound policy terms | Indwe/Santam | With the bound policy |

Two standing constraints frame every row: the gating milestones (P-14) are not on this list because they are not open *product* decisions — they are prerequisites being executed; and no row may be resolved in a way that breaches P-1…P-4 (the spine outranks every option above).

## §26. Traceability

| This spec | Business plan | model.json | Site / repo |
|---|---|---|---|
| §1 spine, P-1…P-4 | §3 verification table, §6 regulatory | top-level `_note`, `insuranceModel._structureNote` | `index.html:263-272` (who verifies what) |
| §2 roles, guests | §7 (organizer-pays row) | `revenueStreamsZAR.subscriptions.note` | Screen 2 ("guests ride free", `index.html:375`) |
| §3 IA & screens | §3 (the Slip) | — | Six screens `index.html:334-463`; `.ap-*` in `css/styles.css:698-840`; optic-yellow `HANDOFF.md:190-211` |
| §4 F2 seven steps | §3 steps 1–7 | — | Screen 1 |
| §4 F5/F6, §5 engines | §3 "one enters, one confirms"; §2 reward-every-hole | the verification note in the launch block | Screen 3 |
| §6 handicaps | §3 step 3; §12 (make-or-break) | — | Screen 1 handicap strings |
| §8 jackpot | §3 group-pooled; §7 margin engine | `insuranceModel.ladder/engagement` | Screens 1–2 gold cards |
| §9 verification/claims | §3 two regimes | `insuranceModel.status` | Screens 4–5 (ball GL-07, FSP 3416) |
| §10 settlement | §3 the 19th hole | — | Screen 6 rails |
| §11 season | §3 retention spine | — | Screen 6 season card |
| §12 Pride/RP | §3 responsible play; §6 bullet 6 | the launch-posture line in the launch block | `index.html` Pride Mode copy |
| §13 billing | §7 subscription line | `unitEconomics.globalSubUSDpm/membershipZARpm` | — |
| §14 platform | §3 launch posture; §6 milestone 4 | the gating-milestones list in the launch block | — |
| §15 push | §2 "sell on Thursday night" | — | — |
| §18 attach | §8 (the one number) | `modelForecast.engagement`, `insuranceModel.engagement` | Dataroom assumptions table |
| §22 pilot | §8, §9 step 1 | the decisive-metric note in the launch block | `index.html` milestones (Q4 2026) |
| §23 phases | §9 go-to-market; milestones | `deal.useOfFunds` | `index.html:779-788` timeline |
| §24 simulators | §7 simulators line | `simulatorChannel` | `scripts/docs/doc-simulator.html` |

---

## Appendix — Glossary

**The Slip** — the fourball's bet card: games, stakes, handicaps, the jackpot; the app's core object. **Skin** — a per-hole pot to the outright winner; ties carry. **Nassau** — three match bets: front, back, overall. **Press** — a new bet opened by a side that's 2 down. **Dots** — per-event micro-wins (greenie: green in one on a par-3; sandie: up-and-down from sand; barkie: par off a tree; **the snake**: held by the last three-putter, paid by whoever holds it at the last). **Better-ball** — 2v2, best ball of each side counts. **CTP** — closest to the pin. **Attach** — §18.1's pinned definition; the decisive metric. **Honour mode** — players settle among themselves; the app computes and never touches. **Pride Mode** — the identical game in points; the default state. **The Shot** — the insured jackpot layer's tab: arm, film, verify, claim. **IOU** — an unsettled transfer carried on the pair. **Organiser** — the subscriber who creates slips. **Guest** — an invited player, riding free, forever if they like.

---

*Confidential — working specification. Prepared for the Get Lucky founding team and Cloud & Things. Figures are canonical in `data/model.json`; forward-looking figures are illustrative and not a guarantee. Peer-game figures describe player-to-player stakes in which Get Lucky has no participation and takes no fee. Get Lucky Golf Club (Pty) Ltd · Registration 2025/047585/07 · johannes@getluckygolfclub.com*





