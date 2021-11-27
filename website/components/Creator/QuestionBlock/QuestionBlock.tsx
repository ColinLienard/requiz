import { ChangeEvent, FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';
import { QuizQuestion } from '../../../lib/types';
import ResponseBlock from '../ResponseBlock/ResponseBlock';

type Props = {
  question: QuizQuestion
}

const QuestionBlock: FC<Props> = ({ question }) => {
  const { dispatchQuestions } = useContext(EditorContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchQuestions({
      type: 'modifyQuestion',
      id: question.id,
      value: event.target?.value,
    });
  };

  const handleDelete = () => {
    dispatchQuestions({
      type: 'delete',
      id: question.id,
    });
  };

  const handleAddResponse = () => {
    dispatchQuestions({
      type: 'addResponse',
      id: question.id,
    });
  };

  return (
    <div style={{ backgroundColor: '#EFEFEF' }}>
      <button type="button" onClick={handleDelete}>X</button>
      <p>{question.id}</p>
      <input
        type="text"
        placeholder="Your question here"
        value={question.question}
        onChange={handleChange}
      />
      <ul>
        {question.responses.map((response, index) => (
          <li key={response.id}>
            <ResponseBlock
              id={question.id}
              index={index}
              response={response.value}
              canBeDeleted={question.responses.length > 2}
            />
          </li>
        ))}
      </ul>
      {question.responses.length < 4 && (
        <button type="button" onClick={handleAddResponse}>Add response</button>
      )}
    </div>
  );
};

export default QuestionBlock;
