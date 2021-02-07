import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [UserFormComponent, CadastroComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule
  ], exports:[
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule
  ],
})
export class UserModule { }
