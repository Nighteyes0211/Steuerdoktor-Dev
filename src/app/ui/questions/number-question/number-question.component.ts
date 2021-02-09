import { NumberAnswer } from './../../../models/answers/NumberAnswer';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/abstract/Question';

@Component({
  selector: 'app-number-question',
  templateUrl: './number-question.component.html',
  styleUrls: ['./number-question.component.css']
})
export class NumberQuestionComponent implements OnInit, AfterViewInit {

  // The question object containing the Data
  @Input() question: Question; 

  constructor() { }
  
  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  /**
   * Convert a abstract answer to concrete SingleSelectAnswer
   * @param val Answer object
   */
  asNumberAnswer(val) : NumberAnswer { return val; }

}
