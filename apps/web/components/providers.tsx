'use client'

import { type Framework, FrameworkProvider } from 'fumadocs-core/framework'
import { RootProvider as FumadocsRootProvider } from 'fumadocs-ui/provider/next'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'
import { type Locale, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type * as React from 'react'
import { Suspense } from 'react'
import { DEFAULT_LOCALE, LOCALES_CONFIG } from '@/i18n/constants'
import { fumadocsTranslations } from '@/i18n/fumadocs'
import { Link, usePathname, useRouter } from '@/i18n/navigation'

export function Providers({
  children,
  locale
}: {
  children: React.ReactNode
  locale?: Locale
}) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <NextIntlClientProvider locale={locale}>
        <Suspense>
          <FumadocsProviders locale={locale}>{children}</FumadocsProviders>
        </Suspense>
      </NextIntlClientProvider>
    </NextThemesProvider>
  )
}

function FumadocsProviders({
  children,
  locale
}: {
  children: React.ReactNode
  locale?: Locale
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <FrameworkProvider
      Image={Image as Framework['Image']}
      Link={Link as Framework['Link']}
      useParams={useParams}
      usePathname={usePathname}
      useRouter={useRouter}
    >
      <FumadocsRootProvider
        i18n={{
          locale: locale || DEFAULT_LOCALE,
          locales: LOCALES_CONFIG,
          translations: fumadocsTranslations[locale || DEFAULT_LOCALE],
          onLocaleChange: (_locale) => {
            router.push(
              { pathname, query: Object.fromEntries(searchParams.entries()) },
              { locale: _locale as Locale }
            )
          }
        }}
        search={{
          enabled: true
        }}
      >
        {children}
      </FumadocsRootProvider>
    </FrameworkProvider>
  )
}
