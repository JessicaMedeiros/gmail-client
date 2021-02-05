import { Component, OnInit } from '@angular/core';
import { Email } from "../email/email";
import { UsersService } from '../users.service';
import { EmailsService } from '../emails.service';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emails: Email[] = [];

  formularioEmail!: FormGroup;
  colunas = ['title', 'content', 'date'];
  constructor(
    private service:EmailsService,
    private fb:FormBuilder,
    private router:Router
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
        this.router.navigate(['/home'])
      }
    )
  }

}
