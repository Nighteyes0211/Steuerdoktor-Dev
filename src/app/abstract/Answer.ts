import { Condition } from '../models/common/Condition';
import { IAnswer } from './../interface/IAnswer';

export abstract class Answer<T> implements IAnswer
{
  private _value: T;
  public get value(): T
  {
    return this._value;
  }

  public set value(val: T)
  {
    this._value = val;
    this.ValueChanged();
  }

  private _hasFormat: boolean;
  /**
   * Flag if ValidationCheck succeeded or failed
   */
  public get hasFormat() : boolean {
    this._hasFormat = this.FormatCheck();
    return this._hasFormat;
  }

  private _format: RegExp;
  /**
   * Regular expression to check if the answer has the wright format
   */
  public get format() : RegExp {
    return this._format;
  }

  private _hasError: Condition;
  /**
   * Answer must fulfill a condition to be valid. E.g. a Date must be in a Timespan
   */
  public get hasError() : Condition {
    return this._hasError;
  }

  private _errorText: string;
  /**
   * Text if answer has an error
   */
  public get errorText() : string {
    return this._errorText;
  }

  /**
   * 
   * @param pValidation Ctr
   */
  constructor(pFormat: RegExp, pHasErrorIf: Condition = null, pErrorText: string = "") {
    this._format = pFormat;
    this._hasError = pHasErrorIf == null ? new Condition(() => { return false; }) : pHasErrorIf;
    this._errorText = pErrorText;
  }

  /** 
   * Method to test if the answer is a valid answer
   */
  abstract FormatCheck() : boolean;

  /**
   * Value of the answer changed
   */
  abstract ValueChanged(): void;
}
