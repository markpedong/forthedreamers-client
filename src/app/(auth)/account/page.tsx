import dynamic from 'next/dynamic'

import Navbar from '@/components/navbar'

import styles from '../styles.module.scss'
import AccountPage from './account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = async () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <AccountPage />
      </div>
      <Footer />
    </div>
  )
}

export default Page
