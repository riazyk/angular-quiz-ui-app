import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/pages/quiz/quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizResultsComponent } from './quiz/pages/quiz-results/quiz-results.component';
import { allQuizSubmittedGuard } from './guards/all-quiz-submitted.guard';


const routes: Routes = [
  { path: '', component: QuizComponent },
  {path: 'results',
    component: QuizResultsComponent,
    canActivate: [allQuizSubmittedGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
