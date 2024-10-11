import { redirect } from 'next/navigation'

import { getAddress, getCart } from '@/api'

import Checkout from './components/checkout'

const Page = async () => {
  const cart = await getCart()
  const address = await getAddress()

  if (cart?.data?.length === 0) {
    redirect('/')
  } else
    return (
      <div>
        <Checkout address={address} />
      </div>
    )
}

export default Page
