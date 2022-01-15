import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
  TouchEvent,
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
  const minChatTop = 100;
  const maxChatTop = window.innerHeight - 224;

  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([{
    content: ['', 'Welcome to the chat !'],
    id: 0,
  }]);
  const socket = useContext(SocketContext);
  const [chatTransition, setChatTransition] = useState(true);
  const [chatTop, setChatTop] = useState(maxChatTop);
  const oldChatTop = useRef(maxChatTop);
  const touchOffset = useRef(0);
  const messageIndex = useRef(1);
  const chat = useRef<HTMLUListElement>(null);

  const getMessageId = (): number => {
    messageIndex.current += 1;
    return messageIndex.current;
  };

  const scrollToBottom = () => chat.current?.scrollTo(0, chat.current.scrollHeight);

  useEffect(() => {
    socket.emit('join', { userName, userId, roomId });

    socket.on('message', (author: string, content: string) => {
      setChatMessages((state) => [...state, {
        author,
        content,
        id: getMessageId(),
      }]);
    });

    socket.on('user-joined', (anUserName: string) => {
      setChatMessages((state) => [...state, { content: [anUserName, 'joined !'], id: getMessageId() }]);
    });

    socket.on('user-left', (anUserName) => {
      setChatMessages((state) => [...state, { content: [anUserName, 'left !'], id: getMessageId() }]);
    });

    return () => {
      socket.removeAllListeners('message');
      socket.removeAllListeners('user-joined');
      socket.removeAllListeners('user-left');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 210);
  }, [chatTop]);

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
        author: 'You',
        content: message,
        id: getMessageId(),
      }]);
      setMessage('');
    }
  };

  const handleDrag = (event: TouchEvent<HTMLElement>) => {
    switch (event.type) {
      case 'touchstart':
        setChatTransition(false);
        setChatTop((state) => {
          oldChatTop.current = state;
          touchOffset.current = event.touches[0].clientY - state;
          return state;
        });
        break;
      case 'touchmove':
        setChatTop(Math.min(event.touches[0].clientY - touchOffset.current, maxChatTop));
        break;
      case 'touchend':
        setChatTransition(true);
        setChatTop((state) => {
          if (state < oldChatTop.current) {
            return minChatTop;
          }
          if (state > oldChatTop.current) {
            return maxChatTop;
          }
          return state;
        });
        break;
      default:
        throw new Error();
    }
  };

  return (
    <section className={`${styles.chat} ${chatTransition && styles.transition}`} style={{ top: `${chatTop}px` }}>
      <header
        className={styles.header}
        onTouchStart={handleDrag}
        onTouchMove={handleDrag}
        onTouchEnd={handleDrag}
      >
        <span className={styles.dragger} />
        <h3 className={styles.title}>Chat</h3>
        <OptionButton className={styles.option} onClick={() => null} />
      </header>
      <ul className={styles.messages} ref={chat}>
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
          onFocus={() => setChatTop(minChatTop)}
          onBlur={() => setChatTop(maxChatTop)}
          onSubmit={sendMessage}
        />
      </form>
    </section>
  );
};

export default Chat;
