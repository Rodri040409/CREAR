"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { type ProjectItem, PROJECTS } from "@/app/lib/projects";

const ACCENT = "#c5a47e";

// Patrón de columnas para DESKTOP
const PATTERN_DESKTOP: ("L" | "R")[] = ["L", "R", "R", "L", "R", "L"];

/** Orden explícito por dispositivo (usa slugs). 
 *  - Los slugs listados se colocan en ese orden.
 *  - Los que no aparezcan se agregan al final respetando el orden original.
 */
const ORDER = {
  desktop: [
    "casa-21",
    "pavimentacion-calle-huazontle",
    "casa-briones-01",
    "piscina-boca",
    "piscina-coapexpan",
    "rehabilitacion-oficinas",
    "red-electrica-fracc-la-cruz",
  ],
  mobile: [
    "casa-21",
    "casa-briones-01",
    "rehabilitacion-oficinas",
    "red-electrica-fracc-la-cruz",
    "pavimentacion-calle-huazontle",
    "piscina-boca",
    "piscina-coapexpan",
  ],
};

/* ------------ Helpers para imágenes con fallback (AVIF → WebP → JPG) ------------ */
function buildFormats(originalPath: string) {
  const base = originalPath.replace(/\.(avif|webp|jpe?g|png)$/i, "");
  return { avif: `${base}.avif`, webp: `${base}.webp`, fallback: originalPath };
}

function PictureFallback({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const f = buildFormats(src);
  return (
    <picture>
      <source srcSet={f.avif} type="image/avif" />
      <source srcSet={f.webp} type="image/webp" />
      <img src={f.fallback} alt={alt} className={className} />
    </picture>
  );
}

/* ------------------------------- Responsive ------------------------------- */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    update();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return isDesktop;
}

// Aplica un orden parcial/total basado en slugs
function applyOrder(items: ProjectItem[], orderList: string[] | undefined) {
  if (!orderList || orderList.length === 0) return items;
  const pos = new Map(orderList.map((slug, i) => [slug, i]));
  const BIG = 1e9; // envía al final lo no listado
  return items.slice().sort(
    (a, b) => (pos.get(a.slug) ?? BIG) - (pos.get(b.slug) ?? BIG)
  );
}

// Divide en columnas siguiendo el patrón (solo desktop)
function splitByPattern(items: ProjectItem[], pattern: ("L"|"R")[]) {
  const left: ProjectItem[] = [];
  const right: ProjectItem[] = [];
  items.forEach((p, idx) => {
    (pattern[idx % pattern.length] === "L" ? left : right).push(p);
  });
  return { left, right };
}

export default function Proyectos() {
  const isDesktop = useIsDesktop();

  // 1) Decide orden según dispositivo
  const ordered = useMemo(() => {
    if (isDesktop === null) return PROJECTS; // SSR: neutro
    return applyOrder(PROJECTS, isDesktop ? ORDER.desktop : ORDER.mobile);
  }, [isDesktop]);

  // 2) Solo si es desktop, repartimos en columnas
  const columns = useMemo(() => {
    if (!isDesktop) return { left: [] as ProjectItem[], right: [] as ProjectItem[] };
    return splitByPattern(ordered, PATTERN_DESKTOP);
  }, [ordered, isDesktop]);

  return (
    <section id="projects" className="bg-white antialiased">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&display=swap"
      />

      <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[10rem] md:py-[12rem]">
        <div className="text-center">
          <h2 className="[font-family:'Khand',_sans-serif] uppercase text-[#272727] font-[500] leading-[1] tracking-[0.05rem] text-[4.2rem] sm:text-[5rem] md:text-[6rem] mb-[2rem] md:mb-[2.5rem]">
            Proyectos en proceso
          </h2>
        </div>

        {/* MÓVIL: una sola columna en el orden exacto de `ordered` */}
        {isDesktop === false && (
          <div className="space-y-[6rem]">
            {ordered.map((p) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
              >
                <Item p={p} />
              </motion.div>
            ))}
          </div>
        )}

        {/* DESKTOP: dos columnas L/R con tu patrón */}
        {isDesktop && (
          <div className="grid grid-cols-12 md:gap-x-[3rem]">
            <div className="col-span-6">
              {columns.left.map((p) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                >
                  <Item p={p} />
                </motion.div>
              ))}
            </div>

            <div className="col-span-6">
              {columns.right.map((p, idx) => (
                <motion.div
                  key={p.slug}
                  className={idx === 0 ? "md:mt-[7.5rem]" : ""}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                >
                  <Item p={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Item({ p }: { p: ProjectItem }) {
  return (
    <div className="relative pl-[3rem] pb-[6rem] md:pl-[9rem] md:pb-[9rem]">
      <Link href={`/proyectos/${p.slug}`} className="block overflow-hidden">
        <PictureFallback
          src={p.thumb}
          alt={p.title}
          className="block w-full h-auto select-none object-cover transition-transform duration-300 hover:scale-95"
        />
      </Link>

      <div
        className="
          absolute left-[3rem] bottom-[3rem]
          md:left-[5rem] md:bottom-[8.9rem]
          bg-white pl-0 pr-[1.5rem] py-[1.5rem] mr-[1.5rem]
          md:pr-[2rem] md:py-[2rem] md:mr-[2rem]
        "
        style={{ fontFamily: "Khand, sans-serif" }}
      >
        <p className="text-[1.5rem] md:text-[1.7rem] leading-[1.75em]" style={{ color: ACCENT }}>
          {p.category}
        </p>
        <h3 className="text-[2.2rem] md:text-[2.4rem] leading-[1.25em] text-[#272727] m-0">
          <Link href={`/proyectos/${p.slug}`} className="hover:opacity-80">
            {p.title}
          </Link>
        </h3>
      </div>
    </div>
  );
}
