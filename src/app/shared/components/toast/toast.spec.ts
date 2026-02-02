import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, provideZonelessChangeDetection } from '@angular/core';
import { ToastComponent } from './toast';
import { ToastService } from '@core/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ALL_ICONS } from '@core/constants/icons';

// Mock TranslateLoader
class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToastComponent,
        CommonModule,
        LucideAngularModule.pick(ALL_ICONS),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderMock }
        })
      ],
      providers: [
        provideZonelessChangeDetection(),
        ToastService,
        {
          provide: TranslateService,
          useValue: {
            get: (key: string) => of(key),
            onTranslationChange: new EventEmitter(),
            onLangChange: new EventEmitter(),
            onDefaultLangChange: new EventEmitter(),
            onFallbackLangChange: new EventEmitter(),
            currentLang: 'en',
            defaultLang: 'en',
            use: () => of({}),
            getBrowserLang: () => 'en',
            addLangs: () => {},
            setDefaultLang: () => {},
            getCurrentLang: () => 'en',
            getFallbackLang: () => 'en',
            stream: (key: string) => of(key)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error toast with alert role', () => {
    toastService.show('Error message', 'error');
    fixture.detectChanges();
    const toastEl = fixture.nativeElement.querySelector('.toast.error');
    expect(toastEl).toBeTruthy();
    expect(toastEl.getAttribute('role')).toBe('alert');
    expect(toastEl.getAttribute('aria-live')).toBe('assertive');
  });

  it('should display success toast with status role', () => {
    toastService.show('Success message', 'success');
    fixture.detectChanges();
    const toastEl = fixture.nativeElement.querySelector('.toast.success');
    expect(toastEl).toBeTruthy();
    expect(toastEl.getAttribute('role')).toBe('status');
    expect(toastEl.getAttribute('aria-live')).toBe('polite');
  });

  it('should display progress bar when duration > 0', () => {
    toastService.show('With progress', 'info', 3000);
    fixture.detectChanges();
    const progressEl = fixture.nativeElement.querySelector('.toast-progress');
    expect(progressEl).toBeTruthy();
    expect(progressEl.style.animationDuration).toBe('3000ms');
  });
});
