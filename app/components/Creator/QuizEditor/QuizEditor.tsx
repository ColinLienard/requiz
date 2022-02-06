import { FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';
import PlusIcon from '../../../public/icons/iconComponents/PlusIcon';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import styles from './QuizEditor.module.scss';

const QuizEditor: FC = () => {
  const { questions, dispatchQuestions } = useContext(EditorContext);

  const addQuestion = () => {
    dispatchQuestions({ type: 'add' });
  };

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {questions?.map((question) => (
          <li key={question.id}>
            <QuestionBlock
              question={question}
              canBeDeleted={questions.length > 1}
            />
          </li>
        ))}
      </ul>
      <button className={styles.button} type="button" onClick={addQuestion}>
        <PlusIcon />
        Add question
      </button>
    </section>
  );
};

QuizEditor.defaultProps = {
  defaultData: [],
};

export default QuizEditor;
