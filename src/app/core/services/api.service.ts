import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Simulación de una respuesta exitosa de la API
export interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * Servicio para manejar todas las comunicaciones con un backend (POST, PUT, etc.).
 * Actualmente simula las respuestas de la API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private http = inject(HttpClient);

  constructor() { }

  /**
   * Envía el formulario de contacto al backend.
   * @param formData Los datos del formulario (nombre, email, servicio, mensaje, token)
   */
  sendContactForm(formData: any): Observable<ApiResponse> {
    console.log('ApiService: Enviando formulario de contacto...', formData);
    
    // Llamada real al endpoint protegido por Rate Limiting
    return this.http.post<ApiResponse>('/api/contact', formData);
  }

  /**
   * Simula la suscripción a un newsletter.
   * @param email El email a suscribir
   */
  subscribeToNewsletter(email: string): Observable<ApiResponse> {
    console.log('ApiService: Suscribiendo al newsletter...', email);

    // Simulación de una llamada API (1 segundo de retraso)
    return of({ 
      success: true, 
      message: 'Suscripción exitosa' 
    }).pipe(delay(1000));
  }
}