import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PROJECTS } from '../../core/data/mock-data';
import { Title } from '@angular/platform-browser'; // Para actualizar el título

@Component({
  selector: 'jsl-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './project-detail.html',
  styleUrl: '../detail-page.scss' // Usamos los estilos compartidos
})
export class ProjectDetail implements OnInit, OnDestroy {
  
  public currentLang: string = 'es';
  public project: any | undefined;
  
  private langSub: Subscription | undefined;
  private routeSub: Subscription | undefined;

  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private route: ActivatedRoute,
    private titleService: Title,
    private location: Location
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit(): void {
    // Escuchar cambios de idioma
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.loadProjectData(); // Recargar datos si cambia el idioma (para el título)
    });

    // Escuchar cambios de ruta (slug)
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.project = PROJECTS.find(p => p.slug === slug);
        this.loadProjectData();
      }
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  /**
   * Carga los datos del proyecto y actualiza el título de la página.
   */
  private loadProjectData(): void {
    if (this.project) {
      // Obtener el título traducido y establecerlo en el navegador
      const titleKey = `PROJECTS.${this.project.key}_TITLE`;
      this.translate.get([titleKey, 'COMMON.DEFAULT_DESCRIPTION']).subscribe(translations => {
        this.titleService.setTitle(`${translations[titleKey]} | JSL Technology`);
        // Aquí también se podría actualizar el Meta Description si se quisiera
      });
    } else {
      // Manejar proyecto no encontrado (opcional)
      // this.router.navigate([this.currentLang, 'projects']);
    }
  }

  /**
   * Vuelve a la página anterior (lista de proyectos)
   */
  goBack(): void {
    this.location.back();
  }
}