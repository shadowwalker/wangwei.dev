import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation'
import { type NextRequest, NextResponse } from 'next/server'

import { middleware as i18nMiddleware } from '@/i18n/middleware'

const { rewrite: rewriteLLM } = rewritePath(
  '/docs{/*path}',
  '/llms.mdx/docs{/*path}'
)

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname)

    if (result) {
      request.nextUrl.pathname = result
    }
  }

  return i18nMiddleware(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|_vercel|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|pdf|docx?|xlsx?|zip|webmanifest|wasm|onnx)).*)',
    // Always run for API routes because we may add auth middleware later
    '/(api|trpc)(.*)'
  ]
}
