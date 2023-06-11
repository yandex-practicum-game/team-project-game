import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  CommentQueryResponse,
  CommentRequestParams,
  NewCommentQueryResponse,
  NewCommentRequest,
} from '../types/comment.types'
import { BASE_URL } from '../constants/apiConfig'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['Comment'],
  endpoints: build => ({
    getComments: build.mutation<CommentQueryResponse, CommentRequestParams>({
      query: (params: CommentRequestParams) => ({
        url: `/topics/${params.topicId}/comments?take=${params.take}&page=${params.page}`,
        headers: { 'Content-Type': 'application/json' },
        invalidatesTags: ['Comment'],
      }),
    }),
    createComment: build.mutation<NewCommentQueryResponse, NewCommentRequest>({
      query: (data: NewCommentRequest) => ({
        url: `/comments`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        invalidatesTags: ['Comment'],
      }),
    }),
  }),
})

export const { useGetCommentsMutation, useCreateCommentMutation } = commentApi
