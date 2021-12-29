import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { PropsToGetDBData, QuizData } from '../../../lib/types';

type Props = {
  id?: string
}

const Modal: FC<Props> = ({ id }) => {
  const [data, setData] = useState<QuizData | null>(null);

  const getUserData = async () => {
    const response = await fetch('/api/get-db-data', {
      method: 'POST',
      body: JSON.stringify({
        id,
        collection: 'quizzes',
        projection: {
          _id: 0,
          title: 1,
          description: 1,
          theme: 1,
          startDate: 1,
        },
      } as PropsToGetDBData),
    });
    if (response.ok) {
      const newData = await response.json();
      setData(newData);
    }
  };

  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, [id]);

  if (id) {
    return (
      <div>
        <h3>{data?.title}</h3>
        <p>{data?.description}</p>
        <p>{data?.theme}</p>
        <p>{data?.startDate}</p>
        <Link href={`/quiz/${id}`}>
          <a>Join</a>
        </Link>
      </div>
    );
  }
  return <></>;
};

Modal.defaultProps = {
  id: undefined,
};

export default Modal;
