import dynamic from 'next/dynamic'

import styles from '../styles.module.scss'
import AccountPage from './components/account'

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
})

const Page = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AccountPage />
      </div>
      <Footer />
    </div>
  )
}

export default Page
