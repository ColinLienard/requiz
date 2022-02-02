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
    color: '#00cf78',
  },
  {
    id: 'videoGames',
    name: 'Video games',
    emoji: '🎮',
    color: '#f47851',
  },
];

const useQuizTheme = (id?: QuizThemes): Theme | undefined => {
  if (id) {
    return themes.filter((theme) => theme.id === id)[0];
  }
  return undefined;
};

export default useQuizTheme;
