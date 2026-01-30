import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '../../apps/web/.env.local' })

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: local development only
    url: process.env.DATABASE_URL!
  }
})
