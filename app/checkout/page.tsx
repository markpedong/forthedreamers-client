import { redirect } from 'next/navigation'

import { getAddress, getCart } from '@/lib/server'

import Checkout from './components/checkout'

const Page = async () => {
  const cart = await getCart()
  const address = await getAddress()

  if (!cart?.length) {
    redirect('/')
  } else return <Checkout address={address} carts={cart} />
}

export default Page
