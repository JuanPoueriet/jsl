## 2026-01-25 - Range Input Accessibility
**Learning:** `input[type="range"]` in Angular needs explicit `aria-valuetext` binding to provide context (units) to screen readers, as the implicit value is just a number.
**Action:** Always bind `[attr.aria-valuetext]` when using range sliders for non-abstract values.
