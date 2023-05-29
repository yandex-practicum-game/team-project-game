import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ForumData,
  ForumQueryResponse,
  ForumRequestParams,
  NewForumQueryResponse,
} from '../types/forum.types'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Forum'],
  endpoints: build => ({
    getForums: build.mutation<ForumQueryResponse, ForumRequestParams>({
      query: (params: ForumRequestParams) => ({
        url: `/forums?take=${params.take}&page=${params.page}`,
        headers: { 'Content-Type': 'application/json' },
        invalidatesTags: ['Forum'],
      }),
    }),
    createForum: build.mutation<NewForumQueryResponse, string>({
      query: (title: string) => ({
        url: `/forums`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { title },
        invalidatesTags: ['Forum'],
      }),
    }),
  }),
})

export const { useGetForumsMutation, useCreateForumMutation } = forumApi
