import { FC, useEffect, useState } from 'react';
import { PropsToGetDBData, UserFromDB } from '../../../lib/types';

type Props = {
  id: string
}

const UserItem: FC<Props> = ({ id }) => {
  const [data, setData] = useState<{
    name: string,
    image?: string
  } | null>(null);

  const getUserData = async () => {
    const response = await fetch('/api/get-db-data', {
      method: 'POST',
      body: JSON.stringify({
        id,
        collection: 'users',
        projection: {
          _id: 0,
          name: 1,
          image: 1,
        },
      } as PropsToGetDBData),
    });
    if (response.ok) {
      const { name, image }: UserFromDB = await response.json();
      setData({ name, image });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {data?.image && (
        <img src={data.image} alt="" />
      )}
      <p>{data?.name}</p>
    </div>
  );
};

export default UserItem;
