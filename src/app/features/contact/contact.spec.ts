import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Mail, Phone, MapPin, Send } from 'lucide-angular';

// Mock TranslateLoader
const translateLoader = {
  getTranslation: (lang: string) => of({})
};

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideTranslateService({
          loader: { provide: TranslateLoader, useValue: translateLoader }
        }),
        importProvidersFrom(LucideAngularModule.pick({ Mail, Phone, MapPin, Send })),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'en'
              }
            }
          }
        }
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

  it('should enable submit button when form is valid', () => {
    // Fill the form
    component.contactForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      service: 'web_dev',
      message: 'This is a valid message because it is long enough.',
      privacy: true
    });
    fixture.detectChanges();

    expect(component.contactForm.valid).toBeTrue();
    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeFalse();
  });

  it('should have aria-required on required inputs', () => {
    const nameInput = fixture.nativeElement.querySelector('#name');
    expect(nameInput.getAttribute('aria-required')).toBe('true');
  });
});
