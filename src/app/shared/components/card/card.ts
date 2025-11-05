import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'jsl-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, TranslateModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() icon: string | null = 'Settings';
  @Input() imageUrl: string | null = null;
  @Input() title: string = 'Card Title';
  @Input() description: string = 'Card description goes here.';
  
  // --- AQUI ESTA EL CAMBIO ---
  // Debe poder aceptar un array para el binding de [routerLink]
  @Input() link: any[] | string | null = null; 
}