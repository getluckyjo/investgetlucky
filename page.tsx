import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import PhoneShowcase from "@/components/PhoneShowcase";
import {
  Crosshair,
  Smartphone,
  ShieldCheck,
  Trophy,
  MapPin,
  Globe2,
  TrendingUp,
  Zap,
  Clock,
  Wallet,
  PlayCircle,
  Users,
  Handshake,
  Megaphone,
  DoorOpen,
  Sparkles,
  ArrowRight,
  Flag,
  MessageCircle,
  Mail,
} from "lucide-react";

/* ---------- small presentational helpers ---------- */

function Eyebrow({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "green";
}) {
  return (
    <p
      className={`eyebrow mb-4 ${tone === "gold" ? "text-gold" : "text-green-light"}`}
    >
      {children}
    </p>
  );
}

function StatNumber({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="font-display text-4xl text-gold sm:text-5xl">{value}</div>
      <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-cream">
        {label}
      </div>
      {sub && <div className="mt-1 text-xs leading-relaxed text-cream/55">{sub}</div>}
    </div>
  );
}

/* ---------- page ---------- */

export default function Page() {
  return (
    <main id="top" className="overflow-x-hidden">
      <Nav />

      {/* ============================ HERO ============================ */}
      <section className="relative flex min-h-screen items-center justify-center text-center">
        <Image
          src="/images/dean-hero.jpg"
          alt="Dean Burmester mid-swing"
          fill
          priority
          className="object-cover object-[72%_22%] sm:object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-deep/95 via-green-deep/70 to-green-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-deep/70 via-transparent to-green-deep/95" />
        <div className="halftone absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 reveal">
          <Image
            src="/logos/logo-dark-bg.png"
            alt="Get Lucky Golf"
            width={150}
            height={56}
            className="mx-auto mb-10 h-12 w-auto sm:h-14"
          />
          <p className="eyebrow mb-6 text-gold">A founding partnership invitation</p>
          <h1 className="font-display text-5xl text-cream sm:text-7xl md:text-8xl">
            Dean,<br />
            <span className="text-gold">let&apos;s go global.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            You&apos;ve turned one swing into moments the world watches. We built
            the platform that does it for every golfer alive — and we want you in
            as an owner.
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#deal"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-green-deep transition-transform hover:scale-[1.04]"
            >
              See the offer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
            >
              How it works
            </a>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-cream/45">
            Insurance-backed · Built in South Africa · Designed to scale globally
          </p>
        </div>
      </section>

      {/* ===================== THE INVITATION ===================== */}
      <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
        <Image
          src="/images/dean-invitation.jpg"
          alt=""
          fill
          className="object-cover object-[64%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/82 to-cream/92" />
        <div className="absolute inset-0 bg-cream/20" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <Reveal>
            <Eyebrow>The invitation</Eyebrow>
            <h2 className="font-display text-3xl leading-tight text-green sm:text-5xl">
              5% of Get Lucky Golf.<br />
              <span className="text-green-dark">
                For your name and your story — not your time.
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/80">
              <p>
                Not a sponsorship cheque. Not a logo on a cap. A real ownership
                stake in a business that already works in South Africa — and is
                built to travel.
              </p>
              <p>
                We&apos;ve proven it at home: live on the Top 100 courses, 25
                partner clubs, 20 000 members, Santam-backed prizes paid out. The
                next chapter is global — Miami, Hong Kong, the UK, the Middle
                East. The
                <span className="font-semibold text-green"> exact</span> markets
                you already play.
              </p>
              <p className="font-semibold text-green-dark">
                We build the rails and run the business. You lend the credibility
                you&apos;ve already earned. We grow this together — and your share
                grows with it.
              </p>
            </div>

            <div className="bracket mt-10 rounded-xl border border-green/15 bg-cream-dark/60 px-8 py-7">
              <p className="eyebrow text-green/70">Your team already lives by it</p>
              <p className="mt-3 font-display text-2xl text-green-dark sm:text-3xl">
                &ldquo;I am because we are.&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Your team&apos;s Ubuntu ethos is exactly our bet: individual
                brilliance, collective upside. You win when Get Lucky wins.
              </p>
            </div>

            <p className="mt-8 text-sm font-medium uppercase tracking-wider text-charcoal/50">
              — Johannes le Roux, Founder &amp; MD, Get Lucky Golf
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== THE PRODUCT ===================== */}
      <section id="product" className="topo bg-green-deep py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            <Reveal>
              <Eyebrow>The product · the scalable engine</Eyebrow>
              <h2 className="font-display text-4xl text-cream sm:text-6xl">
                A subscription hole-in-one<br />
                <span className="text-gold">challenge. Worldwide.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/75">
                Any golfer, anytime, any par-3 on earth. Ten dollars a month
                unlocks the challenge — no hardware on the tee, just a web app.
                Pick a hole, film one swing, and if you sink the ace,{" "}
                <span className="font-semibold text-gold">$10,000</span> lands in
                your account. It installs from any browser — no app store, no
                paperwork. Software, which means it scales like software.
              </p>
              <a
                href="https://get-lucky-golf.vercel.app/home"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
              >
                See the live app
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>

            <Reveal delay={120}>
              <PhoneShowcase />
            </Reveal>
          </div>

          {/* subscription model */}
          <Reveal>
            <div className="bracket mt-14 grid gap-6 rounded-2xl border border-cream/10 bg-green-dark/40 p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-9">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                  <Globe2 className="h-6 w-6 text-gold" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                    Membership
                  </p>
                  <p className="font-display text-4xl leading-none text-cream sm:text-5xl">
                    $10
                    <span className="ml-1 text-xl text-cream/60">/month</span>
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-cream/75">
                A subscription, not a one-off. Ten dollars a month unlocks the
                challenge — then take your shot at any par-3, any time, anywhere
                we&apos;re live. Sink the ace and win{" "}
                <span className="font-semibold text-gold">$10,000</span>.
                Predictable, recurring revenue that compounds with every golfer
                who joins.
              </p>
            </div>
          </Reveal>

          {/* steps */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: Wallet,
                t: "Subscribe",
                d: "$10 a month unlocks the challenge. Cancel anytime — no contract.",
              },
              {
                icon: MapPin,
                t: "Pick",
                d: "Open the app and pick any course and par-3 hole — anywhere we're live.",
              },
              {
                icon: Crosshair,
                t: "Film",
                d: "Hit record, take your shot, and submit — straight from the app.",
              },
              {
                icon: ShieldCheck,
                t: "Verify",
                d: "Video + witness reviewed. Most aces confirmed within 24 hours.",
              },
              {
                icon: Trophy,
                t: "Win",
                d: "$10,000 insured payout straight to your account.",
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-cream/10 bg-green-dark/60 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15">
                      <s.icon className="h-5 w-5 text-gold" />
                    </span>
                    <span className="font-display text-xl text-cream">
                      {i + 1}. {s.t}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-cream/65">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== SA PROOF / TRACTION ===================== */}
      <section id="proof" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="green">Proof of success · South Africa</Eyebrow>
            <h2 className="font-display text-4xl text-green sm:text-6xl">
              It already works at home.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
              Not a pitch on a napkin. Get Lucky is live, generating revenue, and
              insured by one of the country&apos;s most established names. The
              proving ground — and the proof is in.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "Top 100", l: "Courses live on app", s: "Across South Africa" },
              { n: "25", l: "Partner courses installed", s: "Premium estates & clubs" },
              { n: "20 000", l: "Members reached", s: "Across partner courses" },
              { n: "R9m", l: "Santam sponsorship", s: "3-year naming-rights deal" },
            ].map((x, i) => (
              <Reveal key={x.l} delay={i * 70}>
                <div className="h-full rounded-2xl border border-green/10 bg-white/50 p-7">
                  <div className="font-display text-5xl text-green">{x.n}</div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-wide text-charcoal">
                    {x.l}
                  </div>
                  <div className="mt-1 text-xs text-charcoal/55">{x.s}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Santam trust bar */}
          <Reveal>
            <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl bg-green p-8 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/10">
                  <ShieldCheck className="h-7 w-7 text-gold" />
                </span>
                <div>
                  <p className="font-display text-2xl text-cream">
                    Underwritten by Santam
                  </p>
                  <p className="text-sm text-cream/70">
                    Authorised FSP 3416 · 100+ years of insurance heritage · prizes
                    paid on every verified ace
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="font-display text-3xl text-gold">$10,000</div>
                <div className="text-xs uppercase tracking-wider text-cream/60">
                  Hole-in-one prize, fully insured
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-8 text-center text-sm leading-relaxed text-charcoal/60">
              Plus a nationwide marketing engine — the{" "}
              <span className="font-semibold text-green">Get Lucky Golf Show</span>,
              celebrity-driven content already putting the brand in front of SA
              golf.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== GLOBAL OPPORTUNITY ===================== */}
      <section id="global" className="topo bg-green-deep py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <Eyebrow>The global opportunity</Eyebrow>
            <h2 className="font-display text-4xl text-cream sm:text-6xl">
              A $2.4 billion category.<br />
              <span className="text-gold">Currently offline.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">
              Hole-in-one insurance is a $1.2B category today — $2.4B by 2033.
              Right now it sells through brokers, one event at a time. We&apos;re
              putting it in every golfer&apos;s pocket: a daily insured swing on
              any par-3 on earth. The market is coming either way — the only
              question is who owns the consumer.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <StatNumber
                value="108M"
                label="Global golfers"
                sub="R&A 2024 (ex-USA/Mexico) — up 3 million year-on-year"
              />
            </Reveal>
            <Reveal delay={70}>
              <StatNumber
                value="~150M"
                label="Including the USA"
                sub="NGF: 45M on- & off-course golfers in the US alone"
              />
            </Reveal>
            <Reveal delay={140}>
              <StatNumber
                value="38,000+"
                label="Golf courses"
                sub="Across 206 countries — most have a par-3"
              />
            </Reveal>
            <Reveal delay={210}>
              <StatNumber
                value="1 / 12,500"
                label="Amateur ace odds"
                sub="Priced cleanly for an insured stake-to-win model"
              />
            </Reveal>
          </div>

          {/* first-party platform + expansion markets */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-cream/10 bg-green-dark/50 p-8">
                <Smartphone className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-2xl text-cream">
                  Our own platform. No gatekeepers.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  We built and own the web app — it installs from any browser,{" "}
                  <span className="text-gold">no app store, no approval queue</span>.
                  So we own the golfer, the data and the payments in every market,
                  and launch a new country without anyone&apos;s permission. A live
                  feed of attempts and winners turns every swing into fuel for the
                  next.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-2xl border border-cream/10 bg-green-dark/50 p-8">
                <Globe2 className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-2xl text-cream">
                  The model travels
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  Next stops: markets with deep golf culture — and where you
                  already compete.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "UK · 3,101 courses",
                    "Germany · 1,050",
                    "France · 804",
                    "Australia",
                    "Middle East",
                    "Asia",
                    "USA",
                  ].map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* why now — three forces, one window */}
          <Reveal>
            <p className="mt-16 text-sm font-semibold uppercase tracking-wider text-gold">
              Why now · three forces, one window
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                t: "Golfers want more",
                d: "Global golf is up 3 million players a year, and new formats now outdraw the traditional game.",
              },
              {
                icon: Zap,
                t: "The tech is ready",
                d: "GPS, instant verification, insurance APIs and wallets make real-time insured stake-to-win possible. We've built it.",
              },
              {
                icon: TrendingUp,
                t: "The window is open",
                d: "No one owns the consumer layer yet. First to plant the flag globally defines the category.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 80}>
                <div className="flex h-full gap-4 rounded-2xl border border-cream/10 bg-green-dark/50 p-6">
                  <x.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-display text-lg text-cream">{x.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                      {x.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BUSINESS MODEL ===================== */}
      <section className="relative overflow-hidden bg-green py-24 sm:py-32">
        <Image
          src="/images/masters-leaderboard.webp"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green/96 via-green/93 to-green/97" />
        <div className="absolute inset-0 bg-green-deep/45" />
        <div className="topo absolute inset-0 opacity-60" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <Eyebrow>High-margin · scalable by design</Eyebrow>
            <h2 className="font-display text-4xl text-cream sm:text-6xl">
              Software economics,<br />
              <span className="text-gold">golf-sized demand.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">
              A <span className="font-semibold text-gold">$10/month</span>{" "}
              subscription at a{" "}
              <span className="font-semibold text-gold">78% gross margin</span> —
              10% on-course marketing, 12% to insured prize risk. Digital-first
              means low operating cost and real network effects: more courses,
              more members, more viral wins.
            </p>
          </Reveal>

          {/* margin split */}
          <Reveal>
            <div className="mt-12 overflow-hidden rounded-xl">
              <div className="flex text-center text-xs font-bold uppercase tracking-wider">
                <div className="bg-green-deep py-4 text-cream" style={{ width: "78%" }}>
                  78% Get Lucky
                </div>
                <div className="bg-cream py-4 text-green-dark" style={{ width: "10%" }}>
                  10%
                </div>
                <div className="bg-gold py-4 text-green-deep" style={{ width: "12%" }}>
                  12%
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-cream/60">
              <span>High-margin revenue engine</span>
              <span>On-course marketing · Insured prize risk</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== WHY DEAN ===================== */}
      <section id="why-dean" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow tone="green">Why you, Dean</Eyebrow>
              <h2 className="font-display text-4xl text-green sm:text-6xl">
                You&apos;re not an endorsement.<br />
                <span className="text-charcoal">You&apos;re the unlock.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
                Going global takes three things: credibility with courses, reach
                with golfers, and a familiar face in every market. You&apos;re
                already all three — a South African on the world&apos;s biggest
                stage, competing in exactly the regions on our map.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-charcoal/80">
                And the product is your highlight reel. One witnessed swing that
                changes everything — you&apos;ve built a career on that drama.
                Nobody sells the dream of the ace like a man who wins playoffs for
                a living.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-green/10 bg-green p-8">
                <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gold">
                  The résumé that opens doors
                </p>
                <ul className="space-y-5">
                  {[
                    {
                      t: "2× LIV Golf champion",
                      d: "Miami 2024 (beating Sergio García) and Chicago 2025 (over Jon Rahm) — both in playoffs, on global broadcast.",
                    },
                    {
                      t: "4× DP World Tour winner",
                      d: "Including back-to-back wins — the Joburg Open and the Investec South African Open.",
                    },
                    {
                      t: "11× Sunshine Tour winner",
                      d: "A decade of dominance on home soil — credibility with every SA course we partner.",
                    },
                    {
                      t: "One of the game's longest hitters",
                      d: "Over 310 yards off the tee on average in 2026 — the kind of power that makes golf must-watch.",
                    },
                    {
                      t: "A truly global schedule",
                      d: "LIV events across the USA, UK, Asia and the Middle East — our exact expansion markets, every season.",
                    },
                  ].map((x) => (
                    <li key={x.t} className="flex gap-3">
                      <Trophy className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="font-semibold text-cream">{x.t}</p>
                        <p className="text-sm leading-relaxed text-cream/65">
                          {x.d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Broadcast-style team strip — Southern Guards GC */}
          <Reveal>
            <div className="halftone mt-14 overflow-hidden rounded-2xl bg-green-deep">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream/10 px-6 py-3">
                <span className="eyebrow text-gold">
                  Southern Guards GC · LIV Golf 2026
                </span>
                <span className="text-xs uppercase tracking-wider text-cream/50">
                  The all-South-African team you anchor
                </span>
              </div>
              <div className="divide-y divide-cream/5">
                {[
                  {
                    pos: "11TH",
                    name: "Dean Burmester",
                    note: "2× LIV Golf champion · your seat at the table",
                    you: true,
                  },
                  {
                    pos: "16TH",
                    name: "Branden Grace",
                    note: "First man to shoot 62 in a major",
                  },
                  {
                    pos: "32ND",
                    name: "Louis Oosthuizen",
                    note: "2010 Open champion · team captain",
                  },
                  {
                    pos: "35TH",
                    name: "Charl Schwartzel",
                    note: "2011 Masters champion",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className={`flex items-center gap-4 px-6 py-4 ${
                      p.you ? "bg-gold/10" : ""
                    }`}
                  >
                    <span
                      className={`tabular w-12 shrink-0 font-display text-xl ${
                        p.you ? "text-gold" : "text-cream/45"
                      }`}
                    >
                      {p.pos}
                    </span>
                    <span
                      className={`font-display text-lg ${
                        p.you ? "text-cream" : "text-cream/80"
                      }`}
                    >
                      {p.name}
                    </span>
                    <span className="ml-auto max-w-[55%] text-right text-xs leading-tight text-cream/55">
                      {p.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-sm leading-relaxed text-charcoal/55">
              Current 2026 LIV standings — you&apos;re the team&apos;s top
              performer. You don&apos;t just bring your own name; you bring the
              company you keep, and the doors it opens in the exact markets we
              enter next.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== THE ROLE ===================== */}
      <section className="relative overflow-hidden topo bg-green-deep py-24 sm:py-32">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/images/dean-celebrate.jpg"
            alt=""
            fill
            className="object-cover object-[60%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-deep/96 via-green-deep/90 to-green-deep/82" />
          <div className="halftone absolute inset-0 opacity-40" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <Eyebrow>What the partnership looks like</Eyebrow>
            <h2 className="font-display text-4xl text-cream sm:text-6xl">
              Built around your schedule — not on top of it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">
              No fixed hours, no obligations, nothing that pulls you off the
              course. Your success does the heavy lifting; our team does the rest.
              Four ways that plays out:
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: DoorOpen,
                t: "Open international doors",
                d: "Your name alone warms up courses, tours and partners abroad. When one feels right, a quick intro from you is all we need — our team carries it from there.",
              },
              {
                icon: Megaphone,
                t: "Headline the brand",
                d: "We build campaigns around the moments you're already creating on tour — no extra shoots, no scripts. Your highlights become Get Lucky moments.",
              },
              {
                icon: PlayCircle,
                t: "Fuel the social engine",
                d: "Every ace you hit is already a story. Our team turns your existing moments into shareable, branded content — you just keep playing.",
              },
              {
                icon: Handshake,
                t: "Win sponsors & courses",
                d: "Doors that take a startup years to open, your name opens by reputation alone. We pitch and close — your stature does the convincing.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 80}>
                <div className="flex h-full gap-4 rounded-2xl border border-cream/10 bg-green-dark/50 p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <x.icon className="h-6 w-6 text-gold" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-cream">{x.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/65">
                      {x.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== THE DEAL ===================== */}
      <section id="deal" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="green">The deal · your upside</Eyebrow>
            <h2 className="font-display text-4xl text-green sm:text-6xl">
              Your 5% rides the curve.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              A <span className="font-semibold text-green">5% equity stake</span>{" "}
              as founding brand partner. No cash out of pocket — you invest your
              name, not your time, and own a slice of the upside you make possible.
              As the business compounds, so does your share — and a high-margin
              model means real dividends, not just paper gains.
            </p>
          </Reveal>

          {/* valuation trajectory */}
          <Reveal>
            <div className="bracket mt-14 rounded-2xl border border-green/10 bg-white/50 p-9 sm:p-11">
              <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-charcoal/50">
                The trajectory your stake grows with
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    yr: "Today",
                    val: "R40M",
                    note: "Post-money valuation — the floor you come in above",
                    tone: "base",
                  },
                  {
                    yr: "2028",
                    val: "R96.8M",
                    note: "Projected on the 3-year growth plan — more than 2×",
                    tone: "mid",
                  },
                  {
                    yr: "2032",
                    val: "R500M",
                    note: "The exit vision as the model goes global",
                    tone: "top",
                  },
                ].map((s) => (
                  <div
                    key={s.yr}
                    className={`rounded-2xl p-7 ${
                      s.tone === "top"
                        ? "bg-green text-cream"
                        : s.tone === "mid"
                          ? "bg-green-light/15"
                          : "bg-cream-dark/60"
                    }`}
                  >
                    <div
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        s.tone === "top" ? "text-gold" : "text-green"
                      }`}
                    >
                      {s.yr}
                    </div>
                    <div
                      className={`mt-2 font-display text-5xl ${
                        s.tone === "top" ? "text-cream" : "text-green"
                      }`}
                    >
                      {s.val}
                    </div>
                    <p
                      className={`mt-3 text-xs leading-relaxed ${
                        s.tone === "top" ? "text-cream/70" : "text-charcoal/55"
                      }`}
                    >
                      {s.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-xs leading-relaxed text-charcoal/50">
                Figures reflect the company&apos;s valuation milestones from the
                2025 capital raise and 3-year plan. They illustrate the
                trajectory a 5% holding moves with — not a guarantee of return.
                Every global market we add bends this curve upward.
              </p>
            </div>
          </Reveal>

          {/* why it's aligned */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                t: "Skin in the game",
                d: "Equity, not appearance fees. When Get Lucky wins, you win — and the upside compounds without costing you time.",
              },
              {
                icon: Wallet,
                t: "Dividend potential",
                d: "Strong EBITDA-margin business throws off cash. Ownership can mean income, not just an eventual exit.",
              },
              {
                icon: Clock,
                t: "Get in at the floor",
                d: "Early ownership in a proven, pre-scale business — before the global markets are priced in.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-green/10 bg-white/50 p-7">
                  <x.icon className="h-7 w-7 text-green" />
                  <h3 className="mt-4 font-display text-xl text-green">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                    {x.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TEAM ===================== */}
      <section className="bg-green-deep py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <Eyebrow>Who you&apos;d be building with</Eyebrow>
            <h2 className="font-display text-4xl text-cream sm:text-6xl">
              Operators who&apos;ve done it before.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                img: "/images/team/johannes.jpeg",
                name: "Johannes le Roux",
                role: "Founder & Managing Director",
                bio: "Serial entrepreneur and brand builder behind The Duchess (backed by AB InBev & RMB). Now leading Get Lucky — blending sport, tech and entertainment into a global platform.",
              },
              {
                img: "/images/team/andrew.jpeg",
                name: "Andrew Davenport",
                role: "Founder & Marketing Director",
                bio: "Brand strategist with 15+ years in beverage and entertainment marketing (Founder of DOPE Drinks, member of AKING). Drives partnerships, community and growth.",
              },
              {
                img: "/images/team/inus.jpeg",
                name: "Inus Smuts",
                role: "Fractional Creative Director",
                bio: "Award-winning creative director shaping brand and visual identity across food, beverage and lifestyle (The Duchess, Suncamino Rum, Platō Coffee).",
              },
            ].map((p) => (
              <Reveal key={p.name}>
                <div className="h-full rounded-2xl border border-cream/10 bg-green-dark/50 p-7 text-center">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gold/40 bg-green">
                    {p.img ? (
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-display text-3xl text-gold">
                        IS
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-xl text-cream">{p.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {p.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-cream/65">
                    {p.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl border border-gold/25 bg-green-dark/50 p-7 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-left">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-gold/50 bg-green">
                <Image
                  src="/images/team/willie.jpeg"
                  alt="Willie Ross"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="eyebrow text-gold">Strategic advisor &amp; investor</p>
                <h3 className="mt-1 font-display text-2xl text-cream">
                  Willie Ross
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-cream/55">
                  Partner, Bellair Road Investment Partners
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/65">
                  A Grey College Old Boy and Harvard MBA, partner at a Cape Town
                  private-equity firm backing long-term growth businesses across
                  Southern Africa — bringing capital, governance and deal
                  experience to the table alongside you.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-cream/10 bg-green-dark/40 p-7 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
              <Image
                src="/logos/santam-logo-white.png"
                alt="Santam"
                width={120}
                height={67}
                className="h-10 w-auto shrink-0"
              />
              <p className="text-sm leading-relaxed text-cream/70">
                Backed by a 3-year, R9m naming-rights partnership with{" "}
                <span className="font-semibold text-cream">
                  Santam
                </span>{" "}
                — an Authorised FSP with 100+ years of insurance heritage.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CLOSE / CTA ===================== */}
      <section className="relative flex items-center justify-center py-28 text-center sm:py-40">
        <Image
          src="/images/dean-cta.jpg"
          alt=""
          fill
          className="object-cover object-[22%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-deep/75 via-green-deep/90 to-green-deep/85" />
        <div className="halftone absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <Reveal>
            <Flag className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-6 font-display text-4xl text-cream sm:text-6xl">
              One swing changed your life on tour.<br />
              <span className="text-gold">Let&apos;s build the one that changes the game.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-cream/80">
              South Africa is the proof. The world is the prize. Come in as an
              owner, and let&apos;s take the golfer&apos;s dream global — together.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:johannes@getluckygolfclub.com?subject=Get%20Lucky%20%C3%97%20Dean%20Burmester"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-green-deep transition-transform hover:scale-[1.04]"
              >
                <Mail className="h-4 w-4" />
                Start the conversation
              </a>
              <a
                href="https://wa.me/27609615091?text=Hi%20Johannes%2C%20I%27d%20like%20to%20talk%20about%20Get%20Lucky."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" />
                +27 60 961 5091
              </a>
            </div>
            <p className="mt-8 text-sm text-cream/55">
              Johannes le Roux · johannes@getluckygolfclub.com
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-green-deep py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Image
            src="/logos/logo-dark-bg.png"
            alt="Get Lucky Golf"
            width={110}
            height={40}
            className="h-9 w-auto"
          />
          <p className="text-xs leading-relaxed text-cream/50">
            One shot. $10,000. Back yourself on any par-3. Built in South Africa.
            Designed to scale globally.
            <br />
            Prize insurance underwritten via Santam (FSP 3416). ·
            Private &amp; confidential — prepared for Dean Burmester.
          </p>
        </div>
      </footer>
    </main>
  );
}
