import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CommentData } from '../types/comment.types'

export interface ICommentState {
  comments: CommentData[]
  total: number
  isMount: boolean
  currentComment: number | null
}

const initialState: ICommentState = {
  comments: [],
  total: 0,
  isMount: false,
  currentComment: null,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (
      state: ICommentState,
      action: PayloadAction<CommentData[]>
    ) => {
      state.comments = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
    setIsMount: (state, action: PayloadAction<boolean>) => {
      state.isMount = action.payload
    },
    addNewComment: (state, action: PayloadAction<CommentData>) => {
      state.comments.push(action.payload)
    },
    setCommentId: (state, action: PayloadAction<number>) => {
      state.currentComment = action.payload
    },
  },
})
