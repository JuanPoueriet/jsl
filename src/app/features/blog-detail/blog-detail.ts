import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA, // <-- 1. Importar
  AfterViewChecked, // <-- 2. Importar
  ElementRef, // <-- 3. Importar
  Inject, // <-- 4. Importar
  PLATFORM_ID, // <-- 5. Importar
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // <-- 6. Importar
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService, BlogPost, TeamMember } from '../../core/services/data.service'; // <-- 7. Importar TeamMember
import { Title } from '@angular/platform-browser';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { CtaComponent } from '../../shared/components/cta/cta';
import { Card } from '../../shared/components/card/card';

// --- 8. Importar PRISM y SWIPER ---
import * as Prism from 'prismjs';
import { SwiperOptions } from 'swiper/types';
import { Pagination, Autoplay } from 'swiper/modules';
import { register } from 'swiper/element/bundle';

register(); // <-- Registrar Swiper

@Component({
  selector: 'jsl-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    AnimateOnScroll,
    CtaComponent,
    Card,
  ],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss',
  encapsulation: ViewEncapsulation.None, // <-- 9. Para que los estilos de Prism apliquen
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // <-- 10. Para permitir <swiper-container>
})
export class BlogDetail implements OnInit, OnDestroy, AfterViewChecked { // <-- 11. Implementar AfterViewChecked
  
  // --- INYECCIÓN CON inject() ---
  public translate = inject(TranslateService);
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private titleService = inject(Title);
  private el = inject(ElementRef); // <-- 12. Inyectar ElementRef
  @Inject(PLATFORM_ID) private platformId = inject(PLATFORM_ID); // <-- 13. Inyectar PLATFORM_ID

  public currentLang: string = 'es';
  public post$: Observable<BlogPost | undefined>;
  public relatedPosts$: Observable<BlogPost[]>;
  public author$: Observable<TeamMember | undefined>; // <-- 14. Observable para el autor

  private langSub: Subscription | undefined;
  private postData: BlogPost | undefined;
  private highlighted = false; // <-- 15. Flag para evitar re-pintados

  // --- 16. Configuración del Slider ---
  public relatedPostsSliderConfig: SwiperOptions = {
    modules: [Pagination, Autoplay],
    spaceBetween: 30,
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  };

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';

    // Cargar el post actual basado en el slug de la ruta
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.highlighted = false; // <-- Resetear el flag de Prism al cambiar de ruta
        const slug = params.get('slug');
        if (slug) {
          return this.dataService.getPostBySlug(slug);
        }
        return of(undefined);
      }),
    );

    // Cargar posts relacionados basándose en el post actual
    this.relatedPosts$ = this.post$.pipe(
      switchMap((post) => {
        if (!post || !post.tags) {
          return of([]); // Devuelve array vacío si no hay post o tags
        }
        // Llama al nuevo método del servicio
        return this.dataService.getRelatedPosts(post.slug, post.tags);
      }),
    );

    // --- 17. Cargar datos del autor ---
    this.author$ = this.post$.pipe(
      switchMap((post) => {
        if (!post) {
          return of(undefined);
        }
        // Usar el nuevo método del servicio
        return this.dataService.getTeamMemberByKey(post.authorKey);
      }),
    );
  }

  // --- 18. Hook para ejecutar Prism.js ---
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId) && !this.highlighted) {
      // Usamos un querySelector para asegurar que el contenido existe
      const contentExists = this.el.nativeElement.querySelector('.blog-content p');
      if (contentExists) {
        Prism.highlightAll();
        this.highlighted = true;
      }
    }
  }

  ngOnInit(): void {
    // Escuchar cambios de idioma
    this.langSub = this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.updateTitle(); // Actualizar título si cambia el idioma
    });

    // Suscribirse al post$ para poder actualizar el título
    this.post$.subscribe((post) => {
      this.postData = post;
      this.updateTitle();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private updateTitle(): void {
    if (this.postData) {
      const titleKey = `BLOG.${this.postData.key}_TITLE`;
      this.translate.get(titleKey).subscribe((translatedTitle) => {
        this.titleService.setTitle(`${translatedTitle} | JSL Technology Blog`);
      });
    }
  }

  // --- 19. TrackBy para el slider ---
  trackBySlug(index: number, post: BlogPost): string {
    return post.slug;
  }
}