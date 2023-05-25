import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ForumData,
  ForumQueryResponse,
  ForumRequestParams,
} from '../types/forum.types'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    credentials: 'include',
  }),
  endpoints: build => ({
    getForums: build.mutation<ForumQueryResponse, ForumRequestParams>({
      query: (params: ForumRequestParams) => ({
        url: `/forums?take=${params.take}&page=${params.page}`,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
})

export const { useGetForumsMutation } = forumApi
