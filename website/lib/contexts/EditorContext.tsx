import { createContext, Dispatch } from 'react';
import { QuizQuestion } from '../types';

type QuestionsAction = {
  type: 'add'
} | {
  type: 'modifyQuestion',
  id: number,
  value: string
} | {
  type: 'delete',
  id: number
} | {
  type: 'addResponse',
  id: number
} | {
  type: 'modifyResponse',
  id: number,
  index: number,
  value: string
} | {
  type: 'deleteResponse',
  id: number,
  index: number
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
        responses: ['', ''],
        correct: 0,
      };
      if (state) {
        return [...state, question];
      }
      return [question];
    }
    case 'modifyQuestion':
      return state?.map((question) => {
        if (question.id === action.id) {
          const newQuestion = question;
          newQuestion.question = action.value;
          return newQuestion;
        }
        return question;
      });
    case 'delete':
      return state?.filter((question) => question.id !== action.id);
    case 'addResponse':
      return state?.map((question) => {
        if (question.id === action.id) {
          const newQuestion = question;
          newQuestion.responses = [...newQuestion.responses, ''];
          return newQuestion;
        }
        return question;
      });
    case 'modifyResponse':
      return state?.map((question) => {
        if (question.id === action.id) {
          const newQuestion = question;
          newQuestion.responses[action.index] = action.value;
          return newQuestion;
        }
        return question;
      });
    case 'deleteResponse':
      return state?.map((question) => {
        if (question.id === action.id) {
          const newQuestion = question;
          newQuestion.responses.splice(action.index, 1);
          return newQuestion;
        }
        return question;
      });
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
