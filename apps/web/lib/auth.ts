import { db } from '@workspace/db'
// biome-ignore lint/performance/noNamespaceImport: we need to import the schema
import * as schema from '@workspace/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from './env/server'

export const auth = betterAuth({
  database: drizzleAdapter(db(env.DATABASE_URL), {
    provider: 'pg',
    schema
  }),
  user: {
    additionalFields: {
      bio: {
        type: 'string',
        required: false
      },
      company: {
        type: 'string',
        required: false
      },
      website: {
        type: 'string',
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
