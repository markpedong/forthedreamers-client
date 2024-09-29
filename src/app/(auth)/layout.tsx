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
      <body>
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
