import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll'; // Importar
import { TEAM_MEMBERS } from '../../core/data/mock-data'; // Importar datos del equipo

@Component({
  selector: 'jsl-about-us',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    AnimateOnScroll // Añadir
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs {
  
  // Cargar datos del equipo desde el archivo mock
  teamMembers = TEAM_MEMBERS;

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