import { Product } from "./product"

type CartProduct = Partial<Product> & {
  quantity: number,
  total: number,
  discountedPrice: number,
}

export type Cart = {
  id: number,
  products: CartProduct[],
  total: number,
  discountedTotal: number,
  userId: number,
  totalProducts: number,
  totalQuantity: 10
}

export type CartState = {
  carts: Cart[],
  total: number,
  skip: number,
  limit: number,
}