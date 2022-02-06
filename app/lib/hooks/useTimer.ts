import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

const addZero = (number: number): string => (number < 10 ? `0${number}` : `${number}`);

const useTimer = (socket: Socket, timeType: 'secondes' | 'minutes-secondes') => {
  const [time, setTime] = useState('');

  socket.on('timer', (newTime: number) => {
    switch (timeType) {
      case 'secondes': {
        const secondes = newTime % 60;
        setTime(addZero(secondes));
        break;
      }
      case 'minutes-secondes': {
        const minutes = Math.trunc(newTime / 60);
        const secondes = newTime % 60;
        setTime(`${addZero(minutes)}:${addZero(secondes)}`);
        break;
      }
      default:
        setTime(`${newTime}`);
    }
  });

  useEffect(() => () => {
    socket.removeAllListeners('timer');
  }, []);

  return time;
};

export default useTimer;
