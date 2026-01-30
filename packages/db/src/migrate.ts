import { db } from '@workspace/db'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const main = async () => {
  // biome-ignore lint/style/noNonNullAssertion: environment variable is set
  const client = db(process.env.DATABASE_URL!)

  try {
    await migrate(client, { migrationsFolder: 'drizzle' })
    console.log('Migration completed')
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  }
}

main()
