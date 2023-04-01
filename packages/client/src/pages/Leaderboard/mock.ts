export interface ILeader {
  score: number
  firstName: string
  secondName: string
  displayName: string
  avatar: string
  userID: number
}

export const mockLeadersList: ILeader[] = [
  {
    score: 123123,
    firstName: 'Vanya',
    secondName: 'Ivanov',
    displayName: 'Ivan23',
    avatar: '',
    userID: 456456,
  },
  {
    score: 12123,
    firstName: 'Petya',
    secondName: 'Petrov',
    displayName: 'Petr223',
    avatar: '',
    userID: 234234,
  },
  {
    score: 2323,
    firstName: 'Ivan',
    secondName: 'Ivanov',
    displayName: 'Geo43',
    avatar: '',
    userID: 35345,
  },
  {
    score: 433,
    firstName: 'Sergey',
    secondName: 'Ivanov',
    displayName: 'Star22',
    avatar: '',
    userID: 123123,
  },
  {
    score: 200,
    firstName: 'Sergey',
    secondName: 'Sergeev',
    displayName: 'Hello',
    avatar: '',
    userID: 213,
  },
  {
    score: 12,
    firstName: 'Katya',
    secondName: 'Ivanova',
    displayName: 'Wer23',
    avatar: '',
    userID: 3433,
  },
]
