import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SigninRequest } from '../../api/Auth/types'
import { API_CONFIG } from '../../api/config'

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }),
  endpoints: build => ({
    getUser: build.query({
      query: () => ({
        url: '/auth/user',
      }),
    }),
    signIn: build.mutation({
      query: (data: SigninRequest) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
        responseHandler: response => response.text(),
      }),
    }),
  }),
})

export const { useGetUserQuery, useSignInMutation } = userApi
