import ReduxProvider from '@/redux/provider'

import { Toaster } from '@/components/ui/sonner'

import '@/styles/global.scss'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For the Dreamers',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/login_cover.webp" sizes="any" />
      <body>
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
