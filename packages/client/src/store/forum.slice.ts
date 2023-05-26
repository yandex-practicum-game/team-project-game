import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ForumData } from '../types/forum.types'

export interface IForumState {
  forums: ForumData[]
  total: number
  isMount: boolean
}

const initialState: IForumState = {
  forums: [],
  total: 0,
  isMount: false,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setForums: (state: IForumState, action: PayloadAction<ForumData[]>) => {
      state.forums = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
    setIsMount: (state, action: PayloadAction<boolean>) => {
      state.isMount = action.payload
    },
    addNewForum: (state, action: PayloadAction<ForumData>) => {
      state.forums.push(action.payload)
    },
  },
})
