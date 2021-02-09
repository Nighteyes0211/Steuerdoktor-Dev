import { Answer } from "../../abstract/Answer";
import { Condition } from "../common/Condition";

export class SingleSelectAnswer extends Answer<[string, string]>
{
  options: Array<[string, string]> = null;

  private _index: number;
  public get selectedIndex(): number
  {
    return this._index;
  }

  constructor(pFormat: RegExp, pOptions: Array<[string, string]>, pSelectedIndex: number = 0, pHasErrorIf: Condition = null, pErrorText: string = "")
  {
    super(pFormat, pHasErrorIf, pErrorText);

    this.options = pOptions;

    if(this.options === null)
    {
      this.options = [];
      this.value = ["", ""];
    }
    else
    {
      this.value = pOptions.length > pSelectedIndex ? pOptions[pSelectedIndex] : ["", ""];
    }

    this._index = pSelectedIndex;
  }

  FormatCheck(): boolean {
    if (this.format != null)
    {
      return this.format.test(this.value[1].toString());
    }

    return true;
  }

  ValueChanged(): void {
    this._index = this.options.findIndex(item => item === this.value);
  }
}
