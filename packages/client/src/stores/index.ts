import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {gameSlice} from '../pages/Game/GameStore/gameStore';
import {userSlice, authUser, searchUsers} from './UserStore/userStore';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    game: gameSlice.reducer,
  },
});

export const actions = {
  user: userSlice.actions,
  game: gameSlice.actions,
};

export const async = {
  user: {authUser, searchUsers},
  game: {},
};
