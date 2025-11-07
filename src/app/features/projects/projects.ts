import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService, Project } from '../../core/services/data.service'; // 1. Importar Servicio
import { Observable } from 'rxjs'; // 2. Importar Observable
import { CtaComponent } from '../../shared/components/cta/cta'; // 3. Importar CTA

@Component({
  selector: 'jsl-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll,
    CtaComponent // 4. Añadir CTA
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {

  public currentLang: string;
  public projects$!: Observable<Project[]>; // 5. Usar Observable
  
  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private dataService: DataService // 6. Inyectar Servicio
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    this.projects$ = this.dataService.getProjects(); // 7. Cargar datos
  }
}