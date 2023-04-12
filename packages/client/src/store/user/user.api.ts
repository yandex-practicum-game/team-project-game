import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_CONFIG } from '../../api/config'
import { ChangePasswordRequest, UserUpdateRequest } from '../../api/User/types'

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    changeUserData: build.mutation({
      query: (data: UserUpdateRequest) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    changeUserAvatar: build.mutation({
      query: (data: FormData) => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        body: data,
      }),
    }),
    changeUserPassword: build.mutation({
      query: (data: ChangePasswordRequest) => ({
        url: '/user/password',
        method: 'PUT',
        body: data,
        responseHandler: response => {
          if (response.ok) {
            return response.text()
          }
          return response.json()
        },
      }),
    }),
  }),
})

export const {
  useChangeUserDataMutation,
  useChangeUserAvatarMutation,
  useChangeUserPasswordMutation,
} = userApi
