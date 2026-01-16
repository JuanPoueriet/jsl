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
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Card } from '@shared/components/card/card';
import { AnimateOnScroll } from '@shared/directives/animate-on-scroll';
import { DataService } from '@core/services/data.service';
import { SwiperOptions } from 'swiper/types';
import { toSignal } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements OnInit, AfterViewInit {
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

  public testimonials = toSignal(this.dataService.getTestimonials(), { initialValue: [] });
  public projects = toSignal(this.dataService.getProjects(), { initialValue: [] });
  public solutions = toSignal(this.dataService.getSolutions(), { initialValue: [] });
  public products = toSignal(this.dataService.getProducts(), { initialValue: [] });
  public processSteps = toSignal(this.dataService.getProcessSteps(), { initialValue: [] });

  private el = inject(ElementRef);

  @Inject(PLATFORM_ID) private platformId = inject(PLATFORM_ID);

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
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

      // 2. Testimonial Slider
      const testimonialSwiperEl = this.el.nativeElement.querySelector('.testimonial-slider swiper-container');
      
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
}