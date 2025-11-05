import { Routes } from '@angular/router';
import { languageInitGuard } from './core/guards/language-init-guard';
import { languageRedirectGuard } from './core/guards/language-redirect-guard';
// --- 1. IMPORTAR EL NUEVO COMPONENTE ---
import { RouteRedirectorComponent } from './core/components/route-redirector/route-redirector';

// 1. Definimos las rutas de las características (¡CON DATOS DE DESCRIPCIÓN!)
const featureRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(c => c.Home),
    data: { 
      title: 'HEADER.HOME',
      description: 'HOME.HERO1_SUBTITLE' // <-- AÑADIDO
    }
  },
  {
    path: 'solutions',
    loadComponent: () => import('./features/solutions/solutions').then(c => c.Solutions),
    data: { 
      title: 'HEADER.SERVICES',
      description: 'SOLUTIONS.SUBTITLE' // <-- AÑADIDO
    }
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products').then(c => c.Products),
    data: { 
      title: 'HEADER.PRODUCTS',
      description: 'PRODUCTS.SUBTITLE' // <-- AÑADIDO
    }
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then(c => c.Projects),
    data: { 
      title: 'HEADER.PROJECTS',
      description: 'PROJECTS.SUBTITLE' // <-- AÑADIDO
    }
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-us/about-us').then(c => c.AboutUs),
    data: { 
      title: 'HEADER.ABOUT',
      description: 'ABOUT.SUBTITLE' // <-- AÑADIDO
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(c => c.Contact),
    data: { 
      title: 'HEADER.CONTACT',
      description: 'CONTACT.SUBTITLE' // <-- AÑADIDO
    }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/legal/privacy/privacy').then(c => c.Privacy),
    data: { 
      title: 'LEGAL.PRIVACY_TITLE',
      description: 'LEGAL.PRIVACY_INTRO' // <-- AÑADIDO
    }
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./features/legal/terms/terms').then(c => c.Terms),
    data: { 
      title: 'LEGAL.TERMS_TITLE',
      description: 'LEGAL.TERMS_SECTION_1_P1' // <-- AÑADIDO
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
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
        redirectTo: 'home'
      }
    ]
  },
  {
    path: '', // <-- Ruta raíz
    // --- 2. AÑADIR EL COMPONENTE FANTASMA ---
    component: RouteRedirectorComponent,
    canActivate: [languageRedirectGuard], // El guard ahora se ejecutará
    pathMatch: 'full'
  },
  {
    path: '**', // <-- Ruta catch-all
    // --- 3. AÑADIR EL COMPONENTE FANTASMA ---
    component: RouteRedirectorComponent, 
    canActivate: [languageRedirectGuard] // El guard ahora se ejecutará
  }
];