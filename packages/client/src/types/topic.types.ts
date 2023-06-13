export type TopicData = {
  id: number
  title: string
  userId?: number
  forumId: number
}

export type NewTopicQueryRequest = {
  title: string
  forumId: number
}

export type TopicQueryResponse = {
  topics: TopicData[]
  total: number
}

export type TopicRequestParams = {
  forumId: number
  take: number
  page: number
}
