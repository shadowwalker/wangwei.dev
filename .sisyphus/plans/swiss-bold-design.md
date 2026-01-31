# Swiss Bold Design Improvements

## TL;DR

> **Quick Summary**: Implement "Swiss Bold" design system across the website with a shared footer component, refined typography hierarchy (font-black headlines, font-light taglines), and proper test infrastructure.
> 
> **Deliverables**:
> - Shared `SiteFooter` component with asymmetric grid layout
> - Home page with updated typography and spacing
> - Blog page with matching design + 2-column post grid
> - Vitest + React Testing Library test setup
> - Visual verification via Playwright browser skill
> - Updated AGENTS.md with testing documentation
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 0 (Test Setup) -> Tasks 1-3 (Components) -> Task 4 (Verification) -> Task 5 (Documentation)

---

## Context

### Original Request
Implement "Swiss Bold" design improvements across the Next.js website, including:
- Creating a shared footer component with asymmetric grid layout
- Refactoring Home and Blog pages with updated typography
- Setting up test infrastructure following best practices
- Visual verification using Playwright browser skill

### Interview Summary
**Key Discussions**:
- Typography: `font-black` (900) for headlines, `font-light` (300) for taglines
- Spacing: `pt-20 md:pt-48` (mobile unchanged, desktop increased)
- Grid: Strong horizontal dividers only (no vertical rules needed)
- Blog grid: Narrow date column (~80px fixed width)
- Footer: Partial horizontal rule (~60% width), asymmetric layout
- Social URLs: Twitter varies by locale (`en_wangwei_dev` vs `wangwei_dev`)
- Footer labels: Translated to Chinese for zh locale
- Email: `hi@wangwei.dev`

**Research Findings**:
- Project uses Tailwind CSS 4, Inter font with weights 300-900
- No existing test infrastructure - need full setup
- `site-header.tsx` provides Server Component pattern to follow
- i18n via next-intl with `en.json` and `zh.json`
- Build verification via `bun run build --filter=web`

---

## Work Objectives

### Core Objective
Establish a consistent "Swiss Bold" design language across Home and Blog pages with proper component architecture and comprehensive testing.

### Concrete Deliverables
- `apps/web/components/site-footer.tsx` - Shared footer component
- Updated `apps/web/app/[locale]/page.tsx` - Home with new design
- Updated `apps/web/app/[locale]/blog/page.tsx` - Blog with new design
- Updated `apps/web/i18n/locales/en.json` - Footer translations
- Updated `apps/web/i18n/locales/zh.json` - Footer translations
- `apps/web/vitest.config.ts` - Vitest configuration
- `apps/web/__tests__/components/site-footer.test.tsx` - Footer tests
- Updated `AGENTS.md` - Testing guidance

### Definition of Done
- [ ] `bun run build --filter=web` passes with no errors
- [ ] `bun run test --filter=web` passes all component tests
- [ ] Visual verification confirms correct rendering in both locales

### Must Have
- SiteFooter with asymmetric grid (location left, social right)
- Partial horizontal rule (~60% width)
- All-caps letter-spaced social links
- `font-black` headlines, `font-light` taglines
- `pt-20 md:pt-48` hero spacing
- `border-t` horizontal dividers
- Blog 2-column grid with ~80px date column
- Localized footer labels (English + Chinese)
- Locale-aware Twitter URL (en_wangwei_dev vs wangwei_dev)

### Must NOT Have (Guardrails)
- No vertical rule implementation (explicitly descoped)
- No changes to individual blog post pages
- No changes to docs pages
- No footer in individual blog posts (only on index)
- No over-engineered abstraction (keep components simple)
- No inline styles - use Tailwind only

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO
- **User wants tests**: YES - Full setup
- **Framework**: Vitest + React Testing Library
- **Visual verification**: Playwright via browser skill

### Test Setup Task
- Install: `bun add -d vitest @vitejs/plugin-react @testing-library/react @testing-library/dom jsdom`
- Config: Create `apps/web/vitest.config.ts`
- Script: Add `"test": "vitest"` to `apps/web/package.json`
- Verify: `bun run test --filter=web` shows test runner ready

### Component Test Approach
Each UI component gets basic rendering tests:
- Footer renders with correct structure
- Footer displays localized content
- Social links have correct hrefs

### Visual Verification (Agent-Executable)
Using Playwright browser skill:
1. Navigate to `http://localhost:3000`
2. Screenshot home page hero + footer
3. Navigate to `http://localhost:3000/blog`
4. Screenshot blog page hero + footer
5. Navigate to `http://localhost:3000/zh`
6. Verify Chinese locale renders correctly

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 0: Setup test infrastructure [no dependencies]
└── Task 1: Create SiteFooter component + i18n [no dependencies]

