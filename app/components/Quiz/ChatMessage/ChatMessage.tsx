import { FC } from 'react';
import styles from './ChatMessage.module.scss';

type Props = {
  author?: string,
  content: string | [string, string],
};

const ChatMessage: FC<Props> = ({ author, content }) => (
  <div className={styles.message}>
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

export default ChatMessage;
