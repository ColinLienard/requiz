import { FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';
import QuestionBlock from '../QuestionBlock/QuestionBlock';

const QuizEditor: FC = () => {
  const { questions, dispatchQuestions } = useContext(EditorContext);

  const addQuestion = () => {
    dispatchQuestions({ type: 'add' });
  };

  return (
    <section>
      <h2>Quiz</h2>
      <ul>
        {questions?.map((question) => (
          <li key={question.question}>
            <QuestionBlock question={question} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={addQuestion}>Add question</button>
    </section>
  );
};

QuizEditor.defaultProps = {
  defaultData: [],
};

export default QuizEditor;
