import { Button } from '@workspace/ui/components/button'
import { User } from 'lucide-react'
import LanguageSwitchButton from '@/components/language-switch-button'
import ThemeSwitchButton from '@/components/theme-switch-button'
import { Link } from '@/i18n/navigation'
import { getServerSession } from '@/lib/session'

export default async function SiteHeader() {
  const session = await getServerSession()

  return (
    <header className='mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-8 md:px-12'>
      <div className='flex flex-1 justify-start'>
        <Link className='font-bold font-sans text-xl tracking-tighter' href='/'>
          WW
        </Link>
      </div>

      <nav className='flex flex-1 justify-center gap-6 md:gap-8'>
        <Link
          className='font-medium text-sm transition-opacity hover:opacity-70'
          href='/blog'
        >
          Blog
        </Link>
        <Link
          className='font-medium text-sm transition-opacity hover:opacity-70'
          href='/docs'
        >
          Docs
        </Link>
        <Link
          className='font-medium text-sm transition-opacity hover:opacity-70'
          href='/resume'
        >
          Resume
        </Link>
      </nav>

      <div className='flex flex-1 items-center justify-end gap-1'>
        {session ? (
          <Link href='/profile'>
            <Button aria-label='Profile' size='icon' variant='ghost'>
              <User className='size-4' />
            </Button>
          </Link>
        ) : (
          <Link href='/auth'>
            <Button aria-label='Sign In' size='icon' variant='ghost'>
              <User className='size-4' />
            </Button>
          </Link>
        )}
        <ThemeSwitchButton />
        <LanguageSwitchButton />
      </div>
    </header>
  )
}
