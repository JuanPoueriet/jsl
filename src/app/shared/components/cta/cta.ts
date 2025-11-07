// src/app/shared/components/cta/cta.ts
import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { AnimateOnScroll } from '../../directives/animate-on-scroll';

@Component({
  selector: 'jsl-cta-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    LucideAngularModule,
    AnimateOnScroll
  ],
  templateUrl: './cta.html',
  styleUrl: './cta.scss'
})
export class CtaComponent {
  // Entradas para hacerlo reutilizable
  @Input() eyebrowKey: string = 'HOME.CTA_EYEBROW';
  @Input() titleKey: string = 'HOME.CTA_TITLE';
  @Input() subtitleKey: string = 'HOME.CTA_SUBTITLE';
  @Input() ctaTextKey: string = 'HOME.CTA_BUTTON';
  @Input() ctaLink: string[] = ['/', 'es', 'contact']; // Valor por defecto

  public currentLang: string;

  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      // Actualizar el enlace con el idioma correcto
      this.ctaLink[1] = this.currentLang;
    });
    // Actualizar el enlace inicial
    this.ctaLink[1] = this.currentLang;
  }
}