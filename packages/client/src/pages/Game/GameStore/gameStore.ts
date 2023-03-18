import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initialState';
import {GameState} from './interfaces';

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = 'idle';
      state.settings = {};
    },
    setSettings: (state) => {
      state.settings = {};
    },
    setSound: (state, action: PayloadAction<GameState['sound']>) => {
      state.settings = {};
    },
  },
});

export const {clearState} = gameSlice.actions;
