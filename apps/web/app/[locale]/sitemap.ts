import type { MetadataRoute } from 'next'
import { DEFAULT_LOCALE } from '@/i18n/constants'
import { getBaseUrl } from '@/lib/seo/metadata'
import { blogSource, docsSource } from '@/lib/source'

export default async function sitemap(
  props: PageProps<'/[locale]'>
): Promise<MetadataRoute.Sitemap> {
  const { locale } = await props.params
  const baseUrl = getBaseUrl()

  const getUrl = (path: string) => {
    if (locale === DEFAULT_LOCALE) {
      return `${baseUrl}${path}`
    }
    return `${baseUrl}/${locale}${path}`
  }

  const entries: MetadataRoute.Sitemap = []

  entries.push({
    url: getUrl('/'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1
  })

  entries.push({
    url: getUrl('/blog'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  })

  const blogPages = blogSource.getPages(locale)
  for (const page of blogPages) {
    entries.push({
      url: getUrl(`/blog/${page.slugs[0]}`),
      lastModified: page.data.date ?? new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    })
  }

  entries.push({
    url: getUrl('/docs'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9
  })

  const docPages = docsSource.getPages(locale)
  for (const page of docPages) {
    const slug = page.slugs.join('/')
    entries.push({
      url: getUrl(`/docs/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    })
  }

  return entries
}
