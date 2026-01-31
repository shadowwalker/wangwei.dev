import type { ReactNode } from 'react'
import RiveHippo from '@/components/rive-hippo'
import SiteHeader from '@/components/site-header'

interface BlogLayoutProps {
  children: ReactNode
}

export default async function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <SiteHeader />

      {children}

      <footer className='w-full bg-white'>
        <div className='flex flex-col items-center'>
          <RiveHippo className='h-48 w-48' />
        </div>
      </footer>
    </>
  )
}
