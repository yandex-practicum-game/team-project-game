import type { Comment } from '@prisma/client'

type CustomComment = Comment & { replies: Comment[] }

function buildCommentTree(comments: Comment[]): CustomComment[] {
  const cmts = comments as CustomComment[]
  const commentMap: { [id: number]: CustomComment } = {}
  const commentTree: CustomComment[] = []

  for (const comment of cmts) {
    commentMap[comment.id] = comment
    comment.replies = []
  }

  // Строим дерево комментариев
  for (const comment of cmts) {
    if (comment.parentId) {
      const parentComment = commentMap[comment.parentId]
      if (parentComment) {
        parentComment.replies.push(comment)
      }
    } else {
      commentTree.push(comment)
    }
  }

  return commentTree
}

export default buildCommentTree
