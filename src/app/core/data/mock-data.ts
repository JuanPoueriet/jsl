// src/app/core/data/mock-data.ts

// --- AÑADIDO: Importar la interfaz para type-safety ---
import { BlogPost } from '../services/data.service';

/**
 * DATOS DE SOLUCIONES
 * Movido desde los componentes a este archivo central.
 */
export const SOLUTIONS = [
  {
    key: 'WEB',
    slug: 'web-development', // slug para la URL
    icon: 'Monitor',
  },
  {
    key: 'MOBILE',
    slug: 'mobile-apps',
    icon: 'Smartphone',
  },
  {
    key: 'DESKTOP',
    slug: 'desktop-software',
    icon: 'Server',
  },
  {
    key: 'CLOUD',
    slug: 'cloud-architecture',
    icon: 'Cloud',
  },
];

/**
 * DATOS DE PRODUCTOS
 * Movido desde los componentes a este archivo central.
 */
export const PRODUCTS = [
  {
    key: 'ERP',
    slug: 'jsl-erp', // slug para la URL
    icon: 'Database',
  },
  {
    key: 'POS',
    slug: 'jsl-pos', // slug para la URL
    icon: 'ShoppingCart',
  },
  {
    key: 'MOBILE_APPS',
    slug: 'proprietary-apps', // slug para la URL
    icon: 'Smartphone',
  },
];

/**
 * DATOS DEL PROCESO
 * Movido desde home.component.ts y requerido por process.component.ts
 */
export const PROCESS_STEPS = [
  {
    key: 'STEP1',
    icon: 'Compass',
  },
  {
    key: 'STEP2',
    icon: 'Code',
  },
  {
    key: 'STEP3',
    icon: 'Server',
  },
  {
    key: 'STEP4',
    icon: 'TrendingUp',
  },
];

/**
 * Datos de los miembros del equipo para la página "Nosotros".
 */
export const TEAM_MEMBERS = [
  {
    key: 'MEMBER_1',
    nameKey: 'ABOUT.TEAM_MEMBER_1_NAME',
    roleKey: 'ABOUT.TEAM_MEMBER_1_ROLE',
    imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?fit=crop&w=300&q=80',
  },
  {
    key: 'MEMBER_2',
    nameKey: 'ABOUT.TEAM_MEMBER_2_NAME',
    roleKey: 'ABOUT.TEAM_MEMBER_2_ROLE',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=300&q=80',
  },
  {
    key: 'MEMBER_3',
    nameKey: 'ABOUT.TEAM_MEMBER_3_NAME',
    roleKey: 'ABOUT.TEAM_MEMBER_3_ROLE',
    imageUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?fit=crop&w=300&q=80',
  },
  {
    key: 'MEMBER_4',
    nameKey: 'ABOUT.TEAM_MEMBER_4_NAME',
    roleKey: 'ABOUT.TEAM_MEMBER_4_ROLE',
    imageUrl: 'https://images.unsplash.com/photo-1507003211162-080c3e30NThl?fit=crop&w=300&q=80',
  },
];

/**
 * Datos de los testimonios para la página "Home".
 */
export const TESTIMONIALS = [
  {
    key: 'TESTIMONIAL_1',
    textKey: 'HOME.TESTIMONIAL_1_TEXT',
    nameKey: 'HOME.TESTIMONIAL_1_NAME',
    roleKey: 'HOME.TESTIMONIAL_1_ROLE',
    imageUrl: 'https://images.unsplash.com/photo-1573496359112-58e11a3b1a9e?fit=crop&w=100&q=80',
  },
  {
    key: 'TESTIMONIAL_2',
    textKey: 'HOME.TESTIMONIAL_2_TEXT',
    nameKey: 'HOME.TESTIMONIAL_2_NAME',
    roleKey: 'HOME.TESTIMONIAL_2_ROLE',
    imageUrl: 'https://images.unsplash.com/photo-1603415526960-f6e0328909af?fit=crop&w=100&q=80',
  },
  {
    key: 'TESTIMONIAL_3',
    textKey: 'HOME.TESTIMONial_3_TEXT',
    nameKey: 'HOME.TESTIMONIAL_3_NAME',
    roleKey: 'HOME.TESTIMONIAL_3_ROLE',
    // imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=100&q=80',
    imageUrl: 'assets/imgs/photo-1580489944761-15a19d654956.avif',
  },
];

