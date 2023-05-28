import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TopicData } from '../types/topic.types'

export interface ITopicState {
  topics: TopicData[]
  total: number
  isMount: boolean
  currentTopic: number | null
}

const initialState: ITopicState = {
  topics: [],
  total: 0,
  isMount: false,
  currentTopic: null,
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopics: (state: ITopicState, action: PayloadAction<TopicData[]>) => {
      state.topics = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
    setIsMount: (state, action: PayloadAction<boolean>) => {
      state.isMount = action.payload
    },
    addNewTopic: (state, action: PayloadAction<TopicData>) => {
      state.topics.unshift(action.payload)
    },
    setTopicId: (state, action: PayloadAction<number>) => {
      state.currentTopic = action.payload
    },
  },
})
