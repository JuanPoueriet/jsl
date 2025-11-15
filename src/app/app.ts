import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Seo } from './core/services/seo';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble';

@Component({
  selector: 'jsl-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    ChatBubbleComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  title = 'jsl-technology-web';
  isScrolled = false;
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    private seo: Seo,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.seo.init();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Ejecutar al cargar la página
      this.updateScrollAndResize();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Ejecutar al hacer scroll
    this.updateScrollAndResize();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    // Ejecutar al redimensionar la ventana
    this.updateScrollAndResize();
  }

  /**
   * Comprueba el estado del scroll y el tamaño de la ventana
   * para decidir si se aplica la clase 'is-scrolled'.
   */
  private updateScrollAndResize() {
    if (this.isBrowser) {
      const verticalOffset =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const isDesktop = window.innerWidth > 992; // El breakpoint de tu CSS

      if (isDesktop) {
        // Comportamiento para PC: aplicar clase solo al hacer scroll
        this.isScrolled = verticalOffset > 50;
      } else {
        // Comportamiento para Móvil: nunca aplicar la clase
        this.isScrolled = false;
      }
    }
  }
}