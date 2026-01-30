import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import type { Locale } from 'next-intl'
import { i18n } from '@/i18n/fumadocs'

export function baseOptions(locale: Locale): BaseLayoutProps {
  return {
    i18n,
    ...configurations[locale]
  }
}

const configurations: Record<Locale, Partial<BaseLayoutProps>> = {
  en: {
    nav: {
      title: 'Next App'
    }
  },
  zh: {
    nav: {
      title: '新应用'
    }
  }
}
