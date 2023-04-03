import { apiInstance } from '..'
import { ChangePasswordRequest, UserResponse, UserUpdateRequest } from './types'

export const UserAPI = {
  changeUserData: (body: UserUpdateRequest) => {
    return apiInstance.put<string>(`/user/profile`, body)
  },
  changeUserPassword: (body: ChangePasswordRequest) => {
    return apiInstance.put<string>(`/user/password`, body)
  },
  changeUserAvatar: (body: FormData) => {
    return apiInstance.put<UserResponse>(`/user/profile/avatar`, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
