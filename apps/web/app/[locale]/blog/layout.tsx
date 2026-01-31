import type { ReactNode } from 'react'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'

interface BlogLayoutProps {
  children: ReactNode
}

export default async function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <SiteHeader />

      {children}

      <SiteFooter />
    </>
  )
}
