import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import AuthCard from '@/app/[locale]/auth/ui/auth-card'
import { getServerSession } from '@/lib/session'

export default async function Page(props: PageProps<'/[locale]/auth'>) {
  const params = await props.params
  const session = await getServerSession()
  if (session) {
    redirect(params.locale === 'en' ? '/profile' : `/${params.locale}/profile`)
  }

  const t = await getTranslations('page.auth')
  const copy = {
    tabs: { signIn: t('tabs.signIn'), signUp: t('tabs.signUp') },
    fields: {
      name: t('fields.name'),
      email: t('fields.email'),
      password: t('fields.password')
    },
    placeholders: {
      name: t('placeholders.name'),
      email: t('placeholders.email'),
      password: t('placeholders.password')
    },
    actions: { show: t('actions.show'), hide: t('actions.hide') },
    cta: { signIn: t('cta.signIn'), signUp: t('cta.signUp') },
    errors: { missing: t('errors.missing'), generic: t('errors.generic') }
  } as const

  return (
    <main className='flex flex-1 items-center justify-center px-6 py-14'>
      <div className='w-full max-w-md'>
        <div className='rounded-2xl border bg-background/70 p-6 shadow-xs backdrop-blur'>
          <div className='font-semibold text-2xl tracking-tight'>
            {t('title')}
          </div>
          <p className='mt-2 text-muted-foreground text-sm leading-relaxed'>
            {t('subtitle')}
          </p>
          <div className='mt-6'>
            <AuthCard copy={copy} />
          </div>
        </div>
      </div>
    </main>
  )
}
