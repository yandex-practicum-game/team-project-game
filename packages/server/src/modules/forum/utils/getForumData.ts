import prisma from '../../prisma'
import type { ForumsData } from '../forum.interface'

function getForumData(skip: number, take: number) {
  return prisma.$queryRaw<ForumsData[]>`    
    SELECT 
      f."id", f."title",
      COUNT(DISTINCT t."id")::int AS "topicsCount",
      COUNT(DISTINCT c."id")::int AS "commentsCount"
    FROM "Forum" AS f
    LEFT JOIN "Topic" AS t ON t."forumId" = f."id"
    LEFT JOIN "Comment" AS c ON c."topicId" = t."id"
    GROUP BY f."id"
    OFFSET ${skip}
    LIMIT ${Number(take)}
  `
}

export default getForumData
