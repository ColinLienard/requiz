import { FC } from 'react';
import Link from 'next/link';
import UserItem from '../../Common/UserItem/UserItem';
import useDate from '../../../lib/hooks/useDate';
import styles from './Game.module.scss';

type Props = {
  fromUser?: boolean,
  onClick?: () => void,
  id: string,
  title: string,
  userId?: string,
  status?: string,
  peopleIn?: number,
  startsIn: string
}

const Game: FC<Props> = ({
  fromUser,
  onClick,
  id,
  title,
  userId,
  status,
  peopleIn,
  startsIn,
}) => {
  const date = useDate(startsIn);

  if (fromUser) {
    return (
      <Link href={`/creator/${id}`}>
        <a className={styles.game}>
          <h4>{title}</h4>
          <p>{status}</p>
          <p>
            {peopleIn}
            are waiting
          </p>
          <p>
            Starts in
            {date}
          </p>
        </a>
      </Link>
    );
  }
  return (
    <button className={styles.game} type="button" onClick={onClick}>
      <div className={styles.theme}>
        <p className={styles.emoji}>🌍</p>
        <p className={styles.name}>Overall culture</p>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.userContainer}>
        <p>by</p>
        <UserItem id={userId as string} small />
      </div>
      <div className={styles.infos}>
        {peopleIn && (
          <p className={styles.peopleIn}>
            {peopleIn}
            are waiting
          </p>
        )}
        <p className={styles.date}>
          Starts in
          {date}
        </p>
      </div>
    </button>
  );
};

Game.defaultProps = {
  fromUser: false,
  onClick: undefined,
  userId: '',
  status: '',
  peopleIn: undefined,
};

export default Game;
