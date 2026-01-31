import { createTokenizer } from '@orama/tokenizers/mandarin'
import { createI18nSearchAPI } from 'fumadocs-core/search/server'
import { i18n } from '@/i18n/fumadocs'
import { blogSource, docsSource } from '@/lib/source'

export const { GET } = createI18nSearchAPI('advanced', {
  i18n,
  localeMap: {
    zh: {
      components: {
        tokenizer: createTokenizer()
      },
      search: {
        threshold: 0,
        tolerance: 0
      }
    }
  },
  indexes: [...docsSource.getLanguages(), ...blogSource.getLanguages()].flatMap(
    ({ language, pages }) =>
      pages.map((page) => ({
        id: page.url,
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        structuredData: page.data.structuredData,
        locale: language
      }))
  )
})
