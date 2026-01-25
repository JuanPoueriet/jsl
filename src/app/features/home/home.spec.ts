import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '@core/services/data.service';
import { ToastService } from '@core/services/toast.service';
import { Seo } from '@core/services/seo';
import { SearchUiService } from '@core/services/search-ui.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let seoMock: any;

  beforeEach(async () => {
    seoMock = {
      setJsonLd: jasmine.createSpy('setJsonLd')
    };

    const dataServiceMock = {
      getTestimonials: () => of([]),
      getProjects: () => of([]),
      getSolutions: () => of([]),
      getProducts: () => of([]),
      getProcessSteps: () => of([]),
      getPartners: () => of([]),
      getTechStack: () => of([]),
      getBlogPosts: () => of([])
    };

    const toastServiceMock = {
      show: jasmine.createSpy('show')
    };

    const searchUiServiceMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: TranslateService,
          useValue: {
            currentLang: 'en',
            defaultLang: 'en',
            onLangChange: of({ lang: 'en' }),
            onTranslationChange: of({}),
            onDefaultLangChange: of({}),
            instant: (key: string) => key,
            get: () => of('Translated'),
            getCurrentLang: () => 'en',
            getFallbackLang: () => 'en'
          }
        },
        { provide: DataService, useValue: dataServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Seo, useValue: seoMock },
        { provide: SearchUiService, useValue: searchUiServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.setJsonLd on init', () => {
    expect(seoMock.setJsonLd).toHaveBeenCalled();
  });
});
