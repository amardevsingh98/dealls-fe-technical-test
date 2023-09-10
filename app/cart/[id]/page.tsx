import React from "react";

import { getCartById } from "@/api/cart";
import { getUserById } from "@/api/user";
import UserAvatar from "@/components/user-avatar";

export default async function CartDetailPage(
  { params }: { params: { id: string } }
) {

  const resCartDetail = await getCartById(params.id)

  if (!resCartDetail) {
    return <div>Cart not found</div>
  }

  const user = await getUserById(resCartDetail.userId)

  if (!user) {
    return <div>User not found</div>
  }

  const cartId = resCartDetail.id

  const totalPrice = resCartDetail.products.reduce((acc, product) => {
    return acc + product.total
  }, 0)

  return (
    <div className="pb-12 w-full">
      <div className="mb-8">
        <h1 className="text-2xl mb-1 font-semibold">
          Cart #{cartId}
        </h1>
      </div>

      {/* User Details */}
      { user && (
        <div className="mb-8">
          <h2 className="text-xl mb-3 font-semibold">User Details</h2>
          <UserAvatar 
            image={user.image}
            fullName={user.firstName + user.lastName}
            email={user.email}
          />
        </div>
      )}

      {/* Product Details */}
      <h2 className="text-xl mb-4 font-semibold">Cart Details</h2>

      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        <div className="max-w-full">
          {
            resCartDetail.products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="
                    rounded-md outline outline-1 outline-gray-200 flex items-center justify-between
                    p-4 mb-6
                  "
                >
                  <div className="flex items-center max-w-[50%] md:max-w-[80%]">
                    <p className="text-xl text-gray-500">
                      x{product.quantity}
                    </p>

                    <div className="ml-4">
                      <p className="text-sm md:text-lg font-semibold truncate max-w-[55%] md:max-w-none">
                        {product.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center pl-8">
                    <span className="text-sm md:text-lg font-semibold">
                      ${product.total}
                    </span>
                    <span className="mx-1"/>
                    <span className="text-xs text-gray-500">
                      (${product.price}/each)
                    </span>
                  </div>

                </div>
              )
            })
          }
        </div>

        <div className="
          rounded-md outline outline-1 outline-gray-200
          p-4 mb-6
          min-w-full md:min-w-[400px]
          self-start
          xl:ml-20
        ">
          <h1 className="text-xl font-semibold mb-6">Summary</h1>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Products</p>
              <p className="text-lg text-gray-500">{resCartDetail.totalProducts}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm">Total Discounts</p>
              <p className="text-lg text-gray-500">${resCartDetail.discountedTotal}</p>
            </div>

            <div className="outline outline-1 outline-gray-100 my-2"/>

            <div className="flex justify-between">
              <p className="text-lg">Final Price</p>
              <p className="text-lg font-semibold">${resCartDetail.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
