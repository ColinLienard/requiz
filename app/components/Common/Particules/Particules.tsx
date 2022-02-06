import { FC } from 'react';
import styles from './Particules.module.scss';

type Props = {
  small?: boolean,
};

const Particules: FC<Props> = ({ small }) => (
  <div className={`${styles.particulesContainer} ${small && styles.small}`}>
    <span className={styles.particule} />
    <span className={styles.particule} />
    <span className={styles.particule} />
    <span className={styles.particule} />
    <span className={styles.particule} />
    <span className={styles.particule} />
  </div>
);

Particules.defaultProps = {
  small: false,
};

export default Particules;
