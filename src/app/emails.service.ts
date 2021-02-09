import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Email } from './email/email';
import { EmailHome } from './email/email-home';
import { PaginaEmail } from './email/email-home-page';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  url: string = environment.apiBaseUrl + "/emails";
  pag: string = environment.apiBaseUrl + "/emails/page";

  
  constructor(
    private http:HttpClient, public storage:StorageService
  ) { }

  save(email:Email) : Observable<Email>{
    return this.http.post<Email>(this.url, email);
  }

  // list(): Observable<EmailHome[]>{
  //   return this.http.get<any>(this.url);
  // }

  list(page:any , size:any) : Observable<PaginaEmail> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<any>(`${this.pag}?${params.toString()}`);
  }

  findByID(id:number){
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer' + token});

    return this.http.get<EmailHome>(`${this.url}/${id}`, {'headers': authHeader});
  }

   
  makeFavorite(email : Email) : Observable<any>{

    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer' + token});

    return this.http.patch(`${this.url}/${email.id}/favorite`, null, {'headers': authHeader});
  }
}
