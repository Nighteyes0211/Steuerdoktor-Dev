import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';

// Questions
import { CheckQuestionComponent } from './ui/questions/check-question/check-question.component';
import { DateQuestionComponent } from './ui/questions/date-question/date-question.component';
import { NumberQuestionComponent } from './ui/questions/number-question/number-question.component';
import { SingleselectQuestionComponent } from './ui/questions/singleselect-question/singleselect-question.component';
import { TextQuestionComponent } from './ui/questions/text-question/text-question.component';

// Pages
import { HomeComponent } from './ui/pages/home/home.component';
import { TaxComponent } from './ui/pages/tax/tax.component';
import { MeComponent } from './ui/pages/me/me.component';
import { InternalTestComponent } from './ui/pages/internal-test/internal-test.component';
import { FooterComponent } from './ui/sections/footer/footer.component';
import { HeaderComponent } from './ui/sections/header/header.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { ProfileComponent } from './ui/pages/profile/profile.component';
import { SupportComponent } from './ui/pages/support/support.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaxComponent,
    MeComponent,
    InternalTestComponent,
    CheckQuestionComponent,
    DateQuestionComponent,
    NumberQuestionComponent,
    SingleselectQuestionComponent,
    TextQuestionComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
