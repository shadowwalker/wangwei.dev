import type { MetadataRoute } from 'next'
import { LOCALES } from '@/i18n/constants'
import { getBaseUrl } from '@/lib/seo/metadata'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/profile/', '/auth/']
      }
    ],
    sitemap: LOCALES.map((locale) => `${baseUrl}/${locale}/sitemap.xml`)
  }
}
