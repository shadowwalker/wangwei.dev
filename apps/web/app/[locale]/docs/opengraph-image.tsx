import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo/metadata'
import {
  loadOgFont,
  loadOgFontMedium,
  OG_COLORS,
  OG_SIZE
} from '@/lib/seo/og-utils'
import { docsSource } from '@/lib/source'

export const alt = 'Documentation'
export const size = OG_SIZE
export const contentType = 'image/png'

interface Props {
  params: Promise<{
    locale: string
  }>
}

export default async function Image({ params }: Props) {
  const { locale } = await params
  const page = docsSource.getPage([], locale)

  const fontBold = await loadOgFont()
  const fontMedium = await loadOgFontMedium()

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
          alignItems: 'center',
          backgroundColor: OG_COLORS.accent,
          padding: '8px 16px',
          borderRadius: '9999px',
          marginBottom: '40px'
        }}
      >
        <span
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: 'white'
          }}
        >
          Documentation
        </span>
      </div>
      <h1
        style={{
          fontSize: '84px',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.1,
          marginBottom: '20px'
        }}
      >
        {page?.data.title ?? 'Documentation'}
      </h1>
      <p
        style={{
          fontSize: '32px',
          fontWeight: 500,
          color: OG_COLORS.muted,
          margin: 0
        }}
      >
        {SITE_NAME}
      </p>
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
