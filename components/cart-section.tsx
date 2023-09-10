"use client"

import { CartState } from '@/types/cart'
import { columns } from '@/app/cart/column'
import { DataTable } from '@/components/ui/data-table';
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { getAllCart } from '@/api/cart';
import { useRouter } from 'next/navigation';

export default function CarSection({ carts }: { carts: CartState }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [fetchedCarts, setFetchedCarts] = useState<CartState | null>(carts)
  const [page, setPage] = useState(1)
  const didMountRef = useRef(false)

  const cartList = fetchedCarts?.carts || []
  const totalCart = fetchedCarts?.total || 0

  useEffect(() => {
    const parsedParams = Object.fromEntries(searchParams.entries())
    const paramsPage = +parsedParams?.page || 1
    setPage(paramsPage)

    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    async function fetchCarts(page: number) {
      const resCarts = await getAllCart({ page })
      setFetchedCarts(resCarts)
    }

    fetchCarts(paramsPage)
  }, [searchParams])

  return (
    <div className='max-w-[1200px]'>
      <DataTable
        columns={columns} 
        data={cartList}
        totalDataCount={totalCart}
        pageIndex={page}
        handlePageChange={((pageIndex: number) => {
          return router.replace(`/cart?page=${pageIndex}`)
        })}
      />
    </div>
  )
}
