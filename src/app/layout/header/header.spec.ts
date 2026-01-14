import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';

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

  it('should toggle mobile menu on toggleMobileMenu()', () => {
    expect(component.isMobileMenuOpen).toBe(false);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBe(true);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should close mobile menu on closeMobileMenu()', () => {
    component.isMobileMenuOpen = true; // Forzar estado abierto
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should set aria-expanded on mobile menu toggle', () => {
    const toggle = fixture.nativeElement.querySelector('.header__mobile-toggle');
    // Initially false because component.isMobileMenuOpen is false
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('should set aria-expanded on dropdown toggle', () => {
    const toggle = fixture.nativeElement.querySelector('.dropdown-toggle');
    // Initially false because openDropdown is null
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    component.toggleDropdown('solutions', new MouseEvent('click'));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});