import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../abstract/Question';
import { TextAnswer } from '../../../models/answers/TextAnswer';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit, AfterViewInit {

  // The question object containing the Data
  @Input() question: Question; 

  constructor() { }
  
  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  /**
   * Convert a abstract answer to concrete TextAnswer
   * @param val Answer object
   */
  asTextAnswer(val) : TextAnswer { return val; }
}
