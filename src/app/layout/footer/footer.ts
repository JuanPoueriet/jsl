// src/app/layout/footer/footer.ts
import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core'; // 1. Imports actualizados
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'jsl-footer',
  standalone: true, // 2. Standalone
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    LucideAngularModule,
    ReactiveFormsModule,
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // 3. OnPush
})
export class Footer implements OnInit {
  // 4. Inyección de dependencias con inject()
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  // 5. Estado gestionado con Signals
  public currentYear = new Date().getFullYear();
  public currentLang = signal(this.translate.currentLang || this.translate.defaultLang || 'es');
  
  newsletterForm!: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  constructor() {
    // Escuchar cambios de idioma y actualizar el signal
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });
  }

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Getter para acceso fácil en el template
  get nf() {
    return this.newsletterForm.controls;
  }

  // 6. onSubmit actualizado para usar signals
  onSubmit(): void {
    this.isSubmitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(false);

    if (this.newsletterForm.invalid) {
      this.isSubmitting.set(false);
      this.newsletterForm.markAllAsTouched();
      return;
    }

    // Simulación de API call
    console.log('Enviando email:', this.newsletterForm.value.email);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.newsletterForm.reset();
      
      // Ocultar mensaje después de 3s
      setTimeout(() => this.submitSuccess.set(false), 3000);

      // Descomenta para probar error
      // this.isSubmitting.set(false);
      // this.submitError.set(true);
      // setTimeout(() => this.submitError.set(false), 3000);
    }, 1500);
  }
}