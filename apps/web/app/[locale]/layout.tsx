import { GoogleAnalytics } from '@next/third-parties/google'
import { Agentation } from 'agentation'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { Locale } from 'next-intl'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Providers } from '@/components/providers'
import { routing } from '@/i18n/routing'
import { env } from '@/lib/env/client'
import {
  getAlternateLanguages,
  getBaseUrl,
  SITE_NAME,
  TWITTER_HANDLE
} from '@/lib/seo/metadata'

import '@workspace/ui/globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '900']
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

export async function generateMetadata(
  props: LayoutProps<'/[locale]'>
): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'metadata'
  })

  return {
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`
    },
    description: t('description'),
    icons: {
      icon: '/favicon.ico'
    },
    openGraph: {
      type: 'website',
      locale,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: t('description')
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${TWITTER_HANDLE}`,
      creator: `@${TWITTER_HANDLE}`,
      title: SITE_NAME,
      description: t('description')
    },
    alternates: {
      languages: getAlternateLanguages('/')
    }
  }
}

export default async function RootLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'development' && <Agentation />}
        {process.env.NODE_ENV !== 'development' &&
          env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
          )}
      </body>
    </html>
  )
}
