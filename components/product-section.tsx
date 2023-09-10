"use client"

import { ProductState } from "@/types/product";
import { useEffect, useState, useRef } from "react";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { getProduct, FetchParams, getAllProductCategories, getUpdatedFetchParams } from "@/api/product";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "./ui/button";
import { columns } from "@/components/product-table-column";
import { SearchFilter } from "./search-filter";
import SelectFilter from "./select-filter";
import ProductChart from "./product-chart";

function getParsedParams(params: ReadonlyURLSearchParams) {
  return Object.fromEntries(params.entries())
}

function getLinkHref(pageIndex: number, pageQueryKey: string, searchParams: ReadonlyURLSearchParams, pathname: string) {
  const updatedParams = {
    ...(Object.fromEntries(searchParams.entries()) || {}),
    [pageQueryKey]: pageIndex.toString(),
  }

  const url = new URL(pathname, window.location.origin)

  for (const key in updatedParams) {
    url.searchParams.append(key, updatedParams[key])
  }

  return url.toString()
}

export default function ProductSection({ products }: { products: ProductState }) {
  const searchParams = useSearchParams()
  const parsedParams = getParsedParams(searchParams)
  const didMountRef = useRef(false)
  const router = useRouter()

  const [fetchedProduct, setFetchedProduct] = useState<ProductState | null>(products)
  const [fetchParams, setFetchParams] = useState<FetchParams>(getUpdatedFetchParams(getParsedParams(searchParams)))
  const [productCategories, setProductCategories] = useState<string[]>([])

  const pageIndex = fetchParams?.page || 1
  const search = fetchParams?.search || ''
  const category = fetchParams?.category || undefined
  const minPrice = fetchParams?.minPrice || ''
  const maxPrice = fetchParams?.maxPrice || ''
  const brand = fetchParams?.brand || ''
  
  const productsList = fetchedProduct?.products || []
  const filteredProduct = productsList.filter((product) => {
    let match = true
    if (minPrice) {
      match = match && (product.price >= parseInt(minPrice.toString()))
    }

    if (maxPrice) {
      match = match && (product.price <= parseInt(maxPrice.toString()))
    }

    if (brand) {
      match = match && (product.brand.toLowerCase().includes(brand.toLowerCase())) 
    }

    return match
  })

  const totalProducts = fetchedProduct?.total || 0

  const isFilterApplied = Object.keys(parsedParams).length > 0

  useEffect(() => {  
    // Prevent duplicate fetch on first render (server and client)
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    const parsedParams = getParsedParams(searchParams)
    const updatedFetchParams = getUpdatedFetchParams(parsedParams)

    setFetchParams(updatedFetchParams)

    async function fetchProducts() {
      const resProduct = await getProduct(updatedFetchParams)
      setFetchedProduct(resProduct)
    }

    fetchProducts()

  }, [searchParams])

  useEffect(() => {
    getAllProductCategories().then((categories) => {
      if (!categories) {
        return
      }

      setProductCategories(categories)
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center md:justify-normal mb-2">
        <h2 className="text-2xl font-semibold py-3">
          Filter
        </h2>

        {
          isFilterApplied && (
            <Button
              size="sm"
              className="md:my-0 md:ml-5"
              onClick={() => {
                router.replace('/')
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30">
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" fill="currentColor"></path>
              </svg>
              <span className="ml-2">
                Reset
              </span>
            </Button>
          )
        }
      </div>

      <div className="flex flex-wrap gap-5 mb-3">
        <SearchFilter 
          search={search}
          placeholder="Search Product..."
          className="w-full md:w-[300px] mr-0"
          onChange={(value) => {
            router.replace(`/?q=${value}&page=1`)
          }}
          hideSearchButton
        />

        <SelectFilter
          items={['All', ...productCategories,]}
          key={category}
          placeholder="Select category"
          className="w-full md:w-[180px]"
          value={category} 
          onChange={(_category) => {
            router.replace(`/?category=${_category === 'All' ? '' : _category}&page=1`)
          }} 
        />

        <SearchFilter 
          search={brand}
          placeholder={`Search Brand...`}
          className="w-full md:w-[180px]"
          onChange={(value) => {
            const url = new URL('/', window.location.origin)
            for (const key in parsedParams) {
              url.searchParams.set(key, parsedParams[key])
            }
            url.searchParams.set('brand', value)
            router.replace(url.toString())
          }}
          hideSearchButton
        />

        <SearchFilter 
          search={minPrice.toString()}
          placeholder={`Min Price`}
          className="w-full md:w-[180px]"
          onChange={(value) => {
            const url = new URL('/', window.location.origin)
            for (const key in parsedParams) {
              url.searchParams.set(key, parsedParams[key])
            }
            url.searchParams.set('minPrice', value)
            router.replace(url.toString())
          }}
          formatter={(value) => {
            const formatted = value.replace(/[^0-9]/g, '')
            const parsedFormated = isNaN(parseInt(formatted)) ? "" : parseInt(formatted)
            return parsedFormated.toString()
          }}
          hideSearchButton
        />

        <SearchFilter 
          search={maxPrice.toString()}
          placeholder={`Max Price`}
          className="w-full md:w-[180px]"
          onChange={(value) => {
            const url = new URL('/', window.location.origin)
            for (const key in parsedParams) {
              url.searchParams.set(key, parsedParams[key])
            }
            url.searchParams.set('maxPrice', value)
            router.replace(url.toString())
          }}
          formatter={(value) => {
            const formatted = value.replace(/[^0-9]/g, '')
            const parsedFormated = isNaN(parseInt(formatted)) ? "" : parseInt(formatted)
            return parsedFormated.toString()
          }}
          hideSearchButton
        />
      </div>

      <h2 className="text-xl font-semibold py-5">
        Product Data
      </h2>


      <div className="flex flex-col md:flex-row gap-10 flex-wrap max-w-full">
        <div className="max-w-full md:min-w-[60%]">
          <DataTable
            columns={columns} 
            data={filteredProduct}
            totalDataCount={totalProducts}
            pageIndex={pageIndex}
            handlePageChange={((pageIndex: number) => {
              return router.replace(getLinkHref(pageIndex, 'page', searchParams, '/'))
            })}
          />
        </div>
        <div className="lg:ml-12">
          <h2 className="mb-2 text-xl font-semibold">Product Chart</h2>
          <h3 className="text-gray-400 text-md mb-10">
            Chart representation of products based on applied filters
          </h3>

          <div className="-ml-[30px]">
            <ProductChart products={filteredProduct} />
          </div>
        </div>
      </div>
    </div>
  )
}
