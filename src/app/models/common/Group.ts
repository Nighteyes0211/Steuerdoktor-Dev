import { Question } from '../../abstract/Question';
import { Condition } from './Condition';

export class Group
{
    private _GroupedQuestions: Array<Question>;
    public get GroupedQuestions() : Array<Question>
    {
        return this._GroupedQuestions;
    }

    private _enabledIf: Condition;
    public get enabledIf() : Condition
    {
        return this._enabledIf;
    }

    private _title: string;
    public get title() : string
    {
        return this._title;
    }

    private _info: string;
    public get info() : string
    {
        return this._info;
    }

    constructor(pGrouped: Array<Question>, pEnabledIf: Condition, pTitle: string = "", pInfo: string = "")
    {
        this._GroupedQuestions = pGrouped == null ? [] : pGrouped;
        this._info = pInfo;

        if(pEnabledIf == null)
        {
            // if no condition is set then create one. 
            // A group can only be active if one of its questions has a true condition
            this._enabledIf =  new Condition(() => 
            { 
                var isValid = false;
                for(let a of this._GroupedQuestions)
                {
                    if(a.enabledIf.fulFills())
                    {
                        isValid = true;
                        break;
                    }
                }
                
                return isValid; 
            });
        }
        else
        {
            this._enabledIf = pEnabledIf;
        }
        
        this._title = pTitle;
    }
}