import { Injectable } from '@angular/core';
import { LocalUser } from "./localUser";
import { STORAGE_KEYS } from "./storage_keys.config";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return usr as any;
    }
    else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj : LocalUser) {
    if (obj == null) {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
}



}
