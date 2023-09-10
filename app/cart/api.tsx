import { Cart, CartState } from "@/types/cart"

export async function getAllCart() {
  const baseURL = 'https://dummyjson.com/carts'
  const res = await fetch(baseURL)
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



