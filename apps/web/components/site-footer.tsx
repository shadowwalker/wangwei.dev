export default function SiteFooter() {
  return (
    <footer className='mx-auto max-w-4xl px-6 py-16 md:px-12'>
      <div className='mb-12 w-3/5 border-foreground/20 border-t' />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='text-muted-foreground/50 text-xs leading-loose'>
          <div>San Francisco, CA</div>
          <div>UTC-8</div>
        </div>
        <nav className='flex flex-col gap-4 font-medium text-[11px] uppercase tracking-[0.2em] md:flex-row md:items-end md:justify-end md:gap-8'>
          <a
            className='transition-colors hover:text-foreground'
            href='https://twitter.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Twitter
          </a>
          <a
            className='transition-colors hover:text-foreground'
            href='https://github.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Github
          </a>
          <a
            className='transition-colors hover:text-foreground'
            href='mailto:hello@example.com'
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
