'use client'

import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'

import { useRouter } from '@/i18n/navigation'
import { signIn, signUp } from '@/lib/auth-client'

type Mode = 'signIn' | 'signUp'

function TextField({
  autoComplete,
  disabled,
  label,
  name,
  onChange,
  placeholder,
  type,
  value
}: {
  autoComplete?: string
  disabled?: boolean
  label: string
  name: string
  onChange: (value: string) => void
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  value: string
}) {
  return (
    <label className='grid gap-1.5'>
      <div className='text-sm'>{label}</div>
      <input
        autoComplete={autoComplete}
        className={cn(
          'h-10 w-full rounded-md border bg-background px-3 text-sm shadow-xs',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
        disabled={disabled}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

export default function AuthCard({
  copy
}: {
  copy: {
    tabs: { signIn: string; signUp: string }
    fields: { name: string; email: string; password: string }
    placeholders: { name: string; email: string; password: string }
    actions: { show: string; hide: string }
    cta: { signIn: string; signUp: string }
    errors: { missing: string; generic: string }
  }
}) {
  const router = useRouter()
  const locale = useLocale()
  const searchParams = useSearchParams()

  const [mode, setMode] = useState<Mode>(() => {
    const m = searchParams.get('mode')
    return m === 'signUp' ? 'signUp' : 'signIn'
  })
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!(email && password) || (mode === 'signUp' && !name)) {
      setError(copy.errors.missing)
      return
    }

    setPending(true)
    try {
      const redirectTo = locale === 'en' ? '/profile' : `/${locale}/profile`

      const result =
        mode === 'signIn'
          ? await signIn.email({
              email,
              password,
              callbackURL: redirectTo
            })
          : await signUp.email({
              email,
              name,
              password,
              callbackURL: redirectTo
            })

      if (result?.error) {
        setError(result.error.message ?? copy.errors.generic)
        return
      }

      router.push('/profile')
      router.refresh()
    } catch {
      setError(copy.errors.generic)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-2 gap-2 rounded-lg border bg-background p-1'>
        <button
          className={cn(
            'h-9 rounded-md text-sm transition-colors',
            mode === 'signIn'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setMode('signIn')}
          type='button'
        >
          {copy.tabs.signIn}
        </button>
        <button
          className={cn(
            'h-9 rounded-md text-sm transition-colors',
            mode === 'signUp'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setMode('signUp')}
          type='button'
        >
          {copy.tabs.signUp}
        </button>
      </div>

      <form className='grid gap-4' onSubmit={onSubmit}>
        {mode === 'signUp' && (
          <TextField
            autoComplete='name'
            disabled={isPending}
            label={copy.fields.name}
            name='name'
            onChange={setName}
            placeholder={copy.placeholders.name}
            value={name}
          />
        )}
        <TextField
          autoComplete='email'
          disabled={isPending}
          label={copy.fields.email}
          name='email'
          onChange={setEmail}
          placeholder={copy.placeholders.email}
          type='email'
          value={email}
        />

        <label className='grid gap-1.5'>
          <div className='flex items-center justify-between gap-3'>
            <div className='text-sm'>{copy.fields.password}</div>
            <button
              className='inline-flex items-center gap-2 rounded-md px-2 py-1 text-muted-foreground text-xs hover:text-foreground'
              onClick={() => setShowPassword((v) => !v)}
              type='button'
            >
              {showPassword ? (
                <EyeOff className='size-3.5' />
              ) : (
                <Eye className='size-3.5' />
              )}
              {showPassword ? copy.actions.hide : copy.actions.show}
            </button>
          </div>
          <input
            autoComplete={
              mode === 'signIn' ? 'current-password' : 'new-password'
            }
            className={cn(
              'h-10 w-full rounded-md border bg-background px-3 text-sm shadow-xs',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
            disabled={isPending}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder={copy.placeholders.password}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
        </label>

        {error && (
          <div className='rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-destructive text-sm'>
            {error}
          </div>
        )}

        <Button className='h-10' disabled={isPending} type='submit'>
          {isPending && <Loader2 className='animate-spin' />}
          {mode === 'signIn' ? copy.cta.signIn : copy.cta.signUp}
        </Button>
      </form>
    </div>
  )
}
