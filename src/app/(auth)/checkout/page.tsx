import { redirect } from 'next/navigation'
import { getCart } from '@/api'

import { getAddress } from '@/lib/server'

import Checkout from './components/checkout'

const Page = async () => {
  const cart = await getCart({})
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
