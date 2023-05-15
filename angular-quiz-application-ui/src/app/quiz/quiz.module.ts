import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerFormComponent } from './ui/answer-form/answer-form.component';
import { QuestionNavigationComponent } from './ui/question-navigation/question-navigation.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizResultsComponent } from './pages/quiz-results/quiz-results.component';



@NgModule({
  declarations: [
    QuizComponent,
    AnswerFormComponent,
    QuestionNavigationComponent,
    QuizResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    QuizComponent,
    QuizResultsComponent,
    MaterialModule
  ]
})
export class QuizModule { }
