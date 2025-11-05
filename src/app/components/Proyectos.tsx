"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { type ProjectItem, PROJECTS } from "@/app/lib/projects";

const ACCENT = "#c5a47e";

// Patrón de columnas para DESKTOP
const PATTERN_DESKTOP: ("L" | "R")[] = ["L", "R", "R", "L", "R", "L"];

/** Orden explícito por dispositivo (usa slugs). */
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

/* ------------ Helpers imágenes AVIF → WebP → JPG ------------ */
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

function applyOrder(items: ProjectItem[], orderList?: string[]) {
  if (!orderList || orderList.length === 0) return items;
  const pos = new Map(orderList.map((slug, i) => [slug, i]));
  const BIG = 1e9;
  return items
    .slice()
    .sort((a, b) => (pos.get(a.slug) ?? BIG) - (pos.get(b.slug) ?? BIG));
}

function splitByPattern(items: ProjectItem[], pattern: ("L" | "R")[]) {
  const left: ProjectItem[] = [];
  const right: ProjectItem[] = [];
  items.forEach((p, idx) => {
    (pattern[idx % pattern.length] === "L" ? left : right).push(p);
  });
  return { left, right };
}

export default function Proyectos() {
  const isDesktop = useIsDesktop();

  const ordered = useMemo(() => {
    if (isDesktop === null) return PROJECTS;
    return applyOrder(PROJECTS, isDesktop ? ORDER.desktop : ORDER.mobile);
  }, [isDesktop]);

  const columns = useMemo(() => {
    if (!isDesktop) return { left: [] as ProjectItem[], right: [] as ProjectItem[] };
    return splitByPattern(ordered, PATTERN_DESKTOP);
  }, [ordered, isDesktop]);

  return (
    <section id="projects" data-section="projects" className="bg-white antialiased">
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

        {/* MÓVIL */}
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

        {/* DESKTOP */}
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
      {/* LINK: imagen + overlays + CTA (arriba-izquierda) */}
      <Link
        href={`/proyectos/${p.slug}`}
        aria-label={`Ver proyecto: ${p.title}`}
        className="group relative block overflow-hidden cursor-pointer
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ outlineColor: ACCENT }}
      >
        {/* Imagen con micro-zoom */}
        <PictureFallback
          src={p.thumb}
          alt={p.title}
          className="block w-full h-auto select-none object-cover
                     transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Fade inferior sutil para dar contraste al título */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28
                     bg-gradient-to-t from-black/18 via-black/8 to-transparent
                     opacity-100 md:opacity-0 md:group-hover:opacity-100
                     transition-opacity duration-300"
        />

        {/* CTA: ahora ARRIBA-IZQUIERDA para no chocar con la tarjeta */}
        <span
          className="absolute left-3 top-3 md:left-4 md:top-4
                     rounded bg-white/95 px-[1.2rem] py-[.6rem]
                     text-[1.2rem] font-semibold uppercase tracking-[.12em]
                     text-[#272727] shadow
                     opacity-100 md:opacity-0 md:group-hover:opacity-100
                     transition"
          style={{ color: ACCENT }}
        >
          Click aquí para ver más
        </span>
      </Link>

      {/* Tarjeta de texto (queda libre de solaparse con el CTA) */}
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
          <Link
            href={`/proyectos/${p.slug}`}
            aria-label={`Ver proyecto: ${p.title}`}
            className="hover:opacity-80"
          >
            {p.title} <span aria-hidden>→</span>
          </Link>
        </h3>
      </div>
    </div>
  );
}
