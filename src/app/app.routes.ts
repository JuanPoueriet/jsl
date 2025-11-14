import { Routes } from '@angular/router';
import { languageInitGuard } from './core/guards/language-init-guard';
import { languageRedirectGuard } from './core/guards/language-redirect-guard';
import { RouteRedirectorComponent } from './core/components/route-redirector/route-redirector';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [languageInitGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home),
        data: {
          title: 'HEADER.HOME',
          description: 'HOME.HERO1_SUBTITLE'
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
            path: '',
            loadComponent: () => import('./features/solutions/solutions').then(c => c.Solutions),
          },
          {
            path: ':slug',
            loadComponent: () => import('./features/solution-detail/solution-detail').then(c => c.SolutionDetail),
            data: {
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
            path: '',
            loadComponent: () => import('./features/products/products').then(c => c.Products),
          },
          {
            path: ':slug',
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
            path: '',
            loadComponent: () => import('./features/projects/projects').then(c => c.Projects),
          },
          {
            path: ':slug',
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
            path: '',
            loadComponent: () => import('./features/blog/blog').then(c => c.Blog),
          },
          {
            path: ':slug',
            loadComponent: () => import('./features/blog-detail/blog-detail').then(c => c.BlogDetail),
            data: { description: 'BLOG.SUBTITLE' }
          }
        ]
      },
      {
        path: 'process',
        loadComponent: () => import('./features/process/process').then(c => c.Process),
        data: {
          title: 'HEADER.PROCESS',
          description: 'PROCESS.SUBTITLE'
        }
      },
      {
        path: 'industries',
        loadComponent: () => import('./features/industries/industries').then(c => c.Industries),
        data: {
          title: 'HEADER.INDUSTRIES',
          description: 'INDUSTRIES.SUBTITLE'
        }
      },
      {
        path: 'tech-stack',
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
        path: 'careers',
        loadComponent: () => import('./features/careers/careers').then(c => c.Careers),
        data: {
          title: 'HEADER.CAREERS',
          description: 'CAREERS.SUBTITLE'
        }
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/faq/faq').then(c => c.Faq),
        data: {
          title: 'HEADER.FAQ',
          description: 'FAQ.SUBTITLE'
        }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { 
        path: '**',
        loadComponent: () => import('./features/not-found/not-found').then(c => c.NotFound),
        data: { 
          title: 'NOT_FOUND.TITLE',
          description: 'NOT_FOUND.SUBTITLE'
        }
      }
    ]
  },
  {
    path: '',
    component: RouteRedirectorComponent,
    canActivate: [languageRedirectGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    component: RouteRedirectorComponent,
    canActivate: [languageRedirectGuard]
  }
];