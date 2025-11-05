import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// Importamos nuestro Card reutilizable
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'jsl-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card // Lo añadimos a los imports
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

  // Definimos la lista de nuestros casos de éxito
 projects = [
    {
      key: 'CASE_ERP',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-577380e25f2b?fit=crop&w=600&q=80',
      link: '/projects' // Link a la misma página
    },
    {
      key: 'CASE_ECOMMERCE',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?fit=crop&w=600&q=80',
      link: '/projects' // Link a la misma página
    },
    {
      key: 'CASE_MOBILE_APP',
      imageUrl: 'https://images.unsplash.com/photo-1607936834114-0a300c3f0b24?fit=crop&w=600&q=80',
      link: '/projects' // Link a la misma página
    }
  ];
}