import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import Popup from 'react-customizable-popup';
import UserItem from '../../Common/UserItem/UserItem';
import CrossIcon from '../../../public/icons/iconComponents/CrossIcon';
import OptionButton from '../../Common/OptionButton/OptionButton';
import useQuizTheme from '../../../lib/hooks/useQuizTheme';
import SocketContext from '../../../lib/contexts/SocketContext';
import useMobile from '../../../lib/hooks/useMobile';
import { PropsToGetDBData, QuizData, User } from '../../../lib/types';
import styles from './Sidebar.module.scss';

type Props = {
  roomId: string,
  userName: string,
  userId: string,
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
};

const Sidebar: FC<Props> = ({
  roomId,
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
  const [data, setData] = useState<QuizData>({});
  const quizTheme = useQuizTheme(data.theme);
  const isMobile = useMobile();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/get-db-data', {
        method: 'POST',
        body: JSON.stringify({
          id: roomId,
          collection: 'quizzes',
          projection: {
            _id: 0,
            title: 1,
            theme: 1,
            description: 1,
            userId: 1,
          },
        } as PropsToGetDBData),
      });
      if (response.ok) {
        const newData: QuizData = await response.json();
        setData(newData);
      }
    })();

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

  useEffect(() => {
    setUserList((state) => state.sort((previous, current) => previous.lives - current.lives));
  }, [userList]);

  const closeSocket = () => socket.close();

  return (
    <section className={`${styles.sidebar} ${visible && styles.visible}`}>
      <header className={styles.header}>
        {isMobile && (
          <button
            className={styles.cross}
            type="button"
            onClick={() => setVisible(false)}
          >
            <CrossIcon />
          </button>
        )}
        <h2 className={styles.hero}>{data.title}</h2>
      </header>
      <div className={styles.theme} style={{ backgroundColor: quizTheme?.color }}>
        {quizTheme?.emoji} {quizTheme?.name}
      </div>
      <div className={styles.wrapper}>
        <p className={styles.description}>{data.description}</p>
        <Popup
          toggler={(
            <OptionButton className={styles.option} />
          )}
          fixed
          position={['midleft', 'bottom']}
          className={styles.popup}
          backdropClassName="backdrop"
        >
          <Link href="/dashboard">
            <a
              className={styles.popupButton}
              onClick={closeSocket}
              role="button"
              tabIndex={0}
              onKeyPress={closeSocket}
            >
              Leave
            </a>
          </Link>
        </Popup>
      </div>
      <h3 className={styles.title}>Players in competition</h3>
      <ul className={styles.list}>
        {userList.map((user) => (
          <li className={styles.user} key={user.id}>
            <UserItem id={user.id} />
            <div className={styles.lives}>
              <span className={styles.life} />
              <span className={`${styles.life} ${user.lives <= 1 && styles.hidden}`} />
              <span className={`${styles.life} ${user.lives <= 2 && styles.hidden}`} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default memo(Sidebar);
