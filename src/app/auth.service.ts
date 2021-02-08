import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "./user/user";
import { LocalUser } from "./localUser";
import { StorageService } from "./storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService: JwtHelperService = new JwtHelperService();
  url:string = environment.apiBaseUrl + "/users"
  constructor(
    private http:HttpClient, 
    public storage: StorageService
  ) { }

 
  authenticate(creds : User) {
    return this.http.post(
        `${environment.apiBaseUrl}/login`, 
        creds,
        {
            observe: 'response',
            responseType: 'text'
        });
}

// refreshToken() {
//     return this.http.post(
//         `${API_CONFIG.baseUrl}/auth/refresh_token`, 
//         {},
//         {
//             observe: 'response',
//             responseType: 'text'
//         });
// }

successfulLogin(authorizationValue : string) {
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
        token: tok,
        username: this.jwtHelperService.decodeToken(tok).sub
       
        
    }; console.log(tok);
    this.storage.setLocalUser(user);

}

logout() {
     this.storage.setLocalUser(null as any);
}
}
