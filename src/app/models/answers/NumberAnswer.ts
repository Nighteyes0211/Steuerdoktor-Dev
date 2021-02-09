import { Answer } from "../../abstract/Answer";
import { Condition } from "../common/Condition";

export class NumberAnswer extends Answer<number>
{
  constructor(pFormat: RegExp, pValue: number = null, pHasErrorIf: Condition = null, pErrorText: string = "")
  {
    super(pFormat, pHasErrorIf, pErrorText);
    this.value = pValue;
  }

  FormatCheck(): boolean {
    if (this.format != null)
    {
      if(this.value == null)
        return false;
        
      return this.format.test(this.value.toString());
    }

    return true;
  }

  ValueChanged(): void {
    
  }
}
