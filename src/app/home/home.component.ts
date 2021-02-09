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
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth.service'



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

  totalElementos = 0;
  pagina = 0;
  tamanho = 2;
  pageSizeOptions : number[] = [5]

  username!: string;
  emailHome!: EmailHome;
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
    public userService: UsersService,
    public authService: AuthService

  ) { }

  ngOnInit(): void {
  
    this.listarEmails(this.pagina, this.tamanho);

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.username) {
      this.userService.findByUsername(localUser.username)
      .subscribe(respose => {
        this.user = respose;
      });
      }

}

showEmailDetails(id:number){
  this.router.navigate(["/email-details", "id"]);
  console.log(id);
  this.service.findByID(id).subscribe(
    response => {
      // this.email.isread = true;
      this.emailHome = response;
     
    }
  )
  // 
}

listarEmails( pagina = 0, tamanho = 10 ){
    this.service.list(pagina, tamanho).subscribe(response => {
      this.emails = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })

}

paginar(event: PageEvent){
  this.pagina = event.pageIndex;
  this.listarEmails(this.pagina, this.tamanho)
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

logout(){
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
