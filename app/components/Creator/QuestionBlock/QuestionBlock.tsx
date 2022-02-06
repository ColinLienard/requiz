import { ChangeEvent, FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';
import { QuizQuestion } from '../../../lib/types';
import ResponseBlock from '../ResponseBlock/ResponseBlock';
import AutoResizeInput from '../../Common/AutoResizeInput/AutoResizeInput';
import TrashIcon from '../../../public/icons/iconComponents/TrashIcon';
import PlusIcon from '../../../public/icons/iconComponents/PlusIcon';
import styles from './QuestionBlock.module.scss';

type Props = {
  question: QuizQuestion,
  canBeDeleted: boolean,
};

const QuestionBlock: FC<Props> = ({ question, canBeDeleted }) => {
  const { dispatchQuestions } = useContext(EditorContext);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    <section className={styles.questionBlock}>
      <div className={styles.questionContainer}>
        <AutoResizeInput
          placeholder="Your question here"
          value={question.question}
          onChange={handleChange}
        />
        {canBeDeleted && (
          <button className={styles.delete} type="button" onClick={handleDelete}>
            <TrashIcon />
          </button>
        )}
      </div>
      <ul className={styles.grid}>
        {question.responses.map((response, index) => (
          <li key={response.id}>
            <ResponseBlock
              id={question.id}
              index={index}
              response={response.value}
              canBeDeleted={question.responses.length > 2}
              isCorrect={question.correct === index}
            />
          </li>
        ))}
        {question.responses.length < 4 && (
          <li className={styles.addContainer}>
            <button className={styles.add} type="button" onClick={handleAddResponse}>
              <PlusIcon />
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default QuestionBlock;
