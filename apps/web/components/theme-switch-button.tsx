'use client'

import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

type ThemeValue = 'system' | 'light' | 'dark'

export default function ThemeSwitchButton() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const active = useMemo(() => {
    if (!mounted) {
      return 'light'
    }
    if (theme === 'system') {
      return (resolvedTheme ?? 'light') as ThemeValue
    }
    return (theme ?? 'light') as ThemeValue
  }, [mounted, resolvedTheme, theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label='Theme' size='icon' variant='ghost'>
          <span className='sr-only'>Theme</span>
          <Sun
            aria-hidden='true'
            className={cn('size-4', active === 'dark' && 'hidden')}
          />
          <Moon
            aria-hidden='true'
            className={cn('size-4', active !== 'dark' && 'hidden')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className={cn(theme === 'system' && 'text-muted-foreground')}
          disabled={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          <Laptop />
          System
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'light' && 'text-muted-foreground')}
          disabled={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'dark' && 'text-muted-foreground')}
          disabled={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          <Moon />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
