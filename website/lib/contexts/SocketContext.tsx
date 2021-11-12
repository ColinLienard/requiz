import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket>(io(
  process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : '',
));

export default SocketContext;
