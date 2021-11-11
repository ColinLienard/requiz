import { Server } from 'socket.io';
import { getRoom } from './rooms';

export const stopTimer = (room: string) => {
  if (getRoom(room).timer) {
    clearInterval(getRoom(room).timer as NodeJS.Timer);
  }
};

export const startTimer = (io: Server, room: string, start: number, callback: () => void) => {
  let time = start;
  io.to(room).emit('timer', time);
  getRoom(room).timer = setInterval(() => {
    if (time > 0) {
      time -= 1;
      io.to(room).emit('timer', time);
    } else {
      stopTimer(room);
      callback();
    }
  }, 1000);
};
