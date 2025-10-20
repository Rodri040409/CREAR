// src/app/servicios/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Footer from "@/app/components/Footer";
import { SERVICES, SERVICE_DETAIL } from "@/app/lib/services";

type PageProps = { params: { slug: string } };

// ---------------- Ajustes visuales ----------------
const ACCENT = "#c5a47e";
const LOGO_LIGHT =
  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/11/logo-light-2.png";

// Títulos en ES (si tu SERVICE_DETAIL está en inglés)
const TITLE_ES: Record<string, string> = {
  "diseno-arquitectonico": "DISEÑO ARQUITECTÓNICO",
  construccion: "CONSTRUCCIÓN",
  "obra-publica": "OBRA PÚBLICA",
  urbanizacion: "URBANIZACIÓN",
  electrificacion: "ELECTRIFICACIÓN",
  "gestion-de-proyectos": "GESTIÓN DE PROYECTOS",
};

// ---------- Metadata por servicio ----------
export function generateMetadata({ params }: PageProps): Metadata {
  const detail = SERVICE_DETAIL[params.slug];
  if (!detail) return {};
  const title = TITLE_ES[params.slug] ?? detail.title;
  return {
    title: `${title} | Servicios`,
    description: detail.paragraphs[0],
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = params;
  const detail = SERVICE_DETAIL[slug];
  if (!detail) notFound();

  const title = TITLE_ES[slug] ?? detail.title;

  // Partimos el breadcrumb para resaltar la primera parte (como el original)
  const parts = (detail.breadcrumb || "").split("/").map((s) => s.trim());
  const crumbLeft = parts[0] ?? "";
  const crumbRight = parts.slice(1).join(" / ");

  return (
    <div id="home" className="flex min-h-screen flex-col">
      {/* ======= Cargas Fancybox por CDN (CSS + jQuery + plugin) ======= */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css"
      />
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"
        strategy="afterInteractive"
      />
      {/* Inicialización Fancybox */}
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

      {/* ========= HERO (header NO fijo) ========= */}
      <section className="relative">
        {/* Barra superior dentro del hero (no fixed) */}
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex w-full max-w-[114rem] items-center justify-between px-[1.5rem] py-[1.2rem]">
            <Link
              href="/"
              aria-label="Inicio — Savoye"
              className="relative inline-flex items-center rounded bg-white px-6 py-4 shadow-[0_1rem_2.6rem_rgba(0,0,0,.14)]"
            >
              <img src={LOGO_LIGHT} alt="Savoye" className="h-[2.8rem]" />
            </Link>

            <Link
              href="/"
              className="rounded-[.2rem] px-[1.6rem] py-[.9rem] text-[1.3rem] font-bold uppercase tracking-[.18em] text-white"
              style={{ backgroundColor: ACCENT }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        {/* Imagen de portada + overlay + textos centrados */}
        <img src={detail.hero} alt="" className="h-[44rem] w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,.35)_100%)]" />

        {/* 🔧 AQUÍ EL CAMBIO: centrado perfecto */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-[1.5rem] text-center">
            <h1 className="[font-family:'Khand',_sans-serif] text-white uppercase tracking-[.02em] leading-[1] text-[clamp(3.2rem,6vw,6.4rem)] font-[700]">
              {title}
            </h1>
            <p className="mt-3 text-[1.2rem] uppercase tracking-[.28em]">
              <span style={{ color: ACCENT }}>{crumbLeft}</span>
              {crumbRight ? (
                <>
                  {" "}
                  <span className="text-white/85">/ {crumbRight}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </section>

      {/* ========= CONTENIDO + SIDEBAR ========= */}
      <section className="relative py-[6rem]">
        <div className="mx-auto grid w-full max-w-[114rem] grid-cols-1 gap-[3.2rem] px-[1.5rem] lg:grid-cols-12">
          {/* Columna principal */}
          <div className="lg:col-span-8">
            {detail.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-[1.6rem] text-[1.4rem] leading-[1.9] text-[#6f6f6f]"
              >
                {p}
              </p>
            ))}

            {/* Galería (2 arriba + 1 grande abajo) con hover y Fancybox */}
            <div className="mt-[2.4rem] grid grid-cols-1 gap-[1.6rem] md:grid-cols-2">
              {detail.gallery.slice(0, 2).map((src) => (
                <a
                  key={src}
                  href={src}
                  data-fancybox="gallery"
                  data-caption="Savoye Architecture"
                  className="group relative block h-[28rem] w-full overflow-hidden"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl"
                  />
                </a>
              ))}

              {detail.gallery[2] && (
                <a
                  href={detail.gallery[2]}
                  data-fancybox="gallery"
                  data-caption="Savoye Architecture"
                  className="group relative col-span-1 h-[38rem] w-full overflow-hidden md:col-span-2"
                >
                  <img
                    src={detail.gallery[2]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* TODOS LOS SERVICIOS */}
            <div className="rounded-sm bg-[#f5eee6] p-[1.6rem]">
              <h3 className="[font-family:'Khand',_sans-serif] mb-[1.2rem] text-[2.2rem] font-[700] tracking-[.01em] text-[#111]">
                TODOS LOS SERVICIOS
              </h3>
              <nav className="divide-y divide-white/65 rounded-sm bg-[#e7d6c2]">
                {SERVICES.map((s) => {
                  const active = s.slug === slug;
                  return (
                    <Link
                      key={s.slug}
                      href={s.href}
                      className={`flex items-center justify-between px-[1.6rem] py-[1.2rem] text-[1.35rem] transition ${
                        active
                          ? "bg-white text-[#111]"
                          : "text-[#6f6f6f] hover:bg-white/70 hover:text-[#111]"
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="text-[1.4rem]">›</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ¿NECESITAS AYUDA? */}
            <div className="mt-[2.4rem] rounded-sm bg-[#f5eee6] p-[1.6rem]">
              <h3 className="[font-family:'Khand',_sans-serif] mb-[1rem] text-[2rem] font-[700] tracking-[.01em] text-[#111]">
                ¿NECESITAS AYUDA?
              </h3>
              <p className="text-[1.35rem] leading-[1.8] text-[#6f6f6f]">
                Llámanos o visítanos; respondemos la mayoría de consultas en menos de 24 horas hábiles. Estaremos encantados de ayudarte.
              </p>
              <div className="mt-[1.2rem] flex items-center gap-3">
                <span className="text-[1.6rem]">☏</span>
                <span className="text-[1.4rem] font-medium text-[#111]">
                  296 120 5199
                </span>
              </div>

              {/* Botón adicional de volver (útil en móvil) */}
              <Link
                href="/"
                className="mt-[1.6rem] inline-block rounded-[.2rem] px-[1.4rem] py-[.8rem] text-[1.2rem] font-bold uppercase tracking-[.18em] text-white"
                style={{ backgroundColor: ACCENT }}
              >
                ← Volver al inicio
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ========= FOOTER ========= */}
      <Footer />
    </div>
  );
}
