import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserDataProvider } from './user-data';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BackendProvider {


    constructor(public http: Http, public userService: UserDataProvider) {
    }

    logout() {
        return this.http.get(this.userService.baseUrl + "agents/logout")
            .map(res => res.json());
    }

    login(obj) {
        return this.http.post(this.userService.baseUrl + "agents/login", obj)
            .map(res => res.json());
    }

    setImage(obj) {
        return this.http.post(this.userService.baseUrl + "agents/setimage", obj)
            .map(res => res.json());
    }

    getProfile() {
        return this.http.get(this.userService.baseUrl + "agents/getprofile")
            .map(res => res.json());
    }
    updateProfile(obj) {
        return this.http.post(this.userService.baseUrl + "agents/updateprofile", obj)
            .map(res => res.json());
    }

    getNewEvents() {
        return this.http.get(this.userService.baseUrl + "events", )
            .map(res => res.json());
    }

    getUserEvents() {
        return this.http.get(this.userService.baseUrl + "userevents")
            .map(res => res.json());
    }

    getNotifications(cnt) {
        return this.http.get(this.userService.baseUrl + "agents/getalerts?count="+cnt)
            .map(res => res.json());
    }

    getFarmers(obj) {
        return this.http.post(this.userService.baseUrl + "farmers/mobilequery",obj)
            .map(res => res.json());
    }
    saveFarmer(obj) {
        return this.http.post(this.userService.baseUrl + "farmers",obj)
            .map(res => res.json());
    }
    getFarmer(id) {
        return this.http.get(this.userService.baseUrl + "farmers?id="+id)
            .map(res => res.json());
    }
    getFarms(obj) {
        return this.http.post(this.userService.baseUrl + "farms/mobilequery",obj)
            .map(res => res.json());
    }
    getDistricts() {
        return this.http.get(this.userService.baseUrl + "districts")
            .map(res => res.json());
    }
    getIdTypes() {
        return this.http.get(this.userService.baseUrl + "idtypes")
            .map(res => res.json());
    }

}
