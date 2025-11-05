import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageSwitcher } from '../language-switcher/language-switcher'; // Importamos el selector de idioma

@Component({
  selector: 'jsl-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    LucideAngularModule,
    LanguageSwitcher // Lo añadimos aquí
  ],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBar {
  public currentLang: string;

  // Definimos los enlaces de la barra superior (sin iconos)
  topLinks = [
    { key: 'PORTFOLIO', route: 'projects' },
    { key: 'GET_QUOTE', route: 'contact' },
    { key: 'PRODUCTS', route: 'products' },
    { key: 'CONTACT', route: 'contact' }
  ];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
    
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
}