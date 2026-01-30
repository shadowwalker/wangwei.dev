import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// HTTP Client:
// - Best for serverless functions and Lambda environments
// - Ideal for stateless operations and quick queries
// - Lower overhead for single queries
// - Better for applications with sporadic database access
export function db(connectionString: string) {
  if (process.env.NODE_ENV === 'development') {
    neonConfig.fetchEndpoint = 'http://localhost:5432/sql'
  }
  const sql = neon(connectionString)
  return drizzle({ client: sql })
}
