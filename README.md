# Next App

A production-ready Next.js 16 monorepo template with documentation, internationalization, and modern tooling.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Package Manager**: Bun with Turborepo
- **Database**: Drizzle ORM + Neon PostgreSQL (serverless)
- **Authentication**: Better Auth (email/password, OAuth-ready)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Documentation**: Fumadocs (MDX-based with full-text search)
- **i18n**: next-intl (English + Chinese)
- **Code Quality**: Ultracite (Biome-based linting/formatting)
- **Type Safety**: TypeScript 5.9 with Zod validation

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Project Structure

```
apps/
  web/                  # Next.js application
    app/[locale]/       # Localized routes
    app/api/auth/       # Better Auth API routes
    components/         # App-specific components
    content/docs/       # MDX documentation
    i18n/               # Internationalization config
    lib/auth.ts         # Server-side auth config
    lib/auth-client.ts  # Client-side auth helpers
    lib/env/            # Environment variable validation

packages/
  db/                   # Database package (@workspace/db)
    src/schema.ts       # Drizzle schema (auth tables)
    src/index.ts        # DB client export
  ui/                   # Shared component library (@workspace/ui)
  typescript-config/    # Shared TypeScript configurations
```

## Adding Components

Add shadcn/ui components to the shared package:

```bash
bunx --bun shadcn@latest add button -c apps/web
```

Import in your app:

```tsx
import { Button } from '@workspace/ui/components/button'
```

## Environment Variables

Environment variables are validated with Zod. Add new variables to:
- `apps/web/lib/env/client.ts` for client-side (NEXT_PUBLIC_*)
- `apps/web/lib/env/server.ts` for server-side secrets

## Database

Local development uses Neon PostgreSQL via Docker:

```bash
cd packages/db
bun run predev    # Start Neon local + push schema
bun run dev       # Open Drizzle Studio
```

Schema is defined in `packages/db/src/schema.ts`. Use `drizzle-kit push` for schema changes.

## Authentication

Better Auth is configured with email/password. Usage:

```tsx
// Server-side
import { auth } from '@/lib/auth'

// Client-side
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client'
```

Auth tables (user, session, account, verification) are in the Drizzle schema.

## Internationalization

Two locales are configured: English (default) and Chinese.

- Add translations: `apps/web/i18n/locales/{en,zh}.json`
- Add localized content: `content/docs/page.mdx` and `content/docs/page.zh.mdx`
- Use navigation helpers from `@/i18n/navigation` for locale-aware routing

## Code Quality

```bash
bun run check          # Lint check
bun run fix            # Auto-fix issues
```

Pre-commit hooks automatically format code and verify builds.

## Deployment

Configured for Vercel with Bun runtime. Push to deploy.
