import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, Observable, of } from 'rxjs'; // 1. Importar Observable, of
import { switchMap } from 'rxjs/operators'; // 2. Importar switchMap
import { DataService, Project } from '../../core/services/data.service'; // 3. Importar Servicio
import { Title } from '@angular/platform-browser';
import { CtaComponent } from '../../shared/components/cta/cta'; // 4. Importar CTA

@Component({
  selector: 'jsl-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    CtaComponent // 5. Añadir CTA
  ],
  templateUrl: './project-detail.html',
  styleUrl: '../detail-page.scss'
})
export class ProjectDetail implements OnInit, OnDestroy {
  
  public currentLang: string = 'es';
  public project$: Observable<Project | undefined>; // 6. Usar Observable
  
  private langSub: Subscription | undefined;
  private projectData: Project | undefined; // Para guardar el dato para el título

  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private route: ActivatedRoute,
    private dataService: DataService, // 7. Inyectar Servicio
    private titleService: Title,
    private location: Location
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';

    // 8. Cargar datos en el constructor
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.dataService.getProjectBySlug(slug); // Usar servicio
        }
        return of(undefined);
      })
    );
  }

  ngOnInit(): void {
    // Escuchar cambios de idioma
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.updateTitle();
    });

    // Suscribirse para actualizar el título
    this.project$.subscribe(project => {
      this.projectData = project;
      this.updateTitle();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private updateTitle(): void {
    if (this.projectData) {
      const titleKey = `PROJECTS.${this.projectData.key}_TITLE`;
      this.translate.get(titleKey).subscribe(translatedTitle => {
        this.titleService.setTitle(`${translatedTitle} | JSL Technology`);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}