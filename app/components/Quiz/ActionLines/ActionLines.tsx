import { FC } from 'react';
import styles from './ActionLines.module.scss';

type Props = {
  visible: boolean,
};

const ActionLines: FC<Props> = ({ visible }) => (
  <div className={`${styles.linesContainer} ${visible && styles.visible}`}>
    <span className={styles.line} />
    <span className={styles.line} />
    <span className={styles.line} />
    <span className={styles.line} />
    <span className={styles.line} />
    <span className={styles.line} />
  </div>
);

export default ActionLines;
