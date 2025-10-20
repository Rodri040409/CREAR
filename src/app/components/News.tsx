"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =======================
   HERO — Slider exacto
   ======================= */

type Slide = {
  img: string;
  kicker: string;
  title: string;
  desc: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    img: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
    kicker: "Residental",
    title: "Blackspace House",
    desc:
      "Architecture viverra tellus nec massa dictum the blackspace euismoe.\nCurabitur viverra the posuere hose aukue velition.",
    href: "https://shtheme.org/demosd/savoye/index87f3.html?project=arch-cloud-honna-didenton-villa",
  },
  {
    img: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
    kicker: "Residental",
    title: "One Stone House",
    desc:
      "Architecture viverra tellus nec massa dictum the blackspace euismoe.\nCurabitur viverra the posuere hose aukue velition.",
    href: "https://shtheme.org/demosd/savoye/index9339.html?project=brown-monara-house-ottova-canada",
  },
  {
    img: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
    kicker: "Residental",
    title: "Collin Bea House",
    desc:
      "Architecture viverra tellus nec massa dictum the blackspace euismoe.\nCurabitur viverra the posuere hose aukue velition.",
    href: "https://shtheme.org/demosd/savoye/index4910.html?project=twin-forestland-home",
  },
];

export function SavoyeHomeHeroExact() {
  const fonts = useMemo(
    () => (
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&display=swap"
      />
    ),
    []
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative min-h-[100vh] overflow-hidden">
      {fonts}

      {/* Fondo + overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            style={{
              backgroundImage: `url(${SLIDES[i].img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Caption */}
      <div className="relative z-[2] flex h-[100vh] items-center">
        <div className="mx-auto w-full max-w-[114rem] px-[1.5rem]">
          <div className="md:w-8/12 mt-[3rem]">
            <div className="inline-block">
              <motion.h6
                className="[font-family:'Khand',_sans-serif] text-[1.7rem] font-[400] uppercase tracking-[0.4rem] text-[#c5a47e] mb-[1rem]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                {SLIDES[i].kicker}
              </motion.h6>

              <motion.h1
                className="[font-family:'Khand',_sans-serif] text-white uppercase font-[500] leading-[1.1] text-[clamp(4.4rem,7.2vw,9.5rem)] mb-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                {SLIDES[i].title}
              </motion.h1>

              <motion.p
                className="text-white text-[1.7rem] leading-[1.6] mt-[1.2rem] mr-[1.5rem]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.55 }}
              >
                {SLIDES[i].desc.split("\n").map((line, k) => (
                  <span key={k} className="block">
                    {line}
                  </span>
                ))}
              </motion.p>

              <motion.a
                href={SLIDES[i].href}
                className="relative inline-block mt-[2.4rem] bg-[#c5a47e] text-white uppercase tracking-[0.14em] text-[1.3rem] leading-[1] py-[1.4rem] pl-[5rem] pr-[2.4rem] font-[500]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.7 }}
              >
                <span
                  className="pointer-events-none absolute left-[2rem] top-1/2 -translate-y-1/2 h-[1px] w-[0] bg-white transition-all duration-200 group-hover:w-[3rem]"
                  aria-hidden
                />
                Discover
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="pointer-events-auto absolute bottom-[20%] right-[12%] z-[3] w-full text-right">
        <div className="inline-flex items-center gap-[1.2rem] pr-[1rem]">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-[1.4rem] w-[1.4rem] rounded-full transition ${
                i === idx ? "bg-[#c5a47e]" : "bg-[#c5a47e]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

/* Wrapper: solo el HERO */
export default function SavoyeHomeSection() {
  return <SavoyeHomeHeroExact />;
}
