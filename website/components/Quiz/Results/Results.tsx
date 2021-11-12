import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { User } from '../../../lib/types';

type Props = {
  socket: Socket
}

const Results: FC<Props> = ({ socket }) => {
  const [winner, setWinner] = useState('');

  useEffect(() => {
    socket.on('get-users', (users: User[]) => {
      const newWinner = users.reduce((maybe, user) => {
        return user.lives > maybe.lives ? user : maybe;
      });
      setWinner(newWinner.name);
    });
  }, []);

  return (
    <>
      <h2>The end</h2>
      <h3>
        The winner is:
        {winner}
      </h3>
    </>
  );
};

export default Results;
