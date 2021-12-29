import { ChangeEvent, FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';

type Props = {
  id: number,
  index: number,
  response: string,
  canBeDeleted: boolean,
  isCorrect: boolean
}

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
    <div style={{ backgroundColor: '#D7D7D7', border: isCorrect ? '2px solid green' : '' }}>
      {canBeDeleted && (
        <button type="button" onClick={handleDelete}>X</button>
      )}
      <button type="button" onClick={handleCorrect}>O</button>
      <input
        type="text"
        placeholder="A response here"
        value={response}
        onChange={handleChange}
      />
    </div>
  );
};

export default ResponseBlock;
