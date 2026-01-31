import { GoogleAnalytics } from '@next/third-parties/google'
import { Agentation } from 'agentation'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { Providers } from '@/components/providers'
import { routing } from '@/i18n/routing'
import { env } from '@/lib/env/client'

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

export default async function RootLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Providers locale={locale}>{children}</Providers>
        {process.env.NODE_ENV === 'development' && <Agentation />}
        {process.env.NODE_ENV !== 'development' && (
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
      </body>
    </html>
  )
}
