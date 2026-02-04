import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import SiteFooter from '@/components/site-footer-wrapper'
import SiteHeader from '@/components/site-header'
import { Link } from '@/i18n/navigation'
import { WebSiteJsonLd } from '@/lib/seo/json-ld'
import {
  getAlternateLanguages,
  getCanonicalUrl,
  SITE_NAME
} from '@/lib/seo/metadata'
import { blogSource } from '@/lib/source'

interface BlogListData {
  title: string
  description?: string
  date: string | Date
}

export async function generateMetadata(
  props: PageProps<'/[locale]'>
): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'page.home'
  })

  return {
    title: { absolute: SITE_NAME },
    description: t('tagline'),
    alternates: {
      canonical: getCanonicalUrl('/', locale),
      languages: getAlternateLanguages('/')
    },
    openGraph: {
      title: SITE_NAME,
      description: t('tagline')
    },
    twitter: {
      title: SITE_NAME,
      description: t('tagline')
    }
  }
}

export default async function Page() {
  const t = await getTranslations('page.home')
  const locale = await getLocale()

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
      <WebSiteJsonLd locale={locale} />
      <SiteHeader />

      <section className='mx-auto max-w-4xl px-6 pt-32 pb-16 md:px-12 md:pt-48 md:pb-24'>
        <h1 className='font-black font-sans text-7xl tracking-tighter md:text-[140px] md:leading-[0.9] md:tracking-[-0.04em]'>
          {t('headline')}
        </h1>
        <div className='mt-12 w-24 border-foreground border-t md:mt-24 md:w-32' />
        <p className='mt-8 max-w-lg font-light text-muted-foreground text-xl leading-relaxed md:mt-12 md:text-2xl'>
          {t('tagline')}
        </p>
      </section>

      <div className='mx-auto max-w-4xl border-foreground/10 border-t' />

      <section className='mx-auto max-w-4xl px-6 py-20 md:px-12'>
        <div className='mb-12 font-light text-muted-foreground/60 text-xs uppercase tracking-[0.2em]'>
          {t('section.experience')}
        </div>

        <div className='space-y-8'>
          {(
            ['amazon-ai', 'amazon-lmtt', 'roblox', 'microsoft', 'aws'] as const
          ).map((key) => (
            <div
              className='grid grid-cols-1 gap-1 md:grid-cols-[120px_1fr] md:gap-12'
              key={key}
            >
              <span className='pt-0.5 font-mono text-[11px] text-muted-foreground/50 tracking-wide'>
                {t(`experience.${key}.period`)}
              </span>
              <div>
                <h3 className='font-bold text-foreground text-lg tracking-tight'>
                  {t(`experience.${key}.title`)}
                </h3>
                <p className='mt-1 font-light text-muted-foreground/70 text-sm'>
                  {t(`experience.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className='mx-auto max-w-4xl border-foreground/10 border-t' />

      <section className='mx-auto max-w-4xl px-6 py-20 md:px-12'>
        <div className='mb-12 font-light text-muted-foreground/60 text-xs uppercase tracking-[0.2em]'>
          {t('section.writing')}
        </div>

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

      <SiteFooter />
    </main>
  )
}
