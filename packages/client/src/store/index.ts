import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './base.api'
import { gameSlice } from './game'
import { leaderboardApi } from './lidearboard.api'
import { leaderboardSlice } from './lidearboard.slice'
import { oauthApi } from './oauth.api'

const initialState: Record<string, unknown> =
  typeof window !== 'undefined'
    ? window.__PRELOADED_STATE__
    : {
        game: gameSlice.getInitialState(),
        leaderboard: leaderboardSlice.getInitialState(),
      }

export const createStore = (
  preloadedState: Record<string, unknown> | undefined
) => {
  return configureStore({
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
    preloadedState,
  })
}

export const store = createStore(initialState)

export const actions = {
  ...gameSlice.actions,
  ...leaderboardSlice.actions,
}

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState
  }
}

export type RootState = ReturnType<typeof store.getState>
