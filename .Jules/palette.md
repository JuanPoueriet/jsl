# Palette's Journal

## 2024-05-20 - [Environment Constraints]
**Learning:** The execution environment has a critical issue with the Node/NPM dependency installation. The Angular CLI `ng` command is often missing from `node_modules/.bin/` after an `npm install`, preventing the running of tests and builds.
**Action:** Rely on code verification by reading files and ensure standard Angular practices are followed without relying on the build/test pipeline in this specific environment. Use `npx ng` if possible or assume manual verification.
