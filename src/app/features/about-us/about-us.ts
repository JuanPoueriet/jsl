import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'jsl-about-us',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule // Asegurarse de importar
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs {
  // Contenido de Misión, Visión, Valores
  coreValues = [
    {
      key: 'MISSION',
      icon: 'Target'
    },
    {
      key: 'VISION',
      icon: 'Eye'
    },
    {
      key: 'VALUES',
      icon: 'Gem'
    }
  ];
}