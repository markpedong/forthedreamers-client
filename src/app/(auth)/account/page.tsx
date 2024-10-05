import dynamic from 'next/dynamic'

import Navbar from '@/components/navbar'

import AccountPage from './account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = async () => {
  return (
    <>
      <Navbar />
      <AccountPage />
      <Footer />
    </>
  )
}

export default Page
