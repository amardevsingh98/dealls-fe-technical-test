import { Product, ProductState } from "@/types/product";
import { getProduct, getUpdatedFetchParams } from "@/api/product";

import ProductSection from "@/components/product-section";

export default async function Product({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}
) {

  const filterParams = searchParams
  const resProduct = await getProduct(getUpdatedFetchParams(filterParams))

  if (resProduct === null) {
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
          Products
        </h1>

        <h3 className="text-gray-400 text-lg">
          Here are the list of products.
        </h3>
      </div>

      <ProductSection products={resProduct} />
    
    </div>
)}
