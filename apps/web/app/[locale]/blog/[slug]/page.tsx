import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import type { ComponentType } from 'react'
import { Link } from '@/i18n/navigation'
import { blogSource } from '@/lib/source'

interface Props {
  params: Promise<{ slug: string }>
}

interface TocItem {
  title: string
  url: string
  depth: number
}

interface BlogPageData {
  body: ComponentType
  toc: TocItem[]
  title: string
  description?: string
  author: string
  date: string | Date
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const t = await getTranslations('page.blog')
  const page = blogSource.getPage([slug], locale)

  if (!page) {
    notFound()
  }

  const data = page.data as unknown as BlogPageData
  const Mdx = data.body
  const toc = data.toc
  const date = new Date(data.date as string)
  const formattedDate = date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <main className='min-h-screen'>
      <header className='mx-auto max-w-3xl px-6 pt-20 pb-8 md:px-12 md:pt-32'>
        <Link
          className='text-muted-foreground text-sm transition-colors hover:text-foreground'
          href='/blog'
        >
          ← {t('back')}
        </Link>

        <h1 className='mt-8 font-bold font-sans text-3xl tracking-tight md:text-4xl'>
          {data.title}
        </h1>

        {data.description && (
          <p className='mt-4 text-lg text-muted-foreground'>
            {data.description}
          </p>
        )}

        <div className='mt-6 flex items-center gap-4 text-muted-foreground/70 text-sm'>
          <span>{data.author}</span>
          <span>·</span>
          <time>{formattedDate}</time>
        </div>
      </header>

      <article className='mx-auto max-w-3xl px-6 pb-20 md:px-12'>
        <InlineTOC items={toc} />

        <div className='prose prose-neutral dark:prose-invert mt-8 max-w-none'>
          <Mdx />
        </div>
      </article>
    </main>
  )
}

export async function generateStaticParams() {
  const pages = blogSource.getPages()
  return pages.map((p) => ({
    slug: p.slugs[0]
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const page = blogSource.getPage([slug], locale)

  if (!page) {
    return {}
  }

  return {
    title: page.data.title,
    description: page.data.description
  }
}
