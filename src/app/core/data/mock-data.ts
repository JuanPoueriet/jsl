// src/app/core/data/mock-data.ts

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
  }
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
    textKey: 'HOME.TESTIMONIAL_3_TEXT',
    nameKey: 'HOME.TESTIMONIAL_3_NAME',
    roleKey: 'HOME.TESTIMONIAL_3_ROLE',
    // imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=100&q=80',
    imageUrl: 'assets/imgs/photo-1580489944761-15a19d654956.avif',
  }
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
  }
];

/**
 * Datos de las entradas del blog.
 * El 'slug' se usa para la URL y para encontrar la entrada.
 */
export const BLOG_POSTS = [
  {
    key: 'POST_1',
    slug: 'future-of-angular-ssr',
    // imageUrl: 'https://images.unsplash.com/photo-1630799424434-2e1d88c227b7?fit=crop&w=600&q=80',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240214151845/The-Future-of-Angular-JS-Top-Trends-&-Predictions.png',
    // imageUrl: 'https://www.aceinfoway.com/images/angular_webworker1.jpg',
    date: '2025-10-28',
    authorKey: 'ABOUT.TEAM_MEMBER_1_NAME',
  },
  {
    key: 'POST_2',
    slug: 'ux-vs-ui-what-matters-most',
    // imageUrl: 'https://images.unsplash.com/photo-1587440871867-194c6f920ab4?fit=crop&w=600&q=80',
    imageUrl: 'https://zaibatsutechnology.co.uk/wp-content/uploads/2021/05/UI-vs-UX.png',
    date: '2025-10-22',
    authorKey: 'ABOUT.TEAM_MEMBER_2_NAME',
  },
  {
    key: 'POST_3',
    slug: 'cloud-architecture-scalability',
    imageUrl: 'https://images.unsplash.com/photo-1510915228340-01c85c1a1a8e?fit=crop&w=600&q=80',
    date: '2025-10-15',
    authorKey: 'ABOUT.TEAM_MEMBER_3_NAME',
  }
];