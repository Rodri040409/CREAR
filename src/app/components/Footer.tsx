"use client";

/** Crear — CONTACTO + FOOTER (al milímetro, colores y overlay del ZIP) */
export default function SavoyeContactFooterExact() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white antialiased">
      {/* Fuentes del tema */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
      />

      {/* ===================== CONTACTO (bg-fixed + gradiente del tema) ===================== */}
      <section id="contact" className="relative overflow-hidden">
        {/* Fondo con PARALLAX nativo (bg-fixed) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/imagenes/Hero/Hero1.jpg)",
            backgroundAttachment: "fixed", // .bg-fixed
          }}
          aria-hidden={true}
        />
        {/* << NO oscurecemos arriba: el tema original “lava” de BLANCO hacia arriba */}
        <div
          className="pointer-events-none absolute inset-0"
          // .banner-img:after  → gradiente a BLANCO (zip)
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,.88) 22%, rgba(255,255,255,.74) 42%, rgba(255,255,255,.5) 100%)",
          }}
        />
        {/* hr line-vr-section: 2px × 75px, margen -37px */}
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-3.7rem",
            width: "0.2rem",
            height: "7.5rem",
            backgroundColor: "#c5a47e",
          }}
        />

        {/* Contenedor 1140px (114rem con 1rem=10px) y padding de sección 120px */}
        <div className="relative z-[1] mx-auto w-full max-w-[114rem] px-[1.5rem] pt-[12rem] pb-[12rem]">
          {/* Título */}
          <h2 className="[font-family:'Khand',_sans-serif] uppercase text-[#272727] font-[500] leading-[1] tracking-[0.05rem] text-[6rem] mb-[3.8rem]">
            Métodos de contacto
          </h2>

          {/* Grid 12: 4 | 4 | (3 con offset visual a la derecha) */}
          <div className="relative grid grid-cols-12 gap-x-[3rem]">
            {/* TELÉFONO */}
            <div className="col-span-12 md:col-span-4">
              <div className="text-[#a0a0a0] text-[1.3rem] uppercase tracking-[.18em] [font-family:'Roboto',_system-ui]">
                Teléfono
              </div>
              {/* Banda blanca 42px (ZIP) */}
              <div className="relative my-[1.2rem]">
                <span className="absolute inset-y-0 left-0 right-0 my-auto h-[4.2rem] bg-white" />
                <span className="relative z-[1] block pl-[1.2rem] text-[#272727] text-[2rem] leading-[4.2rem] [font-family:'Roboto',_system-ui]">
                  296 120 5199
                </span>
              </div>
              {/* <p className="text-[#6f6f6f] text-[1.5rem] leading-[1.9] [font-family:'Roboto',_system-ui]">
                Lunes – Viernes: 8am – 6pm
                <br />
                Sábado – Domingo: 9am – 3pm
              </p> */}
            </div>

            {/* CORREO */}
            <div className="col-span-12 md:col-span-4">
              <div className="text-[#a0a0a0] text-[1.3rem] uppercase tracking-[.18em] [font-family:'Roboto',_system-ui]">
                Correo
              </div>
              <div className="relative my-[1.2rem]">
                <span className="absolute inset-y-0 left-0 right-0 my-auto h-[4.2rem] bg-white" />
                <a
                  href="mailto:arqueroz10@gmail.com"
                  className="relative z-[1] block pl-[1.2rem] text-[#272727] text-[2rem] leading-[4.2rem] [font-family:'Roboto',_system-ui]"
                >
                  arqueroz10@gmail.com
                </a>
              </div>
              <p className="text-[#6f6f6f] text-[1.5rem] leading-[1.9] [font-family:'Roboto',_system-ui]">
                Coatepec, Veracruz, México
              </p>
            </div>

            {/* BURBUJA Ubicación — 85×85 exacto, clickeable a Google Maps */}
            {/* <div className="col-span-12 md:col-span-4 md:col-start-10">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Coatepec%2C%20Veracruz%2C%20M%C3%A9xico"
                target="_blank"
                rel="noopener noreferrer"
                className="md:absolute md:right-0 md:top-[7.8rem] flex md:block items-center md:items-end justify-center md:justify-end group cursor-pointer"
                aria-label="Abrir Coatepec, Veracruz, México en Google Maps"
                title="Ver en Google Maps"
              >
                <div className="relative w-[8.5rem] h-[8.5rem] rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,.08)] grid place-items-center group-hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] transition">
                  
                  <span className="absolute inset-0 rounded-full ring-1 ring-black/5" />
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 22s7-7.582 7-12a7 7 0 10-14 0c0 4.418 7 12 7 12z"
                      stroke="#272727"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="2.5" stroke="#272727" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="md:absolute md:left-1/2 md:top-[10.8rem] md:-translate-x-1/2 mt-[1.6rem] md:mt-0 text-center text-[1.6rem] text-[#6f6f6f] [font-family:'Roboto',_system-ui] group-hover:text-[#272727] transition">
                  Nuestra ubicación
                </div>
              </a>
            </div> */}
          </div>
        </div>
      </section>

      {/* ============================ FOOTER WIDGETS ============================ */}
      <section className="relative">
        <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] pt-[8rem] pb-[8rem]">
          <div className="grid grid-cols-12 gap-x-[3rem]">
            {/* CREAR */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-[1.3rem]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#c5a47e]">
                  <path d="M3 10.5l9-6 9 6v8a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5v-8z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 20V12h6v8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="[font-family:'Khand',_sans-serif] text-[2.4rem] font-[700] text-[#272727]">CREAR</span>
              </div>

              <p className="mt-[1.8rem] max-w-[34rem] text-[1.5rem] leading-[1.9] text-[#6f6f6f] [font-family:'Roboto',_system-ui]">
                Bienvenido a <span className="text-[#272727]">Crear</span>, empresa de arquitectura.
              </p>

              <div className="mt-[1.6rem] flex items-center gap-[1.6rem]">
                {[
                  "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z",
                  "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5",
                  "M12 22s7-7.58 7-12a7 7 0 10-14 0c0 4.42 7 12 7 12z",
                  "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z",
                ].map((d, i) => (
                  <a key={i} href="#" className="text-[#272727] opacity-70 hover:opacity-100 transition" aria-label="red social">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d={d} stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Nuestros servicios */}
            <div className="col-span-12 md:col-span-4 mt-[4rem] md:mt-0">
              <h6 className="[font-family:'Khand',_sans-serif] text-[#272727] text-[2rem] font-[700] uppercase tracking-[.08em] mb-[1.6rem]">
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
            <div className="col-span-12 md:col-span-4 mt-[4rem] md:mt-0">
              <h6 className="[font-family:'Khand',_sans-serif] text-[#272727] text-[2rem] font-[700] uppercase tracking-[.08em] mb-[1.6rem]">
                Hablemos
              </h6>
              <ul className="space-y-[0.8rem] text-[1.5rem] text-[#6f6f6f] [font-family:'Roboto',_system-ui]">
                <li>¿Tienes un proyecto en mente?</li>
                <li>Construyamos algo increíble juntos</li>
                <li className="text-[#272727]">296 120 5199</li>
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
        <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[2.4rem] flex flex-col md:flex-row md:items-center md:justify-between gap-[1.2rem] [font-family:'Roboto',_system-ui]">
          <div className="text-[1.3rem] text-[#6f6f6f]">
            © {year}, <span className="text-[#272727]">CREAR</span>. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-[1.2rem] text-[1.3rem] text-[#6f6f6f]">
            <a href="#" className="hover:text-[#272727]">Términos de uso</a>
            <span className="text-[#d0d0d0]">|</span>
            <a href="#" className="hover:text-[#272727]">Política de privacidad y medio ambiente</a>
          </div>
        </div>

        {/* Volver arriba */}
        <a
          href="#home"
          aria-label="Volver arriba"
          className="fixed bottom-[2rem] right-[2rem] z-50 grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border border-[#d9c5ab] text-[#c5a47e] bg-white shadow-[0_6px_18px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] transition"
          title="Volver arriba"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5l-7 7m7-7l7 7M12 5v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </a>
      </section>
    </footer>
  );
}
