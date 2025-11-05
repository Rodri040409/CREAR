"use client";

import { useEffect, useMemo, useState } from "react";

/** CREAR — CONTACTO + FOOTER (compacto en móvil y con icono WA AVIF/WebP/PNG)
 *  + Indicador de scroll (anillo de progreso alrededor del botón "Volver arriba")
 */
export default function SavoyeContactFooterExact() {
  const year = new Date().getFullYear();

  // WhatsApp
  const WA_BASE = "/imagenes/Redes/whatsapp";
  const WA =
    "https://wa.me/522961205199?text=Hola%20CREAR%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios";

  // === Indicador de scroll ===
  const ACCENT = "#c5a47e";
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const top = doc.scrollTop || window.pageYOffset || 0;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      setProgress(top / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const ringBg = useMemo(
    () =>
      // anillo con conic-gradient; el tramo restante queda en un color suave
      `conic-gradient(${ACCENT} ${pct * 3.6}deg, rgba(197,164,126,.22) 0deg)`,
    [pct]
  );

  return (
    <footer className="bg-white antialiased">
      {/* Fuentes */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
      />

      {/* ===================== CONTACTO ===================== */}
      <section id="contact" className="relative overflow-hidden">
        {/* Fondo (bg-fixed solo en md+ para evitar saltos en móviles) */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: "url(/imagenes/Hero/Hero1.jpg)" }}
          aria-hidden
        />
        {/* Gradiente blanco hacia arriba (look del tema) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,.88) 22%, rgba(255,255,255,.74) 42%, rgba(255,255,255,.5) 100%)",
          }}
        />
        {/* Línea decorativa superior */}
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-3.7rem",
            width: "0.2rem",
            height: "7.5rem",
            backgroundColor: "#c5a47e",
          }}
        />

        {/* Contenedor — padding móvil AÚN MÁS COMPACTO */}
        <div className="relative z-[1] mx-auto w-full max-w-[114rem] px-[1.5rem] pt-[7rem] pb-[2.8rem] md:pt-[12rem] md:pb-[10rem]">
          <h2 className="[font-family:'Khand',_sans-serif] uppercase text-[#272727] font-[500] leading-[1] tracking-[0.05rem] text-[5.4rem] md:text-[6rem] mb-[2.8rem]">
            Métodos de contacto
          </h2>

          {/* Grid 12 → 4 | 4 | 4 */}
          <div className="relative grid grid-cols-12 gap-x-[3rem] gap-y-[2rem] items-start">
            {/* TELÉFONO */}
            <div className="col-span-12 md:col-span-4">
              <div className="text-[#a0a0a0] text-[1.3rem] uppercase tracking-[.18em] [font-family:'Roboto',_system-ui]">
                Teléfono
              </div>
              <div className="relative my-[0.8rem]">
                <span className="absolute inset-y-0 left-0 right-0 my-auto h-[4.2rem] bg-white" />
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-[1] block pl-[1.2rem] text-[#272727] text-[2rem] leading-[4.2rem] [font-family:'Roboto',_system-ui] hover:opacity-80"
                  aria-label="Escríbenos por WhatsApp"
                >
                  296 120 5199
                </a>
              </div>
            </div>

            {/* CORREO */}
            <div className="col-span-12 md:col-span-4">
              <div className="text-[#a0a0a0] text-[1.3rem] uppercase tracking-[.18em] [font-family:'Roboto',_system-ui]">
                Correo
              </div>
              <div className="relative my-[0.8rem]">
                <span className="absolute inset-y-0 left-0 right-0 my-auto h-[4.2rem] bg-white" />
                <a
                  href="mailto:arqueroz10@gmail.com"
                  className="relative z-[1] block pl-[1.2rem] text-[#272727] text-[2rem] leading-[4.2rem] [font-family:'Roboto',_system-ui] hover:opacity-80"
                >
                  arqueroz10@gmail.com
                </a>
              </div>
              <p className="text-[#6f6f6f] text-[1.5rem] leading-[1.9] [font-family:'Roboto',_system-ui] m-0">
                Coatepec, Veracruz, México
              </p>
            </div>

            {/* WHATSAPP */}
            <div className="col-span-12 md:col-span-4">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto w-fit md:ml-auto md:mr-0 flex items-center justify-center gap-[1.2rem] md:justify-end group"
                aria-label="Abrir WhatsApp"
                title="Escríbenos por WhatsApp"
              >
                <span className="relative grid h-[6.8rem] w-[6.8rem] place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,.08)] ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 md:h-[8.5rem] md:w-[8.5rem]">
                  <picture>
                    <source srcSet={`${WA_BASE}.avif`} type="image/avif" />
                    <source srcSet={`${WA_BASE}.webp`} type="image/webp" />
                    <img
                      src={`${WA_BASE}.png`}
                      alt="WhatsApp"
                      className="h-[3.0rem] w-[3.0rem] md:h-[3.4rem] md:w-[3.4rem] object-contain"
                      draggable={false}
                    />
                  </picture>
                </span>
                <span className="text-[1.6rem] text-[#272727] [font-family:'Roboto',_system-ui]">
                  Escríbenos por WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER WIDGETS ============================ */}
      <section className="relative">
        <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] pt-[4.4rem] pb-[6.4rem] md:pt-[8rem] md:pb-[8rem]">
          <div className="grid grid-cols-12 gap-x-[3rem]">
            {/* CREAR */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-[1.3rem]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#c5a47e]">
                  <path d="M3 10.5l9-6 9 6v8a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5v-8z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 20V12h6v8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="[font-family:'Khand',_sans-serif] text-[2.4rem] font-[700] text-[#272727]">
                  CREAR
                </span>
              </div>

              <p className="mt-[1.6rem] max-w-[34rem] text-[1.5rem] leading-[1.9] text-[#6f6f6f] [font-family:'Roboto',_system-ui]">
                Bienvenido a <span className="text-[#272727]">Crear</span>, empresa de arquitectura.
              </p>
            </div>

            {/* Nuestros servicios */}
            <div className="col-span-12 md:col-span-4 mt-[3.6rem] md:mt-0">
              <h6 className="[font-family:'Khand',_sans-serif] text-[#272727] text-[2rem] font-[700] uppercase tracking-[.08em] mb-[1.4rem]">
                Nuestros servicios
              </h6>
              <ul className="space-y-[0.8rem] text-[1.5rem] text-[#6f6f6f] [font-family:'Roboto',_system-ui]">
                <li>Diseño Arquitectónico</li>
                <li>Construcción</li>
                <li>Obra pública</li>
                <li>Urbanización</li>
                <li>Electrificación</li>
                <li>Gestión de proyectos</li>
              </ul>
            </div>

            {/* Hablemos */}
            <div className="col-span-12 md:col-span-4 mt-[3.6rem] md:mt-0">
              <h6 className="[font-family:'Khand',_sans-serif] text-[#272727] text-[2rem] font-[700] uppercase tracking-[.08em] mb-[1.4rem]">
                Hablemos
              </h6>
              <ul className="space-y-[0.8rem] text-[1.5rem] text-[#6f6f6f] [font-family:'Roboto',_system-ui]">
                <li>¿Tienes un proyecto en mente?</li>
                <li>Construyamos algo increíble juntos</li>
                <li>
                  <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#272727] hover:opacity-80"
                    aria-label="Escríbenos por WhatsApp"
                  >
                    296 120 5199
                  </a>
                </li>
                <li>
                  <a href="mailto:arqueroz10@gmail.com" className="hover:opacity-80">
                    arqueroz10@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#eaeaea]" />
      </section>

      {/* ============================== Barra inferior ============================== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[2.2rem] flex flex-col md:flex-row md:items-center md:justify-between gap-[1.2rem] [font-family:'Roboto',_system-ui]">
          <div className="text-[1.3rem] text-[#6f6f6f]">
            © {year}, <span className="text-[#272727]">CREAR</span>. Todos los derechos reservados.
          </div>
          {/* (sin términos/privacidad) */}
        </div>

        {/* Volver arriba + anillo de progreso */}
        <div className="fixed bottom-[2rem] right-[2rem] z-50">
          {/* contenedor que pinta el anillo; el padding crea el “bisel” */}
          <div
            className="rounded-full p-[.32rem]"
            style={{
              background: ringBg,
              boxShadow: "0 6px 18px rgba(0,0,0,.08)",
            }}
            aria-hidden
          >
            <a
              href="#home"
              aria-label={`Volver arriba — ${pct}% de avance`}
              title={`Has recorrido ${pct}%`}
              className="grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border border-[#d9c5ab] text-[#c5a47e] bg-white
                         shadow-[0_6px_18px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5l-7 7m7-7l7 7M12 5v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="sr-only">{pct}%</span>
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
