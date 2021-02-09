import { Answer } from "../../abstract/Answer";
import { Question } from "../../abstract/Question";
import { ITemplate } from "../../interface/ITemplate";
import { Condition } from "../common/Condition";

export class DateQuestion extends Question
{
  constructor(pId: string, pQuestion: string, pAnswer: Answer<Date>, pTemplate: ITemplate, pCondition: Condition, pNeededByElster: boolean = true)
  {
    super(pId, pQuestion, pAnswer, pTemplate, pCondition, pNeededByElster);
  }
}
