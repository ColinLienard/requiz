import { createContext, Dispatch } from 'react';
import { QuestionsAction, QuizQuestion } from '../types';

export const questionsReducer = (state: QuizQuestion[] | undefined, action: QuestionsAction) => {
  switch (action.type) {
    case 'add': {
      if (state) {
        return [...state, {
          id: state ? state.length + 1 : 1,
          question: 'Your question here',
          responses: [''],
          correct: 0,
        }];
      }
      return [{
        id: 1,
        question: 'Your question here',
        responses: [''],
        correct: 0,
      }];
    }
    case 'modify': {
      return state?.splice(action.value.id - 1, 1, action.value);
    }
    default:
      return state;
  }
};

export const EditorContext = createContext<{
  questions: QuizQuestion[] | undefined,
  dispatchQuestions: Dispatch<QuestionsAction>
}>({
  questions: undefined,
  dispatchQuestions: () => null,
});
