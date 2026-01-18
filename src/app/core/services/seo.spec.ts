import { TestBed } from '@angular/core/testing';
import { Seo } from './seo';
import { provideZonelessChangeDetection } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

describe('Seo', () => {
  let service: Seo;
  let routerEventsSubject = new Subject<any>();

  beforeEach(() => {
    const routerMock = {
      events: routerEventsSubject.asObservable(),
      createUrlTree: () => {},
      serializeUrl: () => '',
      url: '/test'
    };

    const activatedRouteMock = {
      snapshot: {
        data: { title: 'TEST_TITLE', description: 'TEST_DESC' },
        url: [{ path: 'test' }]
      },
      firstChild: null,
      parent: { snapshot: { params: { lang: 'en' } } }
    };

    const translateMock = {
      get: (key: any) => of({ 'TEST_TITLE': 'Test Title', 'TEST_DESC': 'Test Description' }),
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        Seo,
        Title,
        Meta,
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TranslateService, useValue: translateMock }
      ]
    });
    service = TestBed.inject(Seo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
