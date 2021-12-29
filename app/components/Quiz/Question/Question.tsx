import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import SocketContext from '../../../lib/contexts/SocketContext';
import useTimer from '../../../lib/hooks/useTimer';
import { QuizQuestion } from '../../../lib/types';
import Response from '../Response/Response';

const Question: FC = () => {
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion>();
  const [selected, setSelected] = useState<number>(-1);
  const [reveal, setReveal] = useState(false);
  const [lives, setLives] = useState(3);
  const socket = useContext(SocketContext);
  const timer = useTimer(socket, 'secondes');
  const isCorrect = useRef(false);

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

  const renderLives = () => {
    let hearts = '';
    for (let i = 0; i < lives; i += 1) {
      hearts += '💖';
    }
    return hearts;
  };

  return (
    <section>
      <p>
        {lives > 0
          ? renderLives()
          : 'Eliminé'}
      </p>
      <h2>
        {reveal && lives > 0
          ? `${isCorrect.current}`
          : timer}
      </h2>
      <h3>{quizQuestion?.question}</h3>
      <ul>
        {quizQuestion?.responses.map((response, index) => (
          <li key={response.id}>
            <Response
              text={response.value}
              index={index}
              selected={selected}
              select={handleSelect}
              good={reveal ? quizQuestion.correct === index : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Question;
