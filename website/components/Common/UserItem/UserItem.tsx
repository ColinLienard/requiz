import { FC, useEffect, useState } from 'react';
import { UserFromDB } from '../../../lib/types';

type Props = {
  id: string
}

const UserItem: FC<Props> = ({ id }) => {
  const [data, setData] = useState<{
    name: string,
    image?: string
  } | null>(null);

  const getUserData = async () => {
    const response = await fetch('/api/get-user', {
      method: 'POST',
      body: id,
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
