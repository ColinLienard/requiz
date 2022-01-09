import { FC } from 'react';
import Image from 'next/image';
import styles from './User.module.scss';

type Props = {
  name: string,
  image?: string
}

const User: FC<Props> = ({ name, image }) => {
  return (
    <button className={styles.user} type="button">
      {image ? (
        <Image className={styles.profilePicture} src={image} width={64} height={64} alt="" />
      ) : (
        <span className={styles.noProfilePicture} />
      )}
      <p className={styles.name}>{name}</p>
    </button>
  );
};

User.defaultProps = {
  image: undefined,
};

export default User;
