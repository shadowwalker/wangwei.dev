import { blog, docs } from 'fumadocs-mdx:collections/server'
import { loader } from 'fumadocs-core/source'
import { i18n } from '@/i18n/fumadocs'

export const docsSource = loader({
  i18n,
  baseUrl: '/docs',
  source: docs.toFumadocsSource()
})

export const blogSource = loader({
  i18n,
  baseUrl: '/blog',
  source: blog.toFumadocsSource()
})
