import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 429 Too Many Requests
      if (error.status === 429) {
        toastService.show(
          '¡Vas muy rápido! Por favor, espera unos segundos.',
          'warning',
          5000
        );
      }
      return throwError(() => error);
    })
  );
};
