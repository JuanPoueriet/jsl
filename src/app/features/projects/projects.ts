import { Component, OnInit, Inject } from '@angular/core'; // Importar OnInit e Inject
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Importar TranslateService
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll'; // Importar
import { PROJECTS } from '../../core/data/mock-data'; // Importar datos

@Component({
  selector: 'jsl-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll // Añadir
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {

  public currentLang: string;
  
  // Cargar datos de proyectos desde el archivo mock
  projects = PROJECTS;

  constructor(
    @Inject(TranslateService) private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
}