import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from '@app/layout/header/header';
import { Footer } from '@app/layout/footer/footer';
import { Seo } from '@core/services/seo';
import { ChatBubbleComponent } from '@shared/components/chat-bubble/chat-bubble';
import { CookieBannerComponent } from '@shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'jsl-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    ChatBubbleComponent,
    CookieBannerComponent
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
      this.updateScrollAndResize();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollAndResize();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateScrollAndResize();
  }

  private updateScrollAndResize() {
    if (this.isBrowser) {
      const verticalOffset =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const isDesktop = window.innerWidth > 992;

      if (isDesktop) {
        this.isScrolled = verticalOffset > 50;
      } else {
        this.isScrolled = false;
      }
    }
  }
}
