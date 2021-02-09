import { Answer } from 'src/app/abstract/Answer';
import { CheckAnswer } from 'src/app/models/answers/CheckAnswer';
import { DateAnswer } from 'src/app/models/answers/DateAnswer';
import { Category } from 'src/app/models/common/Category';
import { Condition } from 'src/app/models/common/Condition';
import { Conditions } from 'src/app/models/conditions/Conditions';
import { CheckQuestion } from 'src/app/models/questions/CheckQuestion';
import { DateQuestion } from 'src/app/models/questions/DateQuestion';

export class SituationWidowedPartner
{
    public getQuestions() : Category
    {
        var category: Category = new Category("Verwitwet Partner", null);

        // Hinterbliebenenbezüge?
        var q1Text = "Hat dein Partner in 2019 Hinterbliebenenbezüge erhalten?";
        if(Conditions.getInstance().PARTNER_IS_WOMAN != null && Conditions.getInstance().PARTNER_IS_WOMAN.fulFills())
            q1Text = "Hat deine Partnerin in 2019 Hinterbliebenenbezüge erhalten?";
        var a0109411: Answer<boolean> = new CheckAnswer(null);
        var q0109411: CheckQuestion = new CheckQuestion("0109411", q1Text, a0109411, null, null);
        category.addQuestion(q0109411, null);

        Conditions.getInstance().WIDOW_PENSION_PARTNER = new Condition(() => { return (a0109411 as CheckAnswer).value; });

        // Verwitwet seit
        var q2Text = "Seit wann ist dein Partner verwitwet?";
        if(Conditions.getInstance().PARTNER_IS_WOMAN != null && Conditions.getInstance().PARTNER_IS_WOMAN.fulFills())
            q2Text = "Seit wann ist deine Partnerin verwitwet?";
        var a0109406: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109406: DateQuestion = new DateQuestion("0109406", q2Text, a0109406, null, Conditions.getInstance().WIDOW_PENSION_PARTNER);
        category.addQuestion(q0109406, Conditions.getInstance().WIDOW_PENSION_PARTNER);

        // Rentenbescheinigung unbefistet?
        var a0109408: Answer<boolean> = new CheckAnswer(null);
        var q0109408: CheckQuestion = new CheckQuestion("0109408", "Ist der Ausweis, der Bescheid oder die Rentenbescheinigung unbefristet gültig?", a0109408, 
            null, Conditions.getInstance().WIDOW_PENSION_PARTNER);
        category.addQuestion(q0109408, Conditions.getInstance().WIDOW_PENSION_PARTNER);

        Conditions.getInstance().WIDOW_PASS_UNLIMITED_PARTNER = 
            new Condition(() => { return (a0109408 as CheckAnswer).value == false && Conditions.getInstance().WIDOW_PENSION_PARTNER.fulFills()});

        // Rentenbescheinigung bis wann?
        var a0109407: Answer<Date> = new DateAnswer(new RegExp("[0-9]{2}\.[0-9]{2}"));
        var q0109407: DateQuestion = new DateQuestion("0109407", "Bis wann ist der Ausweis, der Bescheid oder die Rentenbescheinigung gültig?", a0109407, 
            null, Conditions.getInstance().WIDOW_PASS_UNLIMITED_PARTNER);
        category.addQuestion(q0109407, Conditions.getInstance().WIDOW_PASS_UNLIMITED_PARTNER);

        // Hinterbliebenenbezüge erstes mal?
        var q3Text = "Hat dein Partner die Hinterbliebenenbezüge für 2019 das erste Mal in der Steuererklärung angegeben oder gab es eine Änderung?";
        if(Conditions.getInstance().PARTNER_IS_WOMAN != null && Conditions.getInstance().PARTNER_IS_WOMAN.fulFills())
            q3Text = "Hat deine Partnerin die Hinterbliebenenbezüge für 2019 das erste Mal in der Steuererklärung angegeben oder gab es eine Änderung?";
        var a0106302 : Answer<boolean> = new CheckAnswer(null);
        var q0106302: CheckQuestion = new CheckQuestion("0106302", q3Text, a0106302, null, Conditions.getInstance().WIDOW_PENSION_PARTNER);
        category.addQuestion(q0106302, Conditions.getInstance().WIDOW_PENSION_PARTNER, "", "Bei erstmaliger Beantragung oder Änderung: Wenn Hinterbliebenenbezüge in 2019 erstmalig in der Steuererklärung angegeben werden oder wenn es eine Änderung gab, dann sollte hierüber eine Nachweis erbracht werden. Dies kann z.B. ein Rentenbescheid sein. Diesen schickst du per Post an dein Finanzamt!");

        return category;
    }
}