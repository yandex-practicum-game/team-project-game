import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

import {Auth, User} from '../../api';

import initialState from './initialState';
import UserState from './interfaces';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // здесь только сихнронные операции
  reducers: {
    clearState: (state) => {
      state.status = 'idle';
      state.searchedUsers = [];
      state.user = null;
    },
  },
  // сюда приходит результат асинхронных операций
  extraReducers: (builder) => {
    // authUser
    builder.addCase(authUser.fulfilled, (state) => {
      state.isLogin = true;
      state.status = 'idle';
    });
    builder.addCase(authUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authUser.rejected, (state) => {
      state.status = 'failed';
    });
    // searchUser
    builder.addCase(searchUsers.fulfilled, (state, action: PayloadAction<UserState['searchedUsers']>) => {
      state.searchedUsers = action.payload;
      state.status = 'idle';
    });
    builder.addCase(searchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(searchUsers.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

// Async Thunks, передает возврощаемое значение в extraReducers
export const authUser = createAsyncThunk('user/authUser', async () => {
  const authUser = await Auth.user();
  return authUser;
});

// Async Thunks, передает возврощаемое значение в extraReducers
export const searchUsers = createAsyncThunk('user/searchUser', async (login: string) => {
  const searchedUsers = await User.searchUsers({login: login});
  return searchedUsers;
});
