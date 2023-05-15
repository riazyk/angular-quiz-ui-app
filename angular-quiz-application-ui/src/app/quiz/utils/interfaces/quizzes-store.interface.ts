import { QuizItem } from './quiz-item.interface';

export interface QuizzesStore {
  quizzes: QuizItem[];
  selectedQuiz: QuizItem | null;
}
