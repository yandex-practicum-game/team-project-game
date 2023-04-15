import { PayloadAction } from './../../../../node_modules/@reduxjs/toolkit/src/createAction'
import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    scoreInterval: 0,
  },

  reducers: {
    accrueScore: state => {
      state.score = state.score + 1
    },
    resetScore: state => {
      state.score = 0
    },
    setScoreInterval: (state, action: PayloadAction<number>) => {
      state.scoreInterval = action.payload
    },
  },
})
