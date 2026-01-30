import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import ProfileForm from '@/app/[locale]/profile/ui/profile-form'
import { getServerSession } from '@/lib/session'

export default async function Page(props: PageProps<'/[locale]/profile'>) {
  const params = await props.params
  const session = await getServerSession()
  if (!session) {
    redirect(params.locale === 'en' ? '/auth' : `/${params.locale}/auth`)
  }

  const t = await getTranslations('page.profile')
  const copy = {
    account: t('account'),
    email: t('email'),
    userId: t('userId'),
    fields: {
      name: t('fields.name'),
      company: t('fields.company'),
      website: t('fields.website'),
      avatar: t('fields.avatar'),
      bio: t('fields.bio')
    },
    placeholders: {
      name: t('placeholders.name'),
      company: t('placeholders.company'),
      website: t('placeholders.website'),
      avatar: t('placeholders.avatar'),
      bio: t('placeholders.bio')
    },
    cta: { save: t('cta.save'), signOut: t('cta.signOut') },
    saved: t('saved'),
    errors: {
      nameRequired: t('errors.nameRequired'),
      generic: t('errors.generic')
    }
  } as const

  return (
    <main className='mx-auto w-full max-w-3xl flex-1 px-6 py-12'>
      <div className='rounded-2xl border bg-background/70 p-6 shadow-xs backdrop-blur'>
        <div className='font-semibold text-2xl tracking-tight'>
          {t('title')}
        </div>
        <p className='mt-2 text-muted-foreground text-sm leading-relaxed'>
          {t('subtitle')}
        </p>
        <div className='mt-6'>
          <ProfileForm copy={copy} user={session.user} />
        </div>
      </div>
    </main>
  )
}
