import { Server, Socket } from 'socket.io';
import { addUser, getUsers, removeUser } from './lib/users';
import { startTimer, stopTimer } from './lib/timer';
import { listenToResponses, startQuiz } from './lib/quiz';
import { GameState, User } from './lib/types';

const io = new Server(8000, {
  cors: {
    origin: '*',
  },
});

let gameState: GameState = 'waiting';
const maxUsers = 10;

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
    if (gameState !== 'waiting') {
      // If the game is started, redirect user to home
      io.to(socket.id).emit('game-started', gameState);
    } else if (getUsers(room).length === maxUsers) {
      // If the game is full, redirect user to home
      io.to(socket.id).emit('game-full', gameState);
    } else {
      socket.join(room);
      addUser(userName, userId, socket.id, room);
      if (getUsers(room).length === 1) {
        // If the user is the first in the room, launches the timer (waiting room)
        startTimer(io, room, 3, () => {
          // After the waiting room
          gameState = 'playing';
          io.to(room).emit('game-state', gameState);
          startQuiz(io, socket, room);
        });
      } else {
        socket.to(room).emit('user-joined', userName, userId);
        io.to(socket.id).emit('get-users', getUsers(room));
      }
      listenToResponses(io, socket);
    }
  });

  socket.on('disconnect', () => {
    const user: User | null = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('user-left', user.userName);
      io.to(user.room).emit('get-users', getUsers(user.room));

      if (getUsers(user.room).length === 0) {
        stopTimer();
        gameState = 'waiting';
      }
    }
  });
});
