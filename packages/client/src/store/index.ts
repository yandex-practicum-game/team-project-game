import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './base.api'
import { gameSlice } from './game'
import { leaderboardApi } from './lidearboard.api'
import { leaderboardSlice } from './lidearboard.slice'
import { oauthApi } from './oauth.api'
import { forumApi } from './forum.api'
import { forumSlice } from './forum.slice'

const initialState: Record<string, unknown> =
  typeof window !== 'undefined'
    ? window.__PRELOADED_STATE__
    : {
        game: gameSlice.getInitialState(),
        leaderboard: leaderboardSlice.getInitialState(),
        forum: forumSlice.getInitialState(),
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
      [forumApi.reducerPath]: forumApi.reducer,
      [forumSlice.name]: forumSlice.reducer,
      [oauthApi.reducerPath]: oauthApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(baseApi.middleware)
        .concat(leaderboardApi.middleware)
        .concat(forumApi.middleware)
        .concat(oauthApi.middleware),
    preloadedState,
  })
}

export const store = createStore(initialState)

export const actions = {
  ...gameSlice.actions,
  ...leaderboardSlice.actions,
  ...forumSlice.actions,
}

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState
  }
}

export type RootState = ReturnType<typeof store.getState>
