import { FC, memo } from 'react';
import styles from './Response.module.scss';

type Props = {
  text: string,
  index: number,
  selected: number,
  select: (number: number) => void,
  correct?: boolean,
};

const Response: FC<Props> = ({
  text,
  index,
  selected,
  select,
  correct,
}) => (
  <button
    className={`${styles.response} ${selected === index && styles.selected} ${correct && styles.correct}`}
    type="button"
    onClick={() => select(index)}
  >
    <span className={styles.number}>{index + 1}</span>
    <p className={styles.text}>{text}</p>
  </button>
);

Response.defaultProps = {
  correct: false,
};

export default memo(Response);
