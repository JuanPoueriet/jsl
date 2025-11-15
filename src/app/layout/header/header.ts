import { CommonModule, isPlatformBrowser } from '@angular/common'; // <-- Importar isPlatformBrowser
import {
  Component,
  HostListener,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core'; // <-- Importar Inject, PLATFORM_ID, OnInit
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { TopBar } from '../top-bar/top-bar';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

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
  // <-- Implementar OnInit
  isMobileMenuOpen = false;
  public currentLang: string;
  public openDropdown: string | null = null;

  public isDesktop = false; // <-- 1. Añadir nueva propiedad pública
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object // <-- 2. Inyectar PLATFORM_ID
  ) {
    this.currentLang = this.translate.getCurrentLang() || this.translate.defaultLang || 'es';
    this.isBrowser = isPlatformBrowser(this.platformId); // <-- 3. Definir isBrowser

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit() {
    // <-- 4. Añadir ngOnInit
    if (this.isBrowser) {
      this.updateDesktopStatus(); // Comprobar al cargar
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeDropdowns();
    }
  }

  @HostListener('window:resize', []) // <-- 5. Añadir listener de resize
  onWindowResize() {
    if (this.isBrowser) {
      this.updateDesktopStatus();
    }
  }

  private updateDesktopStatus() {
    // <-- 6. Añadir método helper
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

  ifMobile() {
    return false;
  }
}