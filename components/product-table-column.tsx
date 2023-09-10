"use client"

import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/types/product'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return <div className='capitalize'>{category}</div>
    }
  }
]