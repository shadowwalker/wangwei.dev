import type { NextRequest } from 'next/server'
import createNextIntlMiddleware from 'next-intl/middleware'

import { CUSTOM_LOCALE_HEADER } from './constants'
import { routing } from './routing'

export function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get(CUSTOM_LOCALE_HEADER) || 'en'

  const nextIntlMiddleware = createNextIntlMiddleware(routing)
  const response = nextIntlMiddleware(request)

  response.headers.set(CUSTOM_LOCALE_HEADER, defaultLocale)

  return response
}
