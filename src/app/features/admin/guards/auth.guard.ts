import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && localStorage.getItem('jsl_admin_token')) {
    return true;
  }
  return router.createUrlTree(['/admin/login']);
};
