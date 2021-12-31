import { FC } from 'react';
import styles from './Particules.module.scss';

const Particules: FC = () => {
  return (
    <div className={styles.particulesContainer}>
      <span className={styles.particule} />
      <span className={styles.particule} />
      <span className={styles.particule} />
      <span className={styles.particule} />
      <span className={styles.particule} />
      <span className={styles.particule} />
    </div>
  );
};

export default Particules;
