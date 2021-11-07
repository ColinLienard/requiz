import { Server, Socket } from 'socket.io';
import { addUser, getUsers, removeUser } from './lib/users';
import { User } from './lib/types';

const io = new Server(8000, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('message', (
    { room, author, content }:
    { room: string, author: string, content: string },
  ) => {
    socket.to(room).emit('message', author, content);
  });

  socket.on('join', (
    { userName, userId, room }:
    { userName: string, userId: number, room: string },
  ) => {
    socket.join(room);
    socket.to(room).emit('user-joined', userName, userId);
    addUser(userName, userId, socket.id, room);
    io.to(socket.id).emit('get-users', getUsers(room));
  });

  // socket.on('leave', ({ userName, room }) => {
  //   socket.leave(room);
  //   io.to(room).emit('user-left', userName);
  //   io.to(room).emit('get-users', getUsers(room));
  // });

  socket.on('disconnect', () => {
    const user: User | null = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('user-left', user.userName);
      io.to(user.room).emit('get-users', getUsers(user.room));
    }
  });
});
