import { FC, useContext } from 'react';
import SocketContext from '../../../lib/contexts/SocketContext';
import useTimer from '../../../lib/hooks/useTimer';
import styles from './Timer.module.scss';

type Props = {
  showResult: boolean,
  isCorrect: boolean,
};

const Timer: FC<Props> = ({ showResult, isCorrect }) => {
  const socket = useContext(SocketContext);
  const timer = useTimer(socket, 'secondes');

  return (
    <div className={styles.timer}>
      {showResult ? (
        <h3 className={styles.text}>
          {isCorrect ? '👍' : '👎'}
        </h3>
      ) : (
        <h3 className={styles.text}>
          {timer}
        </h3>
      )}
      <svg className={styles.circles} width="200" height="200" viewBox="0 0 200 200">
        {showResult ? (
          <circle className={isCorrect ? styles.correct : styles.false} cx="100" cy="100" r="90" />
        ) : (
          <>
            <circle cx="100" cy="100" r="90" />
            <circle className={styles.animate} cx="100" cy="100" r="90" />
          </>
        )}
      </svg>
    </div>
  );
};

export default Timer;
