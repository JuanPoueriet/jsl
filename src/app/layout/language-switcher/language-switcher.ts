// src/app/layout/language-switcher/language-switcher.ts

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClickOutsideDirective } from '../../shared/directives/click-outside';

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

  public esRoute: string[] = ['/es'];
  public enRoute: string[] = ['/en'];

  private routerSubscription: Subscription | undefined;

  constructor(
    @Inject(TranslateService) public translate: TranslateService,
    private router: Router
  ) {
    this.currentLang =
      this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentLang = this.translate.currentLang || 'es';

        this.updateRoutes(event.urlAfterRedirects);
        this.closeDropdown();
      });

    this.updateRoutes(this.router.url);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private updateRoutes(currentUrl: string): void {
    const segments = currentUrl.split('/');
    const routeWithoutLang = segments.slice(2);
    this.esRoute = ['/es', ...routeWithoutLang];
    this.enRoute = ['/en', ...routeWithoutLang];
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}