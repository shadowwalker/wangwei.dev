import { notFound } from 'next/navigation'
import { getLLMText } from '@/lib/get-llm-text'
import { source } from '@/lib/source'

export const revalidate = false

export async function GET(
  _req: Request,
  { params }: RouteContext<'/[locale]/llms.mdx/docs/[[...slug]]'>
) {
  const { slug, locale } = await params
  const page = source.getPage(slug, locale)
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
  return source.generateParams('slug', 'locale')
}
