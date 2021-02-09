import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckAnswer } from 'src/app/models/answers/CheckAnswer';
import { DateAnswer } from 'src/app/models/answers/DateAnswer';
import { NumberAnswer } from 'src/app/models/answers/NumberAnswer';
import { SingleSelectAnswer } from 'src/app/models/answers/SingleSelectAnswer';
import { TextAnswer } from 'src/app/models/answers/TextAnswer';
import { Category } from 'src/app/models/common/Category';
import { ESt1A } from 'src/app/structure/ESt1A/ESt1A';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {

  currentQuestionIndex = 0;
  currentCategoryIndex = 0;
  title: string = "";
  subTitle: string = "";

  est1a: ESt1A = null;

  pageId: string = "";

  constructor(private route: ActivatedRoute)
  {
    this.est1a = new ESt1A();
    this.title = this.est1a.categories[this.currentCategoryIndex].groups[0].title;
  }

  ngOnInit(): void 
  {
    this.route.params.subscribe((result) => 
    {
      this.pageId = result["id"];

      if(this.pageId == "basic")
      {
        this.currentCategoryIndex = 0;
      }
      else if(this.pageId == "religion")
      {
        this.currentCategoryIndex = 1;
      }
      else if(this.pageId == "handicap")
      {
        this.currentCategoryIndex = 2;
      }
      else if(this.pageId == "family")
      {
        this.currentCategoryIndex = 3;
      }
    });
  }

  nextQuestionClicked()
  {
    // Check if one of the answers of the current group has an error
    for(let i = 0; i < this.est1a.categories[this.currentCategoryIndex].groups[this.currentQuestionIndex].GroupedQuestions.length; i++)
    {
      var answer: any = this.est1a.categories[this.currentCategoryIndex].groups[this.currentQuestionIndex].GroupedQuestions[i].userAnswered;

      if(answer.hasError.fulFills())
      {
        alert(answer.errorText);
        return;
      }
    }

    // if it was the last question then jump back to main-menue
    if(this.currentQuestionIndex + 1 >= this.est1a.categories[this.currentCategoryIndex].groups.length)
    {
      alert("Alle Fragen dieser Kategorie abgeschlossen");
    }
    else
    {
      for(let i = this.currentQuestionIndex + 1; i < this.est1a.categories[this.currentCategoryIndex].groups.length; i++)
      {
        var cat: Category = this.est1a.categories[this.currentCategoryIndex];
        var fulfills: boolean = cat.groups[i].enabledIf.fulFills();
        if(fulfills)
        {
          this.currentQuestionIndex = i;
          this.title = this.est1a.categories[this.currentCategoryIndex].groups[i].title;
          this.subTitle = this.est1a.categories[this.currentCategoryIndex].groups[i].info;
          break;
        }
        else if(i == this.est1a.categories[this.currentCategoryIndex].groups.length - 1 && !fulfills)
        {
          alert("Alle Fragen dieser Kategorie abgeschlossen");
          return;
        }

        this.title = this.est1a.categories[this.currentCategoryIndex].groups[i].title;
        this.subTitle = this.est1a.categories[this.currentCategoryIndex].groups[i].info;
      }
    }
  }

  prevQuestionClicked()
  {
    for(let i = this.currentQuestionIndex - 1; i >= 0; i--)
    {
      var fulfills: boolean = this.est1a.categories[this.currentCategoryIndex].groups[i].enabledIf.fulFills();
      if(fulfills)
      {
        this.currentQuestionIndex = i;
        this.title = this.est1a.categories[this.currentCategoryIndex].groups[i].title;
        break;
      }
      else if(i == this.est1a.categories[this.currentCategoryIndex].groups.length - 1 && !fulfills)
      {
        // if none of the question fulfills and it is the end of a category, 
        // jump to the next category
        if(this.currentCategoryIndex - 1 >= 0)
        {
          this.currentCategoryIndex--;
          this.currentQuestionIndex = 0;
          i = 0;
        }
        else
        {
          alert("Alle Fragen dieser Kategorie abgeschlossen");
        }
      }

      this.title = this.est1a.categories[this.currentCategoryIndex].groups[i].title;
    }
  }

  asTextAnswer(val) : TextAnswer { return val; }
  isTextAnswer(val) : boolean { return val instanceof TextAnswer; }

  asNumberAnswer(val) : NumberAnswer { return val; }
  isNumberAnswer(val) : boolean { return val instanceof NumberAnswer; }

  asDateAnswer(val) : DateAnswer { return val; }
  isDateAnswer(val) : boolean { return val instanceof DateAnswer; }

  asCheckAnswer(val) : CheckAnswer { return val; }
  isCheckAnswer(val) : boolean { return val instanceof CheckAnswer; }

  asSingleSelectAnswer(val) : SingleSelectAnswer { return val; }
  isSingleSelectAnswer(val) : boolean { return val instanceof SingleSelectAnswer; }
}
