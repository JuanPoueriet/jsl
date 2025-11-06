import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
// --- INICIO CAMBIOS ---
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
// import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'; // ELIMINADO
// import { provideGoogleFonts } from '@angular/ssr'; // <-- ELIMINADO (Esto era incorrecto)
import { Observable, of } from 'rxjs'; // AÑADIDO
// --- FIN CAMBIOS ---
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import {
  Home,
  Settings,
  Smartphone,
  Monitor,
  Server,
  Cloud,
  Database,
  Code,
  Send,
  Menu,
  X,
  Linkedin,
  Github,
  Info,
  ShoppingCart,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Target,
  Eye,
  Gem,
  ChevronDown,
  Compass,
  TrendingUp,
  Globe,
  Languages,
  // --- AÑADIDOS ---
  Twitter,      // Para X/Twitter
  Facebook,
  Instagram,
  Star,         // Para testimonios
  ChevronRight, // Para breadcrumbs
  User,         // Para autor del blog
  Calendar,     // Para fecha del blog
  // --- FIN AÑADIDOS ---
} from 'lucide-angular';

import { routes } from './app.routes';

// --- AÑADIDO: Carga estática de traducciones ---
import * as en from '../assets/i18n/en.json';
import * as es from '../assets/i18n/es.json';

class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(lang === 'es' ? es : en);
  }
}
// --- FIN AÑADIDO ---

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // --- ELIMINADO: provideGoogleFonts('Poppins:300,400,500,600,700'),
    provideTranslateService({
      fallbackLang: 'es',
      // --- MODIFICADO: Usar el loader personalizado ---
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      },
      // loader: provideTranslateHttpLoader({ // ELIMINADO
      //   prefix: './assets/i18n/',
      //   suffix: '.json',
      // }),
      // --- FIN MODIFICADO ---
    }),
    importProvidersFrom(
      LucideAngularModule.pick({
        Home,
        Settings,
        Smartphone,
        Monitor,
        Server,
        Cloud,
        Database,
        Code,
        Send,
        Menu,
        X,
        Linkedin,
        Github,
        Info,
        ShoppingCart,
        ArrowRight,
        Mail,
        Phone,
        MapPin,
        Target,
        Eye,
        Gem,
        ChevronDown,
        Compass,
        TrendingUp,
        Globe,
        Languages,
        // --- AÑADIDOS ---
        Twitter,
        Facebook,
        Instagram,
        Star,
        ChevronRight,
        User,
        Calendar,
        ArrowLeft
        // --- FIN AÑADIDOS ---
      })
    ),
  ],
};