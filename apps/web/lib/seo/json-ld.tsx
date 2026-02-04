import type { Article, BreadcrumbList, WebSite, WithContext } from 'schema-dts'
import {
  getBaseUrl,
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SITE_NAME
} from '@/lib/seo/metadata'

interface JsonLdProps {
  data: WithContext<WebSite | Article | BreadcrumbList>
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires innerHTML for structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type='application/ld+json'
    />
  )
}

interface WebSiteJsonLdProps {
  locale: string
}

export function WebSiteJsonLd({ locale }: WebSiteJsonLdProps) {
  const baseUrl = getBaseUrl()

  const data: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${SITE_LOGO_PATH}`
      }
    }
  }

  return <JsonLd data={data} />
}

interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  datePublished: Date
  dateModified?: Date
  author: string
  imageUrl?: string
  locale: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  imageUrl,
  locale
}: ArticleJsonLdProps) {
  const baseUrl = getBaseUrl()

  const data: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${SITE_LOGO_PATH}`
      }
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl
      }
    })
  }

  return <JsonLd data={data} />
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return <JsonLd data={data} />
}
