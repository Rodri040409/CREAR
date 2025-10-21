// server component
import Link from "next/link";
import Script from "next/script";

import Footer from "@/app/components/Footer";

const ACCENT = "#c5a47e";
const LOGO_LIGHT =
  "/imagenes/CREAR.png";

export default function DetailScaffold({
  hero,
  title,
  breadcrumbLeft,
  breadcrumbRight,
  children,
  rightHeaderButtons, // opcional: botón “Volver a proyectos” o “Inicio”
}: {
  hero: string;
  title: string;
  breadcrumbLeft: string;
  breadcrumbRight?: string;
  children: React.ReactNode;
  rightHeaderButtons?: React.ReactNode;
}) {
  return (
    <div id="home" className="flex min-h-screen flex-col">
      {/* Fancybox */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css"
      />
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"
        strategy="afterInteractive"
      />
      <Script id="init-fancybox" strategy="afterInteractive">
        {`
          (function() {
            var tryInit = function(){
              if (!window.jQuery || !window.jQuery.fancybox) { return setTimeout(tryInit, 80); }
              var $ = window.jQuery;
              $('[data-fancybox="gallery"]').fancybox({
                buttons: ["zoom","slideShow","thumbs","close"],
                loop: true,
                animationEffect: "zoom",
                transitionEffect: "fade",
                protect: false
              });
            };
            tryInit();
          })();
        `}
      </Script>

      {/* HERO (header NO fijo) */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex w-full max-w-[114rem] items-center justify-between px-[1.5rem] py-[1.2rem]">
            <Link
              href="/"
              aria-label="Inicio — CREAR"
              className="relative inline-flex items-center rounded bg-white px-6 py-4 shadow-[0_1rem_2.6rem_rgba(0,0,0,.14)]"
            >
              <img src={LOGO_LIGHT} alt="CREAR" className="h-[2.8rem]" />
            </Link>
            {rightHeaderButtons ?? (
              <Link
                href="/"
                className="rounded-[.2rem] px-[1.6rem] py-[.9rem] text-[1.2rem] font-bold uppercase tracking-[.18em] text-white"
                style={{ backgroundColor: ACCENT }}
              >
                ← Volver al inicio
              </Link>
            )}
          </div>
        </div>

        <img src={hero} alt="" className="h-[44rem] w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,.35)_100%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-[1.5rem] text-center">
            <h1 className="[font-family:'Khand',_sans-serif] text-white uppercase tracking-[.02em] leading-[1] text-[clamp(3.2rem,6vw,6.4rem)] font-[700]">
              {title}
            </h1>
            <p className="mt-3 text-[1.2rem] uppercase tracking-[.28em]">
              <span style={{ color: ACCENT }}>{breadcrumbLeft}</span>
              {breadcrumbRight ? <span className="text-white/85"> / {breadcrumbRight}</span> : null}
            </p>
          </div>
        </div>
      </section>

      {children}

      <Footer />
    </div>
  );
}
