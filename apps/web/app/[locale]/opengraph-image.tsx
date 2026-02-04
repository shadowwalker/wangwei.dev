import { ImageResponse } from 'next/og'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo/metadata'
import {
  loadOgFont,
  loadOgFontMedium,
  OG_COLORS,
  OG_SIZE
} from '@/lib/seo/og-utils'

export const alt = SITE_NAME
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const [fontBold, fontMedium] = await Promise.all([
    loadOgFont(),
    loadOgFontMedium()
  ])

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        padding: '80px',
        background: `linear-gradient(135deg, ${OG_COLORS.background} 0%, ${OG_COLORS.backgroundGradient} 100%)`
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '12px',
            background: OG_COLORS.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px'
          }}
        >
          <svg
            fill='none'
            height='32'
            stroke={OG_COLORS.foreground}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='32'
          >
            <title>Logo</title>
            <path d='M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z' />
          </svg>
        </div>
        <span
          style={{
            fontSize: '28px',
            color: OG_COLORS.muted,
            fontFamily: 'Inter Medium'
          }}
        >
          {SITE_NAME}
        </span>
      </div>

      <h1
        style={{
          fontSize: '64px',
          fontWeight: 700,
          color: OG_COLORS.foreground,
          lineHeight: 1.1,
          marginBottom: '24px',
          fontFamily: 'Inter Bold',
          maxWidth: '900px'
        }}
      >
        {SITE_NAME}
      </h1>

      <p
        style={{
          fontSize: '28px',
          color: OG_COLORS.muted,
          fontFamily: 'Inter Medium',
          maxWidth: '800px',
          lineHeight: 1.4
        }}
      >
        {SITE_DESCRIPTION}
      </p>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Inter Bold',
          data: fontBold,
          style: 'normal',
          weight: 700
        },
        {
          name: 'Inter Medium',
          data: fontMedium,
          style: 'normal',
          weight: 500
        }
      ]
    }
  )
}
