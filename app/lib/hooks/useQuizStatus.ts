import { QuizData } from '../types';

const status = [
  {
    id: 'draft',
    name: 'Draft',
    color: '#f2997b',
  },
  {
    id: 'published',
    name: 'Published',
    color: '#16e28c',
  },
];

const useQuizStatus = (id?: QuizData['status']) => {
  if (id) {
    return status.filter((statu) => statu.id === id)[0];
  }
  return undefined;
};

export default useQuizStatus;
