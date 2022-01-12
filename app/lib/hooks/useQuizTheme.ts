import { QuizThemes } from '../types';

const themes = [
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

const useQuizTheme = (id?: QuizThemes) => {
  if (id) {
    return themes.filter((theme) => theme.id === id)[0];
  }
  return undefined;
};

export default useQuizTheme;
