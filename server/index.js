import { Server } from 'socket.io';
import { addUser, getUsers, removeUser } from './users.js';
// import { User } from './lib/types.js';

const io = new Server(8000, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ room, author, content }) => {
    socket.to(room).emit('message', author, content);
  });

  socket.on('join', ({ userName, userId, room }) => {
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
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('user-left', user.userName);
      io.to(user.room).emit('get-users', getUsers(user.room));
    }
  });
});
