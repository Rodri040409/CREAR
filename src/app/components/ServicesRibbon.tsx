"use client";

import Link from "next/link";

import type { ServiceItem } from "@/app/lib/services";

type Props = {
  services: ServiceItem[];
  ACCENT?: string;
  BORDER?: string;
};

export default function ServicesRibbon({
  services,
  ACCENT = "#c5a47e",
  BORDER = "#f6f6f6",
}: Props) {
  return (
    <div className="relative z-30 md:-mt-[17.7rem]" data-section="services">
      <div className="w-full shadow-[0_2.8rem_7rem_rgba(0,0,0,.22)]">
        {/* Fila superior: 2 transparentes + 2 servicios */}
        <div
          className="grid grid-cols-1 md:grid-cols-4"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="hidden md:block h-[17.6rem] bg-transparent" />
          <div className="hidden md:block h-[17.6rem] bg-transparent" />

          {services.slice(0, 2).map((svc) => (
            <Link
              key={svc.slug}
              href={`/servicios/${svc.slug}`}
              title={svc.label}
              aria-label={`Abrir servicio: ${svc.label}`}
              className="group relative flex h-[14rem] md:h-[17.6rem] flex-col items-center justify-center gap-[1.6rem] bg-white transition-colors hover:bg-[#F3ECE5] md:border-r focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderColor: BORDER, outlineColor: ACCENT as string }}
            >
              <img
                src={svc.icon}
                alt={svc.label}
                className="h-[5.6rem] w-[5.6rem] object-contain"
                draggable={false}
              />
              <span className="[font-family:'Khand',_sans-serif] text-[1.9rem] tracking-[.01em] leading-[1.2] text-[#6f6f6f] group-hover:text-[#111]">
                {svc.label}
              </span>

              {/* CTA visible siempre en móvil; en md+ sólo hover */}
              <span
                className="rounded bg-white/95 px-[.8rem] py-[.4rem] text-[1.1rem] font-bold uppercase tracking-[.14em] text-[#272727] shadow-sm
                           opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                style={{ color: ACCENT }}
              >
                Abrir servicio →
              </span>
            </Link>
          ))}
        </div>

        {/* Fila inferior: 4 servicios */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {services.slice(2).map((svc, i, arr) => (
            <Link
              key={svc.slug}
              href={`/servicios/${svc.slug}`}
              title={svc.label}
              aria-label={`Abrir servicio: ${svc.label}`}
              className="group relative flex h-[14rem] md:h-[17.6rem] flex-col items-center justify-center gap-[1.6rem] bg-white transition-colors hover:bg-[#F3ECE5] border-t focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: BORDER,
                borderRight: i !== arr.length - 1 ? `1px solid ${BORDER}` : undefined,
                outlineColor: ACCENT as string,
              }}
            >
              <img
                src={svc.icon}
                alt={svc.label}
                className="h-[5.6rem] w-[5.6rem] object-contain"
                draggable={false}
              />
              <span className="[font-family:'Khand',_sans-serif] text-[1.9rem] tracking-[.01em] leading-[1.2] text-[#6f6f6f] group-hover:text-[#111]">
                {svc.label}
              </span>

              {/* CTA */}
              <span
                className="rounded bg-white/95 px-[.8rem] py-[.4rem] text-[1.1rem] font-bold uppercase tracking-[.14em] text-[#272727] shadow-sm
                           opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                style={{ color: ACCENT }}
              >
                Abrir servicio →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="h-[10rem]" />
    </div>
  );
}
