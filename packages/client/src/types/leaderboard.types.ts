export type LeaderData = {
  id: number
  login: string
  score: number
  avatar: string
}

export type LeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type LeaderboardNewLeaderRequest = {
  ratingFieldName: string
  teamName: string
}
