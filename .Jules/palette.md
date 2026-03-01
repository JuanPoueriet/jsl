## 2026-01-27 - [ROI Calculator Accessibility]
**Learning:** `input[type="range"]` elements often lack context for screen readers. Using `[attr.aria-valuetext]` allows us to inject dynamic, human-readable values (like "10 hours") instead of raw numbers.
**Action:** Always verify range inputs have `aria-valuetext` when the visual label is separated or complex.
