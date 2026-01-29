import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-social-share',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslateModule],
  templateUrl: './social-share.html',
  styleUrls: ['./social-share.scss']
})
export class SocialShareComponent {
  @Input() url: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  readonly icons = ALL_ICONS;

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  get shareUrl(): string {
    // If running in browser, use window.location.href if url is not provided or relative
    if (typeof window !== 'undefined' && !this.url.startsWith('http')) {
      return window.location.origin + this.url;
    }
    return this.url;
  }

  share(platform: 'linkedin' | 'twitter' | 'facebook' | 'mail'): void {
    const url = encodeURIComponent(this.shareUrl);
    const text = encodeURIComponent(this.title);

    let shareLink = '';

    switch (platform) {
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'mail':
        shareLink = `mailto:?subject=${text}&body=${url}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.translateService.get('SHARE.LINK_COPIED').subscribe(msg => {
        this.toastService.show(msg, 'success');
      });
    });
  }
}
