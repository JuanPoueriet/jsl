import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { BLOG_POSTS } from '../../core/data/mock-data';
import { Title } from '@angular/platform-browser';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';

@Component({
  selector: 'jsl-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    AnimateOnScroll
  ],
  templateUrl: './blog-detail.html',
  styleUrls: [
    '../detail-page.scss', // Estilos compartidos
    './blog-detail.scss'  // Estilos específicos
  ],
  // Usamos ViewEncapsulation.None para que los estilos de 'detail-page.scss'
  // puedan aplicar al contenido insertado con [innerHTML]
  encapsulation: ViewEncapsulation.None
})
export class BlogDetail implements OnInit, OnDestroy {
  
  public currentLang: string = 'es';
  public post: any | undefined;
  
  private langSub: Subscription | undefined;
  private routeSub: Subscription | undefined;

  constructor(
    @Inject(TranslateService) public translate: TranslateService, // Hacer público
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit(): void {
    // Escuchar cambios de idioma
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.loadPostData(); // Recargar datos si cambia el idioma (para el título y autor)
    });

    // Escuchar cambios de ruta (slug)
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.post = BLOG_POSTS.find(p => p.slug === slug);
        this.loadPostData();
      }
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  /**
   * Carga los datos del post y actualiza el título de la página.
   */
  private loadPostData(): void {
    if (this.post) {
      // Obtener el título traducido y establecerlo en el navegador
      const titleKey = `BLOG.${this.post.key}_TITLE`;
      const excerptKey = `BLOG.${this.post.key}_EXCERPT`;
      
      this.translate.get([titleKey, excerptKey]).subscribe(translations => {
        this.titleService.setTitle(`${translations[titleKey]} | JSL Technology Blog`);
        // Aquí también se podría actualizar el Meta Description
      });
    } else {
      // Manejar post no encontrado (opcional)
    }
  }
}