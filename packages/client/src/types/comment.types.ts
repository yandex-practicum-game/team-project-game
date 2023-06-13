export type CommentData = {
  id: number
  userId: number
  content: string
  parentId: number | null
  topicId: number
  replies?: []
}

export type NewCommentQueryResponse = {
  id: number
  userId: number
  content: string
  parentId: number | null
  topicId: number
}

export type NewCommentRequest = {
  content: string
  parentId: number | null
  topicId: number
}

export type CommentQueryResponse = {
  comments: CommentData[]
  total: number
}

export type CommentRequestParams = {
  topicId: number
  take: number
  page: number
}
