import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialShareComponent } from './social-share';
import { ToastService } from '@core/services/toast.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';

describe('SocialShareComponent', () => {
  let component: SocialShareComponent;
  let fixture: ComponentFixture<SocialShareComponent>;
  let toastService: jasmine.SpyObj<ToastService>;
  let translateService: TranslateService;

  beforeEach(async () => {
    const toastSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [
        SocialShareComponent,
        TranslateModule.forRoot(),
        LucideAngularModule.pick(ALL_ICONS)
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialShareComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    translateService = TestBed.inject(TranslateService);

    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve())
      },
      writable: true
    });

    // Mock TranslateService.instant to return the key or a value
    spyOn(translateService, 'instant').and.callFake((key: string | string[]) => {
      return Array.isArray(key) ? key[0] : key;
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy link and show toast', async () => {
    await component.copyLink();

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    // Verify toast is shown with correct message key and type
    expect(toastService.show).toHaveBeenCalledWith('SHARE.LINK_COPIED', 'success');
  });
});
