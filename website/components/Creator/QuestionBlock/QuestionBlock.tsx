import { ChangeEvent, FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';
import { QuizQuestion } from '../../../lib/types';

type Props = {
  question: QuizQuestion
}

const QuestionBlock: FC<Props> = ({ question }) => {
  const { dispatchQuestions } = useContext(EditorContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchQuestions({
      type: 'modify',
      value: {
        id: question.id,
        question: event.target?.value,
        responses: [''],
        correct: 0,
      },
    });
  };

  return (
    <div>
      <p>{question.id}</p>
      <input type="text" value={question.question} onChange={handleChange} />
    </div>
  );
};

export default QuestionBlock;
