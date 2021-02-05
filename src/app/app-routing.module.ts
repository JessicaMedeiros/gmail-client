import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { HomeComponent } from "../app/home/home.component";
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  {
    path: '', component: UserFormComponent  
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'email', component: EmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
