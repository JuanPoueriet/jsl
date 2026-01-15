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

  // Propiedades para el gesto de deslizamiento
  private isDragging = false;
  private startX = 0;
  private currentX = 0;
  private translateX = 0;
  private menuWidth = 0; // Se calculará dinámicamente

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
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
    this.closeDropdowns();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    const menuElement = this.el.nativeElement.querySelector('.header__nav-links-mobile');
    if (menuElement) {
      menuElement.style.transition = 'transform 0.3s ease'; // Asegurar que la transición esté activa
      menuElement.style.transform = 'translateX(-100%)';
    }
    document.body.classList.remove('no-scroll'); // Restaurar scroll del body
    this.closeDropdowns();
  }

  // --- Inicio: Lógica del Navigation Drawer ---

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.isBrowser || this.isDesktop) return;

    const touch = event.touches[0];
    const startX = touch.clientX;

    // Abrir: El gesto debe empezar en el borde izquierdo
    if (!this.isMobileMenuOpen && startX < 20) {
      this.isDragging = true;
      this.startX = startX;
      this.currentX = startX;

      // Obtener el ancho del menú al iniciar el gesto
      const menuElement = this.el.nativeElement.querySelector('.header__nav-links-mobile');
      if (menuElement) {
        this.menuWidth = menuElement.offsetWidth;
        menuElement.style.transition = 'none'; // Desactivar transición durante el arrastre
      }
    }

    // Cerrar: El gesto debe empezar sobre el menú abierto
    if (this.isMobileMenuOpen && startX < this.menuWidth) {
      this.isDragging = true;
      this.startX = startX;
      this.currentX = startX;
      this.translateX = 0; // El menú empieza en su posición abierta (translateX = 0)

      const menuElement = this.el.nativeElement.querySelector('.header__nav-links-mobile');
      if (menuElement) {
        this.menuWidth = menuElement.offsetWidth;
        menuElement.style.transition = 'none'; // Desactivar transición
      }
    }
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || !this.isBrowser) return;

    this.currentX = event.touches[0].clientX;
    const diffX = this.currentX - this.startX;

    // Prevenir el gesto de "atrás" del navegador
    event.preventDefault();

    const menuElement = this.el.nativeElement.querySelector('.header__nav-links-mobile');
    if (!menuElement) return;

    if (this.isMobileMenuOpen) {
      // Caso: Cerrando el menú
      // El movimiento es hacia la izquierda (negativo), pero no puede ir más allá de 0
      this.translateX = Math.min(0, diffX);
      if (this.translateX < -this.menuWidth) {
        this.translateX = -this.menuWidth; // No arrastrar más allá del límite
      }
    } else {
      // Caso: Abriendo el menú
      // El movimiento es hacia la derecha (positivo)
      this.translateX = Math.max(-this.menuWidth, Math.min(0, -this.menuWidth + diffX));
      if (this.translateX > 0) {
        this.translateX = 0; // No arrastrar más allá del límite
      }
    }
    // Aplicar la transformación directamente
    menuElement.style.transform = `translateX(${this.translateX}px)`;
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging || !this.isBrowser) return;

    this.isDragging = false;
    const diffX = this.currentX - this.startX;
    const threshold = this.menuWidth * 0.4; // Umbral del 40%

    const menuElement = this.el.nativeElement.querySelector('.header__nav-links-mobile');
    if (!menuElement) return;

    menuElement.style.transition = 'transform 0.3s ease'; // Reactivar transición

    if (this.isMobileMenuOpen) {
      // Lógica para cerrar
      if (diffX < -threshold) {
        this.closeMobileMenu();
      } else {
        // No se alcanzó el umbral, volver a abrir
        menuElement.style.transform = 'translateX(0)';
      }
    } else {
      // Lógica para abrir
      if (diffX > threshold) {
        this.openMobileMenu();
      } else {
        // No se alcanzó el umbral, volver a cerrar
        menuElement.style.transform = `translateX(-100%)`;
      }
    }
  }

  private openMobileMenu() {
    this.isMobileMenuOpen = true;
    const menuElement = this.el.nativeElement.querySelector('.header__nav-links-mobile');
    if (menuElement) {
      menuElement.style.transition = 'transform 0.3s ease';
      menuElement.style.transform = 'translateX(0)';
    }
    document.body.classList.add('no-scroll'); // Evitar scroll del body
  }
}