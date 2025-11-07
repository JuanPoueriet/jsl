// src/app/features/process/process.ts
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { CtaComponent } from '../../shared/components/cta/cta';
import { DataService } from '../../core/services/data.service'; // <-- Importar
import { Observable } from 'rxjs';

// Definir una interfaz para los pasos del proceso
interface ProcessStep {
  key: string;
  icon: string;
}

@Component({
  selector: 'jsl-process',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    AnimateOnScroll,
    CtaComponent
  ],
  templateUrl: './process.html',
  styleUrl: './process.scss'
})
export class Process implements OnInit {
  
  public processSteps$!: Observable<ProcessStep[]>; // <-- Usar Observable

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.processSteps$ = this.dataService.getProcessSteps();
  }
}