## 2026-01-29 - Feedback for Copy Actions
**Learning:** Copy-to-clipboard actions in this app previously lacked user feedback. Using `ToastService` provides immediate, accessible confirmation (via `role="alert"` or status).
**Action:** Always pair `navigator.clipboard.writeText` with a success toast message using `ToastService`.
