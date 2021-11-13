import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import UserItem from '../../Common/UserItem/UserItem';
import SocketContext from '../../../lib/contexts/SocketContext';
import { User } from '../../../lib/types';

type Props = {
  userName: string,
  userId: number
}

const Sidebar: FC<Props> = ({ userName, userId }) => {
  const [userList, setUserList] = useState<User[]>([{
    name: userName,
    id: userId,
    lives: 3,
  }]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('get-users', (users: User[]) => {
      setUserList(users);
    });

    socket.on('user-joined', (anUserName: string, anUserId: number) => {
      setUserList((state) => [{ name: anUserName, id: anUserId, lives: 3 }, ...state]);
    });

    socket.on('update-user', (userToUpdate: User) => {
      setUserList((newUserList) => newUserList.map((user) => {
        if (userToUpdate.id === user.id) {
          return userToUpdate;
        }
        return user;
      }));
    });

    return () => {
      socket.removeAllListeners('get-users');
      socket.removeAllListeners('user-joined');
      socket.removeAllListeners('update-user');
    };
  }, []);

  const closeSocket = () => socket.close();

  return (
    <section>
      <h1>A random quiz</h1>
      <ul>
        {userList.map((user) => {
          return (
            <li key={user.id}>
              <UserItem name={user.name} lives={user.lives} />
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
