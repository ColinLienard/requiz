export type User = {
  userName: string,
  userId: number,
  socketId: string,
  room: string,
  lives: number
}

export type GameState = 'waiting' | 'playing'
