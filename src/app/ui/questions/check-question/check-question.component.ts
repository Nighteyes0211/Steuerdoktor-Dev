import { CheckAnswer } from './../../../models/answers/CheckAnswer';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/abstract/Question';

@Component({
  selector: 'app-check-question',
  templateUrl: './check-question.component.html',
  styleUrls: ['./check-question.component.css']
})
export class CheckQuestionComponent implements OnInit, AfterViewInit {

  // The question object containing the Data
  @Input() question: Question; 

  constructor() { }
  
  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  /**
   * Convert a abstract answer to concrete SingleSelectAnswer
   * @param val Answer object
   */
  asCheckAnswer(val) : CheckAnswer { return val; }

}
