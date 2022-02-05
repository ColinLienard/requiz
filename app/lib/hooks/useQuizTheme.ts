import { QuizThemes } from '../types';

type Theme = {
  id: QuizThemes,
  name: string,
  emoji: string,
  color: string,
};

export const themes: Theme[] = [
  {
    id: 'overallCulture',
    name: 'Overall culture',
    emoji: '🌍',
    color: '#38c157',
  },
  {
    id: 'videoGames',
    name: 'Video games',
    emoji: '🎮',
    color: '#f47851',
  },
  {
    id: 'moviesAndSeries',
    name: 'Movies and Series',
    emoji: '🎞️',
    color: '#297bc6',
  },
  {
    id: 'books',
    name: 'Books',
    emoji: '📚',
    color: '#dc3c75',
  },
];

const useQuizTheme = (id?: QuizThemes): Theme | undefined => {
  if (id) {
    return themes.filter((theme) => theme.id === id)[0];
  }
  return undefined;
};

export default useQuizTheme;
