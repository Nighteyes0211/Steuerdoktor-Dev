import { Answer } from 'src/app/abstract/Answer';
import { CheckAnswer } from 'src/app/models/answers/CheckAnswer';
import { DateAnswer } from 'src/app/models/answers/DateAnswer';
import { NumberAnswer } from 'src/app/models/answers/NumberAnswer';
import { SingleSelectAnswer } from 'src/app/models/answers/SingleSelectAnswer';
import { Category } from 'src/app/models/common/Category';
import { Condition } from 'src/app/models/common/Condition';
import { Conditions } from 'src/app/models/conditions/Conditions';
import { CheckQuestion } from 'src/app/models/questions/CheckQuestion';
import { DateQuestion } from 'src/app/models/questions/DateQuestion';
import { NumberQuestion } from 'src/app/models/questions/NumberQuestion';
import { SingleSelectQuestion } from 'src/app/models/questions/SingleSelectQuestion';

export class HandicapMe
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Behinderung", null);

        // Behinderung?
        var aESt1A_4: Answer<boolean> = new CheckAnswer(null);
        var qESt1A_4: CheckQuestion = new CheckQuestion("ESt1A_4", "Hast du eine Behinderung?", aESt1A_4, null, null, false);
        category.addQuestion(qESt1A_4, null);

        // Condition for next
        Conditions.getInstance().HANDICAP = new Condition(() => { return (aESt1A_4 as CheckAnswer).value; });

        // Grad der Behinderung
        var a0109708: Answer<number> = new NumberAnswer(new RegExp("^(?=.{1,3}$)(?!0\d)\d{1,15}"));
        var q0109708: NumberQuestion = new NumberQuestion("0109708", "Bitte gib den Grad der Behinderung (GdB) an.", a0109708, null, Conditions.getInstance().HANDICAP);
        category.addQuestion(q0109708, null);

        // Condition for next to questions. Prüft ob der Grad der Behinderung 50 oder mehr beträgt, erst dann freischalten
        Conditions.getInstance().HANDICAP_DEGREE = new Condition(() => { return (a0109708 as NumberAnswer).value >= 50 && aESt1A_4.value == true; });

        // Behindertenausweis gültig seit
        var a0109101: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109101: DateQuestion = new DateQuestion("0109101", "Seit wann ist dein Behindertenausweis gültig?", a0109101, null, Conditions.getInstance().HANDICAP_DEGREE);
        category.addQuestion(q0109101, Conditions.getInstance().HANDICAP_DEGREE);

        // Ausweis unbefristet gültig?
        var a0109103: Answer<boolean> = new CheckAnswer(null);
        var q0109103: CheckQuestion = new CheckQuestion("0109103", "Ist dein Behindertenausweis unbefristet gültig?", a0109103, null, Conditions.getInstance().HANDICAP_DEGREE);
        category.addQuestion(q0109103, Conditions.getInstance().HANDICAP_DEGREE);

        // Condition for next question. Wenn der Ausweis nicht unbefristet gültig ist, dann Antwort freischalten
        Conditions.getInstance().HANDICAP_PASS_UNLIMITED = new Condition(() => { return (a0109103 as CheckAnswer).value == false && Conditions.getInstance().HANDICAP.fulFills() && Conditions.getInstance().HANDICAP_DEGREE.fulFills()});

        // Behindertenausweis gültig seit
        var a0109102: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109102: DateQuestion = new DateQuestion("0109102", "Bis wann ist dein Behindertenausweis gültig?", a0109102, null, Conditions.getInstance().HANDICAP_PASS_UNLIMITED);
        category.addQuestion(q0109102, null);

        // TODO Je nach Auswahl andere ID
        // Merkzeichen
        var opt1: [string, string] = ["Option 1", "1"];
        var opt2: [string, string] = ["Option 2", "2"];
        var opt3: [string, string] = ["Option 3", "3"];
        var a0109706: Answer<[string, string]> = new SingleSelectAnswer(null, [ opt1, opt2, opt3 ]);
        var q0109706: SingleSelectQuestion = new SingleSelectQuestion("0109706", "Gibt es ein Merkzeichen zu deiner Behinderung?", a0109706, null, Conditions.getInstance().HANDICAP);
        category.addQuestion(q0109706);

        // Behinderung erstes mal?
        var a0106102 : Answer<boolean> = new CheckAnswer(null);
        var q0106102: CheckQuestion = new CheckQuestion("0106102", "Hast du die Behinderung 2019 das erste Mal in der Steuererklärung angegeben oder gab es eine Änderung?", 
        a0106102, null, Conditions.getInstance().HANDICAP);
        category.addQuestion(q0106102, Conditions.getInstance().HANDICAP, "", "Sollte diese Frage auf dich zutreffen, dann müssen wir dich darauf Hinweisen, dass ggf. ein Nachweis erforderlich ist!");

        return category;
    }
}