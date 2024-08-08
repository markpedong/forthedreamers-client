import React from 'react'
import { getCollectionsByID } from '@/api'

interface PageProps {
  params: {
    id: string
  }
}
const Page = async ({ params: { id } }: PageProps) => {
  const collections = await getCollectionsByID({ id })

  console.log(collections)

  return <div>CatagoryPage</div>
}

export default Page
