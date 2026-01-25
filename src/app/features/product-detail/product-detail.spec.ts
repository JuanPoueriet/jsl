import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetail } from './product-detail';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { Title } from '@angular/platform-browser';
import { Seo } from '@core/services/seo';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;
  let seoMock: any;

  beforeEach(async () => {
    seoMock = {
      setJsonLd: jasmine.createSpy('setJsonLd')
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetail],
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
            get: () => of('Translated Title'),
            getCurrentLang: () => 'en',
            getFallbackLang: () => 'en'
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'jsl-erp' })
          }
        },
        {
          provide: DataService,
          useValue: {
            getProductBySlug: () => of({ key: 'ERP', slug: 'jsl-erp', icon: 'Database' })
          }
        },
        { provide: Title, useValue: { setTitle: () => {} } },
        { provide: Seo, useValue: seoMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setJsonLd when product is ERP', () => {
    expect(seoMock.setJsonLd).toHaveBeenCalled();
  });
});
