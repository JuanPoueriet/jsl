import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importar Reactive Forms
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'jsl-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Añadir
    TranslateModule,
    LucideAngularModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  contactForm!: FormGroup; // Usamos "definite assignment assertion" (!)
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      // Añadimos un campo 'service' que es relevante para JSL
      service: ['', [Validators.required]], 
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter para acceder fácilmente a los controles del formulario en el template
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // Detener si el formulario es inválido
    if (this.contactForm.invalid) {
      this.isSubmitting = false;
      // Marcar todos los campos como "tocados" para mostrar errores
      this.contactForm.markAllAsTouched(); 
      return;
    }

    // --- Simulación de envío a un Backend ---
    // Aquí iría tu lógica de 'HttpClient.post(...)'
    console.log(this.contactForm.value);

    setTimeout(() => {
      // Simular éxito
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();

      // Simular error (descomenta para probar)
      // this.isSubmitting = false;
      // this.submitError = true;
      
    }, 2000); // Simular 2 segundos de carga
  }
}