// src/app/core/services/data.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
}

// Interface para Casos de Éxito (Proyectos)
export interface Project {
  key: string;
  slug: string;
  imageUrl: string;
  metrics?: string[];
  category?: string; // Added to match mock data usage if needed
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
 * Servicio centralizado para proveer toda la data de la aplicación.
 * Intenta cargar data dinámica desde el backend (/api/content), con fallback a los mocks estáticos.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  // BehaviorSubject que mantiene el estado actual de los datos.
  // Inicialmente vacío, usará los fallbacks en los getters.
  private dataSubject = new BehaviorSubject<any>({});

  constructor() {
    this.loadData();
  }

  /**
   * Carga los datos desde la API.
   * Si falla (ej. en desarrollo local sin backend), se maneja el error silenciosamente
   * y la app sigue funcionando con los datos mock estáticos gracias a los fallbacks.
   */
  public loadData() {
    this.http.get<any>('/api/content').pipe(
      catchError(err => {
        // En un entorno real, podríamos loguear esto solo en debug
        // console.warn('No dynamic content API found, using static mocks.', err);
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.dataSubject.next(data);
      }
    });
  }

  /**
   * Helper genérico para obtener una lista con fallback.
   */
  private getList<T>(key: string, fallback: T[]): Observable<T[]> {
    return this.dataSubject.pipe(
      map(data => (data[key] as T[]) || fallback)
    );
  }

  // --- Métodos de Soluciones ---
  getSolutions(): Observable<Solution[]> {
    return this.getList('SOLUTIONS', SOLUTIONS);
  }

  getSolutionBySlug(slug: string): Observable<Solution | undefined> {
    return this.getSolutions().pipe(
      map(items => items.find(s => s.slug === slug))
    );
  }

  // --- Métodos de Productos ---
  getProducts(): Observable<Product[]> {
    return this.getList('PRODUCTS', PRODUCTS);
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(items => items.find(p => p.slug === slug))
    );
  }

  // --- Métodos de Proyectos (Casos de Éxito) ---
  getProjects(): Observable<Project[]> {
    return this.getList('PROJECTS', PROJECTS);
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(items => items.find(p => p.slug === slug))
    );
  }

  // --- Métodos de Blog ---
  getBlogPosts(): Observable<BlogPost[]> {
    return this.getList('BLOG_POSTS', BLOG_POSTS);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.getBlogPosts().pipe(
      map(items => items.find(p => p.slug === slug))
    );
  }

  // --- Métodos de Equipo ---
  getTeamMembers(): Observable<TeamMember[]> {
    return this.getList('TEAM_MEMBERS', TEAM_MEMBERS);
  }

  getTeamMemberByKey(key: string): Observable<TeamMember | undefined> {
    return this.getTeamMembers().pipe(
      map(items => items.find(m => m.key === key))
    );
  }

  // --- Métodos de Testimonios ---
  getTestimonials(): Observable<Testimonial[]> {
    return this.getList('TESTIMONIALS', TESTIMONIALS);
  }

  // --- Métodos de Proceso ---
  getProcessSteps(): Observable<ProcessStep[]> {
    return this.getList('PROCESS_STEPS', PROCESS_STEPS);
  }

  // --- Métodos de Stack Tecnológico ---
  getTechStack(): Observable<TechCategory[]> {
    return this.getList('TECH_STACK', TECH_STACK);
  }

  // --- Métodos de Partners ---
  getPartners(): Observable<Partner[]> {
    return this.getList('PARTNERS', PARTNERS);
  }

  // --- Métodos de Carreras ---
  getCareersPositions(): Observable<CareerPosition[]> {
    return this.getList('CAREER_POSITIONS', CAREER_POSITIONS);
  }

  // --- Métodos de FAQ ---
  getFaqItems(): Observable<FaqItem[]> {
    return this.getList('FAQ_ITEMS', FAQ_ITEMS);
  }

  // --- Método para posts relacionados ---
  getRelatedPosts(currentSlug: string, tags: string[]): Observable<BlogPost[]> {
    return this.getBlogPosts().pipe(
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

    return this.dataSubject.pipe(
      map(data => {
        const solutions = (data.SOLUTIONS as Solution[]) || SOLUTIONS;
        const products = (data.PRODUCTS as Product[]) || PRODUCTS;
        const blogPosts = (data.BLOG_POSTS as BlogPost[]) || BLOG_POSTS;
        const projects = (data.PROJECTS as Project[]) || PROJECTS;

        const results: { type: string; item: any }[] = [];

        // Search in Solutions
        solutions.forEach(s => {
          if (s.slug.includes(q) || s.key.toLowerCase().includes(q)) {
            results.push({ type: 'solution', item: s });
          }
        });

        // Search in Products
        products.forEach(p => {
          if (p.slug.includes(q) || p.key.toLowerCase().includes(q)) {
            results.push({ type: 'product', item: p });
          }
        });

        // Search in Blog
        blogPosts.forEach(b => {
          if (b.slug.includes(q) || b.key.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q))) {
            results.push({ type: 'blog', item: b });
          }
        });

        // Search in Projects
        projects.forEach(p => {
          if (p.slug.includes(q) || p.key.toLowerCase().includes(q)) {
            results.push({ type: 'project', item: p });
          }
        });

        return results;
      })
    );
  }
}
