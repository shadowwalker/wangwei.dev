# Project Context

This file provides guidance to Claude Code / Gemini CLI / Codex CLI when working with code in this repository.

## Commands

```bash
# Development
bun run dev              # Start all apps with Turbo (runs Next.js with Turbopack)
bun run build            # Build all packages and apps
bun run check            # Lint with Ultracite/Biome
bun run fix              # Auto-fix formatting and lint issues

# Web app specific (from apps/web/)
bun --bun next dev --turbopack   # Dev server with Turbopack
bun --bun next build             # Production build

# Database (from packages/db/)
bun run predev           # Start local Neon DB (Docker) and push schema
bun run dev              # Open Drizzle Studio

# Adding shadcn/ui components
bunx --bun shadcn@latest add <component> -c apps/web
```

## Architecture

**Monorepo Structure (Turborepo + Bun workspaces)**
```
apps/web/          → Next.js 16 application (App Router)
packages/db/       → Database package with Drizzle ORM (@workspace/db)
packages/ui/       → Shared component library (@workspace/ui)
packages/typescript-config/  → Shared TS configs
```

**Key Technologies**
- Next.js 16 with App Router and React 19
- Better Auth for authentication (email/password, OAuth)
- Drizzle ORM with Neon PostgreSQL (serverless)
- Fumadocs for documentation (MDX-based, with search via Orama)
- next-intl for i18n (English + Chinese, locale prefix "as-needed")
- Tailwind CSS 4 with shadcn/ui components
- Ultracite/Biome for linting and formatting
- Zod + @t3-oss/env-nextjs for environment validation

**Routing & i18n**
- Routes use `[locale]` dynamic segment: `app/[locale]/page.tsx`
- Locale config in `apps/web/i18n/constants.ts`
- Translations in `apps/web/i18n/locales/{en,zh}.json`
- Navigation helpers in `apps/web/i18n/navigation.ts` (use `Link`, `useRouter` from here)

**Database (@workspace/db)**
- Drizzle ORM with Neon PostgreSQL serverless driver
- Schema: `packages/db/src/schema.ts` → import from `@workspace/db/schema`
- **Rule**: All tables MUST use `baseSchema` helper to include `id`, `createdAt`, `updatedAt` columns
- DB client: `packages/db/src/index.ts` → import `db` from `@workspace/db`
- Local dev: Docker Compose runs Neon local (`packages/db/docker-compose.yml`)
- Migrations: `drizzle-kit push` (schema-first), output to `packages/db/migrations/`

**Authentication (Better Auth)**
- Server config: `apps/web/lib/auth.ts` (Drizzle adapter, email/password enabled)
- Client helpers: `apps/web/lib/auth-client.ts` (signIn, signUp, signOut, useSession)
- API routes: `apps/web/app/api/auth/[...all]/route.ts`
- Auth tables in schema: user, session, account, verification

**Component Organization**
- Shared UI components: `packages/ui/src/components/` → import from `@workspace/ui/components/<name>`
- App-specific components: `apps/web/components/`
- Utility function `cn()`: `@workspace/ui/lib/utils`

**Environment Variables**
- Client-side: `apps/web/lib/env/client.ts` (NEXT_PUBLIC_* vars)
- Server-side: `apps/web/lib/env/server.ts` (server-only import)
- Both use Zod validation; add new vars to the appropriate schema

**Documentation Content**
- MDX files in `apps/web/content/docs/`
- Localized docs: `index.mdx` (English), `index.zh.mdx` (Chinese)
- Source configuration: `apps/web/source.config.ts`

## Code Style

This project uses **Ultracite** (Biome-based) for automated formatting and linting. Run `bun run fix` before committing.

**Formatting**: Single quotes, no semicolons, no trailing commas

### Type Safety
- Prefer `unknown` over `any`
- Use const assertions (`as const`) for immutable values
- Leverage TypeScript's type narrowing instead of type assertions
- Extract magic numbers into named constants

### Modern JavaScript/TypeScript
- Arrow functions for callbacks
- `for...of` over `.forEach()` and indexed loops
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Template literals over string concatenation
- Destructuring for object/array assignments
- `const` by default, `let` only when needed, never `var`

### Async & Promises
- Always `await` promises in async functions
- Use `async/await` over promise chains
- Handle errors with try-catch blocks

### React & JSX
- Function components only
- Hooks at top level, never conditionally
- All dependencies in hook arrays
- Unique `key` props (prefer IDs over indices)
- React 19: use `ref` prop directly (no `forwardRef`)
- Prefer Server Components; use `'use client'` only when needed
- Semantic HTML with ARIA attributes for accessibility

### Code Organization
- Early returns over nested conditionals
- Extract complex conditions into named booleans
- Keep functions focused with low cognitive complexity

### Security
- `rel="noopener"` with `target="_blank"`
- Avoid `dangerouslySetInnerHTML`

### Performance
- Avoid spread in loop accumulators
- Top-level regex literals
- Specific imports over namespace imports
- Use Next.js `<Image>` component

### Testing
- Assertions inside `it()` or `test()` blocks
- Async/await over done callbacks
- No `.only` or `.skip` in commits

Pre-commit hooks (Lefthook) automatically run `fix` and `build`.

## Debugging With Chrome DevTools (Reflective Notes)

Use this flow when auth/profile pages don’t behave as expected on `http://localhost:3000`.

### 1) Reproduce + Capture the Failure
- Open DevTools → **Console** and **Network**.
- Reproduce the exact action (sign in, sign up, save profile).
- In **Network**, filter by `auth` and inspect all requests under `/api/auth/*` (status, response body, timing).

