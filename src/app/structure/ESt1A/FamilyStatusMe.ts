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

export class FamilyStatusMe
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Familie", null);

        // TODO Je nach Auswahl andere ID
        var single: [string, string] = ["Single", "Single"];                  // 0
        var vergeben: [string, string] = ["Vergeben", "Vergeben"];            // 1
        var verheiratet: [string, string] = ["Verheiratet", "Verheiratet"];   // 2
        var geschieden: [string, string] = ["Geschieden", "Geschieden"];      // 3
        var verpartnert: [string, string] = ["Verpartnert", "Verpartnert"];   // 4
        var verwitwet: [string, string] = ["Verwitwet", "Verwitwet"];         // 5
        var getrennt: [string, string] = ["Getrennt", "Getrennt"];            // 6
        var a0100701_Temp : Answer<[string, string]> = new SingleSelectAnswer(null, [ single, vergeben, verheiratet, geschieden, verpartnert, verwitwet, getrennt ]);
        var q0100701_Temp: SingleSelectQuestion = new SingleSelectQuestion("0100701", "Wie ist dein Familienstand Ende des Jahres 2019 gewesen?", a0100701_Temp, null, null);
        category.addQuestion(q0100701_Temp);

        // TODO Answer date 
        // Verheiratet seit
        Conditions.getInstance().FAMILY_STATUS_MARRIED = new Condition(() => { return (a0100701_Temp as SingleSelectAnswer).value == (a0100701_Temp as SingleSelectAnswer).options[2]; });
        var a0100701_1: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"), null, 
        new Condition(() => { return new Date(a0100701_1.value) > new Date('31 Dec 2019 00:00:00 GMT') }), "Bitte gib den Familienstand an der im letzten Steuerjahr galt!");
        var q0100701_1: DateQuestion = new DateQuestion("0100701", "Seit wann seid ihr verheiratet?", a0100701_1, null, Conditions.getInstance().FAMILY_STATUS_MARRIED);
        category.addQuestion(q0100701_1, null);

        // Verpartnert seit
        Conditions.getInstance().FAMILY_STATUS_PARTNERED = new Condition(() => { return (a0100701_Temp as SingleSelectAnswer).value == (a0100701_Temp as SingleSelectAnswer).options[4]; });
        var a0100701_2: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"), null,
        new Condition(() => { return new Date(a0100701_2.value) > new Date('31 Dec 2019 00:00:00 GMT') }), "Bitte gib den Familienstand an der im letzten Steuerjahr galt!");
        var q0100701_2: DateQuestion = new DateQuestion("0100701", "Wann habt ihr die eingetragene Lebenspartnerschaft geschlossen?", a0100701_2, null, Conditions.getInstance().FAMILY_STATUS_PARTNERED);
        category.addQuestion(q0100701_2, null);

        // Verwitwet seit
        Conditions.getInstance().FAMILY_STATUS_WIDOWED = new Condition(() => { return (a0100701_Temp as SingleSelectAnswer).value == (a0100701_Temp as SingleSelectAnswer).options[5]; });
        var a0100702: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"), null, 
        new Condition(() => { return new Date(a0100702.value) > new Date('31 Dec 2019 00:00:00 GMT') }), "Bitte gib den Familienstand an der im letzten Steuerjahr galt!");
        var q0100702: DateQuestion = new DateQuestion("0100702", "Seit wann bist du verwitwet?", a0100702, null, Conditions.getInstance().FAMILY_STATUS_WIDOWED);

        // Getrennt vor verwitwet
        var aNonRelevant_1: Answer<boolean> = new CheckAnswer(null);
        var qNonRelevant_1: CheckQuestion = new CheckQuestion("aNonRelevant_1", "Wart ihr vor dem Todesfall getrennt?", aNonRelevant_1, null, Conditions.getInstance().FAMILY_STATUS_WIDOWED, false);

        category.addQuestions([q0100702, qNonRelevant_1], Conditions.getInstance().FAMILY_STATUS_WIDOWED, "Das ist eine sehr traurige Nachricht!");

        // TODO InfoText Jahr anpassen
        // Verwitwet und getrennt seit
        Conditions.getInstance().WIDOWED_SEPARATED = new Condition(() => { return aNonRelevant_1.value });
        var a0100704: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"));
        var q0100704: DateQuestion = new DateQuestion("0100704", "Seit wann habt ihr dauerhaft getrennt gelebt?", a0100704, null, Conditions.getInstance().WIDOWED_SEPARATED);
        category.addQuestion(q0100704, Conditions.getInstance().WIDOWED_SEPARATED, "", "Zur Info: Für den Fall, dass ihr euch 2019 getrennt habt, könntet ihr teilweise noch gemeinsam veranlagt werden.");

        // TODO Date between anpassen
        // TODO 2 IDs moeglich
        // Zusammenveranlagen
        Conditions.getInstance().JOINT_TAXATION = new Condition(() => 
        {  
        return Conditions.getInstance().FAMILY_STATUS_MARRIED.fulFills() || 
        Conditions.getInstance().FAMILY_STATUS_PARTNERED.fulFills() || 
        (Conditions.getInstance().FAMILY_STATUS_WIDOWED.fulFills() && (new Date(a0100702.value) >= new Date('01 Jan 2019 00:00:00 GMT') && new Date(a0100702.value) <= new Date('31 Dec 2019 00:00:00 GMT'))); });
        var a0101201: Answer<boolean> = new CheckAnswer(null);
        var q0101201: CheckQuestion = new CheckQuestion("0101201", "Möchtet ihr für 2019 zusammenveranlagt werden?", a0101201, null, Conditions.getInstance().JOINT_TAXATION);
        category.addQuestion(q0101201);

        // Gütergemeinschaft
        Conditions.getInstance().JOINT_PROPERTY = new Condition(() => { return Conditions.getInstance().FAMILY_STATUS_MARRIED.fulFills() || Conditions.getInstance().FAMILY_STATUS_PARTNERED.fulFills(); });
        var a0101205: Answer<boolean> = new CheckAnswer(null);
        var q0101205: CheckQuestion = new CheckQuestion("0101205", "Haben du und dein Ehepartner/Lebenspartner eine Gütergemeinschaft vereinbart?", a0101205, null, Conditions.getInstance().JOINT_PROPERTY);
        category.addQuestion(q0101205, null, "", "Info: Eine Gütergemeinschaft kann nur in einem Ehevertrag beschlossen werden.");

        // Geschieden seit
        Conditions.getInstance().DIVORCE = new Condition(() => { return (a0100701_Temp as SingleSelectAnswer).value == (a0100701_Temp as SingleSelectAnswer).options[3]; });
        var a0100703_1: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"), null,
        new Condition(() => { return new Date(a0100703_1.value) > new Date('31 Dec 2019 00:00:00 GMT') }), "Bitte gib den Familienstand an der im letzten Steuerjahr galt!");
        var q0100703_1: DateQuestion = new DateQuestion("0100703", "Seit wann bist du geschieden?", a0100703_1, null, Conditions.getInstance().DIVORCE);
        category.addQuestion(q0100703_1);

        // Partnerschaft aufgehoben seit
        Conditions.getInstance().CIVIL_PARTNERSHIP_ANNULATED = new Condition(() => { return (a0100701_Temp as SingleSelectAnswer).value == (a0100701_Temp as SingleSelectAnswer).options[6]; });
        var a0100703_2: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"));
        var q0100703_2: DateQuestion = new DateQuestion("0100703", "Seit wann ist die Lebenspartnerschaft aufgehoben?", a0100703_2, null, Conditions.getInstance().CIVIL_PARTNERSHIP_ANNULATED);
        category.addQuestion(q0100703_2);
        
        return category;
    }
}