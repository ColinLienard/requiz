export type ChatMessageType = {
  author?: string,
  content: string,
  id: string
}

export type ChatUser = {
  name: string,
  id: number
}

export type GameState = 'waiting' | 'playing'
