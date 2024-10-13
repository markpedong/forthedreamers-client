import { redirect } from 'next/navigation'

import { getAddress, getCart } from '@/lib/server'

import Checkout from './components/checkout'

const Page = async () => {
  const cart = await getCart()
  const address = await getAddress()

  if (!!!cart?.data) {
    redirect('/')
  } else
    return (
      <div>
        <Checkout address={address} />
      </div>
    )
}

export default Page
