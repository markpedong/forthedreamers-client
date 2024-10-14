import '@/styles/global.scss'

import ReduxProvider from '@/redux/provider'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'For the Dreamers',
  description: ''
}

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/login_cover.webp" sizes="any" />
      <body>
        <ReduxProvider>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
