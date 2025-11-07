import { Component, HostListener } from '@angular/core'; // 1. Importar HostListener
import { CommonModule } from '@angular/common'; // 2. Importar CommonModule
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Seo } from './core/services/seo';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble';

@Component({
  selector: 'jsl-root',
  standalone: true,
  imports: [
    CommonModule, // 4. Añadir CommonModule
    RouterOutlet, 
    Header,
    Footer,
    ChatBubbleComponent, // <-- AÑADIDO
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'jsl-technology-web';
  isScrolled = false; // 6. Propiedad de estado de scroll

  constructor(
    private translate: TranslateService,
    private seo: Seo
  ) {
    this.seo.init(); 
  }

  // 7. Añadir HostListener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si el scroll es mayor que 50px, 'isScrolled' es true
    const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = verticalOffset > 50;
  }
}