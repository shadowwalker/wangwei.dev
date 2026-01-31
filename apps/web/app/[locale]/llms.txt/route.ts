import { getLLMText } from '@/lib/get-llm-text'
import { blogSource, docsSource } from '@/lib/source'

// cached forever
export const revalidate = false

export async function GET() {
  const scan = [...docsSource.getPages(), ...blogSource.getPages()].map(
    getLLMText
  )
  const scanned = await Promise.all(scan)

  return new Response(scanned.join('\n\n'))
}
