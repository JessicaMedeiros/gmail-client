import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user/user';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = environment.apiBaseUrl + "/users"
  constructor(
    private http:HttpClient, 
    
    ) { }
  
  save(user: User) : Observable<User>{  
    return this.http.post<User>( this.url, user);
  }


}
