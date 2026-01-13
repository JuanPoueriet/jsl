// src/app/features/solution-detail/solution-detail.ts
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DataService, Solution } from '@core/services/data.service';
import { CtaComponent } from '@shared/components/cta/cta';

@Component({
  selector: 'jsl-solution-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    CtaComponent,
  ],
  templateUrl: './solution-detail.html',
  styleUrls: ['./solution-detail.scss'],
})
export class SolutionDetail implements OnInit, OnDestroy {
  public currentLang: string = 'es';
  public solution$: Observable<Solution | undefined> | undefined;

  private langSub: Subscription | undefined;
  private solutionData: Solution | undefined;

  constructor(
    @Inject(TranslateService) private translate: TranslateService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.currentLang =
      this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit(): void {
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.updateTitle();
    });

    this.solution$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.dataService.getSolutionBySlug(slug);
        }
        return of(undefined);
      })
    );

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
}
