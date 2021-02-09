import { Answer } from 'src/app/abstract/Answer';
import { CheckAnswer } from 'src/app/models/answers/CheckAnswer';
import { DateAnswer } from 'src/app/models/answers/DateAnswer';
import { Category } from 'src/app/models/common/Category';
import { Condition } from 'src/app/models/common/Condition';
import { Conditions } from 'src/app/models/conditions/Conditions';
import { CheckQuestion } from 'src/app/models/questions/CheckQuestion';
import { DateQuestion } from 'src/app/models/questions/DateQuestion';

export class SituationWidowedMe
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Verwitwet", null);

        // Hinterbliebenenbezüge?
        var a0109213: Answer<boolean> = new CheckAnswer(null);
        var q0109213: CheckQuestion = new CheckQuestion("0109213", "Hast du 2019 Hinterbliebenenbezüge erhalten?", a0109213, null, null);
        category.addQuestion(q0109213, null);

        Conditions.getInstance().WIDOW_PENSION = new Condition(() => { return (a0109213 as CheckAnswer).value; });

        // Verwitwet seit
        var a0109208: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109208: DateQuestion = new DateQuestion("0109208", "Seit wann bist du verwitwet?", a0109208, null, Conditions.getInstance().WIDOW_PENSION);
        category.addQuestion(q0109208, Conditions.getInstance().WIDOW_PENSION);

        // Rentenbescheinigung unbefistet?
        var a0109210: Answer<boolean> = new CheckAnswer(null);
        var q0109210: CheckQuestion = new CheckQuestion("0109210", "Ist der Ausweis, der Bescheid oder die Rentenbescheinigung unbefristet gültig?", a0109210, null, Conditions.getInstance().WIDOW_PENSION);
        category.addQuestion(q0109210, Conditions.getInstance().WIDOW_PENSION);

        Conditions.getInstance().WIDOW_PASS_UNLIMITED = 
            new Condition(() => { return (a0109210 as CheckAnswer).value == false && Conditions.getInstance().WIDOW_PENSION.fulFills()});

        // Rentenbescheinigung bis wann?
        var a0109209: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109209: DateQuestion = new DateQuestion("0109209", "Bis wann ist der Ausweis, der Bescheid oder die Rentenbescheinigung gültig?", a0109209, null, Conditions.getInstance().WIDOW_PASS_UNLIMITED);
        category.addQuestion(q0109209, Conditions.getInstance().WIDOW_PASS_UNLIMITED);

         // Hinterbliebenenbezüge erstes mal?
         var a0106103 : Answer<boolean> = new CheckAnswer(null);
         var q0106103: CheckQuestion = new CheckQuestion("0106103", "Hast du die Hinterbliebenenbezüge für 2019 das erste Mal in der Steuererklärung angegeben oder gab es eine Änderung?", 
            a0106103, null, Conditions.getInstance().WIDOW_PENSION);
         category.addQuestion(q0106103, Conditions.getInstance().WIDOW_PENSION, "", "Bei erstmaliger Beantragung oder Änderung: Wenn du deine Hinterbliebenenbezüge in 2019 erstmalig in der Steuererklärung angibst oder wenn es eine Änderung gab, dann solltest du hierüber einen Nachweis erbringen. Dies kann z.B. ein Rentenbescheid sein. Diesen schickst du per Post an dein Finanzamt!");

        return category;
    }
}