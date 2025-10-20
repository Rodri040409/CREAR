"use client";

import { motion } from "framer-motion";

type Project = {
  img: string;
  href: string;
  category: string;
  title: string;
};

const BASE = "https://shtheme.org/demosd/savoye/";

const ALL: Project[] = [
  { img: "wp-content/uploads/2022/01/1-2.jpg", href: "index9339.html?project=brown-monara-house-ottova-canada", category: "Architecture",     title: "Brown Monara House Ottova Canada" },
  { img: "wp-content/uploads/2022/01/2-2.jpg", href: "index4910.html?project=twin-forestland-home",                category: "Exterior Design", title: "Twin Forestland Home" },
  { img: "wp-content/uploads/2022/01/3-2.jpg", href: "index0631.html?project=geometric-building",                  category: "Architecture",     title: "Geometric Building" },
  { img: "wp-content/uploads/2022/01/4-2.jpg", href: "index87f3.html?project=arch-cloud-honna-didenton-villa",     category: "Exterior Design", title: "Arch Cloud Honna Didenton Villa" },
  { img: "wp-content/uploads/2022/01/5-2.jpg", href: "index6ed8.html?project=woodenist-house-lumberjack",          category: "Architecture",     title: "Woodenist House Lumberjack" },
  { img: "wp-content/uploads/2022/01/6-2.jpg", href: "indexc506.html?project=bungalow-dark-house",                 category: "Exterior Design", title: "Bungalow Dark House" },
];

// Orden exacto del tema: izq = 1,4,6 / der = 2,3,5
const LEFT = [ALL[0], ALL[3], ALL[5]];
const RIGHT = [ALL[1], ALL[2], ALL[4]];

export default function SavoyeProjectsExact() {
  return (
    <section id="projects" className="bg-white antialiased">
      {/* Tipografías del tema */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&display=swap"
      />

      {/* Container 1140px ⇒ 114rem (1rem=10px) */}
      <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[10rem] md:py-[12rem]">
        {/* .section-title: 42px en móvil, 60px en ≥md */}
        <div className="text-center">
          <h2 className="[font-family:'Khand',_sans-serif] uppercase text-[#272727] font-[500] leading-[1] tracking-[0.05rem] text-[4.2rem] sm:text-[5rem] md:text-[6rem] mb-[2rem] md:mb-[2.5rem]">
            Nuestros proyectos
          </h2>
        </div>

        {/* Dos columnas sólo en ≥md; gutter 30px */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-[3rem]">
          {/* Columna izquierda (1,4,6) */}
          <div className="md:col-span-6">
            {LEFT.map((p) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
              >
                <Item p={p} />
              </motion.div>
            ))}
          </div>

          {/* Columna derecha (2,3,5) con offset 75px SOLO en ≥md */}
          <div className="md:col-span-6">
            {RIGHT.map((p, idx) => (
              <motion.div
                key={p.href}
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

/* ====== subcomponente ====== */
function Item({ p }: { p: Project }) {
  return (
    // Wrap: 30px/60px en móvil, 90px/90px en ≥md (igual que el tema)
    <div className="relative pl-[3rem] pb-[6rem] md:pl-[9rem] md:pb-[9rem]">
      <a href={BASE + p.href} className="block overflow-hidden">
        <img
          src={BASE + p.img}
          alt={p.title}
          className="block w-full h-auto select-none object-cover transition-transform duration-300 hover:scale-95"
          loading="lazy"
          decoding="async"
        />
      </a>

      {/* Cartucho: 30px de borde en móvil; 50px/89px en ≥md */}
      <div
        className="
          absolute left-[3rem] bottom-[3rem]
          md:left-[5rem] md:bottom-[8.9rem]
          bg-white pl-0 pr-[1.5rem] py-[1.5rem] mr-[1.5rem]
          md:pr-[2rem] md:py-[2rem] md:mr-[2rem]
        "
        style={{ fontFamily: "Khand, sans-serif" }}
      >
        <p className="text-[1.5rem] md:text-[1.7rem] leading-[1.75em] text-[#c5a47e] mb-[0.5rem] inline-flex">
          {p.category}
        </p>
        <h3 className="text-[2.2rem] md:text-[2.4rem] leading-[1.25em] text-[#272727] m-0">
          <a href={BASE + p.href} className="hover:opacity-80">
            {p.title}
          </a>
        </h3>
      </div>
    </div>
  );
}

export { SavoyeProjectsExact };
