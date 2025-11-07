// src/app/shared/components/logo-card/logo-card.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'jsl-logo-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './logo-card.html',
  styleUrl: './logo-card.scss'
})
export class LogoCard {
  // Recibirá la URL del logo y el nombre
  @Input() imageUrl: string = '';
  @Input() name: string = 'Technology Logo';
  
  // Opcional: clave de traducción si el nombre viene de i18n
  @Input() nameKey: string | null = null;
}