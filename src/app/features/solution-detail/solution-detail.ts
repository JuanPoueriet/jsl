// src/app/features/solution-detail/solution-detail.ts
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // --- CAMBIO: Location se eliminará ---
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService, Solution } from '../../core/services/data.service'; // Usar DataService
import { Title } from '@angular/platform-browser';
import { CtaComponent } from '../../shared/components/cta/cta'; // --- CAMBIO: Importar CTA ---

@Component({
  selector: 'jsl-solution-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    CtaComponent // --- CAMBIO: Añadir CTA ---
  ],
  templateUrl: './solution-detail.html'
})
export class SolutionDetail implements OnInit, OnDestroy {
  
  public currentLang: string = 'es';
  public solution$: Observable<Solution | undefined> | undefined;
  
  private langSub: Subscription | undefined;
  private solutionData: Solution | undefined; // Para guardar el dato

  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private route: ActivatedRoute,
    private dataService: DataService, // Inyectar DataService
    private titleService: Title
    // --- CAMBIO: 'Location' eliminado del constructor ---
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit(): void {
    // Escuchar cambios de idioma
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.updateTitle(); // Actualizar título si cambia el idioma
    });

    // Escuchar cambios de ruta (slug)
    this.solution$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.dataService.getSolutionBySlug(slug);
        }
        return of(undefined);
      })
    );
    
    // Suscribirse para actualizar el título
    this.solution$.subscribe(solution => {
      this.solutionData = solution;
      this.updateTitle();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  /**
   * Actualiza el título de la página.
   */
  private updateTitle(): void {
    if (this.solutionData) {
      const titleKey = `SOLUTIONS.${this.solutionData.key}_TITLE`;
      this.translate.get(titleKey).subscribe(translatedTitle => {
        this.titleService.setTitle(`${translatedTitle} | JSL Technology`);
      });
    }
  }

  // --- CAMBIO: Método 'goBack()' eliminado ---
}