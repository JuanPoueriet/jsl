import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'jsl-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible) {
      <div class="cookie-banner">
        <div class="cookie-content">
          <p>
            <strong>We respect your privacy.</strong> We use cookies to optimize our runtime and ensure security.
            <a href="#" style="color: var(--primary-color); text-decoration: underline;">Read Policy</a>.
          </p>
          <div class="cookie-actions">
            <button (click)="decline()" class="btn-text">Decline</button>
            <button (click)="accept()" class="btn-accept">Accept All</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      left: 2rem;
      max-width: 500px;
      margin-left: auto;
      background: var(--bg-color-secondary, #ffffff);
      border: 1px solid var(--border-color, #eee);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      padding: 1.5rem;
      z-index: 9999;
      animation: slideUp 0.5s ease-out;
    }
    .cookie-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .cookie-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }
    .btn-accept {
      background: var(--primary-color, #000);
      color: #fff;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    .btn-text {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-color-muted, #666);
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @media (max-width: 600px) {
        .cookie-banner {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
        }
    }
  `]
})
export class CookieBannerComponent {
  isVisible = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
        const consent = localStorage.getItem('jsl_cookie_consent');
        if (!consent) {
            this.isVisible = true;
        }
    }
  }

  accept() {
    this.isVisible = false;
    if (this.isBrowser) {
        localStorage.setItem('jsl_cookie_consent', 'true');
    }
  }

  decline() {
      this.isVisible = false;
      if (this.isBrowser) {
          localStorage.setItem('jsl_cookie_consent', 'false');
      }
  }
}
