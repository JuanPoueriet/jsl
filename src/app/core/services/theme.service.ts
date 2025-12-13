import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Check initial preference (could be from localStorage or OS preference)
    // For SSR safety, we default to false and could update in browser
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkMode.value);
  }

  setDarkMode(isDark: boolean) {
    this.darkMode.next(isDark);
    if (typeof document !== 'undefined') {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
  }
}
