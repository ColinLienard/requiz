import { FC } from 'react';
import { Socket } from 'socket.io-client';
import useTimer from '../../../lib/hooks/useTimer';

type Props = {
  socket: Socket
}

const WaitingRoom: FC<Props> = ({ socket }) => {
  const timer = useTimer(socket);

  return (
    <section>
      <h2>The quiz begins in</h2>
      <h3>{timer}</h3>
    </section>
  );
};

export default WaitingRoom;
