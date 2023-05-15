import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { QuizManagerService } from '../../data-access/quiz-manager/quiz-manager.service';
import { QuizQuestion } from '../../utils/interfaces/quiz-question.interface';
import { QuizItem } from '../../utils/interfaces/quiz-item.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnswerFormComponent implements OnInit, OnDestroy {

  answerForm = new FormGroup({answer: new FormControl([])})
  selectedIndex = 0;
  item!: QuizQuestion;
  @Input() set quiz(value: QuizItem | null) {
    this._quiz = value;
    this.selectedIndex = 0;
    this.setQuestion();
  }

  private _quiz: QuizItem | null = null;
  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  get quiz() {
    return this._quiz;
  }
  constructor(private quizManagerService: QuizManagerService) {}

  ngOnInit(): void {
    this.answerForm.valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => this.saveQuestionAnswer(res.answer![0]));
  }

  // method to change a question in view and update the form with the draft answer if it exists;
  previousQuestion() {
    this.selectedIndex--;
    this.setQuestion();
  }
  // method to change a question in view and update the form with the draft answer if it exists;
  nextQuestion() {
    this.selectedIndex++;
    this.setQuestion();
  }
  onSubmitPage() {
    this.quizManagerService.submitQuiz();
  }
  onSubmitAll() {
    this.quizManagerService.submitAllQuizzes();
  }

  navigateToQuestion(index: number) {
    this.selectedIndex = index;
    this.setQuestion();
  }

  // method to change a question in view and update the form with the draft answer if it exists;
  setQuestion() {
    this.item = this.quiz!.questions[this.selectedIndex];
    const value = this.item.draftAnswer ? [this.item.draftAnswer] : [];
    // @ts-ignore
    this.answerForm.setValue({answer: value});
  }

  //method to save a question draft answer
  saveQuestionAnswer(answerId: number) {
    this.item.draftAnswer = answerId ? answerId : undefined;
    const index = this.quiz!.questions.findIndex((question) => question.id === this.item.id);
    this.quiz!.questions[index] = this.item;
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
