import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { TopBar } from '../top-bar/top-bar';
// import { LanguageSwitcher } from '../language-switcher/language-switcher'; // <-- ELIMINADO

@Component({
  selector: 'jsl-header',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LucideAngularModule,
    // LanguageSwitcher, // <-- ELIMINADO
        TopBar,     // 5. Añadir TopBar
    
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMobileMenuOpen = false;
  
  public currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.getCurrentLang() || this.translate.defaultLang || 'es';
    
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}