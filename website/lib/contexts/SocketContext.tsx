import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket>(io(process.env.NEXT_PUBLIC_SERVER_URL as string));

export default SocketContext;
