import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import OptionButton from '../../Common/OptionButton/OptionButton';
import SocketContext from '../../../lib/contexts/SocketContext';
import { ChatMessageType } from '../../../lib/types';
import styles from './Chat.module.scss';
import ChatInput from '../ChatInput/ChatInput';

type Props = {
  userName: string,
  userId: string,
  roomId: string,
};

const Chat: FC<Props> = ({
  userName,
  userId,
  roomId,
}) => {
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([{
    content: `🙋‍♂️ Welcome to ${roomId} !`,
    id: `${userName}-0`,
  }]);
  const socket = useContext(SocketContext);

  const randomId = () => Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    socket.emit('join', { userName, userId, roomId });

    socket.on('message', (author: string, content: string) => {
      setChatMessages((state) => [...state, {
        author,
        content,
        id: randomId(),
      }]);
    });

    socket.on('user-joined', (anUserName: string) => {
      setChatMessages((state) => [...state, { content: `🤖 ${anUserName} joined`, id: randomId() }]);
    });

    socket.on('user-left', (anUserName) => {
      setChatMessages((state) => [...state, { content: `🤖 ${anUserName} left`, id: randomId() }]);
    });

    return () => {
      socket.removeAllListeners('message');
      socket.removeAllListeners('user-joined');
      socket.removeAllListeners('user-left');
    };
  }, []);

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement> | undefined) => {
    if (event) {
      event.preventDefault();
    }
    if (message.length > 0) {
      socket.emit('message', { roomId, author: userName, content: message });
      setChatMessages((state) => [...state, {
        author: 'Vous',
        content: message,
        id: randomId(),
      }]);
      setMessage('');
    }
  };

  return (
    <section className={styles.chat}>
      <header className={styles.header}>
        <span className={styles.dragger} />
        <h3 className={styles.title}>Chat</h3>
        <OptionButton className={styles.option} onClick={() => null} />
      </header>
      <ul className={styles.messages}>
        {chatMessages.map((chatMessage) => (
          <li key={chatMessage.id}>
            <ChatMessage author={chatMessage.author} content={chatMessage.content} />
          </li>
        ))}
      </ul>
      <form className={styles.form} onSubmit={sendMessage}>
        <ChatInput
          message={message}
          onChange={handleMessageChange}
          onSubmit={sendMessage}
        />
      </form>
    </section>
  );
};

export default Chat;
