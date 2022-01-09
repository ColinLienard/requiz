import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { PropsToGetDBData, UserFromDB } from '../../../lib/types';
import styles from './UserItem.module.scss';

type Props = {
  id?: string,
  small?: boolean,
};

const UserItem: FC<Props> = ({ id, small }) => {
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
    if (id) {
      getUserData();
    }
  }, [id]);

  return (
    <div className={`${styles.userItem} ${small && styles.small}`}>
      {data?.image ? (
        <Image
          className={styles.profilePicture}
          src={data.image}
          width={small ? 20 : 32}
          height={small ? 20 : 32}
        />
      ) : (
        <span className={styles.noProfilePicture} />
      )}
      <p className={styles.name}>{data?.name}</p>
    </div>
  );
};

UserItem.defaultProps = {
  id: undefined,
  small: false,
};

export default UserItem;
