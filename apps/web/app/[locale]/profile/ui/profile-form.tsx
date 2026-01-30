'use client'

import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { Loader2, LogOut, Save } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import type { User } from '@/lib/auth'
import { signOut, updateUser } from '@/lib/auth-client'

interface Copy {
  account: string
  email: string
  userId: string
  fields: {
    name: string
    company: string
    website: string
    avatar: string
    bio: string
  }
  placeholders: {
    name: string
    company: string
    website: string
    avatar: string
    bio: string
  }
  cta: { save: string; signOut: string }
  saved: string
  errors: { nameRequired: string; generic: string }
}

function Input({
  autoComplete,
  disabled,
  label,
  onChange,
  placeholder,
  type,
  value
}: {
  autoComplete?: string
  disabled?: boolean
  label: string
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
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

function Textarea({
  disabled,
  label,
  onChange,
  placeholder,
  value
}: {
  disabled?: boolean
  label: string
  onChange: (value: string) => void
  placeholder?: string
  value: string
}) {
  return (
    <label className='grid gap-1.5'>
      <div className='text-sm'>{label}</div>
      <textarea
        className={cn(
          'min-h-24 w-full resize-none rounded-md border bg-background px-3 py-2 text-sm shadow-xs',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  )
}

export default function ProfileForm({
  copy,
  user
}: {
  copy: Copy
  user: User
}) {
  const t = copy
  const router = useRouter()

  const initial = useMemo(
    () => ({
      name: user.name ?? '',
      image: user.image ?? '',
      bio: (user as unknown as { bio?: string }).bio ?? '',
      company: (user as unknown as { company?: string }).company ?? '',
      website: (user as unknown as { website?: string }).website ?? ''
    }),
    [user]
  )

  const [name, setName] = useState(initial.name)
  const [image, setImage] = useState(initial.image)
  const [bio, setBio] = useState(initial.bio)
  const [company, setCompany] = useState(initial.company)
  const [website, setWebsite] = useState(initial.website)

  const [isSaving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const onSave = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSaved(false)

    if (!name.trim()) {
      setError(t.errors.nameRequired)
      return
    }

    setSaving(true)
    try {
      const result = await updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
        bio: bio.trim() || undefined,
        company: company.trim() || undefined,
        website: website.trim() || undefined
      })

      if (result?.error) {
        setError(result.error.message ?? t.errors.generic)
        return
      }

      setSaved(true)
      router.refresh()
    } catch {
      setError(t.errors.generic)
    } finally {
      setSaving(false)
    }
  }

  const onSignOut = async () => {
    setError(null)
    setSaving(true)
    try {
      await signOut()
      router.push('/auth')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className='grid gap-5' onSubmit={onSave}>
      <div className='grid gap-3 rounded-xl border bg-background p-4'>
        <div className='text-muted-foreground text-xs'>{t.account}</div>
        <div className='grid gap-1 text-sm'>
          <div className='flex items-center justify-between gap-3'>
            <div className='text-muted-foreground'>{t.email}</div>
            <div className='font-mono text-xs'>{user.email}</div>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <div className='text-muted-foreground'>{t.userId}</div>
            <div className='font-mono text-xs'>{user.id}</div>
          </div>
        </div>
      </div>

      <div className='grid gap-4'>
        <div className='grid gap-4 md:grid-cols-2'>
          <Input
            autoComplete='name'
            disabled={isSaving}
            label={t.fields.name}
            onChange={setName}
            placeholder={t.placeholders.name}
            value={name}
          />
          <Input
            autoComplete='organization'
            disabled={isSaving}
            label={t.fields.company}
            onChange={setCompany}
            placeholder={t.placeholders.company}
            value={company}
          />
        </div>

        <Input
          autoComplete='url'
          disabled={isSaving}
          label={t.fields.website}
          onChange={setWebsite}
          placeholder={t.placeholders.website}
          type='url'
          value={website}
        />

        <Input
          autoComplete='url'
          disabled={isSaving}
          label={t.fields.avatar}
          onChange={setImage}
          placeholder={t.placeholders.avatar}
          type='url'
          value={image}
        />

        <Textarea
          disabled={isSaving}
          label={t.fields.bio}
          onChange={setBio}
          placeholder={t.placeholders.bio}
          value={bio}
        />
      </div>

      {error && (
        <div className='rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-destructive text-sm'>
          {error}
        </div>
      )}

      {saved && (
        <div className='rounded-lg border bg-background px-3 py-2 text-sm'>
          {t.saved}
        </div>
      )}

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <Button
          className='h-10 gap-2'
          disabled={isSaving}
          type='submit'
          variant='default'
        >
          {isSaving && <Loader2 className='animate-spin' />}
          {!isSaving && <Save />}
          {t.cta.save}
        </Button>

        <Button
          className='h-10 gap-2'
          disabled={isSaving}
          onClick={onSignOut}
          type='button'
          variant='secondary'
        >
          <LogOut />
          {t.cta.signOut}
        </Button>
      </div>
    </form>
  )
}
