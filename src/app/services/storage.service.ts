import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  IS_LOGGED_IN = 'ISLOGGEDIN';
  CURRENT_USER = 'CURRENTUSER';
  USERNAME = 'USERNAME';
  PAGE = 'PAGE';
  TOKEN = 'TOKEN';

  client: any;
  userid: string;
  loggedIn = false;
  baseUrl: string;
  phoneNumber: string;
  constructor(private nativeStorage: Storage) {
    // var self = this;
    // this.baseUrl = 'https://bankyekrom.azurewebsites.net/api/';
    this.baseUrl = 'http://localhost:1501/api/';
   }

  public async isLoggedIn() {
    return await this.nativeStorage.get(this.IS_LOGGED_IN).then(
      data => {
        if (data && JSON.parse(data) === true) {
          return true;
        } else {
          return false;
        }
      },
      error => {
        console.error(error);
        return false;
      }
    );
  }
  public setUsername(username: string) {
    this.nativeStorage.set(this.USERNAME, JSON.stringify(username));
  }

  public async getUsername() {
    return this.nativeStorage.get(this.USERNAME).then((val) => {
      return JSON.parse(val);
    });
  }

  public setKeyValue(key: string, value: any) {
    this.nativeStorage.set(key, JSON.stringify(value));
  }

  public getKeyValue(key: string): any {
    return this.nativeStorage.get(key).then((val) => {
      return JSON.parse(val);
    });
  }
  public removeKeyValue(key: string) {
    this.nativeStorage.remove(key);
  }
  public setLoggedIn() {
    this.nativeStorage.set(this.IS_LOGGED_IN, JSON.stringify(true));
  }

  public setCurrentUser(user: any) {
    this.nativeStorage.set(this.CURRENT_USER, JSON.stringify(user));
  }

  public async getCurrentUser() {
    return this.nativeStorage.get(this.CURRENT_USER).then((val) => {
      return JSON.parse(val);
    });
  }

  public setToken(token: string) {
    this.nativeStorage.set(this.TOKEN, JSON.stringify(token));
  }

  public async getToken() {
    return this.nativeStorage.get(this.TOKEN).then((val) => {
      return JSON.parse(val);
    });
  }

  public removeToken() {
    return this.nativeStorage.remove(this.TOKEN);
  }
}
