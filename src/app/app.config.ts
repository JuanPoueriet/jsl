import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { LucideAngularModule } from 'lucide-angular';
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
  Phone, // Dejado por si se usa en 'top-bar.ts' (aunque ahora lo quitamos)
  MapPin,
  Target,
  Eye,
  Gem,
  ChevronDown,
  Compass,
  TrendingUp,
  Globe, // <-- AÑADIDO
  Languages
  // Briefcase, FileText, Building - Eliminados
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideTranslateService({
      fallbackLang: 'es',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
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
        Languages
      })
    ),
  ],
};