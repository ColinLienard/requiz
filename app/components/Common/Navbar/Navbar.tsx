import { FC, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Popup from 'react-customizable-popup';
import useIntersection from '../../../lib/hooks/useIntersection';
import { UserFromDB } from '../../../lib/types';
import styles from './Navbar.module.scss';

type Props = {
  user?: UserFromDB
}

const Navbar: FC<Props> = ({ user }) => {
  const [scrolled, setScrolled] = useState(false);
  const intersection = useIntersection(64, () => setScrolled(true), () => setScrolled(false));

  const renderProfilePicture = () => {
    if (user?.image) {
      return (
        // <Popup
        //   toggler={(
        //     <button className={styles.profilePictureButton} type="button">
        //       <Image className={styles.profilePicture} src={user.image} width={28} height={28} />
        //     </button>
        //   )}
        // >
        //   {user.name}
        //   {user.email}
        // </Popup>
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
    <>
      <nav className={`${styles.navbar} ${scrolled && styles.scrolled}`}>
        <Image className={styles.logo} src="/icons/logo.svg" width={24} height={24} />
        <h1 className={styles.hero}>Requiz</h1>
        {user ? (
          renderProfilePicture()
        ) : (
          <button type="button" onClick={() => signIn()}>Sign in</button>
        )}
      </nav>
      {intersection}
    </>
  );
};

Navbar.defaultProps = {
  user: undefined,
};

export default Navbar;