Wave 2 (After Wave 1):
├── Task 2: Refactor Home page [depends: 1]
└── Task 3: Refactor Blog page [depends: 1]

Wave 3 (After Wave 2):
├── Task 4: Visual verification [depends: 2, 3]
└── Task 5: Update AGENTS.md [depends: 0, 4]

Critical Path: Task 0 -> Task 1 -> Task 2/3 -> Task 4 -> Task 5
Parallel Speedup: ~30% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 0 | None | 5 | 1 |
| 1 | None | 2, 3 | 0 |
| 2 | 1 | 4 | 3 |
| 3 | 1 | 4 | 2 |
| 4 | 2, 3 | 5 | None |
| 5 | 0, 4 | None | None (final) |

---

## TODOs

- [ ] 0. Setup Test Infrastructure (Vitest + React Testing Library)

  **What to do**:
  - Install dev dependencies: vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/dom, jsdom
  - Create `apps/web/vitest.config.ts` with jsdom environment
  - Add `"test": "vitest"` script to `apps/web/package.json`
  - Create test setup file `apps/web/__tests__/setup.ts` for global config
  - Create example test to verify setup works

  **Must NOT do**:
  - No Jest (use Vitest for better Vite/Next.js compatibility)
  - No complex mocking setup (keep it simple)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration task, straightforward setup
  - **Skills**: None required
    - This is standard tooling setup

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 5
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `apps/web/package.json` - Existing scripts structure to extend

  **External References**:
  - Official docs: https://vitest.dev/guide/ - Vitest setup guide
  - Official docs: https://testing-library.com/docs/react-testing-library/setup - RTL setup

  **Acceptance Criteria**:

  ```bash
  # Agent runs:
  cd apps/web && bun run test -- --run
  # Assert: Exits with code 0 (no failures)
  # Assert: Output contains "1 passed" or similar success message
  ```

  **Commit**: YES
  - Message: `chore(web): setup vitest and react testing library`
  - Files: `apps/web/vitest.config.ts`, `apps/web/package.json`, `apps/web/__tests__/setup.ts`
  - Pre-commit: `bun run test --filter=web -- --run`

---

- [ ] 1. Create SiteFooter Component + Add i18n Translations

  **What to do**:
  - Create `apps/web/components/site-footer.tsx` as Server Component
  - Implement asymmetric grid layout:
    - Left: Location text (stacked)
    - Right: Social links (horizontal, all-caps, letter-spaced)
  - Partial horizontal rule using `w-[60%]` or similar
  - Add locale-aware Twitter URL logic (en_wangwei_dev vs wangwei_dev)
  - Use `getTranslations` from next-intl
  - Add footer translations to both locale files:
    - `en.json`: Add `footer.twitter`, `footer.github`, `footer.email` labels
    - `zh.json`: Add Chinese labels (推特, GitHub, 邮箱)
  - Create component test `apps/web/__tests__/components/site-footer.test.tsx`

  **Must NOT do**:
  - No client component (keep as Server Component like site-header)
  - No hardcoded text (use i18n)
  - No inline styles

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with design system requirements
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Swiss Bold design implementation needs design expertise

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 0)
  - **Blocks**: Tasks 2, 3
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `apps/web/components/site-header.tsx` - Server Component pattern, container width, padding
  - `apps/web/i18n/locales/en.json` - Existing translation structure

  **API/Type References**:
  - `next-intl`: `getTranslations()` for server-side translations

  **Acceptance Criteria**:

  ```bash
  # TypeScript compilation check:
  cd apps/web && bunx tsc --noEmit
  # Assert: No type errors
  
  # Component test:
  cd apps/web && bun run test -- --run site-footer
  # Assert: All tests pass
  ```

  **Visual Structure to Implement**:
  ```
  ─────────────────────────────────── (60% width rule)
  
  Wei Wang                    TWITTER  GITHUB  EMAIL
  Seattle                     (or: 推特  GITHUB  邮箱)
  ```

  **Social URLs**:
  - Twitter EN: `https://twitter.com/en_wangwei_dev`
  - Twitter ZH: `https://twitter.com/wangwei_dev`
  - GitHub: `https://github.com/shadowwalker`
  - Email: `mailto:hi@wangwei.dev`

  **Commit**: YES
  - Message: `feat(web): add SiteFooter component with i18n support`
  - Files: `apps/web/components/site-footer.tsx`, `apps/web/i18n/locales/en.json`, `apps/web/i18n/locales/zh.json`, `apps/web/__tests__/components/site-footer.test.tsx`
  - Pre-commit: `bun run test --filter=web -- --run`

---

