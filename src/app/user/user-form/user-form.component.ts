import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersService } from "../../users.service";
import { User } from '../user';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  users: User[] = [];

  formulario!: FormGroup;

  constructor(
    private service:UsersService, 
    private fb: FormBuilder,
    private router: Router,
  ) {  }

  ngOnInit(): void {
     
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      senha: ['',  Validators.required]
    })
  }

  submit(){
    const formValues = this.formulario.value;
    const user: User = new User(formValues.nome, formValues.senha);
    this.service.save(user).subscribe(
      response => {
        this.users.push(user);
        console.log(this.users);
        this.router.navigate(['/home'])
      }
    )
  }
}
