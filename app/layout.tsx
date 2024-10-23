import '@/styles/global.scss'

import ReduxProvider from '@/redux/provider'
import type { Metadata } from 'next'

import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'For the Dreamers',
  description: ''
}

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
          <div className="content">{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
