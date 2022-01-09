import { QuizThemes } from '../types';

const themes = [
  {
    id: 'overallCulture',
    name: 'Overall culture',
    emoji: '🌍',
    color: '#00D287',
  },
  {
    id: 'videoGames',
    name: 'Video games',
    emoji: '🎮',
    color: '#F47851',
  },
];

const useQuizTheme = (id?: QuizThemes) => {
  if (id) {
    return themes.filter((theme) => theme.id === id)[0];
  }
  return undefined;
};

export default useQuizTheme;
