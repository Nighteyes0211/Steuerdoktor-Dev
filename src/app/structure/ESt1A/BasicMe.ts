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

export class BasicMe
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Basic", null);
    
        var man: [string, string] = ["männlich", "männlich"];
        var woman: [string, string] = ["weiblich", "weiblich"];
        var divers: [string, string] = ["divers", "divers"];
        var aNonRelevant_1: Answer<[string, string]> = new SingleSelectAnswer(null, [ man, woman, divers ]);
        var qNonRelevant_1: SingleSelectQuestion = new SingleSelectQuestion("aNonRelevant_1", "Was trifft auf dich zu?", aNonRelevant_1, null, null, false);
        category.addQuestion(qNonRelevant_1);

        // Vorname
        var a0100301 : Answer<string> = new TextAnswer(new RegExp(".{1,25}"));
        var q0100301: TextQuestion = new TextQuestion("0100301", "Wie lautet dein Vorname?", a0100301, null, null);

        // Nachname
        var a0100201: Answer<string>  = new TextAnswer(new RegExp(".{1,25}"));
        var q0100201: TextQuestion = new TextQuestion("0100201", "Wie lautet dein Nachname?", a0100201, null, null);
        
        // Group Vor- und Nachname
        category.addQuestions([q0100201, q0100301], null, "Bitte sage mir wie du heißt");


        // Geburtstag
        var a0100401: Answer<Date> = new DateAnswer(new RegExp("\d\d\.\d\d\.\d\d\d\d"));
        var q0100401: DateQuestion = new DateQuestion("0100401", "Wann bist du geboren?", a0100401, null, null);
        category.addQuestion(q0100401, null, "Verrätst du mir dein Alter?!");

        // Straße
        var a0101104: Answer<string> = new TextAnswer(new RegExp(".{1,25}"));
        var q0101104: TextQuestion = new TextQuestion("0101104", "Straße", a0101104, null, null);

        // Hausnummer
        var a0101206: Answer<number> = new NumberAnswer(new RegExp("^(?=.{1,4}$)[0-9]+"));
        var q0101206: NumberQuestion = new NumberQuestion("0101206", "Hausnummer", a0101206, null, null);

        // Hausnummerzusatz
        var a0101207: Answer<string> = new TextAnswer(new RegExp(".{1,6}"));
        var q0101207: TextQuestion = new TextQuestion("0101207", "Hausnummerzusatz", a0101207, null, null);

        // Postleitzahl
        var a0100601: Answer<string> = new TextAnswer(new RegExp("^(?=.{1,5}$)\d+"));
        var q0100601: TextQuestion = new TextQuestion("0100601", "Postleitzahl", a0100601, null, null);

        // Wohnort
        var a0100602: Answer<string> = new TextAnswer(new RegExp(".{1,20}"));
        var q0100602: TextQuestion = new TextQuestion("0100602", "Wohnort", a0100602, null, null);

        // Adressergänzung
        var a0101301: Answer<string> = new TextAnswer(new RegExp(".{1,25}"));
        var q0101301: TextQuestion = new TextQuestion("0101301", "Adressergänzung", a0101301, null, null);

        category.addQuestions([q0101104, q0101206, q0101207, q0100601, q0100602, q0101301], null, "Wo wohnst du?");

        // TODO IdNr-Answer
        var a0100081: TextAnswer = new TextAnswer(new RegExp("[0-9]{11}"));
        var q0100081: TextQuestion = new TextQuestion("0100081", "Wie lautet deine Steuer-ID", a0100081, null, null);
        category.addQuestion(q0100081);

        var a0102102: TextAnswer = new TextAnswer(new RegExp("([a-zA-Z]{2})[0-9]{2}[0-9a-zA-Z]{1,30}"));
        var q0102102: TextQuestion = new TextQuestion("0102102", "Bitte gib deine IBAN-Nummer an, damit das Finanzamt weiß, wohin die eventuelle Erstattung fließen soll.", a0102102, null, null);
        category.addQuestion(q0102102);

        return category;
    }
}