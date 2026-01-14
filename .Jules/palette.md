## 2026-01-14 - Accessible Dropdowns
**Learning:** Custom dropdown implementations in this project (specifically in Header) lack ARIA state attributes (`aria-expanded`, `aria-haspopup`), making them inaccessible to screen readers.
**Action:** When working on components with collapsible content, verify ARIA states are bound to the open/closed variables.
