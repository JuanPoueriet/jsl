import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService, BlogPost } from '../../core/services/data.service'; // 1. Importar Servicio
import { Observable } from 'rxjs'; // 2. Importar Observable
import { CtaComponent } from '../../shared/components/cta/cta'; // 3. Importar CTA

@Component({
  selector: 'jsl-blog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll,
    CtaComponent // 4. Añadir CTA
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnInit {

  public currentLang: string;
  public blogPosts$!: Observable<BlogPost[]>; // 5. Usar Observable

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

    this.blogPosts$ = this.dataService.getBlogPosts(); // 7. Cargar datos
  }
}