import { ChangeEvent, FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';
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
  const { dispatchQuestions } = useContext(EditorContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchQuestions({
      type: 'modifyResponse',
      id,
      index,
      value: event.target?.value,
    });
  };

  const handleDelete = () => {
    dispatchQuestions({
      type: 'deleteResponse',
      id,
      index,
    });
  };

  const handleCorrect = () => {
    dispatchQuestions({
      type: 'setCorrect',
      id,
      value: index,
    });
  };

  return (
    <div className={`${styles.responseBlock} ${isCorrect && styles.correct}`}>
      <span className={styles.number}>{index + 1}</span>
      <input
        type="text"
        placeholder="A response here"
        value={response}
        onChange={handleChange}
      />
      <div className={styles.buttonContainer}>
        <button className={`${styles.check} ${isCorrect && styles.correct}`} type="button" onClick={handleCorrect}>
          <CheckIcon />
        </button>
        <button className={`${styles.delete} ${!canBeDeleted && styles.hidden}`} type="button" onClick={handleDelete}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default ResponseBlock;
