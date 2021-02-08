import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from "@angular/material/paginator";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UsersService } from "./users.service";
import { HomeComponent } from './home/home.component';
import { EmailComponent } from './email/email.component';
import { EmailsService } from './emails.service';
import { AuthService } from "./auth.service";
import { CadastroComponent } from "./user/cadastro/cadastro.component";
// import { AuthInterceptor } from "./auth-interceptor";
import { StorageService } from './storage.service';
import { DetailsComponent } from './email/details/details.component';
import { EmailHome } from './email/email-home';

@NgModule({
  declarations: [
    AppComponent, UserFormComponent, HomeComponent, EmailComponent, CadastroComponent, DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatCheckboxModule,
    MatListModule,
    MatRippleModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
   exports:[
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatCheckboxModule,
    MatListModule,
    MatRippleModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  providers: [
    UsersService,
    EmailsService,
    AuthService,
    StorageService,
    DetailsComponent,
    EmailHome,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
