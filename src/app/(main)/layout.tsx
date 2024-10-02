import '@/styles/global.scss'

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ReduxProvider from '@/redux/provider'

import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'For the Dreamers',
  description: '',
}

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/images/login_cover.webp" sizes="any" />
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
