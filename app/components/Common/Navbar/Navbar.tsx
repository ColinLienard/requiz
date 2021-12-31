import { FC } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import styles from './Navbar.module.scss';
import { UserFromDB } from '../../../lib/types';

type Props = {
  user?: UserFromDB
}

const Navbar: FC<Props> = ({ user }) => {
  const renderProfilePicture = () => {
    if (user?.image) {
      return (
        <button className={styles.profilePictureButton} type="button">
          <Image className={styles.profilePicture} src={user.image} width={28} height={28} />
        </button>
      );
    }
    return (
      <p>No pp</p>
    );
  };

  return (
    <nav className={styles.navbar}>
      <Image className={styles.logo} src="/icons/logo.svg" width={24} height={24} />
      <h1 className={styles.hero}>Requiz</h1>
      {user ? (
        renderProfilePicture()
      ) : (
        <button type="button" onClick={() => signIn()}>Sign in</button>
      )}
    </nav>
  );
};

Navbar.defaultProps = {
  user: undefined,
};

export default Navbar;
