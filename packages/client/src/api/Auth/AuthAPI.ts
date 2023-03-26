import { apiInstance } from '..'
import { SigninRequest, SingupRequest, UserResponse } from './types'

export const AuthAPI = {
  signin: (body: SigninRequest) => {
    return apiInstance.post<string>('/auth/signin', body)
  },
  signup: (body: SingupRequest) => {
    return apiInstance.post<UserResponse['id']>('/auth/signup', body)
  },
  logout: () => {
    return apiInstance.post<void>('/auth/logout')
  },
  getUser: () => {
    return apiInstance.get<UserResponse>('/auth/user')
  },
}
