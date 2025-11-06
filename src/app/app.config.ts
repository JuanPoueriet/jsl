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
        Languages,
        // --- AÑADIDOS ---
        Twitter,
        Facebook,
        Instagram,
        Star,
        ChevronRight,
        User,
        Calendar,
        // --- FIN AÑADIDOS ---
      })
    ),
  ],
};