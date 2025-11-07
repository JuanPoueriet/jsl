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

// Importar la lista completa de iconos que usamos en todo el sitio
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  Cloud,
  CloudCog, // Para Tech Stack
  Code,
  Compass,
  Database,
  Eye,
  ExternalLink, // Para Product Detail
  Facebook,
  Gem,
  Github,
  Globe,
  HeartPulse, // Para Industrias
  Home,
  Info,
  Instagram,
  Landmark, // Para Industrias
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Send,
  Server,
  Settings,
  ShoppingCart,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  Truck, // Para Industrias
  Twitter,
  User,
  X,
} from 'lucide-angular';

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

    // Importación de todos los iconos de Lucide
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
        ArrowLeft, // Añadido
        Mail,
        Phone,
        MapPin,
        Target,
        Eye,
        Gem,
        ChevronDown,
        ChevronRight, // Añadido
        Compass,
        TrendingUp,
        Globe,
        Languages,
        Twitter,
        Facebook,
        Instagram,
        Star,
        User,
        Calendar,
        Truck, // Añadido
        Landmark, // Añadido
        HeartPulse, // Añadido
        ExternalLink, // Añadido
        CloudCog // Añadido
      })
    ),
  ],
};