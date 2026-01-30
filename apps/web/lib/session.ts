import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function getServerSession() {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({ headers: requestHeaders })
  return session
}
