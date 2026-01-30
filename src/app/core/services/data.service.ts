// data.service.ts
// src/app/core/services/data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Importamos TODA nuestra data mock centralizada
import {
  SOLUTIONS,
  PRODUCTS,
  PROCESS_STEPS,
  TEAM_MEMBERS,
  TESTIMONIALS,
  PROJECTS,
  BLOG_POSTS,
  TECH_STACK,
  CAREER_POSITIONS,
  FAQ_ITEMS,
  PARTNERS,
} from '@core/data/mock-data';

// --- DEFINICIÓN DE INTERFACES PARA TODO EL SITIO ---

// Interface para Soluciones
export interface Solution {
  key: string;
  slug: string;
  icon: string;
  heroImage: string;
  sections: {
    titleKey: string;
    contentKey: string;
  }[];
  technologies: string[];
}

// Interface para Productos
export interface Product {
  key: string;
  slug: string;
  icon: string;
  externalUrl?: string;
}

// Interface para Casos de Éxito (Proyectos)
export interface Project {
  key: string;
  slug: string;
  imageUrl: string;
  metrics?: string[];
}

// Interface para Artículos del Blog
export interface BlogPost {
  key: string;
  slug: string;
  imageUrl: string;
  date: string;
  authorKey: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
}

// Interface para Miembros del Equipo
export interface TeamMember {
  key: string;
  nameKey: string;
  roleKey: string;
  bioKey?: string;
  imageUrl: string;
  linkedIn?: string;
  twitter?: string;
}

// Interface para Testimonios
export interface Testimonial {
  key: string;
  textKey: string;
  nameKey: string;
  roleKey: string;
  imageUrl: string;
}

// Interface para Pasos del Proceso
export interface ProcessStep {
  key: string;
  icon: string;
}

// Interface para una Tecnología individual
export interface Technology {
  name: string;
  imageUrl: string;
}

// Interface para una Categoría del Stack Tecnológico
export interface TechCategory {
  key: string;
  icon: string;
  technologies: Technology[];
}

// Interface para Partners
export interface Partner {
  name: string;
  imageUrl: string;
}

// Interface para Posiciones de Carrera
export interface CareerPosition {
  key: string;
  locationKey: string;
  typeKey: string;
}

// Interface para Items de FAQ
export interface FaqItem {
  questionKey: string;
  answerKey: string;
}

/**
 * Servicio centralizado para proveer toda la data (mock) de la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  // --- Métodos de Soluciones ---
  getSolutions(): Observable<Solution[]> {
    return of(SOLUTIONS);
  }

  getSolutionBySlug(slug: string): Observable<Solution | undefined> {
    const solution = SOLUTIONS.find((s) => s.slug === slug);
    return of(solution);
  }

  // --- Métodos de Productos ---
  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    const product = PRODUCTS.find((p) => p.slug === slug);
    return of(product);
  }

  // --- Métodos de Proyectos (Casos de Éxito) ---
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    const project = PROJECTS.find((p) => p.slug === slug);
    return of(project);
  }

  // --- Métodos de Blog ---
  getBlogPosts(): Observable<BlogPost[]> {
    return of(BLOG_POSTS);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    return of(post);
  }

  // --- Métodos de Equipo ---
  getTeamMembers(): Observable<TeamMember[]> {
    return of(TEAM_MEMBERS);
  }

  getTeamMemberByKey(key: string): Observable<TeamMember | undefined> {
    const member = TEAM_MEMBERS.find((m) => m.key === key);
    return of(member);
  }

  // --- Métodos de Testimonios ---
  getTestimonials(): Observable<Testimonial[]> {
    return of(TESTIMONIALS);
  }

  // --- Métodos de Proceso ---
  getProcessSteps(): Observable<ProcessStep[]> {
    return of(PROCESS_STEPS);
  }

  // --- Métodos de Stack Tecnológico ---
  getTechStack(): Observable<TechCategory[]> {
    return of(TECH_STACK);
  }

  // --- Métodos de Partners ---
  getPartners(): Observable<Partner[]> {
    return of(PARTNERS);
  }

  // --- Métodos de Carreras ---
  getCareersPositions(): Observable<CareerPosition[]> {
    return of(CAREER_POSITIONS);
  }

  // --- Métodos de FAQ ---
  getFaqItems(): Observable<FaqItem[]> {
    return of(FAQ_ITEMS);
  }

  // --- Método para posts relacionados ---
  getRelatedPosts(currentSlug: string, tags: string[]): Observable<BlogPost[]> {
    return of(BLOG_POSTS).pipe(
      map((posts) =>
        posts
          .filter(
            (post) =>
              post.slug !== currentSlug &&
              post.tags.some((tag: string) => tags.includes(tag)),
          )
          .slice(0, 3),
      ),
    );
  }

  // --- Método de Búsqueda Global ---
  search(query: string): Observable<{ type: string; item: any }[]> {
    const q = query.toLowerCase();
    const results: { type: string; item: any }[] = [];

    // Search in Solutions
    SOLUTIONS.forEach(s => {
      // Assuming keys or simple check, in real app we check translated titles
      if (s.slug.includes(q) || s.key.toLowerCase().includes(q)) {
        results.push({ type: 'solution', item: s });
      }
    });

    // Search in Products
    PRODUCTS.forEach(p => {
      if (p.slug.includes(q) || p.key.toLowerCase().includes(q)) {
        results.push({ type: 'product', item: p });
      }
    });

    // Search in Blog
    BLOG_POSTS.forEach(b => {
      if (b.slug.includes(q) || b.key.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q))) {
        results.push({ type: 'blog', item: b });
      }
    });

    // Search in Projects
    PROJECTS.forEach(p => {
      if (p.slug.includes(q) || p.key.toLowerCase().includes(q)) {
        results.push({ type: 'project', item: p });
      }
    });

    return of(results);
  }
}