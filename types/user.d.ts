export type gender = "female" | "male"

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  gender: gender,
  email: string,
  image: string,
}