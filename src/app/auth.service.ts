import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "./user/user";
import { LocalUser } from "./localUser";
import { StorageService } from "./storage.service";
// import { JwtHelper } from 'angular2-jwt';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // jwtHelper: JwtHelper = new JwtHelper();
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
        token: tok
        // email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);

}

logout() {
     this.storage.setLocalUser(null as any);
}
}