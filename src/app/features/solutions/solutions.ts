import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// Importamos nuestro CardComponent reutilizable
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';

@Component({
  selector: 'jsl-solutions',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card, // Lo añadimos a los imports
    AnimateOnScroll
  ],
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss'
})
export class Solutions {

  // Definimos la lista de nuestras soluciones a medida
  solutions = [
    {
      key: 'WEB',
      icon: 'Monitor', // Nombre del ícono de Lucide
      link: '/solutions/web' // (Ruta futura para el detalle)
    },
    {
      key: 'MOBILE',
      icon: 'Smartphone',
      link: '/solutions/mobile'
    },
    {
      key: 'DESKTOP',
      icon: 'Server', // O 'Monitor' también funciona
      link: '/solutions/desktop'
    },
    {
      key: 'CLOUD',
      icon: 'Cloud',
      link: '/solutions/cloud'
    }
  ];
}