import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from '../../shared/components/card/card';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { DataService } from '../../core/services/data.service';
import { CtaComponent } from '../../shared/components/cta/cta';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jsl-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Card,
    AnimateOnScroll,
    CtaComponent
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {

  public currentLang: string;
  public projects = toSignal(this.dataService.getProjects(), { initialValue: [] });
  
  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private dataService: DataService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
}