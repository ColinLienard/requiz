import { FC, useContext } from 'react';
import SocketContext from '../../../lib/contexts/SocketContext';
import useTimer from '../../../lib/hooks/useTimer';

const WaitingRoom: FC = () => {
  const socket = useContext(SocketContext);
  const timer = useTimer(socket, 'minutes-secondes');

  return (
    <section>
      <h2>The quiz begins in</h2>
      <h3>{timer}</h3>
    </section>
  );
};

export default WaitingRoom;
