import { Answer } from "../../abstract/Answer";
import { Condition } from "../common/Condition";

export class DateAnswer extends Answer<Date>
{
  constructor(pFormat: RegExp, pValue: Date = null, pHasErrorIf: Condition = null, pErrorText: string = "")
  {
    super(pFormat, pHasErrorIf, pErrorText);

    this.value = pValue != null ? pValue : new Date();
  }

  FormatCheck(): boolean {
    return true;
  }

  ValueChanged(): void {
    
  }
}
