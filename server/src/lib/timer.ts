import { Server } from 'socket.io';

let timer: NodeJS.Timer;

export const stopTimer = () => {
  clearInterval(timer);
};

export const startTimer = (io: Server, room: string, start: number, callback: () => void) => {
  let time = start;
  io.to(room).emit('timer', time);
  timer = setInterval(() => {
    if (time > 0) {
      time -= 1;
      io.to(room).emit('timer', time);
    } else {
      stopTimer();
      callback();
    }
  }, 1000);
};
