export type ForumData = {
  id: number
  title: string
  topicsCount: number
  commentsCount: number
}

export type ForumQueryResponse = {
  forums: ForumData[]
  total: number
}

export type ForumRequestParams = {
  take: number
  page: number
}
