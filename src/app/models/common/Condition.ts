import { Delegate } from "@steelbreeze/delegate";

export class Condition
{
  private _fulFills: Delegate<boolean>;
  public get fulFills() : Delegate<boolean>
  {
    return this._fulFills;
  }

  constructor(pFunction: Delegate<boolean>)
  {
    this._fulFills = pFunction;
  }
  
}
