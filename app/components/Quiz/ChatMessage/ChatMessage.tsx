import { FC, memo } from 'react';
import styles from './ChatMessage.module.scss';

type Props = {
  author?: string,
  isMaster: boolean,
  content: string | [string, string],
};

const ChatMessage: FC<Props> = ({ author, isMaster, content }) => (
  <div className={`${styles.message} ${isMaster && styles.master}`}>
    {author ? (
      <>
        <span className={styles.author}>
          {author}
        </span>
        <p className={styles.content}>{content}</p>
      </>
    ) : (
      <p className={styles.info}>
        <span className={styles.username}>{content[0]}</span> {content[1]}
      </p>
    )}
  </div>
);

ChatMessage.defaultProps = {
  author: '',
};

export default memo(ChatMessage);
