export type User = {
  userName: string,
  userId: number,
  socketId: string,
  room: string,
  lives: number
}

export type RoomState = 'waiting' | 'playing'

export type Room = {
  name: string,
  state: RoomState,
  timer: NodeJS.Timer | null
}
