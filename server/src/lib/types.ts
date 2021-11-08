export type User = {
  userName: string,
  userId: number,
  socketId: string,
  room: string,
}

export type GameState = 'waiting' | 'playing'
