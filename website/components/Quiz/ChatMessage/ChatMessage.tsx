import { FC } from 'react';

type Props = {
  author?: string,
  content: string
}

const ChatMessage: FC<Props> = ({ author, content }) => {
  return (
    <p>
      {author
        ? (
          <span>
            {author}
            {': '}
          </span>
        )
        : null}
      {content}
    </p>
  );
};

ChatMessage.defaultProps = {
  author: '',
};

export default ChatMessage;
