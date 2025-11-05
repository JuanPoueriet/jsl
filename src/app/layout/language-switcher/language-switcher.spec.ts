import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcher } from './language-switcher';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('LanguageSwitcher', () => {
  let component: LanguageSwitcher;
  let fixture: ComponentFixture<LanguageSwitcher>;
  let translateService: TranslateService;

  // Mock del TranslateService
  const mockTranslateService = {
    use: jest.fn(),
    addLangs: jest.fn(),
    setDefaultLang: jest.fn(),
    currentLang: 'es'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcher, TranslateModule.forRoot()],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcher);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call translate.use("en") when changeLanguage("en") is called', () => {
    component.changeLanguage('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should call translate.use("es") when changeLanguage("es") is called', () => {
    component.changeLanguage('es');
    expect(translateService.use).toHaveBeenCalledWith('es');
  });
});