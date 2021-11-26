export type ChatMessageType = {
  author?: string,
  content: string,
  id: string
}

export type User = {
  name: string,
  id: string,
  lives: number
}

export type GameState = 'waiting' | 'playing' | 'end'

export type QuizQuestion = {
  id: number,
  question: string,
  responses: string[],
  correct: number
}

export type UserFromDB = {
  id: string,
  name: string,
  email: string,
  image?: string
  password?: string
}

export type QuizData = {
  title?: string,
  description?: string,
  status?: 'draft' | 'published',
  questions?: QuizQuestion[]
}
