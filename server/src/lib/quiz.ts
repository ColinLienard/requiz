import { Server } from 'socket.io';
import { startTimer } from './timer';

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

const startQuiz = (io: Server, room: string, index = 0) => {
  if (index < testQuiz.length) {
    io.to(room).emit('question', testQuiz[index]);
    startTimer(io, room, 10, () => {
      startQuiz(io, room, index + 1);
    });
  } else {
    io.to(room).emit('game-state', 'end');
  }
};

export default startQuiz;
