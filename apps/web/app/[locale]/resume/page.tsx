'use client'

import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { Download, Link as LinkIcon, MoreVertical, Printer } from 'lucide-react'
import LanguageSwitchButton from '@/components/language-switch-button'
import { ResumePaper } from './_/resume'

export default function Page() {
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

  return (
    <div className='min-h-screen py-8 print:p-0'>
      <div className='mx-auto flex max-w-[210mm] flex-col items-end gap-4 px-4 print:max-w-none print:px-0'>
        <div className='flex gap-2 print:hidden'>
          <LanguageSwitchButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='outline'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleCopyLink}>
                <LinkIcon className='mr-2 h-4 w-4' />
                Copy Resume Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className='mr-2 h-4 w-4' />
                Print Resume
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                <Download className='mr-2 h-4 w-4' />
                Download As PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ResumePaper />
      </div>
    </div>
  )
}
