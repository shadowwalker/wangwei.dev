import { defineRouting } from 'next-intl/routing'

import { DEFAULT_LOCALE, LOCALES } from './constants'

export const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
  localePrefix: 'as-needed'
})
