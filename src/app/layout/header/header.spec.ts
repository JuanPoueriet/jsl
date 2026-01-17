import 'zone.js';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '../../core/constants/icons';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, NoopAnimationsModule, LucideAngularModule.pick(ALL_ICONS)],
      providers: [
        provideRouter([]), // Mock
        provideTranslateService() // Mock
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mobile menu closed by default', () => {
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should toggle mobile menu on toggleMobileMenu()', (done) => {
    expect(component.isMobileMenuOpen).toBe(false);

    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBe(true);

    setTimeout(() => {
      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBe(false);
      done();
    }, 350);
  });

  it('should close mobile menu on closeMobileMenu()', () => {
    component.isMobileMenuOpen = true; // Forzar estado abierto
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen).toBe(false);
  });
});