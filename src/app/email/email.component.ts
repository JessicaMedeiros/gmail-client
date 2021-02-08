import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Email } from "../email/email";
import { UsersService } from '../users.service';
import { EmailsService } from '../emails.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from '../user/user';
import { StorageService } from '../storage.service';
import { EmailHome } from './email-home';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails: Email[] = [];
  emailsHome: EmailHome[] = [];
  user!:User;
  cc!:User;
  

  formularioEmail!: FormGroup;
  colunas = [ 'cc', 'title', 'content', 'date'];

  constructor(
    private service:EmailsService,
    private fb:FormBuilder,
    private router:Router,
    public dialogRef: MatDialogRef<EmailComponent>,
    @Inject(MAT_DIALOG_DATA) public email:Email,
    private userService:UsersService,
    private storage:StorageService

  ) { }

  ngOnInit(): void {
    
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.username) {
      this.userService.findByUsername(localUser.username)
      .subscribe(respose => {
        this.user = respose;
      });
      }

 
    this.formularioEmail = this.fb.group({
      content: ['', Validators.required],
      title: ['', Validators.required],
      // idUser: ['', Validators.required],
      cc: ['', Validators.required]
    })
   
  }

  
  submit(){
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.username) {
      this.userService.findByUsername(localUser.username)
      .subscribe(respose => {
        this.user = respose;
      });
    }

   
    const formValues = this.formularioEmail.value;

    this.userService.findByUsername(formValues.cc)
    .subscribe(response => {
      this.cc = response;
    });

    const email: Email = new Email(formValues.content, formValues.title, this.user.id, this.cc.id);
    this.service.save(email).subscribe(
      response => {
        this.emails.push(email);
        console.log(this.emails);
        this.fechar();
        window.location.reload();
        let list : Email[] = [...this.emails, response];
        this.emails = list;
      }
    )
  }

  fechar(){
    this.dialogRef.close();
  }
}
