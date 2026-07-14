"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const SLIDES = [
  { name: "Zimbali Golf Club", region: "KwaZulu-Natal", img: "/images/courses/zimbali.jpg" },
  { name: "St Francis Links", region: "Garden Route", img: "/images/courses/st-francis-links.jpg" },
  { name: "San Lameer Golf Club", region: "KwaZulu-Natal", img: "/images/courses/san-lameer.jpg" },
  { name: "Metropolitan Golf Club", region: "Cape Town", img: "/images/courses/metropolitan.jpg" },
  { name: "Highland Gate Golf Estate", region: "Mpumalanga", img: "/images/courses/highland-gate.jpg" },
  { name: "Goose Valley Golf Estate", region: "Garden Route", img: "/images/courses/goose-valley.jpg" },
  { name: "Paarl Golf Club", region: "Cape Winelands", img: "/images/courses/paarl.jpg" },
  { name: "Mossel Bay Golf Club", region: "Garden Route", img: "/images/courses/mossel-bay.jpg" },
];

export default function PhoneShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setActive((v) => (v + 1) % SLIDES.length),
      2600
    );
    return () => clearInterval(t);
  }, []);

  const current = SLIDES[active];

  return (
    <div className="relative mx-auto w-[250px] sm:w-[270px]">
      {/* soft glow */}
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gold/10 blur-2xl" />

      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.6rem] border-[7px] border-green-dark bg-black shadow-2xl shadow-black/50 ring-1 ring-cream/10">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-30 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-green-dark" />

        {/* rotating course images */}
        {SLIDES.map((s, i) => (
          <Image
            key={s.img}
            src={s.img}
            alt={s.name}
            fill
            sizes="270px"
            className="object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            priority={i === 0}
          />
        ))}

        {/* legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep/95 via-green-deep/10 to-green-deep/45" />

        {/* top app chrome */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pb-2 pt-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/85">
            Pick your course
          </span>
          <span className="rounded-full bg-cream/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cream/90">
            Par 3
          </span>
        </div>

        {/* bottom caption + faux CTA */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4">
          <div className="flex items-center gap-1.5 text-gold">
            <MapPin className="h-3 w-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {current.region}
            </span>
          </div>
          <p className="mt-1 font-display text-lg leading-tight text-cream">
            {current.name}
          </p>
          <div className="mt-3 rounded-full bg-gold py-2 text-center text-[11px] font-bold uppercase tracking-wider text-green-deep">
            $10/mo. Win $10,000.
          </div>

          {/* progress dots */}
          <div className="mt-3 flex justify-center gap-1.5">
            {SLIDES.map((s, i) => (
              <span
                key={s.img}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? "w-4 bg-gold" : "w-1 bg-cream/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