### 2) Validate Cookies + Session State
- DevTools → **Application** → **Cookies** → `http://localhost:3000`
- Confirm cookies are being set/updated after auth actions.
- If cookies are missing, cross-check:
  - Request/response in **Network** (Set-Cookie headers)
  - Environment vars (`BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`) in `apps/web/.env.local`
  - Origin issues (DevTools Console warnings + Network errors)

### 3) Debug Redirects and Locale Prefixing
- In **Network**, check whether a successful auth request is followed by a redirect to `/profile` or `/<locale>/profile`.
- If you end up on the wrong locale path, confirm `apps/web/i18n/routing.ts` (`localePrefix: 'as-needed'`) and how links/redirects are constructed.

### 4) Profile Save Issues
- When “Save changes” fails:
  - Confirm the `updateUser` request is sent and returns `200`.
  - Inspect payload and response in **Network**.
  - Check **Console** for hydration/runtime errors.
  - Verify DB schema columns exist (`bio`, `company`, `website`) in `packages/db/src/schema.ts`.

### 5) Headless DevTools Automation (Puppeteer Scripts)
If you have the Chrome DevTools skill scripts installed locally, you can quickly validate UI + routing without manual clicking:

```bash
cd /Users/wei/.agents/skills/chrome-devtools/scripts
npm install

node navigate.js --url http://localhost:3000/auth
node screenshot.js --url http://localhost:3000/auth --output /Users/wei/Developer/v2.getshortcuts.ai/temp/screenshots/auth.png
node snapshot.js --url http://localhost:3000/auth --output /Users/wei/Developer/v2.getshortcuts.ai/temp/screenshots/auth.snapshot.json
```

Why this helps:
- `snapshot.js` gives you a stable list of clickable/fillable selectors to reproduce flows quickly.
- `screenshot.js` provides “proof” artifacts you can diff when UI changes.

## Retrospective: Avoidable Friction + What To Clarify Up Front

This repo is already structured well, but a few recurring sources of friction showed up while implementing auth + profile and validating flows.

### 1) Ambiguity in UX + Routing Requirements
**What went wrong:** “Add auth page and profile page” leaves open questions (paths, redirect behavior, UI states, locale handling).

**What would have prevented it:**
- Explicitly specify required routes: e.g. `/auth` vs `/sign-in`, `/profile` vs `/account`, and which should be public/protected.
- Define post-auth behavior: redirect target after sign-in/sign-up, and what happens if already signed in.
- Define locale expectations: should `/zh/auth` exist, or should `/auth` handle locale implicitly?

**Project-context update:** When adding new pages, always document:
- Route(s) + whether protected
- Default redirect logic
- Locale behavior (prefixing and link generation)

### 2) `next-intl` Client Messages Were Not Actually Available
**What went wrong:** Client components using `useTranslations()` rendered message keys in automation snapshots instead of translated strings. This is usually a sign that `NextIntlClientProvider` isn’t receiving `messages`.

**What would have prevented it:**
- A clear “how i18n works end-to-end” note that distinguishes:
  - server translations (`getTranslations()`)
  - client translations (`useTranslations()`) and the requirement to pass `messages` to `NextIntlClientProvider`

**Recommended future approach:**
- If you want client components to translate directly, refactor the provider pipeline so the client provider gets messages.
- If you want to keep providers purely client-side, pass translated copy from server components into client components (works well for forms).

### 3) Locale Navigation Helpers vs Next.js `redirect()`
**What went wrong:** Importing `redirect` from `apps/web/i18n/navigation.ts` can be stricter than Next’s `next/navigation` redirect signature, which caused type errors when using string-only redirects.

**What would have prevented it:**
- A documented rule of thumb:
  - Use `Link` / `useRouter` from `@/i18n/navigation` in React components.
  - Use `redirect()` from `next/navigation` inside Server Components/Route handlers, and build locale-aware URLs manually from `params.locale` when needed.

### 4) Better Auth “Additional User Fields” Need Client Typing Support
**What went wrong:** Adding `user.additionalFields` on the server does not automatically type-enable `updateUser({...})` on the client unless you include the client plugin that infers those fields.

**What would have prevented it:**
- A checklist item in the auth section:
  - Add DB columns
  - Add `user.additionalFields` in `apps/web/lib/auth.ts`
  - Add `inferAdditionalFields<typeof auth>()` in `apps/web/lib/auth-client.ts`
  - Push schema (`bunx drizzle-kit push`)

### 5) Tooling Gotchas (Shell + DB + Automation)
**What went wrong / recurring hazards:**
- Zsh globs treat paths like `app/[locale]` and `docs/[[...slug]]` specially unless quoted.
- `drizzle-kit` may not be on PATH inside `packages/db`; `bunx drizzle-kit push` is reliable.
- Chrome automation scripts require a one-time `npm install` in the scripts folder.

**What would have prevented it:** A small “Gotchas” section calling these out.

## Recommended Project Context Additions (Actionable)

Add/keep these rules to reduce future friction:

### i18n Rules of Thumb
- Prefer `getTranslations()` for page-level copy in Server Components.
- If a Client Component needs translation, ensure `NextIntlClientProvider` receives `messages` (otherwise pass translated strings as props).
- Quote bracketed paths in shell commands, e.g. `ls 'apps/web/app/[locale]'`.

### Auth Implementation Checklist
- Server session check: `auth.api.getSession({ headers: await headers() })`
- Protected route flow:
  - no session → redirect to locale-aware `/auth`
  - has session → redirect to locale-aware `/profile`
- Additional user fields:
  - DB columns in `packages/db/src/schema.ts`
  - `user.additionalFields` in `apps/web/lib/auth.ts`
  - `inferAdditionalFields<typeof auth>()` in `apps/web/lib/auth-client.ts`

### Database Commands
```bash
cd packages/db
bunx drizzle-kit push
```
