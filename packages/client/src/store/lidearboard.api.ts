import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LeaderboardRequest, LeaderData } from '../types/leaderboard.types'
import { API_CONFIG, BASE_URL } from '../constants/apiConfig'

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getLeaders: build.mutation<Array<{ data: LeaderData }>, LeaderboardRequest>(
      {
        query: (data: LeaderboardRequest) => ({
          url: `/leaderboard/${API_CONFIG.TEAM_NAME}`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
        }),
      }
    ),
    setLeader: build.mutation({
      query: (data: LeaderData) => ({
        url: '/leaderboard',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          data,
          ratingFieldName: 'score',
          teamName: API_CONFIG.TEAM_NAME,
        },
        responseHandler: response => response.text(),
      }),
    }),
  }),
})

export const { useSetLeaderMutation, useGetLeadersMutation } = leaderboardApi
