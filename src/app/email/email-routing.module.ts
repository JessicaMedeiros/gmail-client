import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email.component';
import { DetailsComponent } from './details/details.component'


const routes: Routes = [
  {
    path: 'email', component: EmailComponent
  },
  {
    path:'email-details', component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
