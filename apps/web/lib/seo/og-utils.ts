import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const OG_SIZE = {
  width: 1200,
  height: 630
} as const

export const OG_COLORS = {
  background: '#09090b',
  backgroundGradient: '#18181b',
  foreground: '#fafafa',
  muted: '#a1a1aa',
  accent: '#3b82f6'
} as const

export async function loadOgFont(): Promise<ArrayBuffer> {
  const fontPath = join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf')
  const fontData = await readFile(fontPath)
  return fontData.buffer as ArrayBuffer
}

export async function loadOgFontMedium(): Promise<ArrayBuffer> {
  const fontPath = join(process.cwd(), 'public', 'fonts', 'Inter-Medium.ttf')
  const fontData = await readFile(fontPath)
  return fontData.buffer as ArrayBuffer
}
