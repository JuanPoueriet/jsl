import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { TopBar } from '@app/layout/top-bar/top-bar';
import { LanguageSwitcher } from '@app/layout/language-switcher/language-switcher';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'jsl-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LucideAngularModule,
    TopBar,
    LanguageSwitcher,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isMobileMenuOpen = false;
  public currentLang: string;
  public openDropdown: string | null = null;
  public isDesktop = false;
  private isBrowser: boolean;
  public isDarkMode = false;

  constructor(
    private translate: TranslateService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeService: ThemeService
  ) {
    this.currentLang = this.translate.getCurrentLang() || this.translate.defaultLang || 'es';
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    this.themeService.darkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.updateDesktopStatus();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeDropdowns();
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (this.isBrowser) {
      this.updateDesktopStatus();
    }
  }

  private updateDesktopStatus() {
    this.isDesktop = window.innerWidth > 992;
  }

  toggleDropdown(menu: string, event: MouseEvent) {
    event.stopPropagation();
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }

  closeDropdowns() {
    this.openDropdown = null;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.closeDropdowns();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.closeDropdowns();
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
}
