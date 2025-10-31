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
    category: "Construcción",
    thumb: "/imagenes/Proyectos/PiscinaBoca/4.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
  },
  {
    slug: "casa-briones-01",
    title: "CASA BRIONES 01",
    category: "Exterior Design",
    thumb: "/imagenes/Proyectos/CasaBriones01/12.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
  },
  {
    slug: "piscina-coapexpan",
    title: "PISCINA COAPEXPAN",
    category: "Architecture",
    thumb: "/imagenes/Proyectos/PiscinaCoapexpan/3.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
  },
  {
    slug: "casa-21",
    title: "CASA 21",
    category: "Architecture",
    thumb: "/imagenes/Proyectos/Casa21/11.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
  },
  {
    slug: "woodenist-house-lumberjack",
    title: "Woodenist House Lumberjack",
    category: "Architecture",
    thumb: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/5-2.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
  },
  {
    slug: "bungalow-dark-house",
    title: "Bungalow Dark House",
    category: "Exterior Design",
    thumb: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/6-2.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
  },
];

// ----- Detalle por proyecto -----
export type ProjectDetail = {
  title: string;
  breadcrumb: string; // aparece bajo el título del hero
  hero: string;
  paragraphs: string[]; // texto descriptivo (columna derecha)
  gallery: string[]; // 👈 CAMBIO: ¡Ahora es un array de strings de tamaño variable!
  facts: { label: string; value: string }[]; // panel de datos
};

export const PROJECT_DETAIL: Record<string, ProjectDetail> = {
  "piscina-boca": {
    title: "PISCINA BOCA",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[0].hero,
    paragraphs: [
      "En CREAR combinamos precisión técnica y sensibilidad espacial para ofrecer arquitectura que se vive todos los días. Este proyecto optimiza asoleamiento y ventilación cruzada, con envolvente térmica de alto desempeño.",
      "La paleta material —concreto aparente y madera cálida— crea una lectura sobria y atemporal. Cada transición interior-exterior se resolvió con encuentros limpios y detalles a 1:1.",
    ],
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
      { label: "Cliente", value: "Bellway Homes" },
      { label: "Número de viviendas", value: "3701" },
      { label: "Mezcla de tenencia", value: "30% asequible, 70% privada" },
      { label: "Superficie del sitio", value: "12 ha" },
      { label: "Planeación aprobada", value: "julio 2021" },
    ],
  },

  "casa-briones-01": {
    title: "CASA BRIONES 01",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[1].hero,
    paragraphs: [
      "Doble volumen en espejo que articula privacidad y vistas largas hacia el bosque. La estructura de acero ligero permite luces francas y fachadas limpias.",
      "El paisajismo se integra con explanadas de grava drenante y luminarias de bajo consumo para un uso responsable del sitio.",
    ],
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
      { label: "Cliente", value: "Privado" },
      { label: "Número de viviendas", value: "2" },
      { label: "Mezcla de tenencia", value: "100% privada" },
      { label: "Superficie del sitio", value: "5,200 m²" },
      { label: "Planeación aprobada", value: "marzo 2022" },
    ],
  },

  "piscina-coapexpan": {
    title: "PISCINA COAPEXPAN",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[2].hero,
    paragraphs: [
      "Edificio de geometría pura y núcleos eficientes. La modulación estructural hizo posible una obra veloz, precisa y con menor desperdicio.",
      "En CREAR priorizamos desempeño y experiencia humana: luz natural, confort acústico y eficiencia energética medible.",
    ],
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
      { label: "Cliente", value: "Desarrolladora Urbana" },
      { label: "Número de viviendas", value: "120" },
      { label: "Mezcla de tenencia", value: "Mixta" },
      { label: "Superficie del sitio", value: "8,400 m²" },
      { label: "Planeación aprobada", value: "enero 2023" },
    ],
  },

  "casa-21": {
    title: "CASA 21",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[3].hero,
    paragraphs: [
      "Villa contemporánea con gesto estructural en arco. Ventanales piso-techo diluyen el límite interior-exterior.",
      "Materialidad cálida y tecnología domótica para modos de vida flexibles y eficientes.",
    ],
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
      { label: "Cliente", value: "Privado" },
      { label: "Número de viviendas", value: "1" },
      { label: "Mezcla de tenencia", value: "Residencial" },
      { label: "Superficie del sitio", value: "2,300 m²" },
      { label: "Planeación aprobada", value: "mayo 2021" },
    ],
  },

  "woodenist-house-lumberjack": {
    title: "WOODENIST HOUSE LUMBERJACK",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[4].hero,
    paragraphs: [
      "Casa en madera laminada con detalles honestos y ensamblajes a la vista. Bajo impacto y alta calidez.",
      "En CREAR diseñamos para durar: sistemas pasivos, mantenimiento sencillo y belleza que envejece bien.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/5-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/6-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.jpg",
    ],
    facts: [
      { label: "Cliente", value: "Privado" },
      { label: "Número de viviendas", value: "1" },
      { label: "Mezcla de tenencia", value: "Residencial" },
      { label: "Superficie del sitio", value: "1,600 m²" },
      { label: "Planeación aprobada", value: "noviembre 2020" },
    ],
  },

  "bungalow-dark-house": {
    title: "BUNGALOW DARK HOUSE",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[5].hero,
    paragraphs: [
      "Bungalow de baja altura, envolvente oscura y patio central que organiza la vida diaria con privacidad.",
      "Iluminación cálida y recorridos claros para un habitar sereno y funcional.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/6-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/3-2.jpg",
    ],
    facts: [
      { label: "Cliente", value: "Privado" },
      { label: "Número de viviendas", value: "1" },
      { label: "Mezcla de tenencia", value: "Residencial" },
      { label: "Superficie del sitio", value: "980 m²" },
      { label: "Planeación aprobada", value: "agosto 2022" },
    ],
  },
};
