import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';
import useTimer from '../../../lib/hooks/useTimer';
import { QuizQuestion } from '../../../lib/types';
import Response from '../Response/Response';

type Props = {
  socket: Socket
}

const Question: FC<Props> = ({ socket }) => {
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion>();
  const [selected, setSelected] = useState<number>(0);
  const [reveal, setReveal] = useState(false);
  const timer = useTimer(socket, 'secondes');
  const isCorrect = useRef(false);

  useEffect(() => {
    socket.on('question', (newQuizQuestion: QuizQuestion) => {
      setQuizQuestion(newQuizQuestion);
      setSelected(0);
      setReveal(false);
    });

    socket.on('request-response', () => {
      setReveal(true);
      if (!isCorrect.current) {
        socket.emit('response', false);
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
    if (!reveal) {
      setSelected(toSelect);
    }
  };

  return (
    <section>
      <h2>{timer}</h2>
      <h3>{quizQuestion?.question}</h3>
      <ul>
        {quizQuestion?.responses.map((response, index) => {
          return (
            <li key={response}>
              <Response
                text={response}
                number={index + 1}
                selected={selected}
                select={handleSelect}
                good={reveal ? quizQuestion.correct === index + 1 : undefined}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Question;
