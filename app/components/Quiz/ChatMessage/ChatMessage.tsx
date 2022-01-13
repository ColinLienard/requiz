import { FC } from 'react';

type Props = {
  author?: string,
  content: string
}

const ChatMessage: FC<Props> = ({ author, content }) => (
  <p>
    {author && (
      <span>
        {author}
        {': '}
      </span>
    )}
    {content}
  </p>
);

ChatMessage.defaultProps = {
  author: '',
};

export default ChatMessage;
