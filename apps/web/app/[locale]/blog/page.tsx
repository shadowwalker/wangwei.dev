import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { blogSource } from '@/lib/source'

interface BlogListData {
  title: string
  description?: string
  date: string | Date
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
    <main className='min-h-screen'>
      <section className='mx-auto max-w-4xl px-6 pt-20 pb-16 md:px-12 md:pt-32 md:pb-24'>
        <h1 className='font-black font-sans text-5xl tracking-tighter md:text-7xl md:tracking-[-0.04em]'>
          {t('title')}
        </h1>
        <p className='mt-6 max-w-lg font-light text-lg text-muted-foreground leading-relaxed'>
          {t('subtitle')}
        </p>
      </section>

      <section className='mx-auto max-w-4xl px-6 pb-20 md:px-12'>
        <div className='space-y-0'>
          {posts.map((post) => {
            const date = new Date(post.data.date)
            const formattedDate = date.toLocaleDateString(locale, {
              year: 'numeric',
              month: 'short'
            })

            return (
              <article
                className='group py-8 transition-colors first:pt-0'
                key={post.url}
              >
                <time className='block font-mono text-[11px] text-muted-foreground/50 tracking-wide'>
                  {formattedDate}
                </time>
                <h2 className='mt-3 font-sans font-semibold text-foreground text-xl tracking-tight transition-colors group-hover:text-muted-foreground md:text-2xl'>
                  <Link
                    className='hover:underline'
                    href={post.url.replace(
                      new RegExp(`^/${post.locale}/`),
                      '/'
                    )}
                  >
                    {post.data.title}
                  </Link>
                </h2>
                <p className='mt-2 text-muted-foreground/70 text-sm leading-relaxed'>
                  {post.data.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
