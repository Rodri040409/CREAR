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
    slug: "brown-monara-house-ottova-canada",
    title: "Brown Monara House Ottova Canada",
    category: "Architecture",
    thumb: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
  },
  {
    slug: "twin-forestland-home",
    title: "Twin Forestland Home",
    category: "Exterior Design",
    thumb: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
  },
  {
    slug: "geometric-building",
    title: "Geometric Building",
    category: "Architecture",
    thumb: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/3-2.jpg",
    hero:  "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
  },
  {
    slug: "arch-cloud-honna-didenton-villa",
    title: "Arch Cloud Honna Didenton Villa",
    category: "Exterior Design",
    thumb: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/4-2.jpg",
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
  gallery: [string, string, string]; // 1 grande arriba izq, 2 pequeñas abajo
  facts: { label: string; value: string }[]; // panel de datos
};

export const PROJECT_DETAIL: Record<string, ProjectDetail> = {
  "brown-monara-house-ottova-canada": {
    title: "BROWN MONARA HOUSE OTTOVA CANADA",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[0].hero,
    paragraphs: [
      "En CREAR combinamos precisión técnica y sensibilidad espacial para ofrecer arquitectura que se vive todos los días. Este proyecto optimiza asoleamiento y ventilación cruzada, con envolvente térmica de alto desempeño.",
      "La paleta material —concreto aparente y madera cálida— crea una lectura sobria y atemporal. Cada transición interior-exterior se resolvió con encuentros limpios y detalles a 1:1.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/5-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.jpg",
    ],
    facts: [
      { label: "Cliente", value: "Bellway Homes" },
      { label: "Número de viviendas", value: "3701" },
      { label: "Mezcla de tenencia", value: "30% asequible, 70% privada" },
      { label: "Superficie del sitio", value: "12 ha" },
      { label: "Planeación aprobada", value: "julio 2021" },
    ],
  },

  "twin-forestland-home": {
    title: "TWIN FORESTLAND HOME",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[1].hero,
    paragraphs: [
      "Doble volumen en espejo que articula privacidad y vistas largas hacia el bosque. La estructura de acero ligero permite luces francas y fachadas limpias.",
      "El paisajismo se integra con explanadas de grava drenante y luminarias de bajo consumo para un uso responsable del sitio.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/6-2.jpg",
    ],
    facts: [
      { label: "Cliente", value: "Privado" },
      { label: "Número de viviendas", value: "2" },
      { label: "Mezcla de tenencia", value: "100% privada" },
      { label: "Superficie del sitio", value: "5,200 m²" },
      { label: "Planeación aprobada", value: "marzo 2022" },
    ],
  },

  "geometric-building": {
    title: "GEOMETRIC BUILDING",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[2].hero,
    paragraphs: [
      "Edificio de geometría pura y núcleos eficientes. La modulación estructural hizo posible una obra veloz, precisa y con menor desperdicio.",
      "En CREAR priorizamos desempeño y experiencia humana: luz natural, confort acústico y eficiencia energética medible.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/3-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/4-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/5-2.jpg",
    ],
    facts: [
      { label: "Cliente", value: "Desarrolladora Urbana" },
      { label: "Número de viviendas", value: "120" },
      { label: "Mezcla de tenencia", value: "Mixta" },
      { label: "Superficie del sitio", value: "8,400 m²" },
      { label: "Planeación aprobada", value: "enero 2023" },
    ],
  },

  "arch-cloud-honna-didenton-villa": {
    title: "ARCH CLOUD HONNA DIDENTON VILLA",
    breadcrumb: "Proyectos / Project page",
    hero: PROJECTS[3].hero,
    paragraphs: [
      "Villa contemporánea con gesto estructural en arco. Ventanales piso-techo diluyen el límite interior-exterior.",
      "Materialidad cálida y tecnología domótica para modos de vida flexibles y eficientes.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/4-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.jpg",
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
