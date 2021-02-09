import { Answer } from "../../abstract/Answer";
import { Question } from "../../abstract/Question";
import { ITemplate } from "../../interface/ITemplate";
import { Condition } from "../common/Condition";

export class TextQuestion extends Question
{
  constructor(pId: string, pQuestion: string, pAnswer: Answer<string>, pTemplate: ITemplate, pCondition: Condition, pNeededByElster: boolean = true)
  {
    super(pId, pQuestion, pAnswer, pTemplate, pCondition, pNeededByElster);
  }
}
