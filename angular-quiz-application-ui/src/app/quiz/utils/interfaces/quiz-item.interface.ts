import { QuizQuestion } from './quiz-question.interface';


export interface QuizItem {
  id: number;
  name: string;
  questions: QuizQuestion[];
  isSubmitted: boolean;
}
