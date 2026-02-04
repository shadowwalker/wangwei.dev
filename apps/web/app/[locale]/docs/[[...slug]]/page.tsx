import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LLMCopyButton, ViewOptions } from '@/components/page-actions'
import { BreadcrumbJsonLd } from '@/lib/seo/json-ld'
import {
  getAlternateLanguages,
  getCanonicalUrl,
  getLocalizedUrl,
  SITE_NAME
} from '@/lib/seo/metadata'
import { docsSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(
  props: PageProps<'/[locale]/docs/[[...slug]]'>
) {
  const params = await props.params
  const page = docsSource.getPage(params.slug, params.locale)
  if (!page) {
    notFound()
  }

  const MDX = page.data.body
  const breadcrumbItems = [
    { name: 'Home', url: getLocalizedUrl('/', params.locale) },
    { name: 'Docs', url: getLocalizedUrl('/docs', params.locale) }
  ]

  if (params.slug) {
    for (let i = 0; i < params.slug.length; i++) {
      const currentSlug = params.slug.slice(0, i + 1)
      const currentPage = docsSource.getPage(currentSlug, params.locale)
      if (currentPage) {
        breadcrumbItems.push({
          name: currentPage.data.title,
          url: getLocalizedUrl(currentPage.url, params.locale)
        })
      }
    }
  }

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className='flex flex-row items-center gap-2 border-b pt-2 pb-6'>
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          githubUrl={`https://github.com/shadowwalker/next-app/tree/main/apps/docs/content/docs/${page.path}`}
          markdownUrl={`${page.url}.mdx`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            // @ts-expect-error - TODO: seems to be a bug for fumadocs
            a: createRelativeLink(docsSource, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return docsSource.generateParams('slug', 'locale')
}

export async function generateMetadata(
  props: PageProps<'/[locale]/docs/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params
  const page = docsSource.getPage(params.slug, params.locale)
  if (!page) {
    notFound()
  }

  const path = page.url
  const canonical = getCanonicalUrl(path, params.locale)

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
      languages: getAlternateLanguages(path)
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      url: canonical,
      siteName: SITE_NAME
    }
  }
}
