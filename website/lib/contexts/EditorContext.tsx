import { createContext, Dispatch } from 'react';
import { QuizQuestion } from '../types';

type QuestionsAction = {
  type: 'add'
} | {
  type: 'modify',
  value: QuizQuestion
} | {
  type: 'delete',
  id: number
}

const newId = (state: QuizQuestion[]) => {
  return state.reduce((previous, current) => {
    return current.id >= previous ? current.id + 1 : previous;
  }, 0);
};

export const questionsReducer = (state: QuizQuestion[] | undefined, action: QuestionsAction) => {
  switch (action.type) {
    case 'add': {
      const question = {
        id: newId(state as QuizQuestion[]),
        question: '',
        responses: [''],
        correct: 0,
      };
      if (state) {
        return [...state, question];
      }
      return [question];
    }
    case 'modify':
      return state?.map((question) => {
        if (question.id === action.value.id) {
          return action.value;
        }
        return question;
      });
    case 'delete':
      return state?.filter((question) => question.id !== action.id);
    default:
      throw new Error();
  }
};

export const EditorContext = createContext<{
  questions: QuizQuestion[] | undefined,
  dispatchQuestions: Dispatch<QuestionsAction>
}>({
  questions: undefined,
  dispatchQuestions: () => null,
});
