import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './ChatInput.module.scss';

type Props = {
  message: string,
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit: (event?: undefined) => void,
};

const ChatInput: FC<Props> = ({ message, onChange, onSubmit }) => {
  const [height, setHeight] = useState('auto');
  const textArea = useRef<HTMLTextAreaElement>(null);

  const submitOnEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    if (message === '') {
      setHeight('auto');
    } else if (textArea.current && textArea.current.scrollHeight < 72) {
      setHeight(`${textArea.current.scrollHeight + 2}px`);
    }
  }, [message]);

  return (
    <textarea
      className={styles.input}
      ref={textArea}
      rows={1}
      style={{ height }}
      value={message}
      onChange={onChange}
      onKeyPress={submitOnEnter}
      placeholder="Send a message"
    />
  );
};

export default ChatInput;