/**
 * Datos de los casos de éxito (Proyectos).
 * El 'slug' se usa para la URL y para encontrar el proyecto.
 */
export const PROJECTS = [
  {
    key: 'CASE_ERP',
    slug: 'erp-logistics-optimization',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-577380e25f2b?fit=crop&w=600&q=80',
  },
  {
    key: 'CASE_ECOMMERCE',
    slug: 'b2b-ecommerce-platform',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?fit=crop&w=600&q=80',
  },
  {
    key: 'CASE_MOBILE_APP',
    slug: 'fleet-management-mobile-app',
    imageUrl: 'https://images.unsplash.com/photo-1607936834114-0a300c3f0b24?fit=crop&w=600&q=80',
  },
];

/**
 * Datos de las entradas del blog.
 * El 'slug' se usa para la URL y para encontrar la entrada.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    key: 'POST_1',
    slug: 'future-of-angular-ssr',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240214151845/The-Future-of-Angular-JS-Top-Trends-&-Predictions.png',
    date: '2025-10-28',
    authorKey: 'MEMBER_1', // <-- Cambiado a Key
    tags: ['angular', 'ssr', 'frontend', 'performance'],
    readTime: 5,
    featured: true,
  },
  {
    key: 'POST_2',
    slug: 'ux-vs-ui-what-matters-most',
    imageUrl: 'https://zaibatsutechnology.co.uk/wp-content/uploads/2021/05/UI-vs-UX.png',
    date: '2025-10-22',
    authorKey: 'MEMBER_2', // <-- Cambiado a Key
    tags: ['ux', 'ui', 'design', 'frontend'],
    readTime: 3,
  },
  {
    key: 'POST_3',
    slug: 'cloud-architecture-scalability',
    imageUrl: 'https://www.muycomputerpro.com/wp-content/uploads/2018/07/arquitecto-cloud.jpg',
    date: '2025-10-15',
    authorKey: 'MEMBER_3', // <-- Cambiado a Key
    tags: ['cloud', 'architecture', 'devops', 'scalability'],
    readTime: 4,
  },
  {
    key: 'POST_4',
    slug: 'getting-started-with-react-vite',
    imageUrl: 'https://blog.openreplay.com/images/vite-create-react-app/images/hero.png',
    date: '2025-10-10',
    authorKey: 'MEMBER_4', // <-- Cambiado a Key
    tags: ['react', 'frontend', 'performance', 'tools'],
    readTime: 3,
  },
  {
    key: 'POST_5',
    slug: 'from-wireframe-to-hifi-in-figma',
    imageUrl: 'https://assets.website-files.com/608843c52d273a201c18337a/632c7003666b222c83c07a3c_Cover.jpg',
    date: '2025-10-05',
    authorKey: 'MEMBER_2', // <-- Cambiado a Key
    tags: ['design', 'ui', 'tools', 'ux'],
    readTime: 2,
  },
  {
    key: 'POST_6',
    slug: 'power-of-serverless-aws-lambda',
    imageUrl: 'https://images.prismic.io/serverless/2529b3c4-023a-48b0-a53c-0955e0d4c88a_serverless-framework-aws-lambda-guide.png',
    date: '2025-10-01',
    authorKey: 'MEMBER_3', // <-- Cambiado a Key
    tags: ['cloud', 'devops', 'serverless', 'aws'],
    readTime: 3,
  },
];

/**
 * DATOS DEL TECH STACK (NUEVO)
 * Datos para la página de Tecnologías.
 * NOTA: Debes agregar los logos en la carpeta 'src/assets/imgs/logos/'
 */
