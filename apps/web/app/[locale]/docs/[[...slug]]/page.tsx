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
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(
  props: PageProps<'/[locale]/docs/[[...slug]]'>
) {
  const params = await props.params
  const page = source.getPage(params.slug, params.locale)
  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
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
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams('slug', 'locale')
}

export async function generateMetadata(
  props: PageProps<'/[locale]/docs/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, params.locale)
  if (!page) {
    notFound()
  }

  return {
    title: page.data.title,
    description: page.data.description
  }
}
