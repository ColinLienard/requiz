import { Server, Socket } from 'socket.io';
import { addUser, getUsers, removeUser } from './lib/users';
import { startTimer, stopTimer } from './lib/timer';
import { listenToResponses, startQuiz } from './lib/quiz';
import {
  createRoom,
  deleteRoom,
  getRoom,
  updateRoomState,
} from './lib/rooms';
import { User } from './lib/types';

const io = new Server(8000, {
  cors: {
    origin: '*',
  },
});

const maxUsers = 10;

io.on('connection', (socket: Socket) => {
  socket.on('join', (
    { userName, userId, room }:
    { userName: string, userId: string, room: string },
  ) => {
    if (!getRoom(room)) {
      createRoom(room);

      socket.join(room);
      addUser(userName, userId, socket.id, room);
      listenToResponses(io, socket);

      startTimer(io, room, 3, () => {
        // After the waiting room
        updateRoomState(room, 'playing');
        io.to(room).emit('game-state', 'playing');
        startQuiz(io, socket, room);
      });
    } else if (getRoom(room).state !== 'waiting') {
      // If the game is started, redirect user to home
      io.to(socket.id).emit('game-started');
    } else if (getUsers(room).length === maxUsers) {
      // If the game is full, redirect user to home
      io.to(socket.id).emit('game-full');
    } else {
      socket.join(room);
      addUser(userName, userId, socket.id, room);
      listenToResponses(io, socket);

      socket.to(room).emit('user-joined', userName, userId);
      io.to(socket.id).emit('get-users', getUsers(room));
    }
  });

  socket.on('message', (
    { room, author, content }:
    { room: string, author: string, content: string },
  ) => {
    socket.to(room).emit('message', author, content);
  });

  socket.on('disconnect', () => {
    const user: User | null = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('user-left', user.name);
      io.to(user.room).emit('get-users', getUsers(user.room));

      if (getUsers(user.room).length === 0) {
        stopTimer(user.room);
        deleteRoom(user.room);
      }
    }
  });
});
