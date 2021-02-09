import { SituationWidowedMe } from './SituationWidowedMe';
import { ReligionPartner } from './ReligionPartner';
import { BasicPartner } from './BasicPartner';
import { HandicapMe } from './HandicapMe';
import { BasicMe } from './BasicMe';
import { Category } from '../../models/common/Category';
import { IStructure } from "../../interface/IStructure";
import { Conditions } from 'src/app/models/conditions/Conditions';
import { ReligionMe } from './ReligionMe';
import { FamilyStatusMe } from './FamilyStatusMe';
import { HandicapPartner } from './HandicapPartner';

export class ESt1A implements IStructure
{
  categories: Category[];

  conditions: Conditions = null;


  /***************
   *  Conditions *
   ***************/ 
  

  constructor()
  {
    this.conditions = Conditions.getInstance();

    this.categories = [];
    // TODO Bei der Adresse ist zu beachten, dass es oft zwei Elster-IDs gibt,
    // eine für den Ersteller der Steuer und eine für Empfänger. Wir gehen davon aus
    // Ersteller = Empfänger, Jedoch müssen ggf. beide IDs übermittelt werden
    var meQuestions: BasicMe = new BasicMe();
    this.categories.push(meQuestions.getQuestions());

    var meReligion: ReligionMe = new ReligionMe();
    this.categories.push(meReligion.getQuestions());

    var meHandicap: HandicapMe = new HandicapMe();
    this.categories.push(meHandicap.getQuestions());

    var meFamilyStatus: FamilyStatusMe = new FamilyStatusMe();
    this.categories.push(meFamilyStatus.getQuestions());

    var partnerBasic: BasicPartner = new BasicPartner();
    this.categories.push(partnerBasic.getQuestions());

    var partnerReligion: ReligionPartner = new ReligionPartner();
    this.categories.push(partnerReligion.getQuestions());

    var partnerHandicap: HandicapPartner = new HandicapPartner();
    this.categories.push(partnerHandicap.getQuestions());

    var meWidowed: SituationWidowedMe = new SituationWidowedMe();
    this.categories.push(meWidowed.getQuestions());
  }
}
