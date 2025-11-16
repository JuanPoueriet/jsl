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

// Prism
import * as Prism from 'prismjs';

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
          spaceBetween: 30,
          slidesPerView: 1.25,
          centeredSlides: true,
          grabCursor: true,
          pagination: {
            clickable: true,
            dynamicBullets: true,
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
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

  // Prism code highlighting
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId) && !this.highlighted) {
      const hasContent = this.el.nativeElement.querySelector('.blog-content p');
      if (hasContent) {
        setTimeout(() => {
          Prism.highlightAll();
          this.highlighted = true;
        }, 500);
      }
    }
  }

  ngOnInit(): void {
    this.langSub = this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.updateTitle();
    });

    this.post$.subscribe((post) => {
      this.postData = post;
      this.updateTitle();
    });

    // Initialize scroll progress
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onWindowScroll(), 100);
    }
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private updateTitle(): void {
    if (!this.postData) return;

    const titleKey = `BLOG.${this.postData.key}_TITLE`;

    this.translate.get(titleKey).subscribe((translatedTitle) => {
      this.titleService.setTitle(`${translatedTitle} | JSL Technology Blog`);
    });
  }

  trackBySlug(index: number, post: BlogPost): string {
    return post.slug;
  }
}