import { FC } from 'react';
import useQuizStatus from '../../../lib/hooks/useQuizStatus';
import styles from './QuizStatusIndicator.module.scss';

type Props = {
  status?: 'draft' | 'published' | 'waiting' | 'playing',
};

const QuizStatusIndicator: FC<Props> = ({ status }) => {
  const quizStatus = useQuizStatus(status);

  return (
    <div className={styles.quizStatusIndicator}>
      <span className={styles.statusColor} style={{ backgroundColor: quizStatus?.color }} />
      <p>{quizStatus?.name}</p>
    </div>
  );
};

QuizStatusIndicator.defaultProps = {
  status: undefined,
};

export default QuizStatusIndicator;
