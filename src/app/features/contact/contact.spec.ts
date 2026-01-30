import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Contact } from './contact';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';
import { ToastService } from '@core/services/toast.service';
import { ApiService } from '@core/services/api.service';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  const mockRecaptchaService = {
    execute: (action: string) => of('mock-token')
  };

  const mockApiService = {
      sendContactForm: (data: any) => of({ success: true })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, TranslateModule.forRoot(), LucideAngularModule.pick(ALL_ICONS)],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ReCaptchaV3Service, useValue: mockRecaptchaService },
        { provide: ApiService, useValue: mockApiService },
        ToastService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
