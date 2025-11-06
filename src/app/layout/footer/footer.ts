import { Component, OnInit } from '@angular/core'; // 1. Importar OnInit
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common'; // 2. Importar CommonModule
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // 3. Importar Forms

@Component({
  selector: 'jsl-footer',
  imports: [
    RouterLink,
    TranslateModule,
    LucideAngularModule,
    CommonModule, // 4. Añadir CommonModule
    ReactiveFormsModule, // 5. Añadir ReactiveFormsModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit { // 6. Implementar OnInit
  currentYear = new Date().getFullYear();
  public currentLang: string;

  // --- 7. AÑADIR LÓGICA DEL FORMULARIO ---
  newsletterForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  // --- FIN AÑADIR LÓGICA ---

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder // 8. Inyectar FormBuilder
  ) {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  // --- 9. AÑADIR ngOnInit ---
  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // --- 10. AÑADIR GETTER Y SUBMIT ---
  
  // Getter para acceso fácil en el template
  get nf() {
    return this.newsletterForm.controls;
  }

  // Simulación de envío
  onSubmit(): void {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    if (this.newsletterForm.invalid) {
      this.isSubmitting = false;
      this.newsletterForm.markAllAsTouched();
      return;
    }

    // Simulación de API call
    console.log('Enviando email:', this.newsletterForm.value.email);
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.newsletterForm.reset();
      
      // Ocultar mensaje después de 3s
      setTimeout(() => this.submitSuccess = false, 3000);

      // Descomenta para probar error
      // this.isSubmitting = false;
      // this.submitError = true;
      // setTimeout(() => this.submitError = false, 3000);
    }, 1500);
  }
}