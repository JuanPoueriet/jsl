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
} from '../data/mock-data';

// --- DEFINICIÓN DE INTERFACES PARA TODO EL SITIO ---

// Interface para Soluciones
export interface Solution {
  key: string;
  slug: string;
  icon: string;
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
}