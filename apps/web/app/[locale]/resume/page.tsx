import { ResumeActions } from './_/actions'
import { getResumeData } from './_/data'
import { ResumePaper } from './_/resume'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const data = getResumeData(locale)

  return (
    <div className='relative min-h-screen py-8 print:p-0'>
      {/* Desktop Sticky Actions */}
      <div className='pointer-events-none absolute top-14 left-[calc(50%+105mm+20px)] hidden h-full xl:block'>
        <div className='pointer-events-auto sticky top-8'>
          <ResumeActions />
        </div>
      </div>

      <div className='mx-auto flex max-w-[210mm] flex-col gap-4 px-4 print:max-w-none print:px-0'>
        {/* Mobile Actions */}
        <div className='flex justify-end xl:hidden print:hidden'>
          <ResumeActions />
        </div>

        <ResumePaper data={data} />
      </div>
    </div>
  )
}
