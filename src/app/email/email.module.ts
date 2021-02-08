import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
