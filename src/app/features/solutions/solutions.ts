import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar para *ngIf y | async
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Importamos nuestro CardComponent reutilizable
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService, Solution } from '../../core/services/data.service'; // Importar el servicio y la interfaz
import { Observable } from 'rxjs'; // Importar Observable
import { CtaComponent } from '../../shared/components/cta/cta';

@Component({
  selector: 'jsl-solutions',
  standalone: true,
  imports: [
    CommonModule, // Añadir CommonModule
    TranslateModule,
    Card, // Lo añadimos a los imports
    AnimateOnScroll,
    CtaComponent,
  ],
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss',
})
export class Solutions implements OnInit {
  // Implementar OnInit

  public currentLang: string;
  public solutions$!: Observable<Solution[]>; // Usar un Observable para los datos

  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private dataService: DataService // Inyectar el DataService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    // Escuchar cambios de idioma
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    // Cargar los datos desde el DataService
    this.solutions$ = this.dataService.getSolutions();
  }
}
