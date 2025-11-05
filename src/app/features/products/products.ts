import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// Importamos nuestro CardComponent reutilizable
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'jsl-products',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card // Lo añadimos a los imports
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {

  // Definimos la lista de nuestros productos propietarios
  products = [
    {
      key: 'ERP',
      icon: 'Database', // Ícono relevante para un ERP
      link: '/products/erp' // (Ruta futura para el detalle del producto)
    },
    {
      key: 'POS',
      icon: 'ShoppingCart', // Usaremos 'ShoppingCart', pero debemos añadirlo
      link: '/products/pos'
    },
    {
      key: 'MOBILE_APPS',
      icon: 'Smartphone',
      link: '/products/mobile-apps'
    }
  ];
}