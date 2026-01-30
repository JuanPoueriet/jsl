import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '@core/services/api.service';
import { ToastService } from '@core/services/toast.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ALL_ICONS } from '@core/constants/icons';

@Component({
  selector: 'jsl-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  readonly icons = ALL_ICONS;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacy: [false, Validators.requiredTrue]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.show('CONTACT.ERROR_MESSAGE', 'error');
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // Ejecutar reCAPTCHA v3 antes de enviar
    this.recaptchaV3Service.execute('contact')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (token) => {
          this.sendFormWithToken(token);
        },
        error: (err) => {
          console.error('Error de reCAPTCHA:', err);
          this.isSubmitting = false;
          this.toastService.show('Error de seguridad (Captcha). Intente nuevamente.', 'error');
        }
      });
  }

  private sendFormWithToken(token: string): void {
    const formData = { ...this.contactForm.value, token };

    this.apiService
      .sendContactForm(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta de API:', response);
          this.submitSuccess = true;
          this.contactForm.reset();
          this.toastService.show('CONTACT.SUCCESS_MESSAGE', 'success');
          this.router.navigate(['/thank-you']);
        },
        error: (err: any) => {
          console.error('Error al enviar formulario:', err);
          this.submitError = true;
          // Si es 429, el interceptor ya mostró el mensaje específico.
          if (err.status !== 429) {
            this.toastService.show('CONTACT.ERROR_MESSAGE', 'error');
          }
        },
      });
  }
}
