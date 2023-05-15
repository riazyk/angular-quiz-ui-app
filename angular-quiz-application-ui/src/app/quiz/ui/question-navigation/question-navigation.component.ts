import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../utils/interfaces/quiz-question.interface';

@Component({
  selector: 'app-question-navigation',
  templateUrl: './question-navigation.component.html',
  styleUrls: ['./question-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionNavigationComponent {

  @Input() questions: QuizQuestion[] = [];
  @Input() selectedIndex = 0
  @Output() indexChanged = new EventEmitter<number>();

  changeQuestion(index: number) {
    this.indexChanged.emit(index);
  }
}
