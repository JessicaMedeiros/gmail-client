import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { HomeComponent } from "../app/home/home.component";
import { EmailComponent } from './email/email.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: 'login', component: UserFormComponent  
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'email', component: EmailComponent
  },
  {
    path: '', component: CadastroComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
