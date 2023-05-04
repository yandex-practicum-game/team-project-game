import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './base.api'
import { gameSlice } from './game'
import { leaderboardApi } from './lidearboard.api'
import { leaderboardSlice } from './lidearboard.slice'
import { oauthApi } from './oauth.api'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    [leaderboardSlice.name]: leaderboardSlice.reducer,
    [oauthApi.reducerPath]: oauthApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(leaderboardApi.middleware)
      .concat(oauthApi.middleware),
})

export const actions = {
  ...gameSlice.actions,
  ...leaderboardSlice.actions,
}

export type RootState = ReturnType<typeof store.getState>
