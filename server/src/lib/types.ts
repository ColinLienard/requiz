export type User = {
  name: string,
  id: string,
  socketId: string,
  roomId: string,
  lives: number
}

export type RoomState = 'published' | 'waiting' | 'playing'

export type QuizResponse = {
  id: number,
  value: string
}

export type QuizQuestion = {
  id: number,
  question: string,
  responses: QuizResponse[],
  correct: number
}

export type Room = {
  id: string,
  state: RoomState,
  timer: NodeJS.Timer | null,
  title: string,
  description: string,
  theme: string[],
  maxPlayers: number,
  startDate: number,
  questions: QuizQuestion[],
  peopleIn: number
}
