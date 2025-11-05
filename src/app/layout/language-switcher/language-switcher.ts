// src/app/layout/language-switcher/language-switcher.ts

import { Component, Inject, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core'; // 1. Importar HostListener y ElementRef
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'jsl-language-switcher',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    RouterLink,
    LucideAngularModule
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
    private router: Router,
    private el: ElementRef // 2. Inyectar ElementRef
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  // 3. Añadir HostListener para 'click outside'
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Si el clic (event.target) NO está contenido en el elemento nativo del componente (this.el.nativeElement)
    // Y el dropdown está abierto
    if (!this.el.nativeElement.contains(event.target) && this.isDropdownOpen) {
      this.closeDropdown();
    }
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      
      this.currentLang = this.translate.currentLang || 'es';
      
      this.updateRoutes(event.urlAfterRedirects);
      this.closeDropdown(); // Esto ya cierra el dropdown al navegar
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