import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import UserItem from '../../Common/UserItem/UserItem';
import SocketContext from '../../../lib/contexts/SocketContext';
import { User } from '../../../lib/types';
import styles from './Sidebar.module.scss';

type Props = {
  userName: string,
  userId: string,
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
};

const Sidebar: FC<Props> = ({
  userName,
  userId,
  visible,
  setVisible,
}) => {
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

    socket.on('user-joined', (anUserName: string, anUserId: string) => {
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
    <section className={`${styles.sidebar} ${visible && styles.visible}`}>
      <button type="button" onClick={() => setVisible(false)}>close sidebar</button>
      <h1>A random quiz</h1>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            <UserItem id={user.id} />
            <p>
              {user.lives}
              💕
            </p>
          </li>
        ))}
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
