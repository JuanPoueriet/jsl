// src/app/core/services/data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- Asegúrate de que 'map' esté importado

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
  // --- AÑADIR NUEVOS DATOS ---
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
  // --- CAMPOS AÑADIDOS ---
  readTime: number; // Tiempo de lectura en minutos
  featured?: boolean; // Opcional, para destacar un post
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

// --- AÑADIR NUEVAS INTERFACES ---

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
 * Entrega los datos como Observables (usando 'of()') para simular
 * una llamada a una API asíncrona.
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

  // --- NUEVO: Método para buscar un miembro de equipo por su Key ---
  // Lo usaremos para la tarjeta de autor en el blog
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

  // --- AÑADIR NUEVOS MÉTODOS ---

  // --- Métodos de Carreras ---
  getCareersPositions(): Observable<CareerPosition[]> {
    return of(CAREER_POSITIONS);
  }

  // --- Métodos de FAQ ---
  getFaqItems(): Observable<FaqItem[]> {
    return of(FAQ_ITEMS);
  }

  // --- MÉTODO CORREGIDO ---
  /**
   * Obtiene una lista de artículos de blog relacionados basados en etiquetas.
   * @param currentSlug El slug del artículo actual, para excluirlo de la lista.
   * @param tags Las etiquetas del artículo actual.
   * @returns Un Observable con un array de hasta 3 BlogPosts relacionados.
   */
  getRelatedPosts(currentSlug: string, tags: string[]): Observable<BlogPost[]> {
    return of(BLOG_POSTS).pipe(
      map((posts) =>
        posts
          .filter(
            (post) =>
              post.slug !== currentSlug && // Excluir el post actual
              post.tags.some((tag: string) => tags.includes(tag)), // <-- CORREGIDO: (tag: string)
          )
          .slice(0, 3), // Limitar a 3 resultados
      ),
    );
  }
}