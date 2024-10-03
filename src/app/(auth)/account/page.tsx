import React from 'react'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import Navbar from '@/components/navbar'

import AccountPage from './account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = () => {
  const headersList = headers()
  const token = headersList.get('token')

  if (!token) {
    redirect('/not-found')
  } else {
    return (
      <>
        <Navbar />
        <AccountPage />
        <Footer />
      </>
    )
  }
}

export default Page
