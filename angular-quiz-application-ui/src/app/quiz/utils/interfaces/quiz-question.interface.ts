import { QuizQuestionOption } from './quiz-question-option.interface';

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizQuestionOption[];
  answer: number;
  draftAnswer?: number;
}
