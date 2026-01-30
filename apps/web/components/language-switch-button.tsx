'use client'

import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { Languages } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { type Locale, useLocale } from 'next-intl'

import { LOCALES_CONFIG } from '@/i18n/constants'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LanguageSwitchButton() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const changeLocale = (newLocale: Locale) => {
    if (locale === newLocale) {
      return
    }
    router.push(
      { pathname, query: Object.fromEntries(searchParams.entries()) },
      { locale: newLocale as Locale }
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label='Language' size='icon' variant='ghost'>
          <span className='sr-only'>Language</span>
          <Languages aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {LOCALES_CONFIG.map((lang) => (
          <DropdownMenuItem
            className={cn(locale === lang.locale && 'text-muted-foreground')}
            disabled={locale === lang.locale}
            key={lang.locale}
            onClick={() => changeLocale(lang.locale)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
