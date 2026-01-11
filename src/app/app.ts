import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Seo } from './core/services/seo';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble';
import { SUPPORTED_LANGUAGES } from '@core/constants/languages';

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
export class App {
  title = 'jsl-technology-web';
  isScrolled = false;
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    private seo: Seo,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService,
  ) {
    this.seo.init();
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.addLangs(SUPPORTED_LANGUAGES);

    if (this.isBrowser) {
      this.initializeLanguage();
      // Ejecutar al cargar la página
      this.updateScrollAndResize();
    }
  }

  private initializeLanguage(): void {
    const langCookie = this.cookieService.get('lang');
    if (langCookie && this.translate.getLangs().includes(langCookie)) {
      this.translate.use(langCookie);
      return;
    }

    const browserLang = this.translate.getBrowserLang();
    const supportedLangs = this.translate.getLangs();
    const finalLang =
      browserLang && supportedLangs.includes(browserLang)
        ? browserLang
        : 'en';

    this.cookieService.set('lang', finalLang, { expires: 365, path: '/' });
    this.translate.use(finalLang);
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