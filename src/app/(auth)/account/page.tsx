import React from 'react'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import Navbar from '@/components/navbar'

import AccountPage from './account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = () => {
  const isAuthenticated = true

  if (!isAuthenticated) {
    redirect('/')
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
