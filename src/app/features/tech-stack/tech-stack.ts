// src/app/features/tech-stack/tech-stack.ts
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { CtaComponent } from '../../shared/components/cta/cta';
import { LogoCard } from '../../shared/components/logo-card/logo-card'; // <-- Importar LogoCard
import { DataService, TechCategory } from '../../core/services/data.service'; // <-- Importar
import { Observable } from 'rxjs';

@Component({
  selector: 'jsl-tech-stack',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    AnimateOnScroll,
    CtaComponent,
    LogoCard // <-- Importar
  ],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss'
})
export class TechStack implements OnInit {
  
  public techCategories$!: Observable<TechCategory[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.techCategories$ = this.dataService.getTechStack();
  }
}