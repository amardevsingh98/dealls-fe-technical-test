import { User } from "@/types/user"

export async function getUserById(id: number | string) {
  const baseURL = `https://dummyjson.com/users/${id}`
  const res = await fetch(baseURL)
  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data as User
}