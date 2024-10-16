import { getOrders } from '@/lib/server'
import styles from '../styles.module.scss'
import AccountPage from './components/account'

const Page = async () => {
  const orders = await getOrders()
  return (
    <div className={styles.container}>
      <AccountPage orders={orders} />
    </div>
  )
}

export default Page
