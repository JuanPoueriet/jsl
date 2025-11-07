import { Routes } from '@angular/router';
import { languageInitGuard } from './core/guards/language-init-guard';
import { languageRedirectGuard } from './core/guards/language-redirect-guard';
import { RouteRedirectorComponent } from './core/components/route-redirector/route-redirector';

// 1. Definimos las rutas de las características (¡CON DATOS DE DESCRIPCIÓN!)
const featureRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
    data: {
      title: 'HEADER.HOME',
      description: 'HOME.HERO1_SUBTITLE',
    },
  },
  {
    path: 'solutions',
    loadComponent: () => import('./features/solutions/solutions').then((c) => c.Solutions),
    data: {
      title: 'HEADER.SERVICES',
      description: 'SOLUTIONS.SUBTITLE',
    },
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products').then((c) => c.Products),
    data: {
      title: 'HEADER.PRODUCTS',
      description: 'PRODUCTS.SUBTITLE',
    },
  },
  // --- MODIFICADO: Sistema de rutas para Proyectos (con detalle) ---
  {
    path: 'projects',
    data: {
      title: 'HEADER.PROJECTS',
      description: 'PROJECTS.SUBTITLE',
    },
    children: [
      {
        path: '', // La ruta /:lang/projects (lista)
        loadComponent: () => import('./features/projects/projects').then((c) => c.Projects),
      },
      {
        path: ':slug', // La ruta /:lang/projects/mi-proyecto (detalle)
        loadComponent: () =>
          import('./features/project-detail/project-detail').then((c) => c.ProjectDetail),
        data: {
          // El título se establecerá dinámicamente en el componente
          description: 'PROJECTS.SUBTITLE',
        },
      },
    ],
  },
  // --- NUEVO: Sistema de rutas para Blog (con detalle) ---
  {
    path: 'blog',
    data: {
      title: 'HEADER.BLOG',
      description: 'BLOG.SUBTITLE',
    },
    children: [
      {
        path: '', // La ruta /:lang/blog (lista)
        loadComponent: () => import('./features/blog/blog').then((c) => c.Blog),
      },
      {
        path: ':slug', // La ruta /:lang/blog/mi-post (detalle)
        loadComponent: () => import('./features/blog-detail/blog-detail').then((c) => c.BlogDetail),
        data: {
          // El título se establecerá dinámicamente en el componente
          description: 'BLOG.SUBTITLE',
        },
      },
    ],
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-us/about-us').then((c) => c.AboutUs),
    data: {
      title: 'HEADER.ABOUT',
      description: 'ABOUT.SUBTITLE',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((c) => c.Contact),
    data: {
      title: 'HEADER.CONTACT',
      description: 'CONTACT.SUBTITLE',
    },
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/legal/privacy/privacy').then((c) => c.Privacy),
    data: {
      title: 'LEGAL.PRIVACY_TITLE',
      description: 'LEGAL.PRIVACY_INTRO',
    },
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./features/legal/terms/terms').then((c) => c.Terms),
    data: {
      title: 'LEGAL.TERMS_TITLE',
      description: 'LEGAL.TERMS_SECTION_1_P1',
    },
  },
  {
    path: 'tech-stack', // Página de Tecnologías (Fase 3)
    loadComponent: () => import('./features/tech-stack/tech-stack').then((c) => c.TechStack),
    data: {
      title: 'HEADER.TECH_STACK',
      description: 'TECH_STACK.SUBTITLE',
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

// 2. Definimos las rutas principales de la aplicación
export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [languageInitGuard],
    children: [
      ...featureRoutes,
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '',
    component: RouteRedirectorComponent,
    canActivate: [languageRedirectGuard],
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RouteRedirectorComponent,
    canActivate: [languageRedirectGuard],
  },
];
