import { DateAnswer } from '../../models/answers/DateAnswer';
import { Answer } from 'src/app/abstract/Answer';
import { NumberAnswer } from 'src/app/models/answers/NumberAnswer';
import { SingleSelectAnswer } from 'src/app/models/answers/SingleSelectAnswer';
import { TextAnswer } from 'src/app/models/answers/TextAnswer';
import { DateQuestion } from 'src/app/models/questions/DateQuestion';
import { NumberQuestion } from 'src/app/models/questions/NumberQuestion';
import { SingleSelectQuestion } from 'src/app/models/questions/SingleSelectQuestion';
import { TextQuestion } from 'src/app/models/questions/TextQuestion';
import { Category } from '../../models/common/Category';
import { Condition } from 'src/app/models/common/Condition';
import { Conditions } from 'src/app/models/conditions/Conditions';
import { CheckAnswer } from 'src/app/models/answers/CheckAnswer';
import { CheckQuestion } from 'src/app/models/questions/CheckQuestion';

export class BasicPartner
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Partner Basic", null);

        var man: [string, string] = ["männlich", "männlich"];
        var woman: [string, string] = ["weiblich", "weiblich"];
        var divers: [string, string] = ["divers", "divers"];
        var aNonRelevant_1: Answer<[string, string]> = new SingleSelectAnswer(null, [ man, woman, divers ]);
        var qNonRelevant_1: SingleSelectQuestion = new SingleSelectQuestion("aNonRelevant_1", "Was trifft auf deinen Partner zu?", aNonRelevant_1, null, null, false);
        category.addQuestion(qNonRelevant_1);

        Conditions.getInstance().PARTNER_IS_WOMAN = new Condition(() => { return (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 });

        // Vorname
        var vornameText: string = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Wie lautet der Vorname deiner Partnerin?" : "Wie lautet der Vorname deines Partners?";
        var a0100801 : Answer<string> = new TextAnswer(new RegExp(".{1,25}"));
        var q0100801: TextQuestion = new TextQuestion("0100801", vornameText, a0100801, null, null);

        // Nachname
        var nachnameText: string = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Wie lautet der Nachname deiner Partnerin?" : "Wie lautet der Nachname deines Partners?";
        var a0100901: Answer<string>  = new TextAnswer(new RegExp(".{1,25}"));
        var q0100901: TextQuestion = new TextQuestion("0100901", nachnameText, a0100901, null, null);
        
        // Group Vor- und Nachname
        var nameCaption = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Bitte sage mir wie deine Partnerin heißt." : "Bitte sage mir wie dein Partner heißt.";
        category.addQuestions([q0100801, q0100901], null, nameCaption);

        // Geburtstag
        var geburtText = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Wann ist deine Partnerin geboren?" : "Wann ist dein Partner geboren?";
        var a0101001: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"));
        var q0101001: DateQuestion = new DateQuestion("0101001", geburtText, a0101001, null, null);
        var geburtCaption = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Verrätst du mir das Alter deiner Partnerin?!" : "Verrätst du mir das Alter deines Partners?!";
        category.addQuestion(q0101001, null, geburtCaption);

        // Selbe Adresse?
        var aESt1A_1: Answer<boolean> = new CheckAnswer(null);
        var qESt1A_1: CheckQuestion = new CheckQuestion("ESt1A_1", "Seid ihr unter der selben Anschrift erreichbar?", aESt1A_1, null, null);
        category.addQuestion(qESt1A_1, null);

        // Same place?
        Conditions.getInstance().ADDRESS_PARTNER = new Condition(() => { return (aESt1A_1 as CheckAnswer).value == false; });

        // Straße
        var a0102105: Answer<string> = new TextAnswer(new RegExp(".{1,25}"));
        var q0102105: TextQuestion = new TextQuestion("0102105", "Straße", a0102105, null, null);

        // Hausnummer
        var a0102202: Answer<number> = new NumberAnswer(new RegExp("^(?=.{1,4}$)[0-9]+"));
        var q0102202: NumberQuestion = new NumberQuestion("0102202", "Hausnummer", a0102202, null, null);

        // Hausnummerzusatz
        var a0102203: Answer<string> = new TextAnswer(new RegExp(".{1,6}"));
        var q0102203: TextQuestion = new TextQuestion("0102203", "Hausnummerzusatz", a0102203, null, null);

        // Postleitzahl
        var a0101701: Answer<string> = new TextAnswer(new RegExp("^(?=.{1,5}$)\d+"));
        var q0101701: TextQuestion = new TextQuestion("0101701", "Postleitzahl", a0101701, null, null);

        // Wohnort
        var a0101702: Answer<string> = new TextAnswer(new RegExp(".{1,20}"));
        var q0101702: TextQuestion = new TextQuestion("0101702", "Wohnort", a0101702, null, null);

        // Adressergänzung
        var a0102301: Answer<string> = new TextAnswer(new RegExp(".{1,25}"));
        var q0102301: TextQuestion = new TextQuestion("0102301", "Adressergänzung", a0102301, null, null);

        var adrCaption: string = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Wo wohnt deine Partnerin?" : "Wo wohnt dein Partner?";
        category.addQuestions([q0102105, q0102202, q0102203, q0101701, q0101702, q0102301], Conditions.getInstance().ADDRESS_PARTNER, adrCaption);

        // TODO IdNr-Answer
        var idnrCaption: string = (aNonRelevant_1 as SingleSelectAnswer).selectedIndex == 1 ? "Wie lautet die Steuer-ID deiner Partnerin?" : "Wie lautet die Steuer-ID deines Partners?";
        var a0100082: TextAnswer = new TextAnswer(new RegExp("[0-9]{11}"));
        var q0100082: TextQuestion = new TextQuestion("0100082", idnrCaption, a0100082, null, Conditions.getInstance().JOINT_TAXATION);
        category.addQuestion(q0100082);

        return category;
    }
}