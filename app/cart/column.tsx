"use client"

import { ColumnDef } from '@tanstack/react-table'
import { Cart } from '@/types/cart'
import ButtonNav from '@/components/button-nav'

export const columns: ColumnDef<Cart>[] = [
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: "totalProducts",
    header: "Total Products",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
  },
  {
    accessorKey: "discountedTotal",
    header: "Discounted Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("discountedTotal"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id")

      return (
        <ButtonNav
          href={`/cart/${id}`}
          variant="default"

        >
          <span className='text-xs md:text-sm'>
            See Detail
          </span>
        </ButtonNav>
      )
    },
  },
]