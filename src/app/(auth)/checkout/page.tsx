import React from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

import Checkout from './checkout'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Checkout />
      <Footer />
    </div>
  )
}

export default Page