- [ ] 2. Refactor Home Page with Swiss Bold Design

  **What to do**:
  - Update typography:
    - Headline: Ensure `font-black` (should already be 900 weight)
    - Tagline: Change to `font-light` (300 weight)
  - Update spacing:
    - Hero padding: `pt-20 md:pt-48` (increase desktop padding)
    - Increase `gap` between sections as needed
  - Add horizontal dividers:
    - Add `border-t border-border` to section separators
  - Replace inline footer with `<SiteFooter />` import
  - Remove the inline footer code (lines ~82-112)

  **Must NOT do**:
  - No vertical rules (explicitly descoped)
  - No changes to posts listing structure (just add border-t if needed)
  - No changes to SiteHeader

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design system implementation with visual precision
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Typography and spacing refinements need design eye

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: Task 4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `apps/web/app/[locale]/page.tsx:1-120` - Current home page implementation
  - `apps/web/components/site-header.tsx` - Import pattern reference

  **WHY Each Reference Matters**:
  - Current page structure shows where to add SiteFooter import and where inline footer lives

  **Acceptance Criteria**:

  ```bash
  # Build check:
  bun run build --filter=web
  # Assert: Build succeeds
  
  # TypeScript check:
  cd apps/web && bunx tsc --noEmit
  # Assert: No type errors
  ```

  **Visual Verification (Agent via Playwright)**:
  ```
  1. Navigate to: http://localhost:3000
  2. Assert: h1 has font-weight 900 (font-black)
  3. Assert: Tagline has font-weight 300 (font-light)
  4. Assert: Footer appears at bottom with asymmetric layout
  5. Assert: Horizontal rule is ~60% width
  6. Screenshot: .sisyphus/evidence/task-2-home-en.png
  
  7. Navigate to: http://localhost:3000/zh
  8. Assert: Chinese footer labels appear (推特, 邮箱)
  9. Screenshot: .sisyphus/evidence/task-2-home-zh.png
  ```

  **Commit**: YES
  - Message: `style(web): apply Swiss Bold design to home page`
  - Files: `apps/web/app/[locale]/page.tsx`
  - Pre-commit: `bun run build --filter=web`

---

- [ ] 3. Refactor Blog Page with Swiss Bold Design

  **What to do**:
  - Update typography to match Home:
    - Headline: `font-black` (900)
    - Subtitle: `font-light` (300)
  - Update spacing:
    - Hero padding: `pt-20 md:pt-48`
  - Implement 2-column asymmetric grid for posts:
    - Date column: ~80px fixed width (`w-20`)
    - Content column: Fill remaining space
    - Use CSS Grid or Flexbox
  - Add horizontal dividers:
    - `border-t border-border` between posts
  - Add `<SiteFooter />` at bottom
  - Ensure `<SiteHeader />` is present (add if missing)

  **Must NOT do**:
  - No changes to individual blog post pages
  - No complex date formatting changes
  - No changes to post content rendering

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design system implementation with grid layout
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Asymmetric grid implementation needs design expertise

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 2)
  - **Blocks**: Task 4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `apps/web/app/[locale]/blog/page.tsx` - Current blog page implementation
  - `apps/web/app/[locale]/page.tsx` - Home page for typography/spacing reference

  **WHY Each Reference Matters**:
  - Blog page shows current post list structure that needs grid refactoring
  - Home page shows the target typography/spacing to match

  **Acceptance Criteria**:

  ```bash
  # Build check:
  bun run build --filter=web
  # Assert: Build succeeds
  ```

  **Visual Verification (Agent via Playwright)**:
  ```
  1. Navigate to: http://localhost:3000/blog
  2. Assert: h1 has font-weight 900
  3. Assert: Each post has date in left column (~80px)
  4. Assert: Post content fills right column
  5. Assert: border-t appears between posts
  6. Assert: Footer appears at bottom
  7. Screenshot: .sisyphus/evidence/task-3-blog.png
  ```

  **Post Grid Structure to Implement**:
  ```
  ─────────────────────────────────── (border-t)
  2024-01-15  |  Post Title
              |  Post description text here...
  ─────────────────────────────────── (border-t)
  2024-01-10  |  Another Post
              |  Description...
  ```

  **Commit**: YES
  - Message: `style(web): apply Swiss Bold design to blog page`
  - Files: `apps/web/app/[locale]/blog/page.tsx`
  - Pre-commit: `bun run build --filter=web`

---

