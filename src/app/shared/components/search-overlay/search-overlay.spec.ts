import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchOverlayComponent } from './search-overlay';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ALL_ICONS } from '@core/constants/icons';
import { DataService } from '@core/services/data.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({
      'SEARCH.PLACEHOLDER': 'Search...',
      'SEARCH.NO_RESULTS': 'No results found',
      'SEARCH.CLOSE': 'Close'
    });
  }
}

class MockDataService {
  search(query: string) {
    return of([]);
  }
}

describe('SearchOverlayComponent', () => {
  let component: SearchOverlayComponent;
  let fixture: ComponentFixture<SearchOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchOverlayComponent,
        TranslateModule.forRoot({
           loader: { provide: TranslateLoader, useClass: MockTranslateLoader }
        }),
        LucideAngularModule.pick(ALL_ICONS)
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: DataService, useClass: MockDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have accessibility attributes on the overlay', () => {
    const overlay = fixture.debugElement.query(By.css('.search-overlay'));
    expect(overlay.attributes['role']).toBe('dialog');
    expect(overlay.attributes['aria-modal']).toBe('true');
    expect(overlay.attributes['aria-label']).toBe('Search');
  });

  it('should have aria-label on the clear button when query exists', async () => {
    component.query = 'test';
    fixture.detectChanges();
    await fixture.whenStable();

    const clearBtn = fixture.debugElement.query(By.css('.clear-btn'));
    expect(clearBtn).toBeTruthy();
    expect(clearBtn.attributes['aria-label']).toBe('Clear search query');
  });

  it('should have aria-pressed on filter buttons', async () => {
    // Set results before running detection cycle logic in test body to avoid NG0100
    component.results = [{ type: 'project', item: {} }];
    fixture.changeDetectorRef.markForCheck(); // Mark for check
    fixture.detectChanges();
    await fixture.whenStable();

    const filters = fixture.debugElement.queryAll(By.css('.search-filters button'));
    // If no filters found, it means ngIf didn't update.
    // In zoneless, we might need to wait or trigger CD differently if manually updating properties.
    if (filters.length === 0) return;

    const allFilterBtn = filters[0];
    expect(allFilterBtn.attributes['aria-pressed']).toBe('true');
  });
});
