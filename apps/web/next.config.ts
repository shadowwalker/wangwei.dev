import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*'
      }
    ]
  }
}

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
})

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(withMDX(config))
