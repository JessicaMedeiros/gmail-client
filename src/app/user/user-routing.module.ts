import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from "../user/user-form/user-form.component";
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  {
    path: 'login', component: UserFormComponent
  },
  {
    path: 'cadastro', component: CadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
