export type ChatMessageType = {
  author?: string,
  content: string | [string, string],
  id: number,
};

export type User = {
  name: string,
  id: string,
  lives: number,
  master?: boolean,
};

export type UserFromDB = {
  _id: string,
  name: string,
  email: string,
  image?: string,
  password?: string,
};

export type GameState = 'waiting' | 'playing' | 'end';

export type QuizThemes = 'overallCulture' | 'videoGames' | 'moviesAndSeries' | 'books';

export type QuizResponse = {
  id: number,
  value: string,
};

export type QuizQuestion = {
  id: number,
  question: string,
  responses: QuizResponse[],
  correct: number,
};

export type QuizData = {
  _id?: string,
  status?: 'draft' | 'published' | 'waiting' | 'playing',
  title?: string,
  description?: string,
  userId?: string,
  theme?: QuizThemes,
  maxPlayers?: number,
  startDate?: string,
  questions?: QuizQuestion[],
  peopleIn?: string[],
};

export type PropsToGetDBData = {
  id: string,
  collection: 'accounts' | 'quizzes' | 'sessions' | 'users',
  projection?: Record<string, number>,
};
