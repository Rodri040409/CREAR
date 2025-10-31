"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type BreakImg = {
  src: string;
  /** CSS object-position, ej: "center center", "50% 30%", "left top" */
  pos?: string;
};

type Slide = {
  title: string;
  kicker: string;
  copy: string;
  cta: string;
  // Imagen por breakpoint + posición por breakpoint
  mobile: BreakImg;
  tablet: BreakImg;
  desktop: BreakImg;
};

export default function SavoyeTopExact() {
  const ACCENT = "#c5a47e";
  const BORDER = "#f6f6f6";

  // Estilos de header (logo exacto)
  const NAV_TOP = {
    headerBg: "rgba(0,0,0,0)",
    logoPad: "px-[2.2rem] py-[1.4rem]",
    cardVisible: "opacity-100",
  };
  const NAV_SCROLL = {
    headerBg: "#ffffff",
    logoPad: "px-[2.2rem] py-[1.4rem]",
    cardVisible: "opacity-0",
  };

  const fontLinks = useMemo(
    () => [
      "https://fonts.googleapis.com/css2?family=Khand:wght@600;700&family=Roboto:wght@300;400;500;700&display=swap",
    ],
    []
  );

  const logoLight = "/imagenes/CREAR.png";

  // ======= AQUÍ EDITAS TUS SLIDES (una imagen y posición por breakpoint) =======
  const slides: Slide[] = [
    {
      title: "CREAR",
      kicker: "Estudio de arquitectura",
      copy: "Construyendo con sentido.",
      cta: "#",
      mobile: {
        src: "/imagenes/Hero/Hero1.jpg", // móvil (≤ 767px aprox)
        pos: "20% 10%",
      },
      tablet: {
        src: "/imagenes/Hero/Hero1.jpg", // tablet (≥ 768px)
        pos: "center center",
      },
      desktop: {
        src: "/imagenes/Hero/Hero1.jpg", // desktop (≥ 1024px)
        pos: "center 45%",
      },
    },
    {
      title: "Diseño y construcción",
      kicker: "Servicios de",
      copy:
        "Diseño y construcción de casa-habitación, así como remodelaciones y ampliaciones de edificación habitacional, residencial y comercial.",
      cta: "#",
      mobile: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
        pos: "50% 30%",
      },
      tablet: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
        pos: "center center",
      },
      desktop: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
        pos: "center 55%",
      },
    },
    {
      title: "Civil y eléctrica",
      kicker: "Obras de ingeniería",
      copy:
        "Trabajos de ingeniería civil y obra pública, así como obras de electrificación en alta y media tensión.",
      cta: "#",
      mobile: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
        pos: "center 35%",
      },
      tablet: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
        pos: "center center",
      },
      desktop: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
        pos: "50% 45%",
      },
    },
    {
      title: "Urbanización",
      kicker: "Proyectos de",
      copy: "Proyectos de urbanización, lotificación y levantamientos de topografía.",
      cta: "#",
      mobile: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
        pos: "center 30%",
      },
      tablet: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
        pos: "center 50%",
      },
      desktop: {
        src: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
        pos: "center 60%",
      },
    },
  ];
  // ============================================================================

  const services = [
    {
      icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/6-2.png",
      label: "Diseño Arquitectónico",
      href: "/servicios/diseno-arquitectonico",
    },
    {
      icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.png",
      label: "Construcción",
      href: "/servicios/construccion",
    },
    {
      icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/4-2.png",
      label: "Obra pública",
      href: "/servicios/obra-publica",
    },
    {
      icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/3-2.png",
      label: "Urbanización",
      href: "/servicios/urbanizacion",
    },
    {
      icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/5-2.png",
      label: "Electrificación",
      href: "/servicios/electrificacion",
    },
    {
      icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.png",
      label: "Gestión de proyectos",
      href: "/servicios/gestion-de-proyectos",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [navScroll, setNavScroll] = useState(false);

  // --vh para móviles (altura real)
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  // Header reactivo al scroll
  useEffect(() => {
    const onScroll = () => setNavScroll(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-rotación del carrusel
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative overflow-x-hidden"
      style={{ fontFamily: "Roboto, system-ui, -apple-system" }}
    >
      {fontLinks.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <link rel="preload" as="image" href={logoLight} />

      {/* ======== HEADER SOLO CON LOGO ======== */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: navScroll ? NAV_SCROLL.headerBg : NAV_TOP.headerBg,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[99] h-[10rem] flex items-center ${navScroll ? "border-b" : ""} ${navScroll ? "shadow-[0_8px_24px_rgba(0,0,0,.06)]" : ""}`}
        style={{ borderColor: navScroll ? BORDER : "transparent" }}
      >
        <div className="mx-auto flex w-full max-w-[114rem] items-center justify-between px-[1.5rem]">
          <a
            href="#"
            aria-label="Savoye — home"
            className={`relative inline-flex items-center ${navScroll ? NAV_SCROLL.logoPad : NAV_TOP.logoPad}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 transition-opacity duration-150 ${navScroll ? NAV_SCROLL.cardVisible : NAV_TOP.cardVisible} bg-white shadow-[0_1rem_2.6rem_rgba(0,0,0,.14)]`}
            />
            <img
              src={logoLight}
              alt="Savoye"
              className="relative h-[2.8rem] select-none"
              draggable={false}
            />
          </a>
          {/* Menú eliminado a petición */}
        </div>
      </motion.header>

      {/* =============== HERO =============== */}
      <div
        className="relative overflow-hidden"
        style={{ height: "calc(var(--vh, 1vh) * 100)", minHeight: "100svh" }}
      >
        {slides.map((s, i) => {
          const active = i === idx;
          // Elegimos la posición por breakpoint con CSS variables para evitar CLS
          const objectPositionVar = `
            ${s.mobile.pos || "center center"}; 
          `;

          return (
            <motion.div
              key={s.title + i}
              className="absolute inset-0 z-0"
              initial={{ opacity: active ? 1 : 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ pointerEvents: active ? "auto" : "none" }}
            >
              {/* IMAGEN RESPONSIVE POR BREAKPOINT */}
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.04 : 1.02 }}
                transition={{ duration: 7, ease: [0.4, 0.0, 0.2, 1] }}
                className="absolute inset-0 z-0"
              >
                <picture className="absolute inset-0 block">
                  {/* Desktop ≥ 1024px */}
                  <source media="(min-width: 1024px)" srcSet={s.desktop.src} />
                  {/* Tablet ≥ 768px */}
                  <source media="(min-width: 768px)" srcSet={s.tablet.src} />
                  {/* Fallback móvil */}
                  <img
                    src={s.mobile.src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      objectPosition: "var(--obj-pos, center center)",
                      // Actualizamos la variable en runtime con matchMedia
                    }}
                  />
                </picture>
              </motion.div>

              {/* Overlay gradiente */}
              <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.75)_0%,rgba(0,0,0,.55)_45%,rgba(0,0,0,.35)_72%,rgba(0,0,0,.12)_100%)]" />

              {/* Contenido */}
              <div className="relative z-20 flex h-full items-center">
                <div className="mx-auto w-full max-w-[114rem] px-[1.5rem]">
                  <div className="max-w-[76rem]">
                    <div className="mb-[1.2rem] inline-flex items-center gap-[1.4rem] text-[1.2rem] uppercase tracking-[.32em] text-white">
                      <span
                        className="inline-block h-[.2rem] w-[3.8rem]"
                        style={{ backgroundColor: ACCENT }}
                      />
                      {s.kicker}
                    </div>
                    <h1 className="[font-family:'Khand',_sans-serif] text-white uppercase leading-[1.05] tracking-[.01em] text-[clamp(3.2rem,9vw,10rem)] font-[700] [text-shadow:0_2px_0_rgba(0,0,0,.25)]">
                      {s.title}
                    </h1>
                    <p className="mt-[1.2rem] max-w-[64rem] text-[1.4rem] leading-[1.72] text-[rgba(255,255,255,.86)]">
                      {s.copy}
                    </p>
                    <a
                      href={s.cta}
                      className="mt-[2rem] inline-block rounded-[.2rem] px-[1.8rem] py-[1.2rem] text-[1.2rem] font-bold uppercase tracking-[.18em] text-white"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Discover
                    </a>
                  </div>
                </div>
              </div>

              {/* Script ligero para posicionar por breakpoint sin re-render */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  (function(){
                    try{
                      var root = document.currentScript.parentElement;
                      if(!root) return;
                      var img = root.querySelector('img');
                      var setPos = function(){
                        var pos = '${(s.mobile.pos || "center center")
                          .replace(/'/g, "\\'")
                          .trim()}';
                        if (window.matchMedia('(min-width: 1024px)').matches) {
                          pos = '${(s.desktop.pos || s.mobile.pos || "center center")
                            .replace(/'/g, "\\'")
                            .trim()}';
                        } else if (window.matchMedia('(min-width: 768px)').matches) {
                          pos = '${(s.tablet.pos || s.mobile.pos || "center center")
                            .replace(/'/g, "\\'")
                            .trim()}';
                        }
                        if (img && img.style) {
                          img.style.setProperty('--obj-pos', pos);
                          img.style.objectPosition = 'var(--obj-pos)';
                        }
                      };
                      setPos();
                      window.addEventListener('resize', setPos, {passive:true});
                      window.addEventListener('orientationchange', setPos, {passive:true});
                    }catch(e){}
                  })();
                `,
                }}
              />
            </motion.div>
          );
        })}

        {/* Bullets mobile */}
        <div
          className="absolute left-1/2 z-50 flex -translate-x-1/2 gap-3 lg:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        >
          {slides.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${active ? "bg-white" : "border border-white/80 bg-transparent"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>

        {/* Bullets desktop */}
        <div className="absolute right-[11.8rem] top-1/2 z-50 hidden -translate-y-1/2 gap-[1.6rem] lg:flex">
          {slides.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border-2 ${active ? "border-white" : "border-white/65"} transition-transform duration-200 hover:scale-[1.05] ring-1 ring-white/15`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`h-[1rem] w-[1rem] rounded-full ${active ? "bg-white" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= RIBBON ================= */}
      <div className="relative z-30 md:-mt-[17.7rem]">
        <div className="w-full shadow-[0_2.8rem_7rem_rgba(0,0,0,.22)]">
          {/* Fila superior */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 border-b"
            style={{ borderColor: BORDER }}
          >
            <div className="hidden md:block h-[17.6rem] bg-transparent" />
            <div className="hidden md:block h-[17.6rem] bg-transparent" />

            <Link
              href={services[0].href}
              title={services[0].label}
              className="group flex h-[14rem] md:h-[17.6rem] flex-col items-center justify-center gap-[1.6rem] bg-white transition-colors hover:bg-[#F3ECE5] md:border-r"
              style={{ borderColor: BORDER }}
            >
              <img
                src={services[0].icon}
                alt=""
                className="h-[5.6rem] w-[5.6rem] object-contain"
              />
              <span className="[font-family:'Khand',_sans-serif] text-[1.9rem] tracking-[.01em] leading-[1.2] text-[#6f6f6f] group-hover:text-[#111] select-text">
                {services[0].label}
              </span>
            </Link>

            <Link
              href={services[1].href}
              title={services[1].label}
              className="group flex h-[14rem] md:h-[17.6rem] flex-col items-center justify-center gap-[1.6rem] bg-white transition-colors hover:bg-[#F3ECE5]"
            >
              <img
                src={services[1].icon}
                alt=""
                className="h-[5.6rem] w-[5.6rem] object-contain"
              />
              <span className="[font-family:'Khand',_sans-serif] text-[1.9rem] tracking-[.01em] leading-[1.2] text-[#6f6f6f] group-hover:text-[#111] select-text">
                {services[1].label}
              </span>
            </Link>
          </div>

          {/* Fila inferior */}
          <div className="grid grid-cols-1 md:grid-cols-4">
            {services.slice(2).map((svc, i, arr) => (
              <Link
                key={svc.label}
                href={svc.href}
                title={svc.label}
                className="group flex h-[14rem] md:h-[17.6rem] flex-col items-center justify-center gap-[1.6rem] bg-white transition-colors hover:bg-[#F3ECE5] border-t"
                style={{
                  borderColor: BORDER,
                  borderRight:
                    i !== arr.length - 1 ? `1px solid ${BORDER}` : undefined,
                }}
              >
                <img
                  src={svc.icon}
                  alt=""
                  className="h-[5.6rem] w-[5.6rem] object-contain"
                />
                <span className="[font-family:'Khand',_sans-serif] text-[1.9rem] tracking-[.01em] leading-[1.2] text-[#6f6f6f] group-hover:text-[#111] select-text">
                  {svc.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Separador final */}
        <div className="h-[10rem]" />
      </div>
    </section>
  );
}
