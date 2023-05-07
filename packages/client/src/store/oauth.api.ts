import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_CONFIG, REDIRECT_URI } from '../constants/apiConfig'
import { OAuthLoginRequest } from '../types/auth.types'

export const oauthApi = createApi({
  reducerPath: 'oauthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.OAUTH_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getServiceId: build.query<Record<string, string>, null>({
      query: () => ({
        url: `/yandex/service-id`,
        headers: { 'Content-Type': 'application/json' },
        params: { redirect_uri: REDIRECT_URI },
        responseHandler: response => response.json(),
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          window.open(
            `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${REDIRECT_URI}`,
            '_self'
          )
        } catch (e) {
          console.error('getServiceId error', e)
        }
      },
    }),
    oAuthSignIn: build.mutation({
      query: (data: Omit<OAuthLoginRequest, 'redirect_uri'>) => ({
        url: '/yandex',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          code: data.code,
          redirect_uri: REDIRECT_URI,
        },
      }),
    }),
  }),
})

export const { useLazyGetServiceIdQuery, useOAuthSignInMutation } = oauthApi
