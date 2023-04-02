export interface IForum {
  topic: string
  count: number
  answers: number
}

export const mockForumList: IForum[] = [
  {
    topic: 'New games',
    count: 25,
    answers: 500,
  },
  {
    topic: 'Game design',
    count: 0,
    answers: 0,
  },
  {
    topic: 'Technologies',
    count: 0,
    answers: 0,
  },
]
