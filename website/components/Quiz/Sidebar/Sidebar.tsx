import {
  FC,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import { Socket } from 'socket.io-client';
import User from '../../Common/User/User';
import { ChatUser } from '../../../lib/types';

type Props = {
  socket: Socket,
  userName: string,
  userId: number
}

const Sidebar: FC<Props> = ({ socket, userName, userId }) => {
  const [userList, setUserList] = useState<ChatUser[]>([{
    name: userName,
    id: userId,
  }]);

  useEffect(() => {
    socket.on('get-users', (users: {
      userName: string,
      userId: number,
      socketId: string,
      room: string
    }[]) => {
      setUserList(() => users.map((user) => {
        return {
          name: user.userName,
          id: user.userId,
        };
      }));
    });

    socket.on('user-joined', (anUserName: string, anUserId: number) => {
      setUserList((state) => [{ name: anUserName, id: anUserId }, ...state]);
    });

    return () => {
      socket.removeAllListeners('get-users');
      socket.removeAllListeners('user-joined');
    };
  }, []);

  const closeSocket = () => socket.close();

  return (
    <section>
      <ul>
        {userList.map((user) => {
          return (
            <li key={user.id}>
              <User name={user.name} />
            </li>
          );
        })}
      </ul>
      <Link href="/">
        <a
          onClick={closeSocket}
          role="button"
          tabIndex={0}
          onKeyPress={closeSocket}
        >
          Leave
        </a>
      </Link>
    </section>
  );
};

export default Sidebar;
