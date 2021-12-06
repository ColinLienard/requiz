import { Server, Socket } from 'socket.io';
import { deleteRoom, getRoom } from './rooms';
import { startTimer } from './timer';
import { getUsers, updateUser } from './users';

export const startQuiz = async (io: Server, socket: Socket, roomId: string, index = 0) => {
  const room = getRoom(roomId);
  if (room) {
    const { questions } = room;
    if (index < questions.length) {
      io.to(roomId).emit('question', questions[index]);
      startTimer(io, roomId, 5, () => {
        // At the end of the timer
        io.to(roomId).emit('request-response');
        setTimeout(() => {
          startQuiz(io, socket, roomId, index + 1);
        }, 5000);
      });
    } else {
      io.to(roomId).emit('game-state', 'end');
      io.to(roomId).emit('get-users', getUsers(roomId));
    }
  } else {
    deleteRoom(roomId);
  }
};

export const listenToResponses = (io: Server, socket: Socket) => {
  socket.on('response', (correctResponse: boolean) => {
    if (!correctResponse) {
      const user = updateUser(socket.id, correctResponse);
      io.to(user.roomId).emit('update-user', user);
    }
  });
};
