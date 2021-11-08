import { useState } from 'react';
import { Socket } from 'socket.io-client';

const addZero = (number: number): string | number => (number < 10 ? `0${number}` : number);

const useTimer = (socket: Socket) => {
  const [time, setTime] = useState('00:00');

  socket.on('timer', (newTime: number) => {
    const minutes = Math.trunc(newTime / 60);
    const secondes = newTime % 60;
    setTime(`${addZero(minutes)}:${addZero(secondes)}`);
  });

  return time;
};

export default useTimer;
