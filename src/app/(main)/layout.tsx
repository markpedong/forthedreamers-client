import '@/styles/global.scss'

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/redux/provider'

import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

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
      <link rel="icon" href="/assets/images/dog.jpg" sizes="any" />
      <body className={inter.className}>
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
