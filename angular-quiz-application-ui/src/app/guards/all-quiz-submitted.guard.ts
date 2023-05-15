import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { QuizManagerService } from '../quiz/data-access/quiz-manager/quiz-manager.service';

export const allQuizSubmittedGuard: CanActivateFn = (route, state) => {
  const quizManagerService = inject(QuizManagerService);
  const router: Router = inject(Router);
  const allSubmitted = quizManagerService.allQuizzesSubmitted();
  return allSubmitted ? true : router.navigate(['/']);
};
