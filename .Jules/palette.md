## 2025-05-18 - Search Overlay Accessibility
**Learning:** Modal overlays like `SearchOverlayComponent` often miss focus trapping (`cdkTrapFocus`) and basic ARIA roles (`role="dialog"`, `aria-modal="true"`), which are critical for keyboard and screen reader users. The `@angular/cdk` library is available and should be leveraged for these interactions.
**Action:** Always check for `@angular/cdk/a11y` usage in modal components and add `cdkTrapFocus` if missing. Ensure all close buttons have `aria-label`.
