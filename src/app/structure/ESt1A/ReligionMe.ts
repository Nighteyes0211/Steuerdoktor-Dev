import { Answer } from 'src/app/abstract/Answer';
import { CheckAnswer } from 'src/app/models/answers/CheckAnswer';
import { DateAnswer } from 'src/app/models/answers/DateAnswer';
import { SingleSelectAnswer } from 'src/app/models/answers/SingleSelectAnswer';
import { Category } from 'src/app/models/common/Category';
import { Condition } from 'src/app/models/common/Condition';
import { Conditions } from 'src/app/models/conditions/Conditions';
import { CheckQuestion } from 'src/app/models/questions/CheckQuestion';
import { DateQuestion } from 'src/app/models/questions/DateQuestion';
import { SingleSelectQuestion } from 'src/app/models/questions/SingleSelectQuestion';
export class ReligionMe
{
    private evan: [string, string] = ["Evangelisch", "EV"];
    private kath: [string, string] = ["Römisch-Katholisch", "RK"];
    private ohne: [string, string] = ["nicht kirchensteuerpflichtig", "VD"];

    public getQuestions() : Category
    {
        var category: Category = new Category("Religion", null);

        // TODO Auswahloptionen ergänzen
        // Religion (aktuell) 
    
        var a0100402: Answer<[string, string]> = new SingleSelectAnswer(new RegExp("\Q04\E|\Q02\E|\Q05\E|\Q20\E|\Q21\E|\Q07\E|\Q16\E|\Q15\E|\Q17\E|\Q13\E|\Q14\E|\Q25\E|\Q12\E|\Q28\E|\Q18\E|\Q24\E|\Q19\E|\Q27\E|\Q26\E|\Q11\E|\Q29\E|\Q03\E|\Q10\E"),
        [ this.evan, this.kath, this.ohne ]);
        var q0100402: SingleSelectQuestion = new SingleSelectQuestion("0100402", "Welche Religionszugehörigkeit hast du aktuell?", a0100402, null, null);
        category.addQuestion(q0100402, null);

        // Religion geändert?
        var aESt1A_1: Answer<boolean> = new CheckAnswer(null);
        var qESt1A_1: CheckQuestion = new CheckQuestion("ESt1A_1", "Hat sich deine Religionszugehörigkeit in 2019 geändert?", aESt1A_1, null, null);
        category.addQuestion(qESt1A_1, null);

        // Condition for next two questions
        Conditions.getInstance().RELIGION_CHANGE = new Condition(() => { return (aESt1A_1 as CheckAnswer).value == true; });

        // Religion geändert am (zuletzt)
        // TODO Date check last year
        // TODO Regex check
        var aESt1A_2: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"), null, 
        new Condition(() => { return new Date(aESt1A_2.value) > new Date('31 Dec 2019 00:00:00 GMT') }), "Die Religionszugehörigkeit muss sich im letzten Steuerjahr geändert haben!");
        var qESt1A_2: DateQuestion = new DateQuestion("ESt1A_2", "Wann hat sich deine Religionszugehörigkeit in 2019 geändert?", aESt1A_2, null, Conditions.getInstance().RELIGION_CHANGE);

        // Religion (zuletzt)
        var aESt1A_3: Answer<[string, string]> = new SingleSelectAnswer(new RegExp("\Q04\E|\Q02\E|\Q05\E|\Q20\E|\Q21\E|\Q07\E|\Q16\E|\Q15\E|\Q17\E|\Q13\E|\Q14\E|\Q25\E|\Q12\E|\Q28\E|\Q18\E|\Q24\E|\Q19\E|\Q27\E|\Q26\E|\Q11\E|\Q29\E|\Q03\E|\Q10\E"),
        [ this.evan, this.kath, this.ohne ]);
        var qESt1A_3: SingleSelectQuestion = new SingleSelectQuestion("ESt1A_3", "Welche Religionszugehörigkeit hattest du vor dem Wechsel?", aESt1A_3, null, Conditions.getInstance().RELIGION_CHANGE);
        category.addQuestions([qESt1A_2, qESt1A_3]);

        return category;
    }
}