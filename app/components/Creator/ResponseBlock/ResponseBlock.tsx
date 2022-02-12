import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useContext,
} from 'react';
import AutoResizeInput from '../../Common/AutoResizeInput/AutoResizeInput';
import { DispatchQuestionsContext } from '../../../lib/contexts/EditorContext';
import CheckIcon from '../../../public/icons/iconComponents/CheckIcon';
import TrashIcon from '../../../public/icons/iconComponents/TrashIcon';
import styles from './ResponseBlock.module.scss';

type Props = {
  id: number,
  index: number,
  response: string,
  canBeDeleted: boolean,
  isCorrect: boolean,
};

const ResponseBlock: FC<Props> = ({
  id,
  index,
  response,
  canBeDeleted,
  isCorrect,
}) => {
  const dispatchQuestions = useContext(DispatchQuestionsContext);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatchQuestions({
      type: 'modifyResponse',
      id,
      index,
      value: event.target?.value,
    });
  }, []);

  const handleDelete = useCallback(() => {
    dispatchQuestions({
      type: 'deleteResponse',
      id,
      index,
    });
  }, []);

  const handleCorrect = useCallback(() => {
    dispatchQuestions({
      type: 'setCorrect',
      id,
      value: index,
    });
  }, []);

  return (
    <div className={`${styles.responseBlock} ${isCorrect && styles.correct}`}>
      <span className={styles.number}>{index + 1}</span>
      <AutoResizeInput
        placeholder="A response here"
        value={response}
        onChange={handleChange}
      />
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.check} ${isCorrect && styles.correct}`}
          type="button"
          onClick={handleCorrect}
        >
          <CheckIcon />
        </button>
        <button
          className={`${styles.delete} ${!canBeDeleted && styles.hidden}`}
          type="button"
          onClick={canBeDeleted ? handleDelete : () => null}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(ResponseBlock);
