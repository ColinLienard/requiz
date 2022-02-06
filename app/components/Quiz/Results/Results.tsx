import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import SocketContext from '../../../lib/contexts/SocketContext';
import { User } from '../../../lib/types';

const Results: FC = () => {
  const [winner, setWinner] = useState('');
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('get-users', (users: User[]) => {
      const newWinner = users.reduce((maybe, user) => (
        user.lives > maybe.lives ? user : maybe
      ));
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
