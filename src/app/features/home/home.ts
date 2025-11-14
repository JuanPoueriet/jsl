import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { EffectFade, Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { DataService } from '../../core/services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home implements OnInit {

  public heroSwiperConfig: SwiperOptions = {
    modules: [EffectFade, Autoplay, Pagination],
    effect: 'fade',
    fadeEffect: {
      crossFade: true
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

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  getStars(count: number): any[] {
    return new Array(count);
  }
}