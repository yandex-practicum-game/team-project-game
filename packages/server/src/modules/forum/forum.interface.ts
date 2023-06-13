export interface ForumsQueryParams {
  page?: string
  take?: string
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
