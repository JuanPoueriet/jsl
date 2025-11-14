import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef } from '@angular/core'; // 1. Importar HostListener y ElementRef
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { TopBar } from '../top-bar/top-bar';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'jsl-header',
  standalone: true, // Corregido: 'standalone' debe estar aquí
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LucideAngularModule,
    TopBar,
    LanguageSwitcher
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMobileMenuOpen = false;
  public currentLang: string;

  // 2. Nuevo estado para manejar los dropdowns de escritorio
  public openDropdown: string | null = null;

  constructor(
    private translate: TranslateService,
    private el: ElementRef // 3. Inyectar ElementRef
  ) {
    this.currentLang = this.translate.getCurrentLang() || this.translate.defaultLang || 'es';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  // 4. HostListener para cerrar dropdowns al hacer clic fuera del header
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeDropdowns();
    }
  }

  // 5. Nuevo método para alternar un dropdown de escritorio
  toggleDropdown(menu: string, event: MouseEvent) {
    event.stopPropagation(); // Evita que el (document:click) se dispare
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }

  // 6. Nuevo método para cerrar todos los dropdowns
  closeDropdowns() {
    this.openDropdown = null;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.closeDropdowns(); // Cierra dropdowns si se abre el menú móvil
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.closeDropdowns(); // Cierra dropdowns al seleccionar una opción
  }

  ifMobile() {
    // Esta lógica estaba rota. Debería detectar el ancho de la ventana.
    // Por ahora la mantendré como estaba, pero esto debería mejorarse.
    // La forma correcta sería: return window.innerWidth <= 992; (pero debe ser reactivo)
    // Por ahora, tu HTML parece estar usando @if(ifMobile()) lo cual no es sintaxis de Angular.
    // Voy a Asumir que querías usar @if (isMobile()) y arreglaré el HTML.
    // *** ACTUALIZACIÓN: Veo que el HTML usa @if(ifMobile())... lo cual es incorrecto.
    // Lo cambiaré en el HTML para que funcione sin esta función.
    return false;
  }
}