// blog-detail.ts
import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewChecked,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService, BlogPost, TeamMember } from '../../core/services/data.service';
import { Title } from '@angular/platform-browser';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { CtaComponent } from '../../shared/components/cta/cta';
import { Card } from '../../shared/components/card/card';
import { Seo } from '../../core/services/seo'; // <--- 1. IMPORTAR SEO SERVICE

// --- CORRECCIÓN: Se elimina la importación estática de PrismJS ---
// import * as Prism from 'prismjs';

// Swiper Web Components
import { Pagination, Autoplay } from 'swiper/modules';
import { register } from 'swiper/element/bundle';
register();

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogDetail
  implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit
{
  public translate = inject(TranslateService);
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private titleService = inject(Title);
  private el = inject(ElementRef);
  @Inject(PLATFORM_ID) private platformId = inject(PLATFORM_ID);
  private seoService = inject(Seo); // <--- 2. INYECTAR SEO SERVICE

  @ViewChild('copyTooltip') copyTooltip!: ElementRef;
  @ViewChild('bannerImage') bannerImage!: ElementRef;

  public currentLang: string = 'es';
  public post$: Observable<BlogPost | undefined>;
  public relatedPosts$: Observable<BlogPost[]>;
  public author$: Observable<TeamMember | undefined>;

  public scrollProgress: number = 0;
  private langSub: Subscription | undefined;
  private postData: BlogPost | undefined;
  private highlighted = false;

  constructor() {
    this.currentLang =
      this.translate.currentLang || this.translate.defaultLang || 'es';

    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.highlighted = false;
        this.scrollProgress = 0;
        const slug = params.get('slug');
        return slug ? this.dataService.getPostBySlug(slug) : of(undefined);
      })
    );

    this.relatedPosts$ = this.post$.pipe(
      switchMap((post) => {
        if (!post) return of([]);
        return this.dataService.getRelatedPosts(post.slug, post.tags || []);
      })
    );

    this.author$ = this.post$.pipe(
      switchMap((post) => {
        if (!post) return of(undefined);
        return this.dataService.getTeamMemberByKey(post.authorKey);
      })
    );
  }

  // Función para truncar texto (reemplaza el pipe truncate)
  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // Scroll progress calculation
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    this.scrollProgress = Math.min(100, Math.max(0, scrollPercent));
  }

  // Image load handler
  onImageLoad() {
    if (this.bannerImage?.nativeElement) {
      this.bannerImage.nativeElement.classList.add('loaded');
    }
  }

  // Copy link functionality
  copyLink() {
    if (!isPlatformBrowser(this.platformId)) return;

    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      const tooltip = this.copyTooltip?.nativeElement;
      if (tooltip) {
        const originalText = tooltip.textContent;
        tooltip.textContent = '¡Copiado!';
        
        setTimeout(() => {
          tooltip.textContent = originalText;
        }, 2000);
      }
    });
  }

  // Swiper initialization
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const swiperEl = this.el.nativeElement.querySelector('swiper-container');

      if (swiperEl) {
        Object.assign(swiperEl, {
          modules: [Pagination, Autoplay],
          spaceBetween: 15,
          slidesPerView: 1.4,
          centeredSlides: true,
          grabCursor: true,
          pagination: {
            clickable: true,
            dynamicBullets: true,
          },
          // autoplay: {
          //   delay: 5000,
          //   disableOnInteraction: false,
          // },
          breakpoints: {
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1200: { slidesPerView: 3 },
          },
        });

        swiperEl.initialize();
      }
    }, 0);
  }

  // --- INICIO: Corrección de warning PrismJS ---
  // Prism code highlighting
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId) && !this.highlighted) {
      const hasContent = this.el.nativeElement.querySelector('.blog-content p');
      if (hasContent) {
        // Usamos import() dinámico para cargar prismjs solo en el navegador
        // y evitar el warning de ESM (Módulo no ES).
        import('prismjs').then(Prism => {
          setTimeout(() => {
            // Se asume que Prism tiene un export 'default' o es un CJS
            const prismModule = (Prism as any).default || Prism;
            prismModule.highlightAll();
            this.highlighted = true;
          }, 500); // Mantenemos el timeout por si el contenido se renderiza tarde
        }).catch(err => console.error('Error loading PrismJS', err));
      }
    }
  }
  // --- FIN: Corrección de warning PrismJS ---

  ngOnInit(): void {
    this.langSub = this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.updateMetadata(); // <--- 3. CAMBIO
    });

    this.post$.subscribe((post) => {
      this.postData = post;
      this.updateMetadata(); // <--- 4. CAMBIO
    });

    // Initialize scroll progress
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onWindowScroll(), 100);
    }
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  // --- 5. CAMBIO: Renombrar y expandir esta función ---
  private updateMetadata(): void {
    if (!this.postData) return;

    // Claves para la traducción
    const titleKey = `BLOG.${this.postData.key}_TITLE`;
    const excerptKey = `BLOG.${this.postData.key}_EXCERPT`; // <-- Usaremos el excerpt como descripción

    // URLs
    const baseUrl = this.seoService.getBaseUrl();
    const postUrl = `${baseUrl}/${this.currentLang}/blog/${this.postData.slug}`;

    // --- INICIO: Corrección de URL de Imagen ---
    let imageUrl = this.postData.imageUrl;
    
    if (imageUrl && !imageUrl.startsWith('http')) {
      // Si la URL es relativa (p.ej., "../../../../assets/imgs/...")
      // buscamos la parte 'assets/' y la volvemos absoluta.
      const assetsIndex = imageUrl.indexOf('assets/');
      if (assetsIndex > -1) {
        const relativePath = imageUrl.substring(assetsIndex);
        imageUrl = `${baseUrl}/${relativePath}`;
      }
    }
    // --- FIN: Corrección de URL de Imagen ---


    // Traducir título y descripción
    this.translate.get([titleKey, excerptKey]).subscribe(translations => {
      const translatedTitle = translations[titleKey] || 'Artículo de JSL Technology';
      const translatedDesc = translations[excerptKey] || 'Lee este artículo en JSL Technology';

      // 1. Setear el <title> de la página (como antes)
      this.titleService.setTitle(`${translatedTitle} | JSL Technology Blog`);

      // 2. Setear la etiqueta canónica (importante para SEO)
      this.seoService.updateCanonicalTag(postUrl);

      // 3. Setear todas las etiquetas sociales (OG y Twitter)
      this.seoService.updateSocialTags(
        translatedTitle,
        translatedDesc,
        postUrl,
        imageUrl, // <-- Usar la imagen específica (y ahora absoluta)
        'article' // <-- Indicar que esto es un 'artículo'
      );
    });
  }

  trackBySlug(index: number, post: BlogPost): string {
    return post.slug;
  }
}