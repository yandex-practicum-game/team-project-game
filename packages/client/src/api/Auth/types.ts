export type SigninRequest = {
  login: string
  password: string
}

export type SingupRequest = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  confirm_password?: string
  phone: string
}

export type UserResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export type ReasonResponse = {
  reason: string
}
