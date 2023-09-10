"use client"

import { Product } from "@/types/product";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function ProductChart({ products }: { products: Product[]}) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={products}>
        <XAxis
          dataKey="title"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="stock" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
