import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService } from '../../core/services/data.service';
import { CtaComponent } from '../../shared/components/cta/cta';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router'; // <-- Importar RouterLink
import { LucideAngularModule } from 'lucide-angular'; // <-- Importar Lucide

@Component({
  selector: 'jsl-blog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll,
    CtaComponent,
    RouterLink, // <-- Añadir
    LucideAngularModule, // <-- Añadir
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // <-- Añadir
})
export class Blog implements OnInit {
  private translate = inject(TranslateService);
  private dataService = inject(DataService);

  public currentLang: string;

  // --- NUEVA LÓGICA DE SIGNALS ---

  // 1. Señal base de todos los posts
  private allPosts = toSignal(this.dataService.getBlogPosts(), {
    initialValue: [],
  });

  // 2. Señales para los filtros
  public searchTerm = signal('');
  public selectedTag = signal<string | null>(null);

  // 3. Señal computada para obtener todos los tags únicos
  public allTags = computed(() => {
    const tags = this.allPosts().flatMap((post) => post.tags);
    return [...new Set(tags)]; // Devuelve un array de tags únicos
  });

  // 4. Señal computada para los posts filtrados
  private filteredPosts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const tag = this.selectedTag();

    // Obtener claves de traducción para la búsqueda
    const titleKeys = this.allPosts().map((p) => `BLOG.${p.key}_TITLE`);
    const excerptKeys = this.allPosts().map((p) => `BLOG.${p.key}_EXCERPT`);
    const translations = this.translate.instant([...titleKeys, ...excerptKeys]);

    return this.allPosts().filter((post) => {
      // Búsqueda por Tag
      const tagMatch = !tag || post.tags.includes(tag);

      // Búsqueda por Término
      const title = translations[`BLOG.${post.key}_TITLE`]?.toLowerCase() || '';
      const excerpt = translations[`BLOG.${post.key}_EXCERPT`]?.toLowerCase() || '';
      const termMatch =
        term === '' || title.includes(term) || excerpt.includes(term);

      return tagMatch && termMatch;
    });
  });

  // 5. Señal computada para el artículo destacado (el primero que esté marcado y filtrado)
  public featuredPost = computed(() =>
    this.filteredPosts().find((p) => p.featured),
  );

  // 6. Señal computada para los posts regulares (todos menos el destacado)
  public regularPosts = computed(() => {
    const featured = this.featuredPost();
    if (featured) {
      return this.filteredPosts().filter((p) => p.slug !== featured.slug);
    }
    return this.filteredPosts(); // Si no hay destacado, mostrar todos
  });

  // --- FIN NUEVA LÓGICA ---

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  // --- MÉTODOS PARA ACTUALIZAR FILTROS ---

  /**
   * Actualiza el tag seleccionado.
   * Si se hace clic en el tag ya activo, se deselecciona.
   */
  selectTag(tag: string | null): void {
    if (this.selectedTag() === tag) {
      this.selectedTag.set(null); // Deseleccionar
    } else {
      this.selectedTag.set(tag); // Seleccionar nuevo tag
    }
  }

  /**
   * Actualiza el término de búsqueda desde el input.
   */
  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
  }
}