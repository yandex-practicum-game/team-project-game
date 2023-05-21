import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SigninRequest } from '../types/auth.types'
import { ChangePasswordRequest, UserUpdateRequest } from '../types/user.types'
import { BASE_URL } from '../constants/apiConfig'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query({
      query: () => ({
        url: '/auth/user',
        headers: { 'Content-Type': 'application/json' },
      }),
      providesTags: ['User'],
    }),
    signIn: build.mutation({
      query: (data: SigninRequest) => ({
        url: '/auth/signin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        responseHandler: response => response.text(),
      }),
      invalidatesTags: ['User'],
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        responseHandler: response => response.text(),
      }),
      invalidatesTags: ['User'],
    }),
    changeUserData: build.mutation({
      query: (data: UserUpdateRequest) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
        headers: { 'Content-Type': 'application/json' },
        invalidatesTags: ['User'],
      }),
    }),
    changeUserAvatar: build.mutation({
      query: (data: FormData) => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        body: data,
        invalidatesTags: ['User'],
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
  useGetUserQuery,
  useSignInMutation,
  useLogoutMutation,
  useChangeUserDataMutation,
  useChangeUserAvatarMutation,
  useChangeUserPasswordMutation,
} = baseApi
