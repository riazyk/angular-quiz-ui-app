import { Component, OnInit } from '@angular/core';
import { QuizManagerService } from '../../data-access/quiz-manager/quiz-manager.service';
import { QuizResults } from '../../utils/interfaces/quiz-results.interface';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {

  results: QuizResults[] = [];
  totalScore = 0;
  totalQuestions = 0;

  constructor(private quizManagerService: QuizManagerService) { }

  ngOnInit(): void {
    this.results = this.quizManagerService.getResultsByQuiz();
    this.totalScore = this.results.reduce((acc, curr) => acc + curr.score, 0);
    this.totalQuestions = this.results.reduce((acc, curr) => acc + curr.total, 0);
    this.results.push({name: 'Overall', score: this.totalScore, total: this.totalQuestions});
    console.log(this.results)
  }
}
