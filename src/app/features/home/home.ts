import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Card } from '@shared/components/card/card';
import { AnimateOnScroll } from '@shared/directives/animate-on-scroll';
import { DataService } from '@core/services/data.service';
import { SwiperOptions } from 'swiper/types';
// import { EffectFade, Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { toSignal } from '@angular/core/rxjs-interop';
// import { register } from 'swiper/element/bundle';

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
    modules: [EffectFade, Autoplay, Pagination],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
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
      const swiperEl = this.el.nativeElement.querySelector('swiper-container');

      if (swiperEl) {
        Object.assign(swiperEl, {
          modules: [Pagination, Autoplay, Navigation],
          // spaceBetween: 15,
          // slidesPerView: 1,
          // centeredSlides: true,
          grabCursor: true,

          loop: true, // ← Agrega esta línea para el bucle infinito
          // pagination: {
          //   clickable: true,
          //   dynamicBullets: true,
          // },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          navigation: true,

          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // },
          // breakpoints: {
          //   640: { slidesPerView: 1.5 },
          //   768: { slidesPerView: 2 },
          //   1024: { slidesPerView: 2.5 },
          //   1200: { slidesPerView: 3 },
          // },
        });

        swiperEl.initialize();
      }
    }, 0);
  }

  getStars(count: number): any[] {
    return new Array(count);
  }
}
