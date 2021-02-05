import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Email } from "../email/email";
import { UsersService } from '../users.service';
import { EmailsService } from '../emails.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails: Email[] = [];

  formularioEmail!: FormGroup;
  colunas = ['title', 'content', 'date'];

  constructor(
    private service:EmailsService,
    private fb:FormBuilder,
    private router:Router,
    public dialogRef: MatDialogRef<EmailComponent>,
    @Inject(MAT_DIALOG_DATA) public email:Email

  ) { }

  ngOnInit(): void {
    
    this.formularioEmail = this.fb.group({
      content: ['', Validators.required],
      title: ['', Validators.required],
      idUser: ['', Validators.required]
    })

    this.listarEmails();
  }

  listarEmails(){
    this.service.list().subscribe(response => {
      this.emails = response;
    })
  }

  submit(){
    const formValues = this.formularioEmail.value;
    const email: Email = new Email(formValues.content, formValues.title, formValues.idUser);
    this.service.save(email).subscribe(
      response => {
        this.emails.push(email);
        console.log(this.emails);
        this.fechar();
        let list : Email[] = [...this.emails, response];
        this.emails = list;
      }
    )
  }

  fechar(){
    this.dialogRef.close();
  }
}
