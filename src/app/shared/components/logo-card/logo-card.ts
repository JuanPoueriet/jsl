// src/app/shared/components/logo-card/logo-card.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // 1. Importar NgOptimizedImage
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'jsl-logo-card',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    NgOptimizedImage // 2. Añadir a imports
  ],
  templateUrl: './logo-card.html',
  styleUrl: './logo-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // 3. Añadir OnPush
})
export class LogoCard {
  // Recibirá la URL del logo y el nombre
  @Input() imageUrl: string = '';
  @Input() name: string = 'Technology Logo';
  
  // Opcional: clave de traducción si el nombre viene de i18n
  @Input() nameKey: string | null = null;
}