- [ ] 4. Visual Verification with Playwright Browser Skill

  **What to do**:
  - Start dev server: `bun run dev --filter=web`
  - Load Playwright browser skill
  - Verify Home page (EN):
    - Navigate to `http://localhost:3000`
    - Check typography hierarchy
    - Verify footer layout and links
    - Take screenshot
  - Verify Home page (ZH):
    - Navigate to `http://localhost:3000/zh`
    - Verify Chinese translations in footer
    - Verify Twitter link uses `wangwei_dev`
    - Take screenshot
  - Verify Blog page:
    - Navigate to `http://localhost:3000/blog`
    - Check 2-column grid layout
    - Verify footer present
    - Take screenshot
  - Save all screenshots to `.sisyphus/evidence/`

  **Must NOT do**:
  - No automated E2E test creation (just visual verification)
  - No performance testing

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual verification task
  - **Skills**: [`playwright`]
    - `playwright`: Browser automation for visual verification

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 3)
  - **Blocks**: Task 5
  - **Blocked By**: Tasks 2, 3

  **References**:

  **External References**:
  - Playwright skill: Browser automation for visual verification

  **Acceptance Criteria**:

  **Visual Verification (Agent via Playwright)**:
  ```
  1. Start dev server in background
  2. Navigate to: http://localhost:3000
  3. Wait for: page to load fully
  4. Screenshot: .sisyphus/evidence/home-en.png
  5. Verify: Footer has "TWITTER GITHUB EMAIL" links
  
  6. Navigate to: http://localhost:3000/zh  
  7. Screenshot: .sisyphus/evidence/home-zh.png
  8. Verify: Footer has "推特 GITHUB 邮箱" labels
  9. Verify: Twitter href contains "wangwei_dev" (not en_wangwei_dev)
  
  10. Navigate to: http://localhost:3000/blog
  11. Screenshot: .sisyphus/evidence/blog.png
  12. Verify: Posts in 2-column layout with date on left
  
  13. Stop dev server
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/home-en.png`
  - [ ] `.sisyphus/evidence/home-zh.png`
  - [ ] `.sisyphus/evidence/blog.png`

  **Commit**: NO (verification only)

---

- [ ] 5. Update AGENTS.md with Testing Documentation

  **What to do**:
  - Add new "Testing" section to AGENTS.md
  - Document test commands:
    - `bun run test --filter=web` - Run all tests
    - `bun run test --filter=web -- --watch` - Watch mode
    - `bun run test --filter=web -- --run [pattern]` - Run specific tests
  - Document test file conventions:
    - Location: `apps/web/__tests__/`
    - Naming: `*.test.tsx` for component tests
  - Document visual verification approach:
    - Use Playwright browser skill
    - Save evidence to `.sisyphus/evidence/`
  - Document React Testing Library patterns used

  **Must NOT do**:
  - No changing existing AGENTS.md sections
  - No documenting Playwright setup (just usage notes)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Documentation task
  - **Skills**: None required
    - Standard documentation writing

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (final task)
  - **Blocks**: None (final)
  - **Blocked By**: Tasks 0, 4

  **References**:

  **Pattern References**:
  - `AGENTS.md` - Existing documentation structure to extend
  - `apps/web/vitest.config.ts` - Test configuration details (from Task 0)

  **Acceptance Criteria**:

  ```bash
  # Verify AGENTS.md is valid markdown:
  cat AGENTS.md | head -100
  # Assert: Contains new "Testing" section
  # Assert: Contains test command documentation
  ```

  **Commit**: YES
  - Message: `docs: add testing documentation to AGENTS.md`
  - Files: `AGENTS.md`
  - Pre-commit: None

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 0 | `chore(web): setup vitest and react testing library` | vitest.config.ts, package.json, __tests__/setup.ts | bun run test --filter=web -- --run |
| 1 | `feat(web): add SiteFooter component with i18n support` | site-footer.tsx, en.json, zh.json, site-footer.test.tsx | bun run test --filter=web -- --run |
| 2 | `style(web): apply Swiss Bold design to home page` | page.tsx | bun run build --filter=web |
| 3 | `style(web): apply Swiss Bold design to blog page` | blog/page.tsx | bun run build --filter=web |
| 5 | `docs: add testing documentation to AGENTS.md` | AGENTS.md | None |

---

## Success Criteria

### Verification Commands
```bash
# Build passes
bun run build --filter=web
# Expected: Build succeeds with no errors

# Tests pass
bun run test --filter=web -- --run
# Expected: All tests pass

# Type check passes
cd apps/web && bunx tsc --noEmit
# Expected: No type errors
```

### Final Checklist
- [ ] SiteFooter component created with asymmetric grid
- [ ] Partial horizontal rule (~60% width) in footer
- [ ] All-caps letter-spaced social links
- [ ] Home page uses font-black headlines, font-light taglines
- [ ] Home page has pt-20 md:pt-48 spacing
- [ ] Home page has border-t dividers
- [ ] Blog page matches Home typography/spacing
- [ ] Blog page has 2-column grid (~80px date column)
- [ ] Footer appears on both Home and Blog pages
- [ ] Twitter URL varies by locale
- [ ] Footer labels translated to Chinese
- [ ] All tests pass
- [ ] Visual verification screenshots captured
- [ ] AGENTS.md updated with testing docs
