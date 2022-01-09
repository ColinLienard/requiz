import { useEffect, useState } from 'react';

const useDate = (isoDate?: string) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const endDate = isoDate && new Date(isoDate).getTime();

    const interval = setInterval(isoDate ? () => {
      const now = new Date().getTime();
      const time = endDate as number - now;
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      if (days < 0) {
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours < 0) {
          const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((time % (1000 * 60)) / 1000);
          setTimeLeft(`${mins} min, ${secs} sec`);
        } else {
          setTimeLeft(`${hours} hours`);
          clearInterval(interval);
        }
      } else {
        setTimeLeft(`${days} day${days > 1 ? 's' : ''}`);
        clearInterval(interval);
      }
    } : () => null, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isoDate]);

  return timeLeft;
};

export default useDate;
