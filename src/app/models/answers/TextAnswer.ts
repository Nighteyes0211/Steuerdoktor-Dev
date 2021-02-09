import { Answer } from "../../abstract/Answer";
import { Condition } from "../common/Condition";

export class TextAnswer extends Answer<string>
{
  constructor(pFormat: RegExp, pValue: string = "", pHasErrorIf: Condition = null, pErrorText: string = "") {
    super(pFormat, pHasErrorIf, pErrorText);

    this.value = pValue;
  }

  FormatCheck(): boolean {
    if(this.format != null)
    {
      return this.format.test(this.value);
    }

    return true;
  }

  ValueChanged(): void {
    
  }
}
