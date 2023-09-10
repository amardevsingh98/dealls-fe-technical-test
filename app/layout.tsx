import './globals.css'  
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LayoutWrapper from '@/components/layout-wrapper'

const inter = Inter({ subsets: ['latin'] })

import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for Ecommerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const headersList = headers()

  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper headers={headersList}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
