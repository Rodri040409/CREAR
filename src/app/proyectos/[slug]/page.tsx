// src/app/proyectos/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DetailScaffold from "@/app/components/DetailScaffold";
import { PROJECT_DETAIL, PROJECTS } from "@/app/lib/projects";

const ACCENT = "#c5a47e";

/** -------------------- Helpers -------------------- **/
/** Dado "/imagenes/Proyectos/Casa21/1.jpg" devuelve las rutas a .avif/.webp/.jpg en el MISMO folder y mismo nombre base. */
function buildFormats(originalPath: string) {
  // Soporta .jpg/.jpeg/.png (por si a futuro cambias alguna)
  const base = originalPath.replace(/\.(avif|webp|jpe?g|png)$/i, "");
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    fallback: originalPath, // normalmente .jpg
  };
}

/** Imagen con <picture> para priorizar AVIF → WebP → JPG */
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

/** -------------------- Rutas estáticas -------------------- **/
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/** -------------------- Metadata dinámica -------------------- **/
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const d = PROJECT_DETAIL[params.slug];
  if (!d) return {};
  return {
    title: `${d.title} | Proyectos`,
    description: d.paragraphs[0],
  };
}

/** -------------------- Página principal -------------------- **/
export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const d = PROJECT_DETAIL[params.slug];
  if (!d) notFound();

  const parts = (d.breadcrumb || "").split("/").map((s) => s.trim());
  const left = parts[0] ?? "";
  const right = parts.slice(1).join(" / ");

  return (
    <DetailScaffold
      hero={d.hero}
      title={d.title}
      breadcrumbLeft={left}
      breadcrumbRight={right}
    >
      {/* ====== Cuerpo “Project Page” ====== */}
      <section className="relative py-[6rem]">
        <div className="mx-auto grid w-full max-w-[114rem] grid-cols-1 gap-[3.2rem] px-[1.5rem] lg:grid-cols-12">
          {/* Galería principal */}
          <div className="lg:col-span-8">
            {d.gallery[0] && (
              <a
                href={d.gallery[0]}
                data-fancybox="gallery"
                data-caption={d.title}
                className="mb-[1.6rem] block h-[32rem] overflow-hidden md:h-[47.6rem]"
              >
                <PictureFallback
                  src={d.gallery[0]}
                  alt={d.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </a>
            )}

            <div className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-2">
              {d.gallery.slice(1).map((src, i) => (
                <a
                  key={i}
                  href={src}
                  data-fancybox="gallery"
                  data-caption={d.title}
                  className="block h-[22rem] overflow-hidden md:h-[28.5rem]"
                >
                  <PictureFallback
                    src={src}
                    alt={`${d.title} — imagen ${i + 2}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Texto y ficha lateral */}
          <aside className="lg:col-span-4">
            <div className="space-y-[1.2rem]">
              {d.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[1.4rem] leading-[1.9] text-[#6f6f6f]"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-[2.4rem] space-y-[0.8rem]">
              {d.facts.map((f) => (
                <p key={f.label} className="text-[1.3rem] leading-[1.9]">
                  <span className="text-[#999]">{f.label}:</span>{" "}
                  <span style={{ color: ACCENT }}>{f.value}</span>
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </DetailScaffold>
  );
}
