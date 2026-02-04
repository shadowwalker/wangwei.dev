import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z
      .string()
      .regex(/^G-\w{10,}$/)
      .optional(),
    NEXT_PUBLIC_APP_URL: z.string().url()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  },
  emptyStringAsUndefined: true
})
