import { FC } from 'react';
import styles from './ChatMessage.module.scss';

type Props = {
  author?: string,
  content: string,
};

const ChatMessage: FC<Props> = ({ author, content }) => (
  <div className={styles.message}>
    {author && (
      <span className={styles.author}>
        {author}
      </span>
    )}
    <p className={styles.content}>{content}</p>
  </div>
);

ChatMessage.defaultProps = {
  author: '',
};

export default ChatMessage;
