import { Answer } from "../../abstract/Answer";
import { Condition } from "../common/Condition";

export class CheckAnswer extends Answer<boolean>
{
  constructor(pFormat: RegExp, pValue: boolean = false, pHasErrorIf: Condition = null, pErrorText: string = "")
  {
    super(pFormat, pHasErrorIf, pErrorText);
    this.value = pValue;
  }

  FormatCheck(): boolean {
    return true;
  }

  ValueChanged(): void {
    
  }
}
