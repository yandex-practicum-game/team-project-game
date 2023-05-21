export interface ForumsQueryParams {
  page?: number
  take?: number
}
export interface ForumsData {
  forums: ForumData[]
  total: number
}

interface ForumData {
  id: number
  title: string
  topicsCount: number
  commentsCount: number
}
