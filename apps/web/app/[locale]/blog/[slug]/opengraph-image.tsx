import { ImageResponse } from 'next/og'
import {
  loadOgFont,
  loadOgFontMedium,
  OG_COLORS,
  OG_SIZE
} from '@/lib/seo/og-utils'
import { blogSource } from '@/lib/source'

export const alt = 'Blog Post'
export const size = OG_SIZE
export const contentType = 'image/png'

interface Props {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params
  const page = blogSource.getPage([slug], locale)

  if (!page) {
    return new Response('Not Found', { status: 404 })
  }

  const [fontBold, fontMedium] = await Promise.all([
    loadOgFont(),
    loadOgFontMedium()
  ])

  const publishedAt =
    page.data.date instanceof Date
      ? page.data.date
      : new Date(page.data.date as string)

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: OG_COLORS.background,
        backgroundImage: `linear-gradient(to bottom right, ${OG_COLORS.background}, ${OG_COLORS.backgroundGradient})`,
        padding: '80px',
        color: OG_COLORS.foreground
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1.1,
            fontFamily: 'Inter',
            color: OG_COLORS.foreground
          }}
        >
          {page.data.title}
        </div>
        {page.data.description && (
          <div
            style={{
              fontSize: '32px',
              color: OG_COLORS.muted,
              lineHeight: 1.4,
              fontFamily: 'Inter',
              maxWidth: '900px'
            }}
          >
            {page.data.description}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: 'auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 500,
              color: OG_COLORS.accent,
              fontFamily: 'Inter'
            }}
          >
            {page.data.author}
          </div>
          <div
            style={{
              fontSize: '20px',
              color: OG_COLORS.muted,
              fontFamily: 'Inter'
            }}
          >
            {publishedAt.toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        {
          name: 'Inter',
          data: fontBold,
          style: 'normal',
          weight: 700
        },
        {
          name: 'Inter',
          data: fontMedium,
          style: 'normal',
          weight: 500
        }
      ]
    }
  )
}
