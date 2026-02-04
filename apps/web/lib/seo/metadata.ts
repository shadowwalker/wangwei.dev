import { DEFAULT_LOCALE, LOCALES } from '@/i18n/constants'
import { env } from '@/lib/env/client'

export const SITE_NAME = 'Wei Wang'
export const SITE_DESCRIPTION =
  'I engineer intelligent systems, build next-gen web experiences, and explore the cutting edge of AI and infrastructure.'
export const TWITTER_HANDLE = 'wangwei_dev'
export const SITE_LOGO_PATH = '/favicon.ico'

export function getBaseUrl(): string {
  return env.NEXT_PUBLIC_APP_URL
}

export function getLocalizedUrl(path: string, locale: string): string {
  const baseUrl = getBaseUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (locale === DEFAULT_LOCALE) {
    return `${baseUrl}${normalizedPath}`
  }

  return `${baseUrl}/${locale}${normalizedPath}`
}

export function getLocalizedPath(path: string, locale: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath
  }

  return `/${locale}${normalizedPath}`
}

type AlternateLanguages = Record<string, string>

export function getAlternateLanguages(path: string): AlternateLanguages {
  const alternates: AlternateLanguages = {}

  for (const locale of LOCALES) {
    alternates[locale] = getLocalizedUrl(path, locale)
  }

  return alternates
}

export function getCanonicalUrl(path: string, locale: string): string {
  return getLocalizedUrl(path, locale)
}
