import { Component, OnInit } from '@angular/core';
import { Email } from "../email/email";
import { UsersService } from '../users.service';
import { EmailsService } from '../emails.service';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef} from "@angular/material/dialog";
import { EmailComponent } from '../email/email.component';
import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emails: Email[] = [];

  id!:number;
  
  username!:string;
  email!: Email;
  formularioEmail!: FormGroup;
  colunas = ['favorite', 'title', 'cc', 'content', 'date'];
  constructor(
    private service:EmailsService,
    private fb:FormBuilder,
    private router:Router, 
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EmailComponent>,
    public storage:StorageService, 
    public userService:UsersService
 
  ) { }

  ngOnInit(): void {
    this.formularioEmail = this.fb.group({
      content: ['', Validators.required],
      title: ['', Validators.required],
      idUser: ['', Validators.required],
      cc: ['', Validators.required]
    })
    this.listarEmails();

    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.username){
      this.username = localUser.username;
      // if(this.userService.findByUsername(localUser.username)){
        // console.log(localUser.username);
      // }
      console.log(localUser.username);
    }
    
    

  }
  listarEmails(){
    this.service.list().subscribe(response => {
      this.emails = response;
    })
  }

  
  showName(){
   
  }

  makeFavorite(email : Email){
    this.service.makeFavorite(email).subscribe(
      response =>{
        email.favorite = !email.favorite;
      }
    )
  }

  visualizarEmail(){
    this.dialog.open(EmailComponent,{
      width: '500px',
      height: '500px',
      data: this.email
    })
  }
  submit(){
    const formValues = this.formularioEmail.value;
    const email: Email = new Email(formValues.content, formValues.title, formValues.idUser, formValues.cc);
    this.service.save(email).subscribe(
      response => {
        this.emails.push(email);
        console.log(this.emails);
        this.fechar();
        let list : Email[] = [...this.emails, response];
        this.emails = list;
        this.router.navigate(['/home']);
      }
    )
  }

  fechar(){
    this.dialogRef.close();
  }
}
