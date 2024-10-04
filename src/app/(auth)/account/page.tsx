import dynamic from 'next/dynamic'

import Navbar from '@/components/navbar'

import AccountPage from './account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = () => {
  // const token = cookies().get('token')?.value

  // console.log(token)
  // if (!token) {
  //   // redirect('/not-found')
  // } else {
  //   return (
  //     <>
  //       <Navbar />
  //       <AccountPage />
  //       <Footer />
  //     </>
  //   )
  // }

  return (
    <div>
      <Navbar />
      <AccountPage />
      <Footer />
    </div>
  )
}

export default Page
