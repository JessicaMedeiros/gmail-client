import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersService } from "../../users.service";
import { User } from '../user';
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  users: User[] = [];

  formLogin!: FormGroup;
  cadastrando!:boolean;
  username!:string;


  constructor(
    private service:UsersService, 
    private authservice:AuthService,
    private fb: FormBuilder,
    private router: Router

  ) {  }

  ngOnInit(): void {
     
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['',  Validators.required]
    })
  }

  // submit(){
  //   const formValues = this.formulario.value;
  //   const user: User = new User(formValues.username, formValues.password);
  //   this.service.save(user).subscribe(
  //     response => {
  //       this.users.push(user);
  //       console.log(this.users);
  //       this.router.navigate(['/home'])
  //     }
  //   )
  // }

  preparacaoCadastrar(event: { preventDefault: () => void; }){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  

  login(){
    const formValues = this.formLogin.value;
    const user: User = new User(formValues.username, formValues.password);
    
    this.authservice.authenticate(user)
    .subscribe(response => {
      this.authservice.successfulLogin(response.headers.get('Authorization') || '{}');
      console.log(response);
      this.router.navigate(['/home']);
    })
    ;
      console.log(this.formLogin);
  }

  // cadastrar(){
  //   const formValues = this.formulario.value;
  //   const user: User = new User(formValues.nome, formValues.senha);
  //   this.authservice
  //   .save(user)
  //   .subscribe( response => {
  //     this.success = "sucesso"
  //     this.error = false;
  //     this.router.navigate(['/home'])
  //   }, error => {
  //     this.error = true;
  //     this.success = "erro"
  //   }
  //     )

  // }
}
