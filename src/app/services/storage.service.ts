import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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
  constructor(private nativeStorage: NativeStorage) {
    // var self = this;
    this.baseUrl = 'https://bankyekrom.azurewebsites.net/api/';
    // this.baseUrl = "http://localhost:1501/api/";
   }

  public async isLoggedIn() {
    const value = await this.nativeStorage.getItem(this.IS_LOGGED_IN);
    if (value && value === true) {
      return true;
    } else {
      return false;
    }
  }
  public setUsername(username: string) {
    this.nativeStorage.setItem(this.USERNAME, JSON.stringify(username));
  }

  public async getUsername() {
    const value = await this.nativeStorage.getItem(this.USERNAME);
    return JSON.parse(value);
  }

  public setKeyValue(key: string, value: any) {
    this.nativeStorage.setItem(key, JSON.stringify(value));
  }

  public getKeyValue(key: string): any {
    return this.nativeStorage.getItem(key).then((val) => {
      return JSON.parse(val);
    });
  }
  public removeKeyValue(key: string) {
    this.nativeStorage.remove(key);
  }
  public setLoggedIn() {
    this.nativeStorage.setItem(this.IS_LOGGED_IN, JSON.stringify(true));
  }

  public setCurrentUser(user) {
    this.nativeStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  public async getCurrentUser() {
    const val = await this.nativeStorage.getItem(this.CURRENT_USER);
    return JSON.parse(val);
  }

  public setToken(token: string) {
    this.nativeStorage.setItem(this.TOKEN, JSON.stringify(token));
  }

  public async getToken() {
    const val = await this.nativeStorage.getItem(this.TOKEN);
    return JSON.parse(val);
  }
}
