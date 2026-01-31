'use client'

import { Button } from '@workspace/ui/components/button'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button aria-label='Theme' disabled size='icon' variant='ghost'>
        <Sun className='size-4' />
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  const getIcon = () => {
    if (theme === 'dark') {
      return Moon
    }
    if (theme === 'light') {
      return Sun
    }
    return Laptop
  }
  const Icon = getIcon()

  return (
    <Button
      aria-label='Toggle theme'
      onClick={cycleTheme}
      size='icon'
      variant='ghost'
    >
      <Icon className='size-4' />
    </Button>
  )
}
