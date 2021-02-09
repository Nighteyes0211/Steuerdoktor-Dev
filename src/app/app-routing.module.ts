import { InternalTestComponent } from './ui/pages/internal-test/internal-test.component';
import { MeComponent } from './ui/pages/me/me.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import { TaxComponent } from './ui/pages/tax/tax.component';
import { ProfileComponent } from './ui/pages/profile/profile.component';
import { SupportComponent } from './ui/pages/support/support.component';
import { LoginComponent } from './ui/pages/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tax', component: TaxComponent },
  { path: 'me', component: MeComponent },
  { path: 'me/:id', component: MeComponent },
  { path: 'intern', component: InternalTestComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'support', component: SupportComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
