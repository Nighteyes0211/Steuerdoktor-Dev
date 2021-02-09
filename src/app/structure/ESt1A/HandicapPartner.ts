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

export class HandicapPartner
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Behinderung Partner", null);

        // Behinderung?
        var handicapText = "Hat dein Partner eine Behinderung?";
        if(Conditions.getInstance().PARTNER_IS_WOMAN != null && Conditions.getInstance().PARTNER_IS_WOMAN.fulFills())
            handicapText = "Hat deine Partnerin eine Behinderung?";
        var aESt1A_4: Answer<boolean> = new CheckAnswer(null);
        var qESt1A_4: CheckQuestion = new CheckQuestion("ESt1A_4", handicapText, aESt1A_4, null, null, false);
        category.addQuestion(qESt1A_4, null);

        // Condition for next
        Conditions.getInstance().HANDICAP_PARTNER = new Condition(() => { return (aESt1A_4 as CheckAnswer).value; });

        // Grad der Behinderung
        var a0109808: Answer<number> = new NumberAnswer(new RegExp("^(?=.{1,3}$)(?!0\d)\d{1,15}"));
        var q0109808: NumberQuestion = new NumberQuestion("0109808", "Bitte gib den Grad der Behinderung (GdB) an.", a0109808, null, Conditions.getInstance().HANDICAP_PARTNER);
        category.addQuestion(q0109808, null);

        // Condition for next to questions. Prüft ob der Grad der Behinderung 50 oder mehr beträgt, erst dann freischalten
        Conditions.getInstance().HANDICAP_DEGREE_PARTNER = new Condition(() => { return (a0109808 as NumberAnswer).value >= 50 && aESt1A_4.value == true; });

        // Behindertenausweis gültig seit
        var a0109305: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109305: DateQuestion = new DateQuestion("0109305", "Seit wann ist der Behindertenausweis gültig?", a0109305, null, Conditions.getInstance().HANDICAP_DEGREE_PARTNER);
        category.addQuestion(q0109305, Conditions.getInstance().HANDICAP_DEGREE_PARTNER);

        // Ausweis unbefristet gültig?
        var a0109307: Answer<boolean> = new CheckAnswer(null);
        var q0109307: CheckQuestion = new CheckQuestion("0109307", "Ist der Behindertenausweis unbefristet gültig?", a0109307, null, Conditions.getInstance().HANDICAP_DEGREE_PARTNER);
        category.addQuestion(q0109307, Conditions.getInstance().HANDICAP_DEGREE_PARTNER);

        // Condition for next question. Wenn der Ausweis nicht unbefristet gültig ist, dann Antwort freischalten
        Conditions.getInstance().HANDICAP_PASS_UNLIMITED_PARTNER = new Condition(() => { return (a0109307 as CheckAnswer).value == false 
            && Conditions.getInstance().HANDICAP_PARTNER.fulFills() && Conditions.getInstance().HANDICAP_DEGREE_PARTNER.fulFills()});

        // Behindertenausweis gültig seit
        var a0109306: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109306: DateQuestion = new DateQuestion("0109306", "Bis wann ist der Behindertenausweis gültig?", a0109306, null, Conditions.getInstance().HANDICAP_PASS_UNLIMITED_PARTNER);
        category.addQuestion(q0109306, null);

        // TODO Je nach Auswahl andere ID
        // Merkzeichen
        var opt1: [string, string] = ["Option 1", "1"];
        var opt2: [string, string] = ["Option 2", "2"];
        var opt3: [string, string] = ["Option 3", "3"];
        var a0109806: Answer<[string, string]> = new SingleSelectAnswer(null, [ opt1, opt2, opt3 ]);
        var q0109806: SingleSelectQuestion = new SingleSelectQuestion("0109806", "Gibt es ein Merkzeichen zu der Behinderung?", a0109806, null, Conditions.getInstance().HANDICAP_PARTNER);
        category.addQuestion(q0109806);

        // Behinderung erstes mal?
        var handicapChange = "Hat dein Partner die Behinderung 2019 das erste Mal in der Steuererklärung angegeben oder gab es eine Änderung?";
        if(Conditions.getInstance().PARTNER_IS_WOMAN != null && Conditions.getInstance().PARTNER_IS_WOMAN.fulFills())
            handicapChange = "Hat deine Partnerin die Behinderung 2019 das erste Mal in der Steuererklärung angegeben oder gab es eine Änderung?";
        var a0106301 : Answer<boolean> = new CheckAnswer(null);
        var q0106301: CheckQuestion = new CheckQuestion("0106301", handicapChange, a0106301, null, Conditions.getInstance().HANDICAP_PARTNER);
        var infoHandicap = "Sollte diese Frage auf deinen Partner zutreffen, dann müssen wir dich darauf Hinweisen, dass ggf. ein Nachweis erforderlich ist!";
        if(Conditions.getInstance().PARTNER_IS_WOMAN != null && Conditions.getInstance().PARTNER_IS_WOMAN.fulFills())
            infoHandicap = "Sollte diese Frage auf deine Partnerin zutreffen, dann müssen wir dich darauf Hinweisen, dass ggf. ein Nachweis erforderlich ist!";
        category.addQuestion(q0106301, Conditions.getInstance().HANDICAP_PARTNER, "", infoHandicap);

        return category;
    }
}