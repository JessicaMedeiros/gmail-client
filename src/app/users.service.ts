import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user/user';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = environment.apiBaseUrl + "/users"
  constructor(
    private http:HttpClient, public storage:StorageService
    
    ) { }
  
  save(user: User) : Observable<User>{  
    return this.http.post<User>( this.url, user);
  }

  findByUsername(username:string){
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer' + token});

    return this.http.get<User>(`${this.url}/username?value=${username}`, {'headers': authHeader});
  }

  findById(id:number){
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer' + token});

    return this.http.get<User>(`${this.url}/${id}`, {'headers': authHeader});
  }

}
