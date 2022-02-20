import { FC } from 'react';
import UserItem from '../../Common/UserItem/UserItem';
import useDate from '../../../lib/hooks/useDate';
import useQuizTheme from '../../../lib/hooks/useQuizTheme';
import { QuizData } from '../../../lib/types';
import styles from './Game.module.scss';
import QuizStatusIndicator from '../../Common/QuizStatusIndicator/QuizStatusIndicator';

type Props = {
  fromUser?: boolean,
  onClick?: () => void,
  title: QuizData['title'],
  theme: QuizData['theme'],
  userId?: QuizData['userId'],
  status?: QuizData['status'],
  peopleIn?: QuizData['peopleIn'],
  startsIn: string,
};

const Game: FC<Props> = ({
  fromUser,
  onClick,
  title,
  theme,
  userId,
  status,
  peopleIn,
  startsIn,
}) => {
  const date = useDate(startsIn);
  const quizTheme = useQuizTheme(theme);

  return (
    <button className={styles.game} type="button" onClick={onClick}>
      <div className={styles.theme} style={{ backgroundColor: quizTheme?.color }}>
        <span className={styles.emoji}>{quizTheme?.emoji}</span>
      </div>
      <h4 className={styles.title}>{title}</h4>
      {fromUser ? (
        <div className={styles.statusContainer}>
          <QuizStatusIndicator status={status} />
        </div>
      ) : (
        <div className={styles.userContainer}>
          <p>by</p>
          <UserItem id={userId} small />
        </div>
      )}
      <div className={styles.infos}>
        {peopleIn && peopleIn.length > 0 ? (
          <p className={styles.peopleIn}>
            {peopleIn.length} {peopleIn.length === 1 ? 'is' : 'are'} waiting
          </p>
        ) : null}
        <p className={styles.date}>
          Starts in {date}
        </p>
      </div>
    </button>
  );
};

Game.defaultProps = {
  fromUser: false,
  onClick: undefined,
  userId: '',
  status: undefined,
  peopleIn: undefined,
};

export default Game;
