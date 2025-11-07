import { Routes } from '@angular/router';
import { languageInitGuard } from './core/guards/language-init-guard';
import { languageRedirectGuard } from './core/guards/language-redirect-guard';
import { RouteRedirectorComponent } from './core/components/route-redirector/route-redirector';

/**
 * 1. Definición de todas las rutas de características (páginas).
 * Estas son las rutas que vivirán bajo el prefijo de idioma (ej. /es/home).
 */
const featureRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(c => c.Home),
    data: { 
      title: 'HEADER.HOME',
      description: 'HOME.HERO1_SUBTITLE' // SEO
    }
  },
  {
    path: 'solutions',
    data: { 
      title: 'HEADER.SERVICES',
      description: 'SOLUTIONS.SUBTITLE'
    },
    children: [
      {
        path: '', // La ruta /:lang/solutions (lista)
        loadComponent: () => import('./features/solutions/solutions').then(c => c.Solutions),
      },
      {
        path: ':slug', // La ruta /:lang/solutions/web-development (detalle)
        loadComponent: () => import('./features/solution-detail/solution-detail').then(c => c.SolutionDetail),
        data: { 
          // El título se establece dinámicamente en el componente
          description: 'SOLUTIONS.SUBTITLE' 
        }
      }
    ]
  },
  {
    path: 'products',
    data: { 
      title: 'HEADER.PRODUCTS',
      description: 'PRODUCTS.SUBTITLE'
    },
    children: [
      {
        path: '', // La ruta /:lang/products (lista)
        loadComponent: () => import('./features/products/products').then(c => c.Products),
      },
      {
        path: ':slug', // La ruta /:lang/products/jsl-erp (detalle)
        loadComponent: () => import('./features/product-detail/product-detail').then(c => c.ProductDetail),
        data: { 
          description: 'PRODUCTS.SUBTITLE' 
        }
      }
    ]
  },
  {
    path: 'projects',
    data: { 
      title: 'HEADER.PROJECTS',
      description: 'PROJECTS.SUBTITLE'
    },
    children: [
      {
        path: '', // La ruta /:lang/projects (lista)
        loadComponent: () => import('./features/projects/projects').then(c => c.Projects),
      },
      {
        path: ':slug', // La ruta /:lang/projects/erp-logistics-optimization (detalle)
        loadComponent: () => import('./features/project-detail/project-detail').then(c => c.ProjectDetail),
        data: { description: 'PROJECTS.SUBTITLE' }
      }
    ]
  },
  {
    path: 'blog',
    data: {
      title: 'HEADER.BLOG',
      description: 'BLOG.SUBTITLE'
    },
    children: [
      {
        path: '', // La ruta /:lang/blog (lista)
        loadComponent: () => import('./features/blog/blog').then(c => c.Blog),
      },
      {
        path: ':slug', // La ruta /:lang/blog/future-of-angular-ssr (detalle)
        loadComponent: () => import('./features/blog-detail/blog-detail').then(c => c.BlogDetail),
        data: { description: 'BLOG.SUBTITLE' }
      }
    ]
  },
  {
    path: 'process', // Página de Proceso (Fase 2)
    loadComponent: () => import('./features/process/process').then(c => c.Process),
    data: { 
      title: 'HEADER.PROCESS',
      description: 'PROCESS.SUBTITLE'
    }
  },
  {
    path: 'industries', // Página de Industrias (Fase 2)
    loadComponent: () => import('./features/industries/industries').then(c => c.Industries),
    data: { 
      title: 'HEADER.INDUSTRIES',
      description: 'INDUSTRIES.SUBTITLE'
    }
  },
  {
    path: 'tech-stack', // Página de Tecnologías (Fase 3)
    loadComponent: () => import('./features/tech-stack/tech-stack').then(c => c.TechStack),
    data: { 
      title: 'HEADER.TECH_STACK',
      description: 'TECH_STACK.SUBTITLE'
    }
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-us/about-us').then(c => c.AboutUs),
    data: { 
      title: 'HEADER.ABOUT',
      description: 'ABOUT.SUBTITLE'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(c => c.Contact),
    data: { 
      title: 'HEADER.CONTACT',
      description: 'CONTACT.SUBTITLE'
    }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/legal/privacy/privacy').then(c => c.Privacy),
    data: { 
      title: 'LEGAL.PRIVACY_TITLE',
      description: 'LEGAL.PRIVACY_INTRO'
    }
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./features/legal/terms/terms').then(c => c.Terms),
    data: { 
      title: 'LEGAL.TERMS_TITLE',
      description: 'LEGAL.TERMS_SECTION_1_P1'
    }
  },
  {
    path: '', // Redirige /es -> /es/home
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

/**
 * 2. Definición de las rutas principales de la aplicación.
 * Esto maneja la lógica de redirección de idioma y el 404 global.
 */
export const routes: Routes = [
  {
    path: ':lang', // Todas las rutas están bajo /es/... o /en/...
    canActivate: [languageInitGuard], // Activa el idioma (ngx-translate)
    children: [
      ...featureRoutes, // Carga todas las páginas de la aplicación
      { 
        path: '**', // Captura cualquier ruta no encontrada DENTRO de /:lang/
        loadComponent: () => import('./features/not-found/not-found').then(c => c.NotFound),
        data: { 
          title: 'NOT_FOUND.TITLE',
          description: 'NOT_FOUND.SUBTITLE'
        }
      }
    ]
  },
  {
    path: '', // Ruta raíz vacía (ej. jsl.technology/)
    component: RouteRedirectorComponent, // Componente vacío
    canActivate: [languageRedirectGuard], // Redirige a /es o /en
    pathMatch: 'full'
  },
  {
    path: '**', // Captura cualquier ruta global sin idioma (ej. jsl.technology/contact)
    component: RouteRedirectorComponent, // Componente vacío
    canActivate: [languageRedirectGuard] // Redirige a /es/contact o /en/contact
  }
];