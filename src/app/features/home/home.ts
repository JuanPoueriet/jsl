import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Inject } from '@angular/core'; // 1. Importar Inject
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 2. Importar TranslateService
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';

// Importar y registrar Swiper correctamente
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

// Registrar los elementos de Swiper
register();

@Component({
  selector: 'jsl-home',
  standalone: true,
  imports: [
    CommonModule,
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

  public swiperConfig: SwiperOptions = {
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

  // 3. Propiedad para el idioma actual
  public currentLang: string;

  // Datos para la sección de soluciones destacadas
  solutions = [
    {
      key: 'WEB',
      icon: 'Monitor',
    },
    {
      key: 'MOBILE',
      icon: 'Smartphone',
    },
    {
      key: 'DESKTOP',
      icon: 'Server',
    },
    {
      key: 'CLOUD',
      icon: 'Cloud',
    }
  ];

  // Datos para la sección de productos destacadps
  products = [
    {
      key: 'ERP',
      icon: 'Database',
    },
    {
      key: 'POS',
      icon: 'ShoppingCart',
    },
    {
      key: 'MOBILE_APPS',
      icon: 'Smartphone',
    }
  ];

  // Datos para la sección de proyectos destacados
  projects = [
    {
      key: 'CASE_ERP',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-577380e25f2b?fit=crop&w=600&q=80',
    },
    {
      key: 'CASE_ECOMMERCE',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?fit=crop&w=600&q=80',
    },
    {
      key: 'CASE_MOBILE_APP',
      imageUrl: 'https://images.unsplash.com/photo-1607936834114-0a300c3f0b24?fit=crop&w=600&q=80',
    }
  ];

  // Datos para la sección de proceso
  processSteps = [
    {
      key: 'STEP1',
      icon: 'Compass'
    },
    {
      key: 'STEP2',
      icon: 'Code'
    },
    {
      key: 'STEP3',
      icon: 'Server'
    },
    {
      key: 'STEP4',
      icon: 'TrendingUp'
    }
  ];

  // 4. Inyectar TranslateService
  constructor(
    @Inject(TranslateService) private translate: TranslateService
  ) {
    // 5. Inicializar el idioma actual
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    // 6. Escuchar cambios de idioma
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
}