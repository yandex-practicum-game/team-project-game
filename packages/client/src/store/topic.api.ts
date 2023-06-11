import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  NewTopicQueryRequest,
  TopicData,
  TopicQueryResponse,
  TopicRequestParams,
} from '../types/topic.types'
import { BASE_URL_V1 } from '../constants/apiConfig'

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_V1,
    credentials: 'include',
  }),
  tagTypes: ['Topic'],
  endpoints: build => ({
    getTopics: build.mutation<TopicQueryResponse, TopicRequestParams>({
      query: (params: TopicRequestParams) => ({
        url: `/forums/${params.forumId}/topics?take=${params.take}&page=${params.page}`,
        headers: { 'Content-Type': 'application/json' },
        invalidatesTags: ['Topic'],
      }),
    }),
    createTopic: build.mutation<TopicData, NewTopicQueryRequest>({
      query: (data: NewTopicQueryRequest) => ({
        url: `/topics`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        invalidatesTags: ['Topic'],
      }),
    }),
  }),
})

export const { useGetTopicsMutation, useCreateTopicMutation } = topicApi
