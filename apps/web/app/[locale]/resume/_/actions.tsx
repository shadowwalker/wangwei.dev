'use client'

import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import {
  Check,
  Download,
  Link as LinkIcon,
  Printer,
  Settings2
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { type Locale, useLocale } from 'next-intl'

import { LOCALES_CONFIG } from '@/i18n/constants'
import { usePathname, useRouter } from '@/i18n/navigation'

export function ResumeActions() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const changeLocale = (newLocale: Locale) => {
    if (locale === newLocale) {
      return
    }
    router.push(
      { pathname, query: Object.fromEntries(searchParams.entries()) },
      { locale: newLocale }
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='h-9 w-9 rounded-full shadow-sm'
          size='icon'
          variant='outline'
        >
          <Settings2 className='h-4 w-4' />
          <span className='sr-only'>Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopyLink}>
          <LinkIcon className='mr-2 h-4 w-4' />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePrint}>
          <Printer className='mr-2 h-4 w-4' />
          Print
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePrint}>
          <Download className='mr-2 h-4 w-4' />
          Download PDF
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        {LOCALES_CONFIG.map((lang) => (
          <DropdownMenuItem
            className='justify-between'
            key={lang.locale}
            onClick={() => changeLocale(lang.locale)}
          >
            {lang.name}
            {locale === lang.locale && <Check className='h-4 w-4' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
