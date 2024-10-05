import dynamic from 'next/dynamic'

import Navbar from '@/components/navbar'

import AccountPage from './account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = async () => {
  // const token = cookies().get('token')?.value

  // if (token) {
  return (
    <>
      <Navbar />
      <AccountPage />
      <Footer />
    </>
  )
  // } else {
  //   redirect('/not-found')
  // }
}

export default Page
