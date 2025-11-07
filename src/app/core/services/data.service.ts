import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Importamos TODA nuestra data mock centralizada
import {
  SOLUTIONS,
  PRODUCTS,
  PROCESS_STEPS,
  TEAM_MEMBERS,
  TESTIMONIALS,
  PROJECTS,
  BLOG_POSTS,
  TECH_STACK
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
}

// Interface para Miembros del Equipo
export interface TeamMember {
  key: string;
  nameKey: string;
  roleKey: string;
  imageUrl: string;
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


/**
 * Servicio centralizado para proveer toda la data (mock) de la aplicación.
 * Entrega los datos como Observables (usando 'of()') para simular
 * una llamada a una API asíncrona.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // --- Métodos de Soluciones ---
  getSolutions(): Observable<Solution[]> {
    return of(SOLUTIONS);
  }
  
  getSolutionBySlug(slug: string): Observable<Solution | undefined> {
    const solution = SOLUTIONS.find(s => s.slug === slug);
    return of(solution);
  }

  // --- Métodos de Productos ---
  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }
  
  getProductBySlug(slug: string): Observable<Product | undefined> {
    const product = PRODUCTS.find(p => p.slug === slug);
    return of(product);
  }

  // --- Métodos de Proyectos (Casos de Éxito) ---
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    const project = PROJECTS.find(p => p.slug === slug);
    return of(project);
  }

  // --- Métodos de Blog ---
  getBlogPosts(): Observable<BlogPost[]> {
    return of(BLOG_POSTS);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    const post = BLOG_POSTS.find(p => p.slug === slug);
    return of(post);
  }

  // --- Métodos de Equipo ---
  getTeamMembers(): Observable<TeamMember[]> {
    return of(TEAM_MEMBERS);
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
}