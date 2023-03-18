import {createSlice} from '@reduxjs/toolkit';
import initialState from './initialState';

export const mainSlice = createSlice({
  name: 'main',
  initialState,

  reducers: {
    clearState: (state) => {
      state.status = 'idle';
    },
  },
});
