import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from '../../shared/components/card/card'; // Reutilizamos la tarjeta
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { BLOG_POSTS } from '../../core/data/mock-data'; // Importar datos

@Component({
  selector: 'jsl-blog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnInit {

  public currentLang: string;
  
  // Cargar datos de posts desde el archivo mock
  blogPosts = BLOG_POSTS;

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