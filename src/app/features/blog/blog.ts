import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService } from '../../core/services/data.service';
import { CtaComponent } from '../../shared/components/cta/cta';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jsl-blog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll,
    CtaComponent
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnInit {

  private translate = inject(TranslateService);
  private dataService = inject(DataService);

  public currentLang: string;
  public blogPosts = toSignal(this.dataService.getBlogPosts(), { initialValue: [] });

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
}