import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoiCalculatorComponent } from './roi-calculator.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';
import { By } from '@angular/platform-browser';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('RoiCalculatorComponent', () => {
  let component: RoiCalculatorComponent;
  let fixture: ComponentFixture<RoiCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoiCalculatorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
        LucideAngularModule.pick(ALL_ICONS)
      ],
      providers: [
        provideZonelessChangeDetection()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have accessible range inputs', () => {
    const hoursInput = fixture.debugElement.query(By.css('input#hours-saved'));
    const rateInput = fixture.debugElement.query(By.css('input#hourly-rate'));
    const employeesInput = fixture.debugElement.query(By.css('input#employee-count'));

    expect(hoursInput).toBeTruthy();
    expect(rateInput).toBeTruthy();
    expect(employeesInput).toBeTruthy();

    expect(hoursInput.nativeElement.getAttribute('aria-valuetext')).toContain('hours saved per week');
  });

  it('should associate labels with inputs', () => {
    const hoursLabel = fixture.debugElement.query(By.css('label[for="hours-saved"]'));
    expect(hoursLabel).toBeTruthy();
  });

  it('should hide icons in labels from screen readers', () => {
     const iconInLabel = fixture.debugElement.query(By.css('label[for="hours-saved"] lucide-icon'));
     expect(iconInLabel.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });
});
