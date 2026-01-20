## 2024-05-22 - Shared Component Accessibility Gaps
**Learning:** Common interactive overlays (like Search Overlay) were built without standard accessibility features (Focus Trap, ARIA labels, Roles). The project has `@angular/cdk` available but it wasn't being utilized for these patterns.
**Action:** When auditing shared components, checking for `cdk` usage is a quick win. Ensure all future overlays (Modals, Drawers) implement `cdkTrapFocus` and proper `role="dialog"` attributes by default.
