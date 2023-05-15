import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { QuizManagerService } from '../../data-access/quiz-manager/quiz-manager.service';
import { ReplaySubject, shareReplay, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizItem } from '../../utils/interfaces/quiz-item.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit, OnDestroy {

  quizSelectorForm = new FormGroup({
    quiz: new FormControl<QuizItem | null>(null)
  });

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  vm$ = this.quizManagerService.store$.pipe(shareReplay(1));

  constructor(private quizManagerService: QuizManagerService) {}

  ngOnInit(): void {
    //subscribe to the store to get the selected quiz and set the form value
    this.vm$.pipe(
      takeUntil(this._destroyed$))
      .subscribe(({selectedQuiz}) => this.quizSelectorForm.patchValue({quiz: selectedQuiz}, {emitEvent: false}));

    //subscribe to the form value changes and set the selected quiz in the store
    this.quizSelectorForm.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(({quiz}) => this.quizManagerService.setSelectedQuiz(quiz!.id));
  }

  ngOnDestroy() {
    //destroy the component and unsubscribe from the store
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
