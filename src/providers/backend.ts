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
    getAllFarmers() {
        return this.http.get(this.userService.baseUrl + "farmers")
            .map(res => res.json());
    }
    saveFarmer(obj) {
        return this.http.post(this.userService.baseUrl + "farmers",obj)
            .map(res => res.json());
    }
    updateFarmer(obj) {
        return this.http.put(this.userService.baseUrl + "farmers",obj)
            .map(res => res.json());
    }
    getDistrictFarmers(id) {
        return this.http.get(this.userService.baseUrl + "farmers/getdistrictfarmers?districtId="+id)
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
    getAllFarms() {
        return this.http.get(this.userService.baseUrl + "farms")
            .map(res => res.json());
    }
    getFarmerFarms(id) {
        return this.http.get(this.userService.baseUrl + "farms/getfarmerfarms?farmerId="+id)
            .map(res => res.json());
    }
    saveFarm(obj) {
        return this.http.post(this.userService.baseUrl + "farms",obj)
            .map(res => res.json());
    }
    updateFarm(obj) {
        return this.http.put(this.userService.baseUrl + "farms",obj)
            .map(res => res.json());
    }
    getFarm(id) {
        return this.http.get(this.userService.baseUrl + "farms?id="+id)
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
    getVarieties() {
        return this.http.get(this.userService.baseUrl + "varieties")
            .map(res => res.json());
    }
    getServices() {
        return this.http.get(this.userService.baseUrl + "services")
            .map(res => res.json());
    }
    setLocation(obj) {
        return this.http.post(this.userService.baseUrl + "farms/setgeodata",obj)
            .map(res => res.json());
    }
    getSeasons(obj) {
        return this.http.post(this.userService.baseUrl + "seasons/mobilequery",obj)
            .map(res => res.json());
    }
    getAllSeasons() {
        return this.http.get(this.userService.baseUrl + "seasons")
            .map(res => res.json());
    }
    saveSeason(obj) {
        return this.http.post(this.userService.baseUrl + "seasons",obj)
            .map(res => res.json());
    }
    getSeason(id) {
        return this.http.get(this.userService.baseUrl + "seasons?id="+id)
            .map(res => res.json());
    }
    deactivateSeason(id) {
        return this.http.get(this.userService.baseUrl + "seasons/deactivate?id="+id)
            .map(res => res.json());
    }
    getStats() {
        return this.http.get(this.userService.baseUrl + "public/agentstats")
            .map(res => res.json());
    }

    getRequests(obj) {
        return this.http.post(this.userService.baseUrl + "servicerequests/mobilequery",obj)
            .map(res => res.json());
    }
    getAllRequests() {
        return this.http.get(this.userService.baseUrl + "servicerequests")
            .map(res => res.json());
    }
    saveRequest(obj) {
        return this.http.post(this.userService.baseUrl + "servicerequests",obj)
            .map(res => res.json());
    }
    getRequest(id) {
        return this.http.get(this.userService.baseUrl + "servicerequests?id="+id)
            .map(res => res.json());
    }
    cancelRequest(id) {
        return this.http.get(this.userService.baseUrl + "servicerequests/cancel?id="+id)
            .map(res => res.json());
    }

}
