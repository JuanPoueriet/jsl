import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ALL_ICONS } from './core/constants/icons';

import { routes } from './app.routes';

// Carga estática de traducciones para SSR
import * as en from '@assets/i18n/en.json';
import * as es from '@assets/i18n/es.json';

export function createTranslateLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string): Observable<any> => {
      return of(lang === 'es' ? es : en);
    },
  } as TranslateLoader;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideTranslateService({
      fallbackLang: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
      },
    }),
    importProvidersFrom(LucideAngularModule.pick(ALL_ICONS)),
  ],
};