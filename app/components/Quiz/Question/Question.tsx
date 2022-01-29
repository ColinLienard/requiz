import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import SocketContext from '../../../lib/contexts/SocketContext';
import useTimer from '../../../lib/hooks/useTimer';
import { QuizQuestion } from '../../../lib/types';
import Response from '../Response/Response';
import useMobile from '../../../lib/hooks/useMobile';
import starIcon from '../../../public/icons/star.svg';
import styles from './Question.module.scss';

const Question: FC = () => {
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion>();
  const [selected, setSelected] = useState<number>(-1);
  const [reveal, setReveal] = useState(false);
  const [lives, setLives] = useState(3);
  const socket = useContext(SocketContext);
  const timer = useTimer(socket, 'secondes');
  const isCorrect = useRef(false);
  const isMobile = useMobile();

  useEffect(() => {
    socket.on('question', (newQuizQuestion: QuizQuestion) => {
      setQuizQuestion(newQuizQuestion);
      setSelected(-1);
      setReveal(false);
    });

    socket.on('request-response', () => {
      setReveal(true);
      if (!isCorrect.current && lives > 0) {
        setLives((newLives) => {
          if (newLives > 0) {
            socket.emit('response', false);
            return newLives - 1;
          }
          return newLives;
        });
      }
    });

    return () => {
      socket.removeAllListeners('question');
      socket.removeAllListeners('request-response');
    };
  }, []);

  useEffect(() => {
    isCorrect.current = selected === quizQuestion?.correct;
  }, [selected, quizQuestion]);

  const handleSelect = (toSelect: number) => {
    if (!reveal && lives > 0) {
      setSelected(toSelect);
    }
  };

  return (
    <>
      <div className={styles.topbar}>
        <ul className={styles.lives}>
          <li className={`${styles.star} ${lives === 0 && styles.hidden}`}>
            <Image src={starIcon} width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
          </li>
          <li className={`${styles.star} ${lives <= 1 && styles.hidden}`}>
            <Image src={starIcon} width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
          </li>
          <li className={`${styles.star} ${lives <= 2 && styles.hidden}`}>
            <Image src={starIcon} width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
          </li>
          {lives <= 0 && (
            <li className={styles.over}>Eliminated</li>
          )}
        </ul>
        <div className={styles.progressbar}>1 / 10</div>
      </div>
      <div className={styles.timer}>
        {reveal && lives > 0 ? (
          <h3 className={styles.text}>
            {isCorrect.current ? '👍' : '👎'}
          </h3>
        ) : (
          <h3 className={styles.text}>
            {timer}
          </h3>
        )}
        <svg className={styles.circles} width="200" height="200" viewBox="0 0 200 200">
          {reveal && lives > 0 ? (
            <circle className={isCorrect.current ? styles.correct : styles.false} cx="100" cy="100" r="90" />
          ) : (
            <>
              <circle cx="100" cy="100" r="90" />
              <circle className={styles.animate} cx="100" cy="100" r="90" />
            </>
          )}
        </svg>
      </div>
      <h4 className={styles.question}>{quizQuestion?.question}</h4>
      <ul className={styles.responses}>
        {quizQuestion?.responses.map((response, index) => (
          <li key={response.id}>
            <Response
              text={response.value}
              index={index}
              selected={selected}
              select={handleSelect}
              correct={reveal ? quizQuestion.correct === index : undefined}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Question;
