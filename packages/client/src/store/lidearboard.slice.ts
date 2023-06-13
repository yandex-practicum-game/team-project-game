import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LeaderData } from '../types/leaderboard.types'

export interface ILeadersState {
  leadersList: Array<LeaderData>
  isMount: boolean
}

const initialState: ILeadersState = {
  leadersList: [],
  isMount: false,
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaders: (
      state: ILeadersState,
      { payload }: PayloadAction<Array<LeaderData>>
    ) => {
      state.leadersList = payload
    },
    setIsMount: (state, action: PayloadAction<boolean>) => {
      state.isMount = action.payload
    },
  },
})
