import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Popup from 'react-customizable-popup';
import useIntersection from '../../../lib/hooks/useIntersection';
import useMobile from '../../../lib/hooks/useMobile';
import { UserFromDB } from '../../../lib/types';
import CrossIcon from '../../../public/icons/iconComponents/CrossIcon';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const { data: session } = useSession();
  const { user } = session || {};
  user as UserFromDB;
  const isMobile = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const intersection = useIntersection(
    isMobile ? 128 : 192,
    () => setScrolled(true),
    () => setScrolled(false),
  );

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled && styles.scrolled}`}>
        {user ? (
          <>
            <div className={styles.logoContainer}>
              <Image className={styles.logo} src="/icons/logo.svg" width={24} height={24} />
              <h1 className={styles.hero}>Requiz</h1>
            </div>
            <Popup
              toggler={(
                <button className={styles.profilePictureButton} type="button">
                  <Image
                    className={styles.profilePicture}
                    src={user.image || '/icons/logo.svg'}
                    width={isMobile ? 28 : 40}
                    height={isMobile ? 28 : 40}
                  />
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
                <Image
                  className={styles.image}
                  src={user.image || '/icons/logo.svg'}
                  width={isMobile ? 64 : 80}
                  height={isMobile ? 64 : 80}
                />
                <h2 className={styles.name}>{user.name}</h2>
                <p className={styles.email}>{user.email}</p>
                <button className={styles.button} type="button">See your profile</button>
                <button className={styles.link} onClick={() => signOut()} type="button">Sign out</button>
              </section>
              <section className={styles.section}>
                <h3 className={styles.title}>Online friends</h3>
              </section>
              <section className={styles.section}>
                <h3 className={styles.title}>Language</h3>
              </section>
            </Popup>
          </>
        ) : (
          <>
            <Link href="/">
              <a className={styles.logoContainer}>
                <Image className={styles.logo} src="/icons/logo.svg" width={24} height={24} />
                <h1 className={styles.hero}>Requiz</h1>
              </a>
            </Link>
          </>
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
