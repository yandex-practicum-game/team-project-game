import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_CONFIG } from '../constants/apiConfig'
import { OAuthLoginRequest } from '../types/auth.types'

export const oauthApi = createApi({
  reducerPath: 'oauthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.OAUTH_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getServiceId: build.query<Record<string, string>, string>({
      query: (redirect_uri: string) => ({
        url: `/yandex/service-id`,
        headers: { 'Content-Type': 'application/json' },
        params: { redirect_uri: redirect_uri },
        responseHandler: response => response.json(),
      }),
    }),
    oAuthSignIn: build.mutation({
      query: (data: OAuthLoginRequest) => ({
        url: '/yandex',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          code: data.code,
          redirect_uri: data.redirect_uri,
        },
      }),
    }),
  }),
})

export const { useLazyGetServiceIdQuery, useOAuthSignInMutation } = oauthApi
