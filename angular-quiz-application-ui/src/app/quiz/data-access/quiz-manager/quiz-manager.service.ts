import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizItem } from '../../utils/interfaces/quiz-item.interface';
import { BehaviorSubject, map, skip } from 'rxjs';
import { QuizzesStore } from '../../utils/interfaces/quizzes-store.interface';
import { QuizResults } from '../../utils/interfaces/quiz-results.interface';
import { Router } from '@angular/router';

const initialData: QuizzesStore = {
  quizzes: [],
  selectedQuiz: null
};

@Injectable({
  providedIn: 'root'
})
export class QuizManagerService {

  private _store = new BehaviorSubject(initialData);
  readonly store$ = this._store.asObservable().pipe(skip(1));

  readonly quizOptions$ = this.store$.pipe(
    map(res => res.quizzes.map(({id, name}) => ({id, name}))));

  constructor(private httpClient: HttpClient, private router: Router) {
    this._getQuizData().subscribe(res => this._storeQuizData(res));
  }

  //method to set selected quiz
  setSelectedQuiz(quizId: number) {
    const data = {...this._store.value};
    const quiz = data.quizzes.find(q => q.id === quizId);

    if (!quiz) throw new Error('Quiz not found');

    data.selectedQuiz = quiz;
    this._store.next(data);
  }

  //method to update a quiz
  submitQuiz() {
    const data = {...this._store.value};
    const quiz = data.selectedQuiz;
    let index = data.quizzes.findIndex(q => q.id === quiz!.id);
    data.quizzes[index] = {...quiz!, isSubmitted: true};

    // find next quiz that is not submitted and set it as selected if it exists
    const nextNotSubmittedQuiz = data.quizzes.find(q => !q.isSubmitted);

    if (!nextNotSubmittedQuiz) {
      this.router.navigate(['/results']);
      return;
    }

    data.selectedQuiz = nextNotSubmittedQuiz;
    this._store.next(data);
    console.log(this._store.value);
  }

  //method to submit all quizzes
  submitAllQuizzes() {
    const data = {...this._store.value};
    data.quizzes = data.quizzes.map(q => ({...q, isSubmitted: true}));
    this._store.next(data);
    this.router.navigate(['/results']);
  }

  // method to return all quizzes and questions and counted corernct answers
  getResultsByQuiz(): QuizResults[] {
    const data = { ...this._store.value };
    const quizzes = data.quizzes;

    return quizzes.map(quiz => {
      const score = quiz.questions.filter(q => q.answer === q.draftAnswer).length;
      return {name: quiz.name, score, total: quiz.questions.length};
    });
  }

  //method to check if all quizzes are submitted
  allQuizzesSubmitted(): boolean {
    const data = { ...this._store.value };
    return !!data.quizzes.length && data.quizzes.every(q => q.isSubmitted);
  }

  //method to set quiz data after fetching
  private _storeQuizData(quizzes: QuizItem[]) {
    const data = {...this._store.value};
    data.quizzes = quizzes;
    data.selectedQuiz = quizzes[0];
    this._store.next(data);
  }

  //method to fetch quiz data from the server
  private _getQuizData() {
    return this.httpClient.get<{data: QuizItem[]}>('assets/data/quiz-data.json')
      .pipe(map( res => res.data));
  }
}
