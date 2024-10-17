import { getOrders, getReviews } from '@/lib/server'
import AccountPage from './components/account'

const Page = async () => {
  const orders = await getOrders()
  const reviews = await getReviews()

  return <AccountPage orders={orders} reviews={reviews} />
}

export default Page
