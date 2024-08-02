import { getProductDetails } from '../../../../../api'
import Product from './product'

const Page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductDetails({ product_id: params.id })

  return <Product product={product?.data!} />
}

export default Page