export const TECH_STACK = [
  {
    key: 'FRONTEND',
    icon: 'Monitor', // Icono de Lucide
    technologies: [
      { name: 'Angular', imageUrl: 'assets/imgs/logos/angular.svg' },
      { name: 'TypeScript', imageUrl: 'assets/imgs/logos/typescript.svg' },
      { name: 'JavaScript', imageUrl: 'assets/imgs/logos/javascript.svg' },
      { name: 'HTML5', imageUrl: 'assets/imgs/logos/html5.svg' },
      { name: 'Sass (SCSS)', imageUrl: 'assets/imgs/logos/sass.svg' },
      { name: 'RxJS', imageUrl: 'assets/imgs/logos/rxjs.svg' },
    ],
  },
  {
    key: 'BACKEND',
    icon: 'Server',
    technologies: [
      { name: 'Node.js', imageUrl: 'assets/imgs/logos/nodejs.svg' },
      { name: 'NestJS', imageUrl: 'assets/imgs/logos/nestjs.svg' },
      { name: 'Express', imageUrl: 'assets/imgs/logos/express.svg' },
      { name: 'C# / .NET', imageUrl: 'assets/imgs/logos/dotnet.svg' },
      { name: 'Python', imageUrl: 'assets/imgs/logos/python.svg' },
    ],
  },
  {
    key: 'DATABASE',
    icon: 'Database',
    technologies: [
      { name: 'PostgreSQL', imageUrl: 'assets/imgs/logos/postgresql.svg' },
      { name: 'MySQL', imageUrl: 'assets/imgs/logos/mysql.svg' },
      { name: 'MongoDB', imageUrl: 'assets/imgs/logos/mongodb.svg' },
      { name: 'Redis', imageUrl: 'assets/imgs/logos/redis.svg' },
      { name: 'SQL Server', imageUrl: 'assets/imgs/logos/sqlserver.svg' },
    ],
  },
  {
    key: 'CLOUD_DEVOPS',
    icon: 'CloudCog',
    technologies: [
      { name: 'AWS', imageUrl: 'assets/imgs/logos/aws.svg' },
      { name: 'Azure', imageUrl: 'assets/imgs/logos/azure.svg' },
      { name: 'Docker', imageUrl: 'assets/imgs/logos/docker.svg' },
      { name: 'Terraform', imageUrl: 'assets/imgs/logos/terraform.svg' },
      { name: 'Git', imageUrl: 'assets/imgs/logos/git.svg' },
    ],
  },
  {
    key: 'MOBILE',
    icon: 'Smartphone',
    technologies: [
      { name: 'Flutter', imageUrl: 'assets/imgs/logos/flutter.svg' },
      { name: 'React Native', imageUrl: 'assets/imgs/logos/react.svg' },
      { name: 'Swift (iOS)', imageUrl: 'assets/imgs/logos/swift.svg' },
      { name: 'Kotlin (Android)', imageUrl: 'assets/imgs/logos/kotlin.svg' },
    ],
  },
];

/**
 * DATOS DE POSICIONES DE CARRERAS (NUEVO)
 */
export const CAREER_POSITIONS = [
  {
    key: 'POS_1',
    locationKey: 'CAREERS.LOCATION_REMOTE',
    typeKey: 'CAREERS.TYPE_FULLTIME',
  },
  {
    key: 'POS_2',
    locationKey: 'CAREERS.LOCATION_HYBRID',
    typeKey: 'CAREERS.TYPE_FULLTIME',
  },
];

/**
 * DATOS DE PREGUNTAS FRECUENTES (FAQ) (NUEVO)
 */
export const FAQ_ITEMS = [
  {
    questionKey: 'FAQ.Q1_TITLE',
    answerKey: 'FAQ.Q1_DESC',
  },
  {
    questionKey: 'FAQ.Q2_TITLE',
    answerKey: 'FAQ.Q2_DESC',
  },
  {
    questionKey: 'FAQ.Q3_TITLE',
    answerKey: 'FAQ.Q3_DESC',
  },
  {
    questionKey: 'FAQ.Q4_TITLE',
    answerKey: 'FAQ.Q4_DESC',
  },
];