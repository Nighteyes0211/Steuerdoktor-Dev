import { SingleSelectAnswer } from './../../../models/answers/SingleSelectAnswer';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Question } from 'src/app/abstract/Question';

@Component({
  selector: 'app-singleselect-question',
  templateUrl: './singleselect-question.component.html',
  styleUrls: ['./singleselect-question.component.css']
})
export class SingleselectQuestionComponent implements OnInit, AfterViewInit {

  // The question object containing the Data
  @Input() question: Question; 

  constructor() { }
  
  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  /**
   * Convert a abstract answer to concrete SingleSelectAnswer
   * @param val Answer object
   */
  asSingleSelectAnswer(val) : SingleSelectAnswer { return val; }

  /**
   * Get the options the user can select from
   * index == 0 is the user readable string
   * index == 1 is the elster string
   */
  getOptions() : Array<[string, string]>
  {
    var answer: SingleSelectAnswer = this.question.userAnswered as SingleSelectAnswer;
    return answer.options;
  }

}
