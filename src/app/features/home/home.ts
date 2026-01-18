import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  Renderer2,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage, DOCUMENT } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Card } from '@shared/components/card/card';
import { AnimateOnScroll } from '@shared/directives/animate-on-scroll';
import { DataService, Technology } from '@core/services/data.service';
import { ToastService } from '@core/services/toast.service';
import { SwiperOptions } from 'swiper/types';
import { toSignal } from '@angular/core/rxjs-interop';
import { DigitalMaturitySelector } from './components/digital-maturity-selector/digital-maturity-selector';
import { VideoModal } from '@shared/components/video-modal/video-modal';
import { BookingModal } from '@shared/components/booking-modal/booking-modal';
import { computed } from '@angular/core';

// Swiper Web Components
import { Pagination, Autoplay, EffectCoverflow, EffectFade, Navigation } from 'swiper/modules';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'jsl-home',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    TranslateModule,
    LucideAngularModule,
    RouterLink,
    Card,
    AnimateOnScroll,
    DigitalMaturitySelector,
    VideoModal,
    BookingModal
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  public heroSwiperConfig: SwiperOptions = {
    modules: [EffectFade, Autoplay, Pagination, Navigation],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 800,
    grabCursor: true,
    // ← CRÍTICO: Configuración de navegación CORRECTA
    navigation: {
      nextEl: '.hero-swiper-button-next',
      prevEl: '.hero-swiper-button-prev',
    },
  };

  public logoSwiperConfig: SwiperOptions = {
    modules: [Autoplay],
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    speed: 3000, // Velocidad constante para efecto marquee
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    allowTouchMove: false, // Deshabilitar interacción manual para marquee puro
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 60,
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 70,
      },
    },
  };

  public testimonialSwiperConfig: SwiperOptions = {
    modules: [Pagination, Autoplay, EffectCoverflow],
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    spaceBetween: 30,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
  };

  public currentLang: string;

  private translate = inject(TranslateService);
  private dataService = inject(DataService);
  private toastService = inject(ToastService);

  public stats = [
    { valueKey: 'HOME.STATS_PROJECTS', icon: 'CheckCircle' },
    { valueKey: 'HOME.STATS_UPTIME', icon: 'Server' },
    { valueKey: 'HOME.STATS_COSTS', icon: 'TrendingDown' },
    { valueKey: 'HOME.STATS_SUPPORT', icon: 'Headphones' },
  ];

  public teamMembers = [
    { nameKey: 'ABOUT.TEAM_MEMBER_1_NAME', roleKey: 'ABOUT.TEAM_MEMBER_1_ROLE', image: 'assets/imgs/Avif/img-1.avif' },
    { nameKey: 'ABOUT.TEAM_MEMBER_2_NAME', roleKey: 'ABOUT.TEAM_MEMBER_2_ROLE', image: 'assets/imgs/Avif/img-2.avif' },
    { nameKey: 'ABOUT.TEAM_MEMBER_3_NAME', roleKey: 'ABOUT.TEAM_MEMBER_3_ROLE', image: 'assets/imgs/Avif/photo-1517694712202-14dd9538aa97.avif' },
  ];

  public faqPreview = [
    { titleKey: 'FAQ.Q1_TITLE', descKey: 'FAQ.Q1_DESC', isOpen: false },
    { titleKey: 'FAQ.Q2_TITLE', descKey: 'FAQ.Q2_DESC', isOpen: false },
    { titleKey: 'FAQ.Q3_TITLE', descKey: 'FAQ.Q3_DESC', isOpen: false },
  ];

  public testimonials = toSignal(this.dataService.getTestimonials(), { initialValue: [] });
  public projects = toSignal(this.dataService.getProjects(), { initialValue: [] });

  // New filtering logic for projects
  public selectedProjectCategory = signal<string>('All');
  public projectCategories = ['All', 'Enterprise', 'Commerce', 'Mobile']; // Could be dynamic

  public filteredProjects = computed(() => {
    const allProjects = this.projects();
    const category = this.selectedProjectCategory();

    if (category === 'All') {
      return allProjects;
    }
    return allProjects.filter((p: any) => p.category === category);
  });

  public solutions = toSignal(this.dataService.getSolutions(), { initialValue: [] });
  public products = toSignal(this.dataService.getProducts(), { initialValue: [] });
  public processSteps = toSignal(this.dataService.getProcessSteps(), { initialValue: [] });

  // Modal signals
  public isVideoModalOpen = signal(false);
  public isBookingModalOpen = signal(false);
  // Default video
  public demoVideoUrl = 'https://www.youtube.com/embed/LXb3EKWsInQ'; // Tech demo placeholder

  public techStack = toSignal(
    this.dataService.getTechStack().pipe(
      map((categories) => {
        const allTechs: Technology[] = [];
        const seen = new Set<string>();
        categories.forEach((cat) => {
          cat.technologies.forEach((tech) => {
            if (!seen.has(tech.name)) {
              allTechs.push(tech);
              seen.add(tech.name);
            }
          });
        });
        return allTechs;
      })
    ),
    { initialValue: [] }
  );

  public latestBlogPosts = toSignal(
    this.dataService.getBlogPosts().pipe(map((posts) => posts.slice(0, 3))),
    { initialValue: [] }
  );

  public activeTab = signal<'services' | 'products'>('services');

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private schemaScript: any; // HTMLScriptElement

  @Inject(PLATFORM_ID) private platformId = inject(PLATFORM_ID);

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      // Re-generate schema on lang change if needed, but for now simple init
    });
    this.addSchemaData();
  }

  ngOnDestroy() {
    if (this.schemaScript) {
      this.renderer.removeChild(this.document.head, this.schemaScript);
    }
  }

  setActiveTab(tab: 'services' | 'products') {
    this.activeTab.set(tab);
  }

  private addSchemaData() {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          'name': 'JSL Technology',
          'url': 'https://jsl.technology',
          'logo': 'https://jsl.technology/assets/logo.png',
          'sameAs': [
            'https://www.linkedin.com/company/jsl-technology',
            'https://twitter.com/jsl_tech'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+1-809-555-5555',
            'contactType': 'customer service',
            'areaServed': 'Global',
            'availableLanguage': ['Spanish', 'English']
          }
        },
        {
          '@type': 'Service',
          'serviceType': 'Software Development',
          'provider': {
            '@type': 'Organization',
            'name': 'JSL Technology'
          },
          'areaServed': {
            '@type': 'Place',
            'name': 'Global'
          },
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Software Solutions',
            'itemListElement': [
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Web Development'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Mobile App Development'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'ERP Implementation'
                }
              }
            ]
          }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': this.faqPreview.map(faq => ({
            '@type': 'Question',
            'name': this.translate.instant(faq.titleKey),
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': this.translate.instant(faq.descKey)
            }
          }))
        }
      ]
    };

    this.schemaScript = this.renderer.createElement('script');
    this.schemaScript.type = 'application/ld+json';
    this.schemaScript.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, this.schemaScript);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      // 1. Hero Slider
      const heroSwiperEl = this.el.nativeElement.querySelector('.hero-slider swiper-container');
      
      if (heroSwiperEl) {
        // ← CRÍTICO: Configuración SIMPLIFICADA y DIRECTA
        Object.assign(heroSwiperEl, {
          modules: [EffectFade, Autoplay, Pagination, Navigation],
          effect: 'fade',
          fadeEffect: { crossFade: true },
          pagination: { 
            clickable: true,
            dynamicBullets: true 
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          loop: true,
          speed: 800,
          grabCursor: true,
          // ← CRÍTICO: Navegación correctamente configurada
          navigation: {
            nextEl: '.hero-swiper-button-next',
            prevEl: '.hero-swiper-button-prev',
            disabledClass: 'swiper-button-disabled',
          },
        });

        // Inicializar
        heroSwiperEl.initialize();
        
        // ← CRÍTICO: Forzar la visibilidad de los botones después de inicializar
        setTimeout(() => {
          // Asegurar que los botones estén visibles
          const prevBtn = this.el.nativeElement.querySelector('.hero-swiper-button-prev');
          const nextBtn = this.el.nativeElement.querySelector('.hero-swiper-button-next');
          
          if (prevBtn) {
            prevBtn.style.opacity = '0.4';
            prevBtn.style.visibility = 'visible';
          }
          if (nextBtn) {
            nextBtn.style.opacity = '0.4';
            nextBtn.style.visibility = 'visible';
          }
          
          // Iniciar autoplay
          if (heroSwiperEl.swiper && heroSwiperEl.swiper.autoplay) {
            heroSwiperEl.swiper.autoplay.start();
          }
        }, 100);
      }

      // 2. Logo Slider (Tech Stack)
      const logoSwiperEl = this.el.nativeElement.querySelector('.tech-stack-slider swiper-container');

      if (logoSwiperEl) {
        Object.assign(logoSwiperEl, {
          modules: [Autoplay],
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          speed: 3000,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
          allowTouchMove: false,
          breakpoints: {
            640: { slidesPerView: 3, spaceBetween: 40 },
            768: { slidesPerView: 4, spaceBetween: 50 },
            1024: { slidesPerView: 5, spaceBetween: 60 },
            1280: { slidesPerView: 6, spaceBetween: 70 },
          },
        });

        logoSwiperEl.initialize();

        setTimeout(() => {
          if (logoSwiperEl.swiper && logoSwiperEl.swiper.autoplay) {
            logoSwiperEl.swiper.autoplay.start();
          }
        }, 100);
      }

      // 3. Testimonial Slider
      const testimonialSwiperEl = this.el.nativeElement.querySelector(
        '.testimonial-slider swiper-container'
      );

      if (testimonialSwiperEl) {
        Object.assign(testimonialSwiperEl, {
          modules: [Pagination, Autoplay, EffectCoverflow],
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
          spaceBetween: 30,
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          loop: true,
          autoplay: {
            delay: 7000,
            disableOnInteraction: false,
          },
          pagination: {
            clickable: true,
          },
        });

        testimonialSwiperEl.initialize();

        setTimeout(() => {
          if (testimonialSwiperEl.swiper && testimonialSwiperEl.swiper.autoplay) {
            testimonialSwiperEl.swiper.autoplay.start();
          }
        }, 500);
      }

      // ← NUEVO: Agregar event listeners manuales como fallback
      this.setupCustomNavigation();
    }, 100); // Aumentado a 100ms para asegurar que el DOM esté listo
  }

  // ← NUEVO: Método para configurar navegación manual como fallback
  private setupCustomNavigation(): void {
    const prevButton = this.el.nativeElement.querySelector('.hero-swiper-button-prev');
    const nextButton = this.el.nativeElement.querySelector('.hero-swiper-button-next');
    const heroSwiperEl = this.el.nativeElement.querySelector('.hero-slider swiper-container');
    
    if (prevButton && heroSwiperEl) {
      prevButton.addEventListener('click', () => {
        if (heroSwiperEl.swiper) {
          heroSwiperEl.swiper.slidePrev();
          // Reiniciar autoplay
          if (heroSwiperEl.swiper.autoplay) {
            heroSwiperEl.swiper.autoplay.start();
          }
        }
      });
    }
    
    if (nextButton && heroSwiperEl) {
      nextButton.addEventListener('click', () => {
        if (heroSwiperEl.swiper) {
          heroSwiperEl.swiper.slideNext();
          // Reiniciar autoplay
          if (heroSwiperEl.swiper.autoplay) {
            heroSwiperEl.swiper.autoplay.start();
          }
        }
      });
    }
    
    // ← NUEVO: Asegurar que los botones sean visibles
    if (prevButton) {
      prevButton.style.opacity = '0.4';
      prevButton.style.visibility = 'visible';
    }
    if (nextButton) {
      nextButton.style.opacity = '0.4';
      nextButton.style.visibility = 'visible';
    }
  }

  getStars(count: number): any[] {
    return new Array(count);
  }

  toggleFaq(index: number) {
    this.faqPreview[index].isOpen = !this.faqPreview[index].isOpen;
  }

  openVideoModal() {
    this.isVideoModalOpen.set(true);
  }

  closeVideoModal() {
    this.isVideoModalOpen.set(false);
  }

  openBookingModal() {
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal() {
    this.isBookingModalOpen.set(false);
  }

  setProjectCategory(category: string) {
    this.selectedProjectCategory.set(category);
  }

  downloadLeadMagnet() {
    // Simular descarga
    this.toastService.show(
      'Descarga iniciada... El Whitepaper se ha enviado a tu correo electrónico.',
      'success',
      5000
    );
  }
}