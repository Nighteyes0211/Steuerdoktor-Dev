import { Question } from '../../abstract/Question';
import { Condition } from './Condition';
import { Group } from './Group';

export class Category
{
  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _groups: Array<Group>;
  public get groups(): Array<Group> {
    return this._groups;
  }

  constructor(pName: string, pGroups: Array<Group>)
  {
    this._name = pName;
    this._groups = pGroups == null ? [] : pGroups;
  }

  /**
   * Adds a group
   * @param pGroup 
   */
  addGroup(pGroup: Group) {
    this._groups.push(pGroup);
  }

  /**
   * Adds a question
   * @param pQuestion 
   */
  addQuestion(pQuestion: Question, pEnabledIf: Condition = null, pTitle: string = "", pInfo: string = "") {
    var g: Group = new Group([pQuestion], pEnabledIf, pTitle, pInfo);
    this._groups.push(g);
  }

  /**
   * Adds multiple questions
   * @param pQuestions 
   */
  addQuestions(pQuestions: Question[], pEnabledIf: Condition = null, pTitle: string = "", pInfo: string = "") {
    var g: Group = new Group(pQuestions, pEnabledIf, pTitle, pInfo);
    this._groups.push(g);
  }
}
