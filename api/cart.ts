import { Cart, CartState } from "@/types/cart"

export type CartParams = {
  page?: number
}

export async function getAllCart(params: CartParams) {
  const baseURL = 'https://dummyjson.com/carts'
  const url = new URL(baseURL)

  url.searchParams.set('limit', '10')
  if (params.page) {
    url.searchParams.set('skip', String((params.page - 1) * 10))
  }

  const res = await fetch(url.toString())
  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data as CartState
}

export async function getCartById(id: number | string) {
  const baseURL = `https://dummyjson.com/carts/${id}`
  const res = await fetch(baseURL)
  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data as Cart
}
