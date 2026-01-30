import 'server-only'

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url()
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true
})
