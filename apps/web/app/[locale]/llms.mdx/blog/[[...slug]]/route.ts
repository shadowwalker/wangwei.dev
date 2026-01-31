import { notFound } from 'next/navigation'
import { getLLMText } from '@/lib/get-llm-text'
import { blogSource } from '@/lib/source'

export const revalidate = false

export async function GET(
  _req: Request,
  { params }: RouteContext<'/[locale]/llms.mdx/blog/[[...slug]]'>
) {
  const { slug, locale } = await params
  const page = blogSource.getPage(slug, locale)
  if (!page) {
    notFound()
  }

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown'
    }
  })
}

export function generateStaticParams() {
  return blogSource.generateParams('slug', 'locale')
}
