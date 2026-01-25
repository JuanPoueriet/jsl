import { TestBed } from '@angular/core/testing';
import { Seo } from './seo';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Seo', () => {
  let service: Seo;
  let documentMock: any;
  let headMock: any;
  let routerEvents: Subject<any>;
  let scriptMock: any;

  beforeEach(() => {
    headMock = {
      appendChild: jasmine.createSpy('appendChild'),
      removeChild: jasmine.createSpy('removeChild'),
    };
    scriptMock = {
      id: '',
      type: '',
      text: '',
      remove: jasmine.createSpy('remove')
    };
    documentMock = {
      head: headMock,
      createElement: jasmine.createSpy('createElement').and.returnValue(scriptMock),
      getElementById: jasmine.createSpy('getElementById').and.returnValue(null),
      querySelector: jasmine.createSpy('querySelector').and.returnValue(null),
      querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]),
      documentElement: { lang: '' }
    };

    routerEvents = new Subject();

    const routerMock = {
      events: routerEvents.asObservable(),
      url: '/test'
    };

    const activatedRouteMock = {
      snapshot: { data: {}, url: [] },
      firstChild: null
    };

    const translateMock = {
      get: jasmine.createSpy('get').and.returnValue(of({})),
      currentLang: 'en',
      defaultLang: 'en',
      onLangChange: of({})
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        Seo,
        { provide: Title, useValue: { setTitle: jasmine.createSpy('setTitle') } },
        { provide: Meta, useValue: { updateTag: jasmine.createSpy('updateTag') } },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TranslateService, useValue: translateMock },
        { provide: DOCUMENT, useValue: documentMock }
      ]
    });
    service = TestBed.inject(Seo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject JSON-LD script', () => {
    const data = { '@context': 'https://schema.org', '@type': 'Organization' };
    service.setJsonLd(data);

    expect(documentMock.getElementById).toHaveBeenCalledWith('json-ld-schema');
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(scriptMock.type).toBe('application/ld+json');
    expect(scriptMock.text).toBe(JSON.stringify(data));
    expect(documentMock.head.appendChild).toHaveBeenCalledWith(scriptMock);
  });

  it('should remove existing JSON-LD script before injecting new one', () => {
    const existingScript = { remove: jasmine.createSpy('remove') };
    documentMock.getElementById.and.returnValue(existingScript);

    const data = { '@type': 'Test' };
    service.setJsonLd(data);

    expect(existingScript.remove).toHaveBeenCalled();
    expect(documentMock.head.appendChild).toHaveBeenCalled();
  });
});
