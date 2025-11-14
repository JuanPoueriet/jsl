import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Inject } from '@angular/core';
// --- CAMBIO: Añadir NgOptimizedImage ---
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';

// --- CAMBIO: Imports estáticos eliminados (ya se usa DataService) ---
// import { PROJECTS, TESTIMONIALS } from '../../core/data/mock-data';

// Importar y registrar Swiper correctamente
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { EffectFade, Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'; // Añadir EffectCoverflow
import { Observable } from 'rxjs';
import { Testimonial, Project, Solution, Product, ProcessStep, DataService } from '../../core/services/data.service';

// Registrar los elementos de Swiper
register();

@Component({
  selector: 'jsl-home',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage, // <-- AÑADIDO
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

  // Configuración del Swiper del Hero
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

  // --- INICIO DE LA MODIFICACIÓN ---
  // --- Configuración del Swiper de Testimonios ---
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
    spaceBetween: 30, // <-- AÑADIDO: Esto añade separación entre tarjetas
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto', // Clave para que funcione bien en responsive
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    // --- ELIMINADOS Breakpoints: 'auto' + 'spaceBetween' es una mejor combinación ---
  };
  // --- FIN DE LA MODIFICACIÓN ---

  public currentLang: string;

  // 4. Cambiar los arrays estáticos por Observables
  public testimonials$!: Observable<Testimonial[]>;
  public projects$!: Observable<Project[]>;
  public solutions$!: Observable<Solution[]>;
  public products$!: Observable<Product[]>;
  public processSteps$!: Observable<ProcessStep[]>;

  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private dataService: DataService // 5. Inyectar DataService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    // 6. Cargar todos los datos desde el servicio
    this.loadData();
  }

  private loadData(): void {
    this.testimonials$ = this.dataService.getTestimonials();
    this.projects$ = this.dataService.getProjects();
    this.solutions$ = this.dataService.getSolutions();
    this.products$ = this.dataService.getProducts();
    this.processSteps$ = this.dataService.getProcessSteps();
  }

  getStars(count: number): any[] {
    return new Array(count);
  }
}