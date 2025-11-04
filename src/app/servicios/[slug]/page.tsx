// src/app/servicios/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import Footer from "@/app/components/Footer";
import { SERVICE_DETAIL, SERVICES } from "@/app/lib/services";

type PageProps = { params: { slug: string } };

// ---------------- Ajustes visuales ----------------
const ACCENT = "#c5a47e";
const LOGO_LIGHT = "/imagenes/CREAR.png";

// WhatsApp (usa AVIF/WEBP/PNG con el mismo nombre base)
const WA_ICON = "/imagenes/Redes/whatsapp.png";
const WA_NUMBER_E164 = "2961205199"; // +52 296 120 5199 (formato E.164)
const WA_TEXT = "Hola CREAR, me gustaría pedir información.";
const WA_URL = `https://wa.me/${WA_NUMBER_E164}?text=${encodeURIComponent(WA_TEXT)}`;

// Títulos en ES (si tu SERVICE_DETAIL está en inglés)
const TITLE_ES: Record<string, string> = {
  "diseno-arquitectonico": "DISEÑO ARQUITECTÓNICO",
  construccion: "CONSTRUCCIÓN",
  "obra-publica": "OBRA PÚBLICA",
  urbanizacion: "URBANIZACIÓN",
  electrificacion: "ELECTRIFICACIÓN",
  "gestion-de-proyectos": "GESTIÓN DE PROYECTOS",
};

/** =================== Helpers imagen =================== **/
/** Dado "/imagenes/Algo/1.jpg" devuelve las rutas a .avif/.webp/.jpg en el mismo folder y base. */
function buildFormats(originalPath: string) {
  const base = originalPath.replace(/\.(avif|webp|jpe?g|png)$/i, "");
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    fallback: originalPath, // normalmente .jpg
  };
}

/** <picture> con prioridad AVIF → WebP → JPG */
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

/** ================ Metadata por servicio ================ **/
export function generateMetadata({ params }: PageProps): Metadata {
  const detail = SERVICE_DETAIL[params.slug];
  if (!detail) return {};
  const title = TITLE_ES[params.slug] ?? detail.title;
  return {
    title: `${title} | Servicios`,
    description: detail.paragraphs?.[0] ?? title,
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
      {/* ======= Fancybox por CDN (CSS + jQuery + plugin) ======= */}
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

      {/* ========= HERO (header NO fijo) ========= */}
      <section className="relative">
        {/* Barra superior dentro del hero (no fixed) */}
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex w-full max-w-[114rem] items-center justify-between px-[1.5rem] py-[1.2rem]">
            <Link
              href="/"
              aria-label="Inicio — CREAR"
              className="relative inline-flex items-center rounded bg-white px-6 py-4 shadow-[0_1rem_2.6rem_rgba(0,0,0,.14)]"
            >
              <img src={LOGO_LIGHT} alt="CREAR" className="h-[2.8rem]" />
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
        <PictureFallback src={detail.hero} alt="" className="h-[44rem] w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,.35)_100%)]" />

        {/* Centro */}
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
              <p key={i} className="mb-[1.6rem] text-[1.4rem] leading-[1.9] text-[#6f6f6f]">
                {p}
              </p>
            ))}

            {/* Galería (2 arriba + 1 grande abajo) con hover y Fancybox */}
            <div className="mt-[2.4rem] grid grid-cols-1 gap-[1.6rem] md:grid-cols-2">
              {detail.gallery.map((src, i, arr) => {
                const isLast = i === arr.length - 1;
                return (
                  <a
                    key={src}
                    href={src} // Fancybox abrirá el original
                    data-fancybox="gallery"
                    data-caption={title}
                    className={`group relative block w-full overflow-hidden transition-all duration-300 ${
                      isLast ? "h-[38rem] md:col-span-2" : "h-[28rem] col-span-1"
                    }`}
                  >
                    <PictureFallback
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl"
                    />
                  </a>
                );
              })}
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

  {/* Fila responsiva: teléfono (WhatsApp) + botón. En móvil se apilan, en desktop en fila */}
  <div className="mt-[1.2rem] flex flex-col sm:flex-row sm:items-center gap-[1.2rem] sm:gap-[1.6rem] flex-wrap">
    {/* Teléfono → WhatsApp */}
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 text-[#111] hover:opacity-80 transition shrink-0"
      aria-label="Escríbenos por WhatsApp"
    >
      {/* Icono con AVIF → WebP → PNG */}
      <PictureFallback
        src={WA_ICON}
        alt="WhatsApp"
        className="h-[2.2rem] w-[2.2rem] object-contain"
      />
      <span className="text-[1.4rem] font-medium">296 120 5199</span>
    </a>

    {/* Botón volver */}
    <Link
      href="/"
      className="inline-flex items-center justify-center rounded-[.2rem] px-[1.4rem] py-[.8rem] text-[1.2rem] font-bold uppercase tracking-[.18em] text-white shrink-0"
      style={{ backgroundColor: ACCENT }}
    >
      ← Volver al inicio
    </Link>
  </div>
</div>

          </aside>
        </div>
      </section>

      {/* ========= FOOTER ========= */}
      <Footer />
    </div>
  );
}
