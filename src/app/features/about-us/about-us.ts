import { Component, OnInit, Inject } from '@angular/core'; // 1. Añadir OnInit, Inject
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService, TeamMember } from '../../core/services/data.service'; // 2. Importar Servicio
import { Observable } from 'rxjs'; // 3. Importar Observable
import { CtaComponent } from '../../shared/components/cta/cta'; // 4. Importar CTA

@Component({
  selector: 'jsl-about-us',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    AnimateOnScroll,
    CtaComponent // 5. Añadir CTA a imports
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs implements OnInit { // 6. Implementar OnInit
  
  public teamMembers$!: Observable<TeamMember[]>; // 7. Usar Observable

  // Contenido de Misión, Visión, Valores (puede quedar estático)
  coreValues = [
    { key: 'MISSION', icon: 'Target' },
    { key: 'VISION', icon: 'Eye' },
    { key: 'VALUES', icon: 'Gem' }
  ];

  constructor(private dataService: DataService) {} // 8. Inyectar Servicio

  ngOnInit() {
    this.teamMembers$ = this.dataService.getTeamMembers(); // 9. Cargar datos
  }
}