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

require('dotenv').config({ debug: process.env.DEBUG });

const io = new Server(8000, {
  cors: {
    origin: '*',
  },
});

const maxUsers = 10;

io.on('connection', (socket: Socket) => {
  socket.on('join', async (
    { userName, userId, roomId }:
    { userName: string, userId: string, roomId: string },
  ) => {
    if (!getRoom(roomId)) {
      const roomData = await createRoom(roomId);
      if (!roomData) {
        io.to(socket.id).emit('game-full');
        /* TODO: handle error */
      }

      socket.join(roomId);
      addUser(userName, userId, socket.id, roomId);
      listenToResponses(io, socket);

      startTimer(io, roomId, 5, () => {
        // After the waiting room
        updateRoomState(roomId, 'playing');
        io.to(roomId).emit('game-state', 'playing');
        startQuiz(io, socket, roomId);
      });
    } else if (getRoom(roomId).state !== 'waiting') {
      // If the game is started, redirect user to home
      io.to(socket.id).emit('game-started');
    } else if (getUsers(roomId).length === maxUsers) {
      // If the game is full, redirect user to home
      io.to(socket.id).emit('game-full');
    } else {
      socket.join(roomId);
      addUser(userName, userId, socket.id, roomId);
      listenToResponses(io, socket);

      socket.to(roomId).emit('user-joined', userName, userId);
      io.to(socket.id).emit('get-users', getUsers(roomId));
    }
  });

  socket.on('message', (
    { roomId, author, content }:
    { roomId: string, author: string, content: string },
  ) => {
    socket.to(roomId).emit('message', author, content);
  });

  socket.on('disconnect', () => {
    const user: User | null = removeUser(socket.id);
    if (user) {
      io.to(user.roomId).emit('user-left', user.name);
      io.to(user.roomId).emit('get-users', getUsers(user.roomId));

      if (getUsers(user.roomId).length === 0) {
        stopTimer(user.roomId);
        updateRoomState(user.roomId, 'published');
        deleteRoom(user.roomId);
      }
    }
  });
});
