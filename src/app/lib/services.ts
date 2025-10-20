// src/app/lib/services.ts
export type ServiceItem = {
  slug: string;
  label: string;
  icon: string;
  href: string;
};

// Alias opcional (por si algún import antiguo usa "Service")
export type Service = ServiceItem;

export const SERVICES: ServiceItem[] = [
  {
    slug: "diseno-arquitectonico",
    label: "Diseño Arquitectónico",
    icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/6-2.png",
    href: "/servicios/diseno-arquitectonico",
  },
  {
    slug: "construccion",
    label: "Construcción",
    icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/2-2.png",
    href: "/servicios/construccion",
  },
  {
    slug: "obra-publica",
    label: "Obra pública",
    icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/4-2.png",
    href: "/servicios/obra-publica",
  },
  {
    slug: "urbanizacion",
    label: "Urbanización",
    icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/3-2.png",
    href: "/servicios/urbanizacion",
  },
  {
    slug: "electrificacion",
    label: "Electrificación",
    icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/5-2.png",
    href: "/servicios/electrificacion",
  },
  {
    slug: "gestion-de-proyectos",
    label: "Gestión de proyectos",
    icon: "https://shtheme.org/demosd/savoye/wp-content/uploads/2022/01/1-2.png",
    href: "/servicios/gestion-de-proyectos",
  },
];

// ----- Contenido por servicio (hero + textos + galería) -----
type ServiceDetail = {
  title: string;        // Título grande del hero (MAYÚSCULAS)
  breadcrumb: string;   // Línea pequeña debajo del título
  hero: string;         // Imagen de portada
  paragraphs: string[]; // Contenido principal
  gallery: string[];    // Imágenes de la galería
  contactBg: string;    // Fondo del bloque de contacto inferior (si lo usas)
};

export const SERVICE_DETAIL: Record<string, ServiceDetail> = {
  "diseno-arquitectonico": {
    title: "DISEÑO ARQUITECTÓNICO",
    breadcrumb: "Servicios / Diseño Arquitectónico",
    hero: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
    paragraphs: [
      "En CREAR proyectamos espacios atemporales que unen estética y funcionalidad. Convertimos ideas en arquitectura con identidad, cuidando proporciones, luz natural y materialidad para que cada metro cuadrado cuente.",
      "Trabajamos con procesos claros y colaborativos (modelado digital y revisiones guiadas) para que puedas visualizar tu proyecto desde el concepto hasta el detalle constructivo.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
    ],
    contactBg:
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
  },

  construccion: {
    title: "CONSTRUCCIÓN",
    breadcrumb: "Servicios / Construcción",
    hero: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
    paragraphs: [
      "Ejecución de obra con estándares de calidad, seguridad y limpieza en sitio. En CREAR coordinamos oficios, suministros y cronogramas para entregar a tiempo y dentro de presupuesto.",
      "Nuestro equipo de obra y red de proveedores certificados garantizan acabados superiores y un seguimiento técnico constante de principio a fin.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
    ],
    contactBg:
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
  },

  "obra-publica": {
    title: "OBRA PÚBLICA",
    breadcrumb: "Servicios / Obra pública",
    hero: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
    paragraphs: [
      "Desarrollamos infraestructura y equipamiento urbano con cumplimiento normativo y trazabilidad completa. En CREAR gestionamos licitaciones, contratos y supervisión con total transparencia.",
      "Aplicamos control de calidad y reportes ejecutivos para asegurar desempeño, durabilidad y valor social en cada proyecto público.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
    ],
    contactBg:
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
  },

  urbanizacion: {
    title: "URBANIZACIÓN",
    breadcrumb: "Servicios / Urbanización",
    hero: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
    paragraphs: [
      "Diseñamos y desarrollamos fraccionamientos y lotificaciones con visión sostenible: trazos viales eficientes, drenaje pluvial, arbolado y movilidad amable.",
      "En CREAR integramos normativa, estudios de impacto y viabilidad técnica para lograr proyectos urbanos conectados y con alto valor de uso.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
    ],
    contactBg:
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
  },

  electrificacion: {
    title: "ELECTRIFICACIÓN",
    breadcrumb: "Servicios / Electrificación",
    hero: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
    paragraphs: [
      "Ingeniería y construcción de redes eléctricas en media y baja tensión, alumbrado y subestaciones. En CREAR proyectamos, tramitamos y ejecutamos con estricto apego a norma.",
      "Realizamos pruebas, memorias de cálculo y puesta en servicio para garantizar seguridad, continuidad y eficiencia energética.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
    ],
    contactBg:
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
  },

  "gestion-de-proyectos": {
    title: "GESTIÓN DE PROYECTOS",
    breadcrumb: "Servicios / Gestión de proyectos",
    hero: "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
    paragraphs: [
      "Dirigimos el ciclo completo del proyecto: alcance, tiempos, costos, riesgos y calidad. Con CREAR tendrás claridad de avances, hitos y decisiones clave en todo momento.",
      "Utilizamos metodologías de planeación y control (tableros, cronogramas y reportes ejecutivos) para que tu inversión se convierta en resultados concretos.",
    ],
    gallery: [
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/3.jpg",
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/1.jpg",
    ],
    contactBg:
      "https://shtheme.org/demosd/savoye/wp-content/uploads/2021/10/2.jpg",
  },
};
