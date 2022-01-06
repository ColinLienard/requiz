import { FC, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Popup from 'react-customizable-popup';
import useIntersection from '../../../lib/hooks/useIntersection';
import { UserFromDB } from '../../../lib/types';
import CrossIcon from '../../../public/icons/iconComponents/CrossIcon';
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
        <Popup
          root="#__next"
          toggler={(
            <button className={styles.profilePictureButton} type="button">
              <Image className={styles.profilePicture} src={user.image} width={28} height={28} />
            </button>
          )}
          className={styles.popup}
          backdropClassName="b"
          position={['midleft', 'bottom']}
          fixed
          distanceFromEdges={24}
        >
          <button className={styles.close} type="button" data-close>
            <CrossIcon />
          </button>
          <section className={`${styles.section} ${styles.centered}`}>
            <Image className={styles.profilePicture} src={user.image} width={64} height={64} />
            <h2 className={styles.name}>{user.name}</h2>
            <p className={styles.email}>{user.email}</p>
            <button className={styles.button} type="button">See your profile</button>
          </section>
          <section className={styles.section}>
            <h3 className={styles.title}>Online friends</h3>
          </section>
          <section className={styles.section}>
            <h3 className={styles.title}>Language</h3>
          </section>
        </Popup>
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
