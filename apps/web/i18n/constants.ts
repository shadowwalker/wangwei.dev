import type { Locale } from 'next-intl'

export const DEFAULT_LOCALE = 'en'
export const LOCALES = ['en', 'zh'] as const
export const CUSTOM_LOCALE_HEADER = 'x-custom-locale'
export const LOCALES_CONFIG: {
  name: string
  locale: Locale
}[] = [
  {
    name: 'English',
    locale: 'en'
  },
  {
    name: '简体中文',
    locale: 'zh'
  }
]
