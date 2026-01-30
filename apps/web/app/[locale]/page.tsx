import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { ArrowRight, BookOpen, Braces, Layers3, Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import LanguageSwitchButton from '@/components/language-switch-button'
import ThemeSwitchButton from '@/components/theme-switch-button'
import { Link } from '@/i18n/navigation'
import { getServerSession } from '@/lib/session'

const STACK = [
  {
    label: 'Framework',
    value: 'Next.js 16 (App Router) + React 19 + Turbopack'
  },
  { label: 'Monorepo', value: 'Turborepo + Bun workspaces' },
  { label: 'Database', value: 'Drizzle ORM + Neon Postgres (serverless)' },
  { label: 'Auth', value: 'Better Auth (email/password, OAuth-ready)' },
  { label: 'Styling', value: 'Tailwind CSS 4 + shadcn/ui' },
  { label: 'Docs', value: 'Fumadocs (MDX + full-text search)' },
  { label: 'i18n', value: 'next-intl (English + Chinese)' },
  { label: 'Quality', value: 'Ultracite (Biome lint/format)' },
  { label: 'Types', value: 'TypeScript 5.9 + Zod validation' }
] as const

const STRUCTURE = [
  'apps/web  — Next.js app (App Router, locales, API routes)',
  'packages/db — Drizzle schema + DB client (@workspace/db)',
  'packages/ui — shared shadcn/ui components + Tailwind globals',
  'packages/typescript-config — shared TS configs'
] as const

const BATTERIES = [
  { labelKey: 'batteries.auth', value: 'Better Auth' },
  { labelKey: 'batteries.db', value: 'Drizzle + Neon' },
  { labelKey: 'batteries.docs', value: 'Fumadocs' },
  { labelKey: 'batteries.i18n', value: 'next-intl' },
  { labelKey: 'batteries.quality', value: 'Ultracite' },
  { labelKey: 'batteries.deploy', value: 'Vercel-ready' }
] as const

export default async function Page() {
  const t = await getTranslations('page.home')
  const session = await getServerSession()

  return (
    <main className='relative flex-1'>
      <div
        aria-hidden='true'
        className={cn(
          'pointer-events-none absolute inset-0 opacity-70',
          'bg-[linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)]',
          'bg-[size:44px_44px]',
          'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]'
        )}
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_65%_at_50%_0%,rgba(0,0,0,0.08)_0%,transparent_65%)] dark:bg-[radial-gradient(60%_65%_at_50%_0%,rgba(255,255,255,0.10)_0%,transparent_65%)]'
      />

      <header className='relative border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/50'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-3'>
            <div className='grid size-9 place-items-center rounded-lg border bg-background shadow-xs'>
              <Sparkles className='size-4' />
            </div>
            <div className='leading-tight'>
              <div className='font-semibold tracking-tight'>{t('brand')}</div>
              <div className='text-muted-foreground text-xs'>
                {t('brandSubtitle')}
              </div>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            {session ? (
              <Button asChild size='sm' variant='secondary'>
                <Link href='/profile'>{t('header.profile')}</Link>
              </Button>
            ) : (
              <>
                <Button asChild size='sm' variant='ghost'>
                  <Link href='/auth'>{t('header.signIn')}</Link>
                </Button>
                <Button asChild size='sm' variant='secondary'>
                  <Link href='/auth?mode=signUp'>{t('header.signUp')}</Link>
                </Button>
              </>
            )}
            <ThemeSwitchButton />
            <LanguageSwitchButton />
          </div>
        </div>
      </header>

      <section className='relative mx-auto max-w-6xl px-6 pt-14 pb-10'>
        <div className='inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-muted-foreground text-xs shadow-xs backdrop-blur'>
          <Braces className='size-3.5' />
          <span>{t('kicker')}</span>
        </div>

        <div className='mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end'>
          <div>
            <h1 className='text-balance font-semibold text-4xl tracking-tight md:text-5xl'>
              {t('title')}
            </h1>
            <p className='mt-4 max-w-[62ch] text-balance text-base text-muted-foreground leading-relaxed md:text-lg'>
              {t('subtitle')}
            </p>

            <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Button asChild className='justify-center'>
                <Link href='/docs'>
                  <BookOpen />
                  {t('cta.docs')}
                </Link>
              </Button>
              <Button asChild className='justify-center' variant='secondary'>
                <a href='#stack'>
                  {t('cta.stack')}
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          <div className='rounded-xl border bg-background/70 p-5 shadow-xs backdrop-blur'>
            <div className='flex items-center gap-2 font-medium'>
              <Layers3 className='size-4 text-muted-foreground' />
              {t('batteries.title')}
            </div>
            <ul className='mt-3 grid gap-2 text-sm'>
              {BATTERIES.map((item) => (
                <li
                  className='flex items-start justify-between gap-4 rounded-lg border bg-background px-3 py-2'
                  key={item.labelKey}
                >
                  <span className='text-muted-foreground'>
                    {t(item.labelKey)}
                  </span>
                  <span className='font-mono text-xs'>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className='relative mx-auto max-w-6xl px-6 py-10' id='stack'>
        <div className='flex items-end justify-between gap-6'>
          <div>
            <h2 className='font-semibold text-2xl tracking-tight'>
              {t('stack.title')}
            </h2>
            <p className='mt-1 text-muted-foreground text-sm'>
              {t('stack.subtitle')}
            </p>
          </div>
        </div>

        <div className='mt-6 grid gap-3'>
          {STACK.map((row) => (
            <div
              className='grid gap-2 rounded-xl border bg-background/70 px-4 py-3 shadow-xs backdrop-blur md:grid-cols-[170px_1fr] md:items-center'
              key={row.label}
            >
              <div className='font-mono text-muted-foreground text-xs'>
                {row.label}
              </div>
              <div className='text-sm'>{row.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className='relative mx-auto max-w-6xl px-6 py-10'>
        <div className='rounded-2xl border bg-background/70 p-6 shadow-xs backdrop-blur'>
          <div className='flex items-center gap-2 font-semibold tracking-tight'>
            <Braces className='size-4 text-muted-foreground' />
            {t('structure.title')}
          </div>
          <p className='mt-2 max-w-[70ch] text-muted-foreground text-sm leading-relaxed'>
            {t('structure.subtitle')}
          </p>

          <div className='mt-5 rounded-xl border bg-background p-4'>
            <pre className='overflow-x-auto font-mono text-[12px] text-muted-foreground leading-relaxed'>
              {STRUCTURE.map((line) => `• ${line}`).join('\n')}
            </pre>
          </div>

          <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='text-muted-foreground text-xs'>{t('footer')}</div>
            <Button asChild size='sm' variant='outline'>
              <Link href='/docs'>{t('cta.openDocs')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
