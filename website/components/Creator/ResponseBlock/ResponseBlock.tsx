import { ChangeEvent, FC, useContext } from 'react';
import { EditorContext } from '../../../lib/contexts/EditorContext';

type Props = {
  id: number,
  index: number,
  response: string
}

const ResponseBlock: FC<Props> = ({ id, index, response }) => {
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

  return (
    <div style={{ backgroundColor: '#D7D7D7' }}>
      {index > 1 && (
        <button type="button" onClick={handleDelete}>X</button>
      )}
      <input type="text" placeholder="A response here" value={response} onChange={handleChange} />
    </div>
  );
};

export default ResponseBlock;
