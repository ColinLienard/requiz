import { FC, useEffect, useState } from 'react';
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
  const timer = useTimer(socket, 'secondes');

  useEffect(() => {
    socket.on('question', (newQuizQuestion: QuizQuestion) => {
      setQuizQuestion(newQuizQuestion);
      setSelected(0);
    });

    return () => {
      socket.removeAllListeners('question');
    };
  }, []);

  const handleSelect = (toSelect: number) => {
    setSelected(toSelect);
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
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Question;
