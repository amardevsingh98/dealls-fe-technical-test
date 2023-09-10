"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Button } from '@/components/ui/button'
import ButtonNav from "../button-nav"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  TableOptions,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  totalDataCount?: number,
  pageSize?: number,
  pageIndex?: number,
  pageQueryKey?: string,
  manualPagination?: boolean,
  handlePageChange?: (pageIndex: number) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  pageIndex = 1,
  totalDataCount,
  pageQueryKey = "page",
  manualPagination = true,
  handlePageChange
}: DataTableProps<TData, TValue>) {

  const manualPageCount = Math.ceil((totalDataCount || 0) / pageSize)

  const tableOptions: TableOptions<TData> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination
  }

  if (manualPagination) {
    tableOptions.state = {
      pagination: {
        pageSize,
        pageIndex,
      }
    }

    tableOptions.pageCount = manualPageCount
  }

  const table = useReactTable(tableOptions)
  const computedPageCount = table.getPageCount()

  const currentPageIndex = table.getState().pagination.pageIndex

  const canGoPreviousPage = manualPagination ? currentPageIndex > 1 : table.getCanPreviousPage()
  const canGoNextPage = manualPagination ? currentPageIndex < computedPageCount : table.getCanNextPage()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  function getLinkHref(pageIndex: number) {
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

 
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between md:justify-end space-x-4 pt-12 w-full">
        <Button
          variant={canGoPreviousPage ? "default" : "secondary"}
          size="sm"
          disabled={!canGoPreviousPage}
          aria-disabled={!canGoPreviousPage}
          onClick={() => {
            if (!manualPagination && canGoPreviousPage) {
              return table.previousPage()
            }

            if (canGoPreviousPage && handlePageChange) {
              handlePageChange(currentPageIndex - 1)
            }
          }}
        >
          Previous
        </Button>

        <span>
          Page{" "}
          <strong>
            {manualPagination ? currentPageIndex : currentPageIndex + 1} of {manualPagination ? manualPageCount : computedPageCount}
          </strong>{" "}
        </span>

        <Button
          variant={canGoNextPage ? "default" : "secondary"}
          size="sm"
          disabled={!canGoNextPage}
          aria-disabled={!canGoNextPage}
          onClick={() => {
            if (!manualPagination && canGoNextPage) {
              return table.nextPage()
            }

            if (canGoNextPage && handlePageChange) {
              handlePageChange(currentPageIndex + 1)
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
