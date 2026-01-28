import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchOverlayComponent } from './search-overlay';
import { DataService } from '@core/services/data.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { A11yModule } from '@angular/cdk/a11y';
import { ALL_ICONS } from '@core/constants/icons';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('SearchOverlayComponent', () => {
  let component: SearchOverlayComponent;
  let fixture: ComponentFixture<SearchOverlayComponent>;
  let dataServiceMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      search: jasmine.createSpy('search').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [
        SearchOverlayComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
        LucideAngularModule.pick(ALL_ICONS),
        A11yModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have accessibility attributes', () => {
    const container = fixture.debugElement.query(By.css('.search-container'));
    expect(container.attributes['role']).toBe('dialog');
    expect(container.attributes['aria-modal']).toBe('true');
    expect(container.attributes['aria-label']).toBe('Site Search');
  });

  it('should focus input on load', () => {
    spyOn(component.searchInput.nativeElement, 'focus');
    component.ngAfterViewInit();
    expect(component.searchInput.nativeElement.focus).toHaveBeenCalled();
  });
});
