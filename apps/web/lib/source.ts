import { docs } from 'fumadocs-mdx:collections/server'
import { loader } from 'fumadocs-core/source'
import { LOCALES_CONFIG } from '@/i18n/constants'
import { i18n } from '@/i18n/fumadocs'

export const source = loader({
  i18n,
  baseUrl: '/docs',
  source: docs.toFumadocsSource()
})

export const searchSource = loader({
  i18n: {
    ...i18n,
    languages: LOCALES_CONFIG.filter((l) => l.search.enabled).map(
      (l) => l.locale
    )
  },
  baseUrl: '/docs',
  source: docs.toFumadocsSource()
})
