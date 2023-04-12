import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_CONFIG } from '../../api/config'
import { UserUpdateRequest } from '../../api/User/types'

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    // headers: { 'Content-Type': 'application/json' },
    // credentials: 'include',
  }),
  endpoints: build => ({
    changeUserData: build.mutation({
      query: (data: UserUpdateRequest) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
    }),
    changeUserAvatar: build.mutation({
      query: (data: FormData) => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        body: data,
        credentials: 'include',
        // headers: { 'Content-Type': 'multipart/form-data' },
      }),
    }),
  }),
})

export const { useChangeUserDataMutation, useChangeUserAvatarMutation } =
  userApi
