import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LeaderData } from '../api/Leaderboard/types'

export interface ILeadersState {
  leadersList: Array<LeaderData>
}

const initialState: ILeadersState = {
  leadersList: [],
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
  },
})
