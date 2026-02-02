# Resume Page i18n Refactor

## TL;DR

> **Quick Summary**: Refactor the resume page to support i18n (English/Chinese) by splitting data files, making ResumePaper a pure presentational component, and implementing a sticky action dropdown with integrated language switching.
> 
> **Deliverables**:
> - Split locale data: `data-en.ts`, `data-zh.ts`, `getResumeData(locale)`
> - Refactored `ResumePaper` accepting `data` prop
> - New `ResumeActionButton` client component with sticky desktop + inline mobile layouts
> - Server Component `page.tsx` with locale-aware data loading
> - E2E test for language switching
> 
> **Estimated Effort**: Medium (3-4 hours)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (data layer) → Task 2 (ResumePaper) → Task 3 (ActionButton) → Task 4 (page.tsx) → Task 5 (E2E)

---

## Context

### Original Request
Refactor the resume page at `apps/web/app/[locale]/resume/page.tsx` to:
1. Support i18n with separate English/Chinese data files
2. Make ResumePaper accept data as prop
3. Merge LanguageSwitchButton into action dropdown with sections
4. Implement floating sticky layout for action button on desktop

### Interview Summary
**Key Discussions**:
- **Sticky layout**: CSS `position: sticky` within container bounds
- **Dropdown sections**: Only "Languages" section has visible header label
- **Mobile behavior**: Full-screen resume paper, non-sticky ghost button in top-right of paper
- **Server Component**: Convert page.tsx to Server Component for better SEO
- **Test strategy**: E2E test with Playwright

**Research Findings**:
- DropdownMenu has `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuGroup` for sections
- `LOCALES_CONFIG` from `@/i18n/constants.ts` has display names for each locale
- Language switching logic exists in `LanguageSwitchButton` component

---

## Work Objectives

### Core Objective
Enable i18n support for the resume page by decoupling data from presentation and integrating language switching into a unified sticky action menu.

### Concrete Deliverables
- `apps/web/app/[locale]/resume/_/data.ts` - types + `getResumeData(locale)` function
- `apps/web/app/[locale]/resume/_/data-en.ts` - English resume data
- `apps/web/app/[locale]/resume/_/data-zh.ts` - Chinese resume data (placeholder)
- `apps/web/app/[locale]/resume/_/resume.tsx` - Updated with `data` prop
- `apps/web/app/[locale]/resume/_/resume-action-button.tsx` - New client component
- `apps/web/app/[locale]/resume/page.tsx` - Server Component with locale data
- `apps/web/e2e/resume-language.spec.ts` - E2E test for language switching

### Definition of Done
- [ ] `bun run build` passes without errors
- [ ] `bun run check` passes without errors
- [ ] Resume renders correctly at `/resume` (English) and `/zh/resume` (Chinese)
- [ ] Language switching via dropdown changes URL and content
- [ ] Action button is sticky on desktop, inline on mobile
- [ ] Print functionality works (cmd/ctrl+P shows resume correctly)
- [ ] E2E test passes: `bun run test:e2e --grep resume`

### Must Have
- Type-safe locale data accessor with fallback to English
- Responsive sticky/inline behavior based on screen size
- Preserved print CSS functionality
- All existing actions working (Copy Link, Print, Download PDF)
- Language switching updates URL (locale-aware routing)

### Must NOT Have (Guardrails)
- ❌ No actual Chinese translation implementation (user handles this)
- ❌ No changes to ResumePaper's internal rendering logic (only props)
- ❌ No complex state management (keep simple client-side logic)
- ❌ No additional features to action buttons (scope freeze)
- ❌ No breaking changes to existing print styles
- ❌ No JavaScript-based sticky positioning (use CSS only)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES (Playwright in `apps/web/e2e/`)
- **User wants tests**: E2E test for language switching
- **Framework**: Playwright

### Automated Verification

**For UI changes** (using Playwright):
- Navigate to `/resume`, verify English content visible
- Click action button, verify dropdown appears with correct sections
- Click Chinese in Languages section, verify URL changes to `/zh/resume`
- Verify Chinese content renders (placeholder text if not translated)
- Verify Print/Download/Copy actions still trigger correctly

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Create i18n data layer
└── (Task 2 blocked by Task 1)

Wave 2 (After Wave 1):
├── Task 2: Refactor ResumePaper
└── Task 3: Create ResumeActionButton

Wave 3 (After Wave 2):
└── Task 4: Refactor page.tsx

Wave 4 (After Wave 3):
└── Task 5: E2E Test

Critical Path: Task 1 → Task 2 → Task 4 → Task 5
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3, 4 | None (foundational) |
| 2 | 1 | 4 | 3 |
| 3 | 1 | 4 | 2 |
| 4 | 2, 3 | 5 | None |
| 5 | 4 | None | None (final) |

---

## TODOs

- [ ] 1. Create i18n Data Layer

  **What to do**:
  - Rename `apps/web/app/[locale]/resume/_/data.ts` to `data-en.ts`
  - Keep only the `RESUME_DATA` export in `data-en.ts` (remove interfaces)
  - Create `data-zh.ts` with placeholder Chinese data (copy structure, add TODO comments for translation)
  - Create new `data.ts` with:
    - All type interfaces (`ResumeData`, `ResumeProfile`, etc.)
    - `getResumeData(locale: string): ResumeData` function that returns locale-specific data
    - Fallback to English for unknown locales

  **Must NOT do**:
  - Don't create complex caching or lazy loading
  - Don't change the data structure/interfaces

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None needed - straightforward file manipulation

  **Parallelization**:
  - **Can Run In Parallel**: NO (foundational, everything depends on this)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 2, 3, 4
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `apps/web/app/[locale]/resume/_/data.ts` - Current data file structure and interfaces

  **Type References**:
  - `ResumeData`, `ResumeProfile`, `ResumeExperience`, etc. - Types to extract to new `data.ts`

  **API/Convention References**:
  - `apps/web/i18n/constants.ts:LOCALES` - Available locales array for validation

  **Acceptance Criteria**:

  ```bash
  # Verify files exist
  ls apps/web/app/[locale]/resume/_/data.ts
  ls apps/web/app/[locale]/resume/_/data-en.ts
  ls apps/web/app/[locale]/resume/_/data-zh.ts

  # Verify TypeScript compilation
  bun run build
  # Assert: Build succeeds

  # Verify function returns correct data
  bun -e "import { getResumeData } from './apps/web/app/[locale]/resume/_/data'; console.log(getResumeData('en').profile.name)"
  # Assert: Output is "Wei Wang"

  bun -e "import { getResumeData } from './apps/web/app/[locale]/resume/_/data'; console.log(getResumeData('invalid').profile.name)"
  # Assert: Output is "Wei Wang" (fallback to English)
  ```

  **Commit**: YES
  - Message: `feat(resume): add i18n data layer with locale-specific files`
  - Files: `apps/web/app/[locale]/resume/_/data.ts`, `apps/web/app/[locale]/resume/_/data-en.ts`, `apps/web/app/[locale]/resume/_/data-zh.ts`
  - Pre-commit: `bun run build`

---

- [ ] 2. Refactor ResumePaper Component

  **What to do**:
  - Update `apps/web/app/[locale]/resume/_/resume.tsx` to accept `data: ResumeData` as prop
  - Remove the direct import of `RESUME_DATA`
  - Update the component signature: `export function ResumePaper({ data }: { data: ResumeData })`
  - Destructure from `data` prop instead of imported constant

  **Must NOT do**:
  - Don't change any internal rendering logic
  - Don't add any data fetching or state management
  - Don't modify the JSX structure

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None needed - simple prop extraction

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: Task 4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `apps/web/app/[locale]/resume/_/resume.tsx:13-22` - Current component structure and data destructuring

  **Type References**:
  - `apps/web/app/[locale]/resume/_/data.ts:ResumeData` - Type for the data prop

  **Acceptance Criteria**:

  ```bash
  # Verify TypeScript compilation
  bun run check
  # Assert: No TypeScript errors related to ResumePaper

  # Verify prop is required
  bun -e "import { ResumePaper } from './apps/web/app/[locale]/resume/_/resume'; console.log(typeof ResumePaper)"
  # Assert: Output is "function"
  ```

  **Commit**: YES (group with Task 3)
  - Message: `refactor(resume): make ResumePaper accept data as prop`
  - Files: `apps/web/app/[locale]/resume/_/resume.tsx`
  - Pre-commit: `bun run check`

---

- [ ] 3. Create ResumeActionButton Component

  **What to do**:
  - Create `apps/web/app/[locale]/resume/_/resume-action-button.tsx`
  - This is a client component (`'use client'`)
  - Props: `variant?: 'floating' | 'inline'` (default: 'floating')
  - Implements:
    - Actions section: Copy Link, Print, Download PDF (existing logic)
    - Languages section: Header "Languages" + locale options from `LOCALES_CONFIG`
    - Language switching using `useRouter`, `usePathname` from `@/i18n/navigation`
  - Floating variant: `sticky top-8` positioning, `variant="outline"` button
  - Inline variant: `variant="ghost"` button, no sticky positioning
  - Dropdown structure:
    ```
    DropdownMenuGroup (Actions - no label)
      DropdownMenuItem: Copy Link
      DropdownMenuItem: Print
      DropdownMenuItem: Download PDF
    DropdownMenuSeparator
    DropdownMenuGroup (Languages)
      DropdownMenuLabel: "Languages"
      DropdownMenuItem: English
      DropdownMenuItem: 简体中文
    ```

  **Must NOT do**:
  - Don't add new action types
  - Don't modify language switching logic (copy from LanguageSwitchButton)
  - Don't use JavaScript for sticky positioning

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Component design with Tailwind CSS responsive patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 2)
  - **Blocks**: Task 4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `apps/web/app/[locale]/resume/page.tsx:14-53` - Current dropdown and action handlers
  - `apps/web/components/language-switch-button.tsx:24-32` - Language switching logic with router

  **API/Type References**:
  - `@workspace/ui/components/dropdown-menu` - DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup
  - `@/i18n/constants:LOCALES_CONFIG` - Locale display names
  - `@/i18n/navigation:useRouter, usePathname` - Locale-aware navigation

  **Acceptance Criteria**:

  ```bash
  # Verify file exists and compiles
  bun run check
  # Assert: No TypeScript errors

  # Verify component exports correctly
  bun -e "import { ResumeActionButton } from './apps/web/app/[locale]/resume/_/resume-action-button'; console.log(typeof ResumeActionButton)"
  # Assert: Output is "function"
  ```

  **Commit**: YES (group with Task 2)
  - Message: `feat(resume): add ResumeActionButton with language switching`
  - Files: `apps/web/app/[locale]/resume/_/resume-action-button.tsx`
  - Pre-commit: `bun run check`

---

- [ ] 4. Refactor Page Layout

  **What to do**:
  - Convert `apps/web/app/[locale]/resume/page.tsx` to Server Component (remove `'use client'`)
  - Accept `params: Promise<{ locale: string }>` (Next.js 15+ async params)
  - Import `getResumeData` from `_/data` and get locale-specific data
  - Import `ResumePaper` and `ResumeActionButton`
  - Implement responsive layout:
    - Desktop (md+): `flex` container with resume paper + sticky sidebar
    - Mobile: Full-width resume paper with inline action button inside
  - Layout structure (desktop):
    ```jsx
    <div className="min-h-screen py-8 print:p-0">
      <div className="mx-auto flex max-w-[calc(210mm+8rem)] gap-4 px-4 print:max-w-none print:px-0">
        {/* Main content */}
        <div className="flex-1 max-w-[210mm]">
          <ResumePaper data={data} />
        </div>
        {/* Sticky sidebar - desktop only */}
        <div className="hidden md:block sticky top-8 h-fit">
          <ResumeActionButton variant="floating" />
        </div>
      </div>
    </div>
    ```
  - For mobile, add inline button inside ResumePaper or above it (visible only on mobile)
  - Remove LanguageSwitchButton import

  **Must NOT do**:
  - Don't change print CSS behavior
  - Don't add loading states or suspense boundaries
  - Don't import LanguageSwitchButton

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`, `next-best-practices`]
    - `frontend-ui-ux`: Responsive layout implementation
    - `next-best-practices`: Server Component patterns, async params

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential)
  - **Blocks**: Task 5
  - **Blocked By**: Tasks 2, 3

  **References**:

  **Pattern References**:
  - `apps/web/app/[locale]/resume/page.tsx` - Current page structure and action handlers
  - `apps/web/app/[locale]/resume/_/resume.tsx:37` - Current A4 paper width classes

  **API/Type References**:
  - `apps/web/app/[locale]/resume/_/data.ts:getResumeData` - Locale data accessor
  - `apps/web/app/[locale]/resume/_/resume.tsx:ResumePaper` - Paper component with data prop
  - `apps/web/app/[locale]/resume/_/resume-action-button.tsx:ResumeActionButton` - Action button

  **Next.js References**:
  - Next.js 15+ async params pattern: `params: Promise<{ locale: string }>`

  **Acceptance Criteria**:

  **Automated Verification (using Playwright):**
  ```
  # Agent executes via Playwright browser automation:
  1. Navigate to: http://localhost:3000/resume
  2. Assert: Resume paper is visible with "Wei Wang" text
  3. Assert: Action button visible on right side (desktop viewport)
  4. Click: Action button (3-dot menu)
  5. Assert: Dropdown shows "Copy Resume Link", "Print Resume", "Download As PDF"
  6. Assert: Dropdown shows "Languages" header with "English", "简体中文"
  7. Click: "简体中文" option
  8. Assert: URL changes to contain "/zh/resume"
  9. Screenshot: .sisyphus/evidence/task-4-desktop-layout.png
  
  # Mobile viewport test:
  1. Set viewport: { width: 375, height: 667 }
  2. Navigate to: http://localhost:3000/resume
  3. Assert: Resume paper visible, action button visible (not in sidebar)
  4. Screenshot: .sisyphus/evidence/task-4-mobile-layout.png
  ```

  ```bash
  # Build verification
  bun run build
  # Assert: Build succeeds with no errors

  bun run check
  # Assert: Lint passes
  ```

  **Commit**: YES
  - Message: `refactor(resume): convert to Server Component with sticky layout`
  - Files: `apps/web/app/[locale]/resume/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 5. Add E2E Test for Language Switching

  **What to do**:
  - Create `apps/web/e2e/resume-language.spec.ts`
  - Test cases:
    1. Resume page loads with English content at `/resume`
    2. Action dropdown opens and shows correct sections
    3. Clicking Chinese switches to `/zh/resume`
    4. Resume content changes (verify with placeholder or specific text)
    5. Clicking English from Chinese page switches back to `/resume`
    6. Print action triggers print dialog (verify button exists and is clickable)

  **Must NOT do**:
  - Don't test actual PDF download (browser-specific)
  - Don't test clipboard functionality (requires permissions)
  - Don't test specific translation content (not implemented yet)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None needed - straightforward Playwright test

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (final)
  - **Blocks**: None
  - **Blocked By**: Task 4

  **References**:

  **Pattern References**:
  - `apps/web/e2e/` - Existing E2E test patterns
  - `apps/web/playwright.config.ts` - Playwright configuration

  **Test References**:
  - Existing E2E tests in `apps/web/e2e/` for test structure patterns

  **Acceptance Criteria**:

  ```bash
  # Run the specific test
  cd apps/web && bun run test:e2e --grep "resume"
  # Assert: All tests pass

  # Or run all E2E tests
  bun run test:e2e
  # Assert: No regressions
  ```

  **Commit**: YES
  - Message: `test(resume): add E2E test for language switching`
  - Files: `apps/web/e2e/resume-language.spec.ts`
  - Pre-commit: `bun run test:e2e --grep resume`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(resume): add i18n data layer with locale-specific files` | `_/data.ts`, `_/data-en.ts`, `_/data-zh.ts` | `bun run build` |
| 2 + 3 | `refactor(resume): make ResumePaper accept data prop and add action button` | `_/resume.tsx`, `_/resume-action-button.tsx` | `bun run check` |
| 4 | `refactor(resume): convert to Server Component with sticky layout` | `page.tsx` | `bun run build` |
| 5 | `test(resume): add E2E test for language switching` | `e2e/resume-language.spec.ts` | `bun run test:e2e` |

---

## Success Criteria

### Verification Commands
```bash
bun run build     # Expected: Build succeeds
bun run check     # Expected: No lint errors
bun run test:e2e  # Expected: All tests pass
```

### Final Checklist
- [ ] All "Must Have" requirements present
- [ ] All "Must NOT Have" guardrails respected
- [ ] English resume renders at `/resume`
- [ ] Chinese resume renders at `/zh/resume`
- [ ] Action button sticky on desktop, inline on mobile
- [ ] Language switching updates URL and content
- [ ] Print functionality preserved
- [ ] E2E tests passing
