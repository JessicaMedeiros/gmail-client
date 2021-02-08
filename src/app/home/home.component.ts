import { Component, OnInit } from '@angular/core';
import { Email } from "../email/email";
import { EmailHome } from "../email/email-home";
import { UsersService } from '../users.service';
import { EmailsService } from '../emails.service';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { EmailComponent } from '../email/email.component';
import { StorageService } from 'src/app/storage.service';
import { User } from '../user/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emails: EmailHome[] = [];
  user?: User;
  id!: number;
  cc?:User;

  username!: string;
  email!: Email;
  formularioEmail!: FormGroup;
  colunas = ['favorite', 'cc', 'title',  'date'];
  constructor(
    private service: EmailsService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EmailComponent>,
    public storage: StorageService,
    public userService: UsersService

  ) { }

  ngOnInit(): void {
  
    this.listarEmails();

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.username) {
      this.userService.findByUsername(localUser.username)
      .subscribe(respose => {
        this.user = respose;
      });
      }
    

  }

listarEmails(){
  this.service.list().subscribe(response => {
    this.emails = response;    
  });
}


showName(){

}

makeFavorite(email : Email){
  this.service.makeFavorite(email).subscribe(
    response => {
      email.favorite = !email.favorite;
    }
  )
}

visualizarEmail(){
  this.dialog.open(EmailComponent, {
    width: '500px',
    height: '500px',
    data: this.email
  })
}


fechar(){
  this.dialogRef.close();
}
}
