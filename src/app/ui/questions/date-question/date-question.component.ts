import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/abstract/Question';
import { DateAnswer } from 'src/app/models/answers/DateAnswer';

@Component({
  selector: 'app-date-question',
  templateUrl: './date-question.component.html',
  styleUrls: ['./date-question.component.css']
})
export class DateQuestionComponent implements OnInit, AfterViewInit {

  // The question object containing the Data
  @Input() question: Question; 

  constructor() { }
  
  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  /**
   * Convert a abstract answer to concrete SingleSelectAnswer
   * @param val Answer object
   */
  asDateAnswer(val) : DateAnswer { return val; }

}
