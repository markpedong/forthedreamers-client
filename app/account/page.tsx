import { getOrders } from '@/lib/server'
import AccountPage from './components/account'

const Page = async () => {
  const orders = await getOrders()

  return <AccountPage orders={orders} />
}

export default Page
