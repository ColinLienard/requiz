import { Server, Socket } from 'socket.io';
import { startTimer } from './timer';
import { getUsers, updateUser } from './users';

const testQuiz = [
  {
    question: 'Is the earth flat ?',
    responses: [
      'Yes',
      'No',
      'Maybe',
      'We live in a simulation',
    ],
    correct: 2,
  },
  {
    question: 'Who is the best Rocket League player ?',
    responses: [
      'Kaydop',
      'Turbopolsa',
      'Monkey Moon',
      'Hadès16',
    ],
    correct: 4,
  },
  {
    question: 'Who died at the end of Game of Thrones ?',
    responses: [
      'Everyone',
      'Nobody',
      'Daenerys',
      'I don\'t remember',
    ],
    correct: 3,
  },
];

export const startQuiz = (io: Server, socket: Socket, room: string, index = 0) => {
  if (index < testQuiz.length) {
    io.to(room).emit('question', testQuiz[index]);
    startTimer(io, room, 5, () => {
      // At the end of the timer
      io.to(room).emit('request-response');
      setTimeout(() => {
        startQuiz(io, socket, room, index + 1);
      }, 5000);
    });
  } else {
    io.to(room).emit('game-state', 'end');
    io.to(room).emit('get-users', getUsers(room));
  }
};

export const listenToResponses = (io: Server, socket: Socket) => {
  socket.on('response', (correctResponse: boolean) => {
    if (!correctResponse) {
      const user = updateUser(socket.id, correctResponse);
      io.to(user.room).emit('update-user', user);
    }
  });
};
