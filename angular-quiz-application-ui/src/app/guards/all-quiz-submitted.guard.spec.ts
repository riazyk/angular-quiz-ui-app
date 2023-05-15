import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allQuizSubmittedGuard } from './all-quiz-submitted.guard';

describe('allQuizSubmittedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allQuizSubmittedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
