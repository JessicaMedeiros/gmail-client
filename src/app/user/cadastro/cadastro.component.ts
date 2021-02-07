import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersService } from "../../users.service";
import { User } from '../user';
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  users: User[] = [];

  formulario!: FormGroup;
  cadastrando!:boolean;
 


  constructor(
    private service:UsersService, 
    private authservice:AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {  }

  ngOnInit(): void {
     
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      password: ['',  Validators.required]
    })
  }

  submit(){
    const formValues = this.formulario.value;
    const user: User = new User(formValues.username, formValues.password);
    this.service.save(user).subscribe(
      response => {
        this.users.push(user);
        console.log(this.users);
        this.router.navigate(['/login'])
      }
    )
  }

  preparacaoCadastrar(event: { preventDefault: () => void; }){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  login(){
    const formValues = this.formulario.value;
    const user: User = new User(formValues.username, formValues.password);
    this.authservice.authenticate(user)
    .subscribe(response => {
      console.log(response.headers.get('Authorization'));
      this.router.navigate(['/form']);
    })
      console.log(this.formulario);
  }

}
