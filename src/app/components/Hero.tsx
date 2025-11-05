"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import ServicesRibbon from "./ServicesRibbon";

type BreakImg = { src: string; pos?: string };
type Slide = {
  title: string;
  kicker: string;
  copy: string;
  cta: string;
  mobile: BreakImg;
  tablet: BreakImg;
  desktop: BreakImg;
};

export default function SavoyeTopExact() {
  const ACCENT = "#c5a47e";
  const BORDER = "#f6f6f6";

  const WA =
    "https://wa.me/522961205199?text=Hola%20CREAR%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios";

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

  const slides: Slide[] = [
    {
      title: "CREAR",
      kicker: "Estudio de arquitectura",
      copy: "Construyendo con sentido.",
      cta: WA,
      mobile: { src: "/imagenes/Hero/Hero1.jpg", pos: "10% 10%" },
      tablet: { src: "/imagenes/Hero/Hero1.jpg", pos: "center center" },
      desktop: { src: "/imagenes/Hero/Hero1.jpg", pos: "center 45%" },
    },
    {
      title: "Diseño y construcción",
      kicker: "Servicios de",
      copy:
        "Diseño y construcción de casa-habitación, así como remodelaciones y ampliaciones de edificación habitacional, residencial y comercial.",
      cta: WA,
      mobile: { src: "/imagenes/Hero/Hero2.jpg", pos: "50% 30%" },
      tablet: { src: "/imagenes/Hero/Hero2.jpg", pos: "center center" },
      desktop: { src: "/imagenes/Hero/Hero2.jpg", pos: "center 55%" },
    },
    {
      title: "Civil y eléctrica",
      kicker: "Obras de ingeniería",
      copy:
        "Trabajos de ingeniería civil y obra pública, así como obras de electrificación en alta y media tensión.",
      cta: WA,
      mobile: { src: "/imagenes/Hero/Hero3.jpg", pos: "80% 35%" },
      tablet: { src: "/imagenes/Hero/Hero3.jpg", pos: "center center" },
      desktop: { src: "/imagenes/Hero/Hero3.jpg", pos: "50% 45%" },
    },
    {
      title: "Urbanización",
      kicker: "Proyectos de",
      copy:
        "Proyectos de urbanización, lotificación y levantamientos de topografía.",
      cta: WA,
      mobile: { src: "/imagenes/Hero/Hero4.jpg", pos: "center 30%" },
      tablet: { src: "/imagenes/Hero/Hero4.jpg", pos: "center 50%" },
      desktop: { src: "/imagenes/Hero/Hero4.jpg", pos: "center 60%" },
    },
  ];

  const services = [
    { icon: "/imagenes/Iconos/icono1.png", label: "Diseño Arquitectónico", href: "/servicios/diseno-arquitectonico" },
    { icon: "/imagenes/Iconos/icono2.png", label: "Construcción", href: "/servicios/construccion" },
    { icon: "/imagenes/Iconos/icono3.png", label: "Obra pública", href: "/servicios/obra-publica" },
    { icon: "/imagenes/Iconos/icono4.png", label: "Urbanización", href: "/servicios/urbanizacion" },
    { icon: "/imagenes/Iconos/icono5.png", label: "Electrificación", href: "/servicios/electrificacion" },
    { icon: "/imagenes/Iconos/icono6.png", label: "Gestión de proyectos", href: "/servicios/gestion-de-proyectos" },
  ];

  const [idx, setIdx] = useState(0);
  const [navScroll, setNavScroll] = useState(false);
  const timerRef = useRef<number | null>(null);

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

  useEffect(() => {
    const onScroll = () => setNavScroll(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const startTimer = () => {
    clearTimer();
    timerRef.current = window.setInterval(
      () => setIdx((i) => (i + 1) % slides.length),
      7000
    );
  };
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [slides.length]);

  const goTo = (n: number) => {
    setIdx(n);
    startTimer();
  };
  const next = () => goTo((idx + 1) % slides.length);
  const prev = () => goTo((idx - 1 + slides.length) % slides.length);

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

      {/* HEADER */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: navScroll ? NAV_SCROLL.headerBg : NAV_TOP.headerBg,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[99] h-[10rem] flex items-center ${
          navScroll ? "border-b" : ""
        } ${navScroll ? "shadow-[0_8px_24px_rgba(0,0,0,.06)]" : ""}`}
        style={{ borderColor: navScroll ? BORDER : "transparent" }}
      >
        <div className="mx-auto flex w-full max-w-[114rem] items-center justify-center md:justify-between px-[1.5rem]">
          <a
            href="#"
            aria-label="CREAR — home"
            className={`relative inline-flex items-center ${
              navScroll ? NAV_SCROLL.logoPad : NAV_TOP.logoPad
            }`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 transition-opacity duration-150 ${
                navScroll ? NAV_SCROLL.cardVisible : NAV_TOP.cardVisible
              } bg-white rounded-[.6rem] shadow-[0_1rem_2.6rem_rgba(0,0,0,.14)] ring-1 ring-black/10`}
            />
            <img
              src={logoLight}
              alt="CREAR"
              className="relative h-[3.6rem] md:h-[2.8rem] select-none"
              draggable={false}
            />
          </a>
        </div>
      </motion.header>

      {/* HERO */}
      <div
        className="relative overflow-hidden"
        style={{ height: "calc(var(--vh, 1vh) * 100)", minHeight: "100svh" }}
      >
        {slides.map((s, i) => {
          const active = i === idx;
          const isFirst = i === 0;

          return (
            <motion.div
              key={s.title + i}
              className="absolute inset-0 z-0"
              initial={{ opacity: active ? 1 : 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ pointerEvents: active ? "auto" : "none" }}
            >
              {/* Imagen responsive */}
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.04 : 1.02 }}
                transition={{ duration: 7, ease: [0.4, 0.0, 0.2, 1] }}
                className="absolute inset-0 z-0"
              >
                <picture className="absolute inset-0 block">
                  <source media="(min-width: 1024px)" srcSet={s.desktop.src} />
                  <source media="(min-width: 768px)" srcSet={s.tablet.src} />
                  <img
                    src={s.mobile.src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "var(--obj-pos, center center)" }}
                  />
                </picture>
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.75)_0%,rgba(0,0,0,.55)_45%,rgba(0,0,0,.35)_72%,rgba(0,0,0,.12)_100%)]" />

              {/* ======= CONTENIDO ======= */}
              {/* 1) Móvil SOLO para primer slide: LOGO GRANDE CENTRADO */}
              {isFirst && (
                <div className="relative z-20 flex h-full items-center justify-center md:hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                    className="relative"
                  >
                    {/* tarjeta blanca detrás del logo */}
                    <span className="absolute inset-0 -z-[1] rounded-[1rem] bg-white/95 shadow-[0_2rem_5rem_rgba(0,0,0,.25)] ring-1 ring-black/10" />
                    <motion.img
                      src={logoLight}
                      alt="CREAR"
                      className="block w-[70vw] max-w-[360px] h-auto p-6"
                      draggable={false}
                      // efecto “breathing” muy sutil
                      animate={{ scale: [1, 1.02, 1], y: [0, -6, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* CTA bajo el logo (móvil) */}
                  <a
                    href={s.cta}
                    target="_blank"
                    rel="noopener"
                    className="absolute left-1/2 -translate-x-1/2 rounded-[.2rem] px-[1.8rem] py-[1.2rem] text-[1.2rem] font-bold uppercase tracking-[.18em] text-white shadow-[0_10px_30px_rgba(0,0,0,.28)]"
                    style={{
                      backgroundColor: ACCENT,
                      // coloca el botón más ARRIBA y respeta el notch
                      bottom: "max(96px, calc(env(safe-area-inset-bottom, 0px) + 124px))",
                    }}
                  >
                    WhatsApp
                  </a>
                </div>
              )}

              {/* 2) Tablet/desktop (o cualquier slide ≠ 0): texto normal */}
              <div className={`relative z-20 h-full items-center ${isFirst ? "hidden md:flex" : "flex"}`}>
                <div className="mx-auto w-full max-w-[114rem] px-[1.5rem]">
                  <div className="max-w-[76rem]">
                    <div className="mb-[1.2rem] inline-flex items-center gap-[1.4rem] text-[1.2rem] uppercase tracking-[.32em] text-white">
                      <span className="inline-block h-[.2rem] w-[3.8rem]" style={{ backgroundColor: ACCENT }} />
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
                      target="_blank"
                      rel="noopener"
                      className="mt-[2rem] inline-block rounded-[.2rem] px-[1.8rem] py-[1.2rem] text-[1.2rem] font-bold uppercase tracking-[.18em] text-white"
                      style={{ backgroundColor: ACCENT }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* object-position por breakpoint */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  (function(){
                    try{
                      var root = document.currentScript.parentElement;
                      if(!root) return;
                      var img = root.querySelector('img');
                      var setPos = function(){
                        var pos = '${(s.mobile.pos || "center center").replace(/'/g,"\\'").trim()}';
                        if (window.matchMedia('(min-width: 1024px)').matches) {
                          pos = '${(s.desktop.pos || s.mobile.pos || "center center").replace(/'/g,"\\'").trim()}';
                        } else if (window.matchMedia('(min-width: 768px)').matches) {
                          pos = '${(s.tablet.pos || s.mobile.pos || "center center").replace(/'/g,"\\'").trim()}';
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

        {/* Flechas móviles */}
        <div className="absolute inset-y-0 left-0 right-0 z-50 flex items-center justify-between px-3 lg:hidden pointer-events-none">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm"
          >
            ›
          </button>
        </div>

        {/* Mensaje móvil con fondo (pill) */}
        <div
          className="absolute left-1/2 z-50 -translate-x-1/2 lg:hidden text-center"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            className="inline-flex max-w-[92vw] items-center justify-center rounded-[.6rem] px-3 py-2 bg-black/55 backdrop-blur-[2px] ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,.35)]"
          >
            <p className="text-[1.3rem] leading-tight text-white [text-shadow:0_1px_0_rgba(0,0,0,.35)]">
              Explora nuestros servicios: toca los recuadros inferiores
            </p>
          </motion.div>
        </div>

        {/* Bullets móvil */}
        <div
          className="absolute left-1/2 z-50 flex -translate-x-1/2 gap-3 lg:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        >
          {slides.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${active ? "bg-white" : "border border-white/80 bg-transparent"}`}
                aria-label={`Ir al slide ${i + 1}`}
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
                onClick={() => goTo(i)}
                className={`grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border-2 ${active ? "border-white" : "border-white/65"} transition-transform duration-200 hover:scale-[1.05] ring-1 ring-white/15`}
                aria-label={`Ir al slide ${i + 1}`}
              >
                <span className={`h-[1rem] w-[1rem] rounded-full ${active ? "bg-white" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* RIBBON (usa el componente) */}
      <ServicesRibbon services={services} ACCENT={ACCENT} BORDER={BORDER} />
    </section>
  );
}
