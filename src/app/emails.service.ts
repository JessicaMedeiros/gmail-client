import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Email } from './email/email';

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

  list(): Observable<Email[]>{
    return this.http.get<any>(this.url);
  }
}
