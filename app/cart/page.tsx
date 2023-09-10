
import { getAllCart } from "@/api/cart"
import CartSection from '@/components/cart-section'

export default async function CartPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}
) {

  const resCarts = await getAllCart(searchParams || {})
  if (resCarts === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-2xl">Something went wrong</p>
      </div>
    )
  }

  return (
    <div className="pb-12">
      <div className="mb-8">
        <h1 className="text-2xl mb-1 font-semibold">
          Carts
        </h1>

        <h3 className="text-gray-400 text-lg">
          Here are the list of carts.
        </h3>
      </div>

      <CartSection carts={resCarts}/>
    </div>
)}
