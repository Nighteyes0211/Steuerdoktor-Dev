import { IAnswer } from "../interface/IAnswer";
import { ITemplate } from "../interface/ITemplate";
import { Condition } from "../models/common/Condition";

export abstract class Question
{
  private _elsterID: string;
  public get elsterID() : string {
    return this._elsterID;
  }

  private _userQuestion: string;
  public get userQuestion() : string {
    return this._userQuestion;
  }

  private _enabledIf: Condition;
  public get enabledIf() : Condition {
    return this._enabledIf;
  }

  private _userAnswered: IAnswer;
  public get userAnswered() : IAnswer {
    return this._userAnswered;
  }

  private _lookAndFeel: ITemplate;
  public get lookAndFeel() : ITemplate {
    return this._lookAndFeel;
  }

  neededByElster: boolean;

  constructor(pId: string, pQuestion: string, pAnswer: IAnswer, pTemplate: ITemplate, pEnabledIf: Condition, pNeededByElster: boolean = true)
  {
    this._elsterID = pId;
    this._userQuestion = pQuestion;
    this._userAnswered = pAnswer;
    this._lookAndFeel = pTemplate;

    this._enabledIf = pEnabledIf == null ? new Condition(() => { return true; }) : pEnabledIf;
    
    this.neededByElster = pNeededByElster;
  }

}
