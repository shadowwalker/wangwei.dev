import { getTranslations } from 'next-intl/server'
import LanguageSwitchButton from '@/components/language-switch-button'
import ThemeSwitchButton from '@/components/theme-switch-button'
import { Link } from '@/i18n/navigation'
import { getServerSession } from '@/lib/session'

export default async function SiteHeader() {
  const t = await getTranslations('page.home')
  const session = await getServerSession()

  return (
    <header className='mx-auto flex min-w-full max-w-4xl items-center justify-between px-6 py-6 md:min-w-4xl md:px-12'>
      <Link className='font-bold font-sans text-sm tracking-widest' href='/'>
        WW
      </Link>

      <nav className='flex items-center gap-1'>
        <Link
          className='px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
          href='/blog'
        >
          {t('nav.writing')}
        </Link>
        <Link
          className='px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
          href='/docs'
        >
          {t('nav.about')}
        </Link>

        <div className='ml-2 flex items-center gap-1 border-l pl-3'>
          {session ? (
            <Link
              className='px-2 py-1 text-muted-foreground text-xs transition-colors hover:text-foreground'
              href='/profile'
            >
              {t('header.profile')}
            </Link>
          ) : (
            <Link
              className='px-2 py-1 text-muted-foreground text-xs transition-colors hover:text-foreground'
              href='/auth'
            >
              {t('header.signIn')}
            </Link>
          )}
          <ThemeSwitchButton />
          <LanguageSwitchButton />
        </div>
      </nav>
    </header>
  )
}
