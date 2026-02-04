import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { blogSource } from '@/lib/source'

interface BlogListData {
  title: string
  description?: string
  date: string | Date
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page.blog')
  return {
    title: t('title'),
    description: t('subtitle')
  }
}

export default async function BlogIndexPage() {
  const locale = await getLocale()
  const t = await getTranslations('page.blog')
  const posts = blogSource
    .getPages(locale)
    .map((post) => ({
      ...post,
      data: post.data as BlogListData
    }))
    .sort((a, b) => {
      const dateA = new Date(a.data.date)
      const dateB = new Date(b.data.date)
      return dateB.getTime() - dateA.getTime()
    })

  return (
    <>
      <section className='mx-auto max-w-4xl px-6 pt-32 pb-16 md:px-12 md:pt-48 md:pb-24'>
        <h1 className='font-black font-sans text-6xl tracking-tighter md:text-[100px] md:leading-[0.9] md:tracking-[-0.04em]'>
          {t('title')}
        </h1>
        <div className='mt-12 w-24 border-foreground border-t md:mt-24 md:w-32' />
        <p className='mt-8 max-w-lg font-light text-muted-foreground text-xl leading-relaxed md:mt-12 md:text-2xl'>
          {t('subtitle')}
        </p>
      </section>

      <div className='mx-auto max-w-4xl border-foreground/10 border-t' />

      <section className='mx-auto max-w-4xl px-6 py-20 md:px-12'>
        <div className='space-y-12 md:space-y-16'>
          {posts.map((post) => {
            const date = new Date(post.data.date)
            const formattedDate = date.toLocaleDateString(locale, {
              year: 'numeric',
              month: 'short'
            })

            return (
              <article
                className='group grid grid-cols-1 gap-4 transition-colors md:grid-cols-[120px_1fr] md:gap-12'
                key={post.url}
              >
                <time className='block pt-1 font-mono text-[11px] text-muted-foreground/50 tracking-wide'>
                  {formattedDate}
                </time>
                <div>
                  <h2 className='font-bold font-sans text-2xl text-foreground tracking-tight transition-colors group-hover:text-muted-foreground md:text-3xl'>
                    <Link className='hover:underline' href={post.url}>
                      {post.data.title}
                    </Link>
                  </h2>
                  <p className='mt-3 font-light text-base text-muted-foreground/70 leading-relaxed'>
                    {post.data.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
