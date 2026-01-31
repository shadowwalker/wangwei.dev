import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { Locale } from 'next-intl'
import { baseOptions } from '@/lib/layout.shared'
import { docsSource } from '@/lib/source'

export default async function Layout({
  children,
  params
}: LayoutProps<'/[locale]/docs'>) {
  const { locale } = await params
  return (
    <DocsLayout
      {...baseOptions(locale as Locale)}
      tree={docsSource.getPageTree(locale)}
    >
      {children}
    </DocsLayout>
  )
}
