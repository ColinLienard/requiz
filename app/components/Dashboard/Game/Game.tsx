import { FC } from 'react';
import Link from 'next/link';
import UserItem from '../../Common/UserItem/UserItem';
import useDate from '../../../lib/hooks/useDate';
import useQuizTheme from '../../../lib/hooks/useQuizTheme';
import { QuizThemes } from '../../../lib/types';
import styles from './Game.module.scss';

type Props = {
  fromUser?: boolean,
  onClick?: () => void,
  id: string,
  title: string,
  theme: QuizThemes,
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
  theme,
  userId,
  status,
  peopleIn,
  startsIn,
}) => {
  const date = useDate(startsIn);
  const quizTheme = useQuizTheme(theme);

  if (fromUser) {
    return (
      <Link href={`/creator/${id}`}>
        <a className={styles.game}>
          <div className={styles.theme} style={{ backgroundColor: quizTheme?.color }}>
            {quizTheme?.emoji}
          </div>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.statusContainer}>
            <span className={styles.statusColor} />
            <p>{status}</p>
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
        </a>
      </Link>
    );
  }
  return (
    <button className={styles.game} type="button" onClick={onClick}>
      <div className={styles.theme} style={{ backgroundColor: quizTheme?.color }}>
        {quizTheme?.emoji}
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.userContainer}>
        <p>by</p>
        <UserItem id={userId} small />
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
