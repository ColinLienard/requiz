import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Socket } from 'socket.io-client';
import ChatMessage from '../ChatMessage/ChatMessage';
import { ChatMessageType } from '../../../lib/types';

type Props = {
  socket: Socket,
  userName: string,
  userId: number,
  room: string
}

const Chat: FC<Props> = ({
  socket,
  userName,
  userId,
  room,
}) => {
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([{
    content: `🙋‍♂️ Welcome to ${room} !`,
    id: `${userName}-0`,
  }]);

  const randomId = () => Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    socket.emit('join', { userName, userId, room });

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

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length > 0) {
      socket.emit('message', { room, author: userName, content: message });
      setChatMessages((state) => [...state, {
        author: 'Vous',
        content: message,
        id: randomId(),
      }]);
      setMessage('');
    }
  };

  return (
    <section>
      <ul>
        {chatMessages.map((chatMessage) => {
          return (
            <li key={chatMessage.id}>
              <ChatMessage author={chatMessage.author} content={chatMessage.content} />
            </li>
          );
        })}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="Message..." value={message} onChange={handleMessageChange} />
        <input type="submit" value="Envoyer" />
      </form>
    </section>
  );
};

export default Chat;
