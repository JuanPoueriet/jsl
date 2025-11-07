import { Component, OnInit, OnDestroy, Inject } from '@angular/core'; // 1. Añadir OnDestroy
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service'; // 2. Importar ApiService
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'jsl-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit, OnDestroy {
  // 3. Implementar OnDestroy
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  private destroy$ = new Subject<void>(); // 4. Para gestionar la desuscripción

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService // 5. Inyectar ApiService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.contactForm.controls;
  }

  // 6. Lógica de envío refactorizada
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // 7. Usar el ApiService en lugar de setTimeout
    this.apiService
      .sendContactForm(this.contactForm.value)
      .pipe(
        takeUntil(this.destroy$), // Desuscribirse automáticamente
        finalize(() => {
          // Esto se ejecuta siempre (éxito o error)
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta de API:', response);
          this.submitSuccess = true;
          this.contactForm.reset();
        },
        error: (err: any) => {
          console.error('Error al enviar formulario:', err);
          this.submitError = true;
        },
      });
  }
}
