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
      <link rel="icon" href="/assets/images/login_cover.webp" sizes="any" />
      <body>{children}</body>
    </html>
  )
}
