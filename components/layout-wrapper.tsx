"use client"
import Header from '@/components/header'
import SideBar from './side-bar'
import useMediaQuery from '@/hooks/useMediaQuery'
import Bowser from 'bowser'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

function checkIfMobile(userAgent: string): boolean {
  if (!userAgent) return false
  const { os } = Bowser.parse(userAgent)
  return os?.name === 'Android' || os?.name === 'iOS'
}


export default function LayoutWrapper({ children, headers }: { children: React.ReactNode, headers: ReadonlyHeaders }) {
  let userAgent = ''

  headers.forEach((list) => {
    if (list[0] === 'user-agent') {
      userAgent = list[1]
    }
  });

  const isMobile = useMediaQuery({ mediaString: '(max-width: 640px)', initialMatch: checkIfMobile(userAgent || '') })

  const mainClass = [
    isMobile ? 'mt-[80px]' : '',  
    'transition-all duration-300 ease-in-out',
  ]

  return (
    <div>
      { isMobile ? (<Header />) : null }

      <main className={mainClass.join(' ')}>
        <div className='flex w-full relative'>
          <div className='relative'>
            { !isMobile ? (<SideBar className='border-r-2 w-60 sticky top-0 h-[100vh]'/>) : null }
          </div>
          <div className='w-full pt-4 px-6'>
            {children}  
          </div>
        </div>
      </main>
    </div>
  )
}