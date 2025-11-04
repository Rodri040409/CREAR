"use client";

import { motion } from "framer-motion";

export default function SavoyeAboutExact() {
  const ACCENT = "#c5a47e";

  const paragraphs = [
    "Somos Crear, estudio de arquitectura con base en Coatepec, Veracruz. Diseñamos espacios que se viven: funcionales, luminosos y eficientes, con un estilo atemporal que eleva el día a día y agrega valor a cada metro cuadrado.",
    "Acompañamos todo el ciclo del proyecto: diseño arquitectónico, construcción, obra pública, urbanización, electrificación y gestión de proyectos. Integramos normativa, presupuesto y sostenibilidad desde el primer trazo para que no haya sorpresas y cada decisión se traduzca en resultados.",
    "Trabajamos contigo con un proceso claro: escuchamos, proponemos, calendarizamos, ejecutamos y entregamos. Comunicación transparente, tiempos definidos y un solo frente responsable. ¿Listo para transformar tu espacio con Crear?",
  ];

  const aboutImg = "/imagenes/Nosotros/Nosotros.png";

  return (
    <section id="about" className="bg-white antialiased">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&display=swap"
      />

      {/* Antes: py-[12rem] → compactamos en móvil */}
      <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[1rem] md:py-[10rem] lg:py-[12rem]">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-[3rem] items-start">
          {/* col-md-7 */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
          >
            <h2
              className="
                uppercase text-[#272727] font-[500]
                leading-[1em]
                [font-family:'Khand',_sans-serif]
                text-[4.2rem] sm:text-[5rem] md:text-[6rem]
                tracking-[0.05rem]
                mb-[1.6rem] md:mb-[2.5rem]
              "
            >
              Sobre nosotros
            </h2>

            <div className="[font-family:'Khand',_sans-serif] text-[#555]">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[1.6rem] md:text-[1.7rem] leading-[1.75em] tracking-[0.025rem] mb-[1.2rem] md:mb-[2rem]"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* col-md-5 */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1], delay: 0.05 }}
          >
            <div className="relative">
              <div className="relative">
                <img
                  src={aboutImg}
                  alt="Crear — Sobre nosotros (boceto)"
                  className="block w-full h-auto object-contain select-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { SavoyeAboutExact };
