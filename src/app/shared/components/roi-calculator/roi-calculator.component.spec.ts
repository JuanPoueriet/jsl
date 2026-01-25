import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoiCalculatorComponent } from './roi-calculator.component';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';
import { provideZonelessChangeDetection } from '@angular/core';

describe('RoiCalculatorComponent', () => {
  let component: RoiCalculatorComponent;
  let fixture: ComponentFixture<RoiCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoiCalculatorComponent,
        TranslateModule.forRoot(),
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

  it('should calculate ROI correctly', () => {
    // Initial values: hours=10, rate=50, employees=5
    // Weekly = 10 * 50 * 5 = 2500
    // Monthly = 2500 * 4 = 10000
    // Annual = 2500 * 52 = 130000

    expect(component.weeklySavings()).toBe(2500);
    expect(component.monthlySavings()).toBe(10000);
    expect(component.annualSavings()).toBe(130000);
  });

  it('should update calculations when signals change', () => {
    component.hoursSaved.set(20);
    fixture.detectChanges();

    // New Weekly = 20 * 50 * 5 = 5000
    expect(component.weeklySavings()).toBe(5000);
  });
});
