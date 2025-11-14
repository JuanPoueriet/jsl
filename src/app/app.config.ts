import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ALL_ICONS } from './core/constants/icons';

import { routes } from './app.routes';

// Carga estática de traducciones para SSR
import * as en from '../assets/i18n/en.json';
import * as es from '../assets/i18n/es.json';

class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Devuelve el JSON importado directamente como un Observable
    return of(lang === 'es' ? es : en);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    provideAnimationsAsync(),
    
    // Configuración de ngx-translate con el loader personalizado
    provideTranslateService({
      fallbackLang: 'es',
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      },
    }),

    importProvidersFrom(LucideAngularModule.pick(ALL_ICONS)),
  ],
};