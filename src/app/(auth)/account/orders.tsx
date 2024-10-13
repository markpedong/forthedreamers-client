'use client'

import { useQuery } from '@tanstack/react-query'

import { getOrders } from '@/lib/server'

const Orders = () => {
  const {} = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await getOrders()

      console.log('res', res?.data)
      return res ?? []
    },
  })

  return <div>Orders</div>
}

export default Orders
