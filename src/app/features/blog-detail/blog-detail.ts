import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, Observable, of } from 'rxjs'; // 1. Importar Observable, of
import { switchMap } from 'rxjs/operators'; // 2. Importar switchMap
import { DataService, BlogPost } from '../../core/services/data.service'; // 3. Importar Servicio
import { Title } from '@angular/platform-browser';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { CtaComponent } from '../../shared/components/cta/cta'; // 4. Importar CTA

@Component({
  selector: 'jsl-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    AnimateOnScroll,
    CtaComponent // 5. Añadir CTA
  ],
  templateUrl: './blog-detail.html',
  styleUrls: [
    '../detail-page.scss',
    './blog-detail.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetail implements OnInit, OnDestroy {
  
  public currentLang: string = 'es';
  public post$: Observable<BlogPost | undefined>; // 6. Usar Observable
  
  private langSub: Subscription | undefined;
  private postData: BlogPost | undefined; // Para guardar el dato para el título

  constructor(
    @Inject(TranslateService) public translate: TranslateService,
    private route: ActivatedRoute,
    private dataService: DataService, // 7. Inyectar Servicio
    private titleService: Title
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
    
    // 8. Cargar datos en el constructor o ngOnInit basado en la ruta
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.dataService.getPostBySlug(slug); // Usar servicio
        }
        return of(undefined); // Devolver observable vacío si no hay slug
      })
    );
  }

  ngOnInit(): void {
    // Escuchar cambios de idioma
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.updateTitle(); // Actualizar título si cambia el idioma
    });

    // Suscribirse al post$ para poder actualizar el título
    this.post$.subscribe(post => {
      this.postData = post;
      this.updateTitle();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private updateTitle(): void {
    if (this.postData) {
      const titleKey = `BLOG.${this.postData.key}_TITLE`;
      this.translate.get(titleKey).subscribe(translatedTitle => {
        this.titleService.setTitle(`${translatedTitle} | JSL Technology Blog`);
      });
    }
  }
}