import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  effect, // <-- 1. IMPORTAR effect
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { AnimateOnScroll } from '../../directives/animate-on-scroll';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Interfaz para el objeto de mensaje
interface ChatMessage {
  text: string;
  sender: 'user' | 'operator';
  timestamp: number;
}

@Component({
  selector: 'jsl-chat-bubble',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    AnimateOnScroll,
    ReactiveFormsModule,
  ],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBubbleComponent implements OnInit, OnDestroy {
  @ViewChild('chatBody') private chatBody: ElementRef<HTMLDivElement> | undefined;

  // --- SEÑALES DE ESTADO ---
  public isOpen = signal(false);
  public showPreview = signal(false);
  public previewTeaser = signal('');
  public messages = signal<ChatMessage[]>([]);
  public proactiveMessageSent = signal(false);

  // --- FORMULARIO ---
  public chatInput = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  // --- PROPIEDADES PRIVADAS ---
  private audio: HTMLAudioElement | null = null;
  private proactiveTimer: any = null;
  private previewTimer: any = null;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // 2. CORRECCIÓN: Usar effect() para reaccionar a cambios en `messages`
    effect(() => {
      // Al leer this.messages() aquí, el efecto se suscribirá a sus cambios.
      if (this.messages() && this.isBrowser) {
        this.scrollToBottom();
      }
    });
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.translate
        .get('CHAT.GREETING')
        .subscribe((greeting: string) => {
          this.messages.set([
            {
              text: greeting,
              sender: 'operator',
              timestamp: Date.now(),
            },
          ]);
        });

      this.initializeProactiveChat();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      clearTimeout(this.proactiveTimer);
      clearTimeout(this.previewTimer);
    }
  }

  private initializeProactiveChat(): void {
    this.audio = new Audio('assets/sounds/chat-notification.mp3');
    this.audio.load();

    this.proactiveTimer = setTimeout(() => {
      this.triggerProactiveMessage();
    }, 7000);
  }

  private triggerProactiveMessage(): void {
    if (!this.isOpen() && !this.proactiveMessageSent()) {
      this.translate
        .get('CHAT.PREVIEW_GREETING')
        .subscribe((message: string) => {
          this.previewTeaser.set(message);
          this.showPreview.set(true);

          this.messages.update((msgs) => [
            ...msgs,
            { text: message, sender: 'operator', timestamp: Date.now() },
          ]);
          this.proactiveMessageSent.set(true);

          this.playNotificationSound();

          this.previewTimer = setTimeout(() => {
            this.showPreview.set(false);
          }, 5000);
        });
    }
  }

  private playNotificationSound(): void {
    this.audio?.play().catch((e) => {
      console.warn('La reproducción de sonido del chat fue bloqueada por el navegador.', e);
    });
  }

  /**
   * 3. CORRECCIÓN: Aceptar un 'Event' genérico y comprobar el tipo.
   */
  onEnterPress(event: Event): void {
    // Comprobar si es un KeyboardEvent antes de acceder a sus propiedades
    if (
      event instanceof KeyboardEvent &&
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault(); // Evitar salto de línea
      this.sendMessage();
    }
  }

  sendMessage(): void {
    if (this.chatInput.invalid) return;

    const text = this.chatInput.value.trim();
    if (text) {
      this.messages.update((msgs) => [
        ...msgs,
        { text, sender: 'user', timestamp: Date.now() },
      ]);
      this.chatInput.reset('');

      this.simulateOperatorReply();
    }
  }

  private simulateOperatorReply(): void {
    setTimeout(() => {
      this.translate
        .get('CHAT.OPERATOR_REPLY')
        .subscribe((reply: string) => {
          this.messages.update((msgs) => [
            ...msgs,
            { text: reply, sender: 'operator', timestamp: Date.now() },
          ]);
          this.playNotificationSound();
          // No es necesario llamar a scrollToBottom() aquí, el 'effect' lo hará.
        });
    }, 1500);
  }

  toggleChat(): void {
    this.isOpen.update((open) => !open);

    if (this.isOpen()) {
      this.showPreview.set(false);
      clearTimeout(this.proactiveTimer);
      clearTimeout(this.previewTimer);
      this.scrollToBottom(true); // Forzar scroll al abrir por primera vez
    }
  }

  private scrollToBottom(force: boolean = false): void {
    if (this.isBrowser && this.chatBody) {
      setTimeout(() => {
        if (this.chatBody) {
          const el = this.chatBody.nativeElement;
          const isScrolledToBottom =
            el.scrollHeight - el.clientHeight <= el.scrollTop + 100;
          if (isScrolledToBottom || force) {
            el.scrollTop = el.scrollHeight;
          }
        }
      }, 0);
    }
  }
}