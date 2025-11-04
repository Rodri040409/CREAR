// src/app/lib/projects.ts
export type ProjectItem = {
  slug: string;
  title: string;
  category: string;
  thumb: string; // miniatura para la grilla
  hero: string;  // imagen del hero
};

export const PROJECTS: ProjectItem[] = [
  {
    slug: "piscina-boca",
    title: "PISCINA BOCA",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/PiscinaBoca/4.jpg",
    hero:  "/imagenes/Proyectos/PiscinaBoca/7.jpg",
  },
  {
    slug: "casa-briones-01",
    title: "CASA BRIONES 01",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/CasaBriones01/12.jpg",
    hero:  "/imagenes/Proyectos/CasaBriones01/11.jpg",
  },
  {
    slug: "piscina-coapexpan",
    title: "PISCINA COAPEXPAN",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/PiscinaCoapexpan/3.jpg",
    hero:  "/imagenes/Proyectos/PiscinaCoapexpan/7.jpg",
  },
  {
    slug: "casa-21",
    title: "CASA 21",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/Casa21/11.jpg",
    hero:  "/imagenes/Proyectos/Casa21/10.jpg",
  },
  {
    slug: "pavimentacion-calle-huazontle",
    title: "Pavimentación Calle Huazontle",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/8.jpg",
    hero:  "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/13.jpg",
  },
  {
    slug: "red-electrica-fracc-la-cruz",
    title: "Red Eléctrica Fracc. La Cruz",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/7.jpg",
    hero:  "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/3.jpg",
  },
  {
    slug: "rehabilitacion-oficinas",
    title: "Rehabilitación de oficinas",
    category: "Click aquí para ver más",
    thumb: "/imagenes/Proyectos/Rehabilitacion_Oficinas/3.jpg",
    hero:  "/imagenes/Proyectos/Rehabilitacion_Oficinas/4.jpg",
  },
];

// ----- Detalle por proyecto -----
export type ProjectDetail = {
  title: string;
  breadcrumb: string; // aparece bajo el título del hero
  hero: string;
  paragraphs: string[]; // texto descriptivo (columna derecha)
  gallery: string[]; // array de imágenes
  facts: { label: string; value: string }[]; // panel de datos
};

export const PROJECT_DETAIL: Record<string, ProjectDetail> = {
  "piscina-boca": {
    title: "PISCINA BOCA",
    breadcrumb: "Proyectos",
    hero: PROJECTS[0].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/PiscinaBoca/1.jpg",
      "/imagenes/Proyectos/PiscinaBoca/2.jpg",
      "/imagenes/Proyectos/PiscinaBoca/3.jpg",
      "/imagenes/Proyectos/PiscinaBoca/4.jpg",
      "/imagenes/Proyectos/PiscinaBoca/5.jpg",
      "/imagenes/Proyectos/PiscinaBoca/6.jpg",
      "/imagenes/Proyectos/PiscinaBoca/7.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Boca del Río, Ver." },
      { label: "Cliente", value: "Privado" },
      { label: "Obra", value: "Diseño y construcción de piscina orgánica" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Arq. Carlos Ruiz Estrada" },
    ],
  },

  "casa-briones-01": {
    title: "CASA BRIONES 01",
    breadcrumb: "Proyectos",
    hero: PROJECTS[1].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/CasaBriones01/1.jpg",
      "/imagenes/Proyectos/CasaBriones01/3.jpg",
      "/imagenes/Proyectos/CasaBriones01/4.jpg",
      "/imagenes/Proyectos/CasaBriones01/5.jpg",
      "/imagenes/Proyectos/CasaBriones01/6.jpg",
      "/imagenes/Proyectos/CasaBriones01/7.jpg",
      "/imagenes/Proyectos/CasaBriones01/8.jpg",
      "/imagenes/Proyectos/CasaBriones01/9.jpg",
      "/imagenes/Proyectos/CasaBriones01/10.jpg",
      "/imagenes/Proyectos/CasaBriones01/11.jpg",
      "/imagenes/Proyectos/CasaBriones01/12.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Coatepec, Ver." },
      { label: "Cliente", value: "Privado" },
      { label: "Obra", value: "Casa habitación, materiales de acabado aparente" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Arq. Carlos Ruiz Estrada" },
    ],
  },

  "piscina-coapexpan": {
    title: "PISCINA COAPEXPAN",
    breadcrumb: "Proyectos",
    hero: PROJECTS[2].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/PiscinaCoapexpan/1.jpg",
      "/imagenes/Proyectos/PiscinaCoapexpan/2.jpg",
      "/imagenes/Proyectos/PiscinaCoapexpan/3.jpg",
      "/imagenes/Proyectos/PiscinaCoapexpan/4.jpg",
      "/imagenes/Proyectos/PiscinaCoapexpan/5.jpg",
      "/imagenes/Proyectos/PiscinaCoapexpan/6.jpg",
      "/imagenes/Proyectos/PiscinaCoapexpan/7.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Xalapa, Ver." },
      { label: "Cliente", value: "Privado" },
      { label: "Obra", value: "Diseño y construcción de piscina y jacuzzi" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Arq. Carlos Ruiz Estrada" },
    ],
  },

  "casa-21": {
    title: "CASA 21",
    breadcrumb: "Proyectos",
    hero: PROJECTS[3].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/Casa21/1.jpg",
      "/imagenes/Proyectos/Casa21/2.jpg",
      "/imagenes/Proyectos/Casa21/3.jpg",
      "/imagenes/Proyectos/Casa21/4.jpg",
      "/imagenes/Proyectos/Casa21/5.jpg",
      "/imagenes/Proyectos/Casa21/6.jpg",
      "/imagenes/Proyectos/Casa21/7.jpg",
      "/imagenes/Proyectos/Casa21/8.jpg",
      "/imagenes/Proyectos/Casa21/9.jpg",
      "/imagenes/Proyectos/Casa21/10.jpg",
      "/imagenes/Proyectos/Casa21/11.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Xalapa, Ver." },
      { label: "Cliente", value: "Privado" },
      { label: "Obra", value: "Casa habitación, residencial" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Arq. Carlos Ruiz Estrada" },
    ],
  },

  "pavimentacion-calle-huazontle": {
    title: "Pavimentación Calle Huazontle",
    breadcrumb: "Proyectos",
    hero: PROJECTS[4].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/1.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/2.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/3.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/4.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/5.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/6.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/7.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/8.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/9.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/10.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/11.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/12.jpg",
      "/imagenes/Proyectos/Pavimentacion_Calle_Huazontle/13.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Xalapa, Ver." },
      { label: "Cliente", value: "Municipio de Xalapa, Ver." },
      { label: "Obra", value: "Construcción de guarniciones, banquetas y pavimento hidráulico" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Arq. Carlos Ruiz Estrada / Ing. Claudio Cambambia" },
    ],
  },

  "red-electrica-fracc-la-cruz": {
    title: "Red Eléctrica Fracc. La Cruz",
    breadcrumb: "Proyectos",
    hero: PROJECTS[5].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/1.jpg",
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/2.jpg",
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/3.jpg",
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/4.jpg",
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/5.jpg",
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/6.jpg",
      "/imagenes/Proyectos/Red_Electrica_Frac_LaCruz/7.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Coatepec, Ver." },
      { label: "Cliente", value: "Privado" },
      { label: "Obra", value: "Red eléctrica, fraccionamiento La Cruz" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Ing. Claudio Cambambia" },
    ],
  },

  "rehabilitacion-oficinas": {
    title: "Rehabilitación de oficinas",
    breadcrumb: "Proyectos",
    hero: PROJECTS[6].hero,
    paragraphs: ["", ""],
    gallery: [
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/1.jpg",
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/2.jpg",
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/3.jpg",
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/4.jpg",
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/6.jpg",
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/7.jpg",
      "/imagenes/Proyectos/Rehabilitacion_Oficinas/8.jpg",
    ],
    facts: [
      { label: "Ubicación", value: "Veracruz, Ver." },
      { label: "Cliente", value: "APIVER" },
      { label: "Obra", value: "Rehabilitación de oficinas y estacionamiento" },
      { label: "Diseño y construcción", value: "CREAR estudio de arquitectura" },
      { label: "Perito responsable", value: "Ing. Claudio Cambambia" },
    ],
  },
};
