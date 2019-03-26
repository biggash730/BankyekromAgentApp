import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import { WindowsAzure } from 'azure-mobile-apps-client';
//import * as WindowsAzure from "azure-mobile-apps-client";
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
//declare var WindowsAzure: any;


@Injectable()
export class UserDataProvider {
  _favorites = [];
  HAS_LOGGED_IN = 'HASLOGGEDIN';
  CURRENT_USER = 'CURRENTUSER';
  USERNAME = 'USERNAME';
  PAGE = 'PAGE';
  PHONENUMBER = 'PHONENUMBER';
  TOKEN = 'TOKEN';
  LASTSYNCDATE = 'NULL';
  CONNECTIONSTATUS = 'CONNECTIONSTATUS';

  client: any;
  userid: string;
  remoteFavsTable: any;
  loggedIn: boolean = false;
  baseUrl: string;
  requestOptions: RequestOptions;
  headers: Headers = new Headers;
  phoneNumber: string;
  connectionStatus: string;

  constructor(public events: Events, public storage: Storage) {
    //var self = this; 
    //this.baseUrl = "https://bankyekrom.azurewebsites.net/api/";
    this.baseUrl = "http://localhost:1501/api/";
    storage.ready().then(() => {
    })
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      if (value && value == true) return true;
      else return false;
    });
  }

  public setPage(page) {
    this.storage.set(this.PAGE, JSON.stringify(page));
  }

  public getPage(): any {
    return this.storage.get(this.PAGE).then((val) => {
      return JSON.parse(val)
    });
  }

  public setUsername(username) {
    this.storage.set(this.USERNAME, JSON.stringify(username));
  }

  public getUsername() {
    return this.storage.get(this.USERNAME).then((value) => {
      return JSON.parse(value);
    });
  }
  public setPhoneNumber(phone) {
    this.storage.set(this.PHONENUMBER, JSON.stringify(phone));
    this.phoneNumber = phone;
  }
  public setKeyValue(key, value) {
    this.storage.set(key, JSON.parse(value));
  }

  public getKeyValue(key): any {
    return this.storage.get(key).then((val) => {
      return JSON.parse(val)
    });
  }

  public getPhoneNumber(): any {
    return this.storage.get(this.PHONENUMBER).then((val) => {
      return JSON.parse(val)
    });
  }

  public removeKeyValue(key) {
    this.storage.remove(key);
  }

  public setLoggedIn() {
    this.storage.set(this.HAS_LOGGED_IN, JSON.stringify(true));
  }

  public setCurrentUser(user) {
    this.storage.set(this.CURRENT_USER, JSON.stringify(user));
  }

  public getCurrentUser(): any {
    return this.storage.get(this.CURRENT_USER).then((val) => {
      return JSON.parse(val)
    });
  }

  public setToken(token) {
    this.storage.set(this.TOKEN, JSON.stringify(token));
  }

  public getToken(): any {
    return this.storage.get(this.TOKEN).then((val) => {
      return JSON.parse(val)
    });
  }

  public setConnectionStatus(status) {
    this.storage.set(this.CONNECTIONSTATUS, JSON.stringify(status));
  }

  public getConnectionStatus(): any {
    return this.storage.get(this.CONNECTIONSTATUS).then((val) => {
      return JSON.parse(val)
    });
  }

}