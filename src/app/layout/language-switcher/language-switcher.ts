// src/app/layout/language-switcher/language-switcher.ts

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClickOutsideDirective } from '@shared/directives/click-outside';

@Component({
  selector: 'jsl-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    LucideAngularModule,
    ClickOutsideDirective,
  ],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher implements OnInit, OnDestroy {
  public currentLang: string = 'es';
  public isDropdownOpen = false;
  public languages: { code: string; name: string }[] = [];

  private routerSubscription: Subscription | undefined;
  private currentRouteWithoutLang: string[] = [];

  constructor(
    @Inject(TranslateService) public translate: TranslateService,
    private router: Router,
  ) {
    this.translate.addLangs(['en', 'es', 'it', 'ja', 'ko', 'zh', 'pt', 'fr', 'de', 'ar']);
    const browserLang = this.translate.getBrowserLang();
    const langToUse =
      browserLang && this.translate.getLangs().includes(browserLang)
        ? browserLang
        : 'es';
    this.translate.use(langToUse);
    this.currentLang = langToUse;
  }

  ngOnInit(): void {
    this.setupLanguages();

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentLang = this.translate.currentLang || 'es';
        this.updateCurrentRoute(event.urlAfterRedirects);
        this.closeDropdown();
      });

    this.updateCurrentRoute(this.router.url);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private setupLanguages(): void {
    this.languages = this.translate.getLangs().map(lang => ({
      code: lang,
      name: `LANG.${lang.toUpperCase()}_FULL`,
    }));
  }

  private updateCurrentRoute(currentUrl: string): void {
    const segments = currentUrl.split('/');
    this.currentRouteWithoutLang = segments.slice(2);
  }

  public getRouteForLang(langCode: string): string[] {
    return [`/${langCode}`, ...this.currentRouteWithoutLang];
  }

  public setLanguage(langCode: string): void {
    this.translate.use(langCode);
    this.currentLang = langCode;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}