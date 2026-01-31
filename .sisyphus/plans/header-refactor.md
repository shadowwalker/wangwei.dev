# Plan: Refactor Header & Design Iteration

## TL;DR
Refactor the site header into a 3-part Swiss Bold layout, convert the theme switcher to a cycling icon button, and update navigation links. Follow up with a browser-based design review of key pages.

## 1. Refactor Theme Switcher
**File**: `apps/web/components/theme-switch-button.tsx`

- [ ] **Convert to Cycling Logic**:
    - Remove `DropdownMenu` components.
    - Implement `onClick` handler to cycle state: `system` -> `light` -> `dark` -> `system`.
    - Use `next-themes`'s `setTheme`, `theme` (active), and `resolvedTheme` (for icon rendering).
- [ ] **Icon Logic**:
    - Show `Laptop` when `theme === 'system'`.
    - Show `Sun` when `theme === 'light'`.
    - Show `Moon` when `theme === 'dark'`.
    - Maintain `suppressHydrationWarning` or mounted check to prevent mismatches.
- [ ] **Styling**:
    - Ensure button matches the "Swiss Bold" aesthetic (minimalist, likely `variant="ghost"`).

## 2. Refactor Site Header
**File**: `apps/web/components/site-header.tsx`

- [ ] **Layout Structure**:
    - Change container to support 3 distinct sections (Left, Middle, Right).
    - Suggest using a Grid or Flex with `justify-between` and specific widths/flex-basis to ensure the Middle section is truly centered if desired, or just balanced.
    - **Left**: Logo (`WW` linked to `/`).
    - **Middle**: Navigation Links.
    - **Right**: Action Icons Group.
- [ ] **Navigation Items (Middle)**:
    - Update links to:
        1.  Home (`/`) - *Check if "Home" text is needed or if Logo suffices. Plan assumes "Home" link text based on requirements.*
        2.  Blog (`/blog`) - Existing.
        3.  Resume (`/resume`) - **New Item**.
        4.  Documentation (`/docs`) - Rename label from "About" to "Documentation" (requires `en.json`/`zh.json` update).
- [ ] **Action Icons (Right)**:
    - **Profile/Auth**:
        - Use `User` icon from `lucide-react`.
        - Logic: Check `session`. If exists -> Link to `/profile`. Else -> Link to `/auth`.
        - Remove text labels, keep as icon-only `Button` (ghost variant).
    - **Theme**: Insert new cycling `ThemeSwitchButton`.
    - **Language**: Keep existing `LanguageSwitchButton` (dropdown). Ensure it aligns visually with other icons.
- [ ] **Localization Updates**:
    - Update `apps/web/i18n/locales/en.json` and `zh.json`:
        - Add/Update keys for "Documentation" and "Resume" if strictly needed for nav labels.

## 3. Design Review & Iteration
**Tools**: Browser Agent (`puppeteer` or similar via `dev-browser` skill).

- [ ] **Automated Tour**:
    - Visit `/` (Home).
    - Visit `/blog` (List).
    - Visit `/blog/[slug]` (Post).
    - Visit `/resume`.
- [ ] **Critique & Refine**:
    - Evaluate typography hierarchy, whitespace, and alignment.
    - Check "Swiss Bold" alignment (strong grids, confident typography, minimal clutter).
    - **Iterate**: Implement CSS/Tailwind fixes based on findings.

## Verification
- **Manual**:
    - Click theme button 4 times to verify cycle.
    - Verify all nav links work.
    - Verify auth icon redirects correctly based on state.
    - Check mobile responsiveness (hamburger menu needed? or just stack? *Assumption: Keep simple for now, maybe stack or scroll for "Swiss" minimalism*).
