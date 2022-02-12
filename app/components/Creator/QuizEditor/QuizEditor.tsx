import {
  FC,
  memo,
  useCallback,
  useContext,
} from 'react';
import { GetQuestionsContext, DispatchQuestionsContext } from '../../../lib/contexts/EditorContext';
import PlusIcon from '../../../public/icons/iconComponents/PlusIcon';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import styles from './QuizEditor.module.scss';

const QuizEditor: FC = () => {
  const questions = useContext(GetQuestionsContext);
  const dispatchQuestions = useContext(DispatchQuestionsContext);

  const addQuestion = useCallback(() => {
    dispatchQuestions({ type: 'add' });
  }, []);

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

export default memo(QuizEditor);
