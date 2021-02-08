import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Email } from './email/email';
import { EmailHome } from './email/email-home';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  url: string = environment.apiBaseUrl + "/emails"
  constructor(
    private http:HttpClient
  ) { }

  save(email:Email) : Observable<Email>{
    return this.http.post<Email>(this.url, email);
  }

  list(): Observable<EmailHome[]>{
    return this.http.get<any>(this.url);
  }

  makeFavorite(email : Email) : Observable<any>{
    return this.http.patch(`${this.url}/${email.id}/favorite`, null);
  }
}
