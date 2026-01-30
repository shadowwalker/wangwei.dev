import type messages from '@/i18n/locales/en.json'
import type { formats } from '@/i18n/request'
import type { routing } from '@/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
    Formats: typeof formats
  }
}
