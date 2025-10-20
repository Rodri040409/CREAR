"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS, type ProjectItem } from "@/app/lib/projects";

const ACCENT = "#c5a47e";

// Orden del tema original: izq = 1,4,6 / der = 2,3,5
const LEFT: ProjectItem[]  = [PROJECTS[0], PROJECTS[3], PROJECTS[5]];
const RIGHT: ProjectItem[] = [PROJECTS[1], PROJECTS[2], PROJECTS[4]];

export default function Proyectos() {
  return (
    <section id="projects" className="bg-white antialiased">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&display=swap"
      />

      <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[10rem] md:py-[12rem]">
        <div className="text-center">
          <h2 className="[font-family:'Khand',_sans-serif] uppercase text-[#272727] font-[500] leading-[1] tracking-[0.05rem] text-[4.2rem] sm:text-[5rem] md:text-[6rem] mb-[2rem] md:mb-[2.5rem]">
            Nuestros proyectos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-[3rem]">
          {/* Columna izquierda */}
          <div className="md:col-span-6">
            {LEFT.map((p) => (
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

          {/* Columna derecha (con offset inicial) */}
          <div className="md:col-span-6">
            {RIGHT.map((p, idx) => (
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
      </div>
    </section>
  );
}

function Item({ p }: { p: ProjectItem }) {
  return (
    <div className="relative pl-[3rem] pb-[6rem] md:pl-[9rem] md:pb-[9rem]">
      <Link href={`/proyectos/${p.slug}`} className="block overflow-hidden">
        <img
          src={p.thumb}
          alt={p.title}
          className="block w-full h-auto select-none object-cover transition-transform duration-300 hover:scale-95"
          loading="lazy"
          decoding="async"
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
