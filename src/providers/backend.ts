import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserDataProvider } from '../providers/user-data';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BackendProvider {


    constructor(public http: Http, public userService: UserDataProvider) {
    }

    getCountries(obj) {
        return this.http.post(this.userService.baseUrl + "public/getcountries", obj)
            .map(res => res.json());
    }
    getRegions(obj) {
        return this.http.post(this.userService.baseUrl + "public/getregions", obj)
            .map(res => res.json());
    }
    getCities(obj) {
        return this.http.post(this.userService.baseUrl + "public/getcities", obj)
            .map(res => res.json());
    }
    getIdTypes() {
        return this.http.get(this.userService.baseUrl + "public/getidtypes")
            .map(res => res.json());
    }
    getEducationalLevels() {
        return this.http.get(this.userService.baseUrl + "public/geteducationallevels")
            .map(res => res.json());
    }
    getEmploymentTypes() {
        return this.http.get(this.userService.baseUrl + "public/getemploymenttypes")
            .map(res => res.json());
    }
    getEmploymentStatuses() {
        return this.http.get(this.userService.baseUrl + "public/getemploymentstatuses")
            .map(res => res.json());
    }
    getReligions() {
        return this.http.get(this.userService.baseUrl + "public/getreligions")
            .map(res => res.json());
    }
    getMaritalStatuses() {
        return this.http.get(this.userService.baseUrl + "public/getmaritalstatuses")
            .map(res => res.json());
    }

    getUserTypes() {
        return this.http.get(this.userService.baseUrl + "public/getusertypes")
            .map(res => res.json());
    }

    getNationalities() {
        return this.http.get(this.userService.baseUrl + "public/getnationalities")
            .map(res => res.json());
    }

    getDistricts() {
        return this.http.get(this.userService.baseUrl + "public/getdistricts")
            .map(res => res.json());
    }

    logout() {
        return this.http.get(this.userService.baseUrl + "account/logout")
            .map(res => res.json());
    }

    login(obj) {
        return this.http.post(this.userService.baseUrl + "account/userlogin", obj)
            .map(res => res.json());
    }

    setImage(obj) {
        return this.http.post(this.userService.baseUrl + "account/setimage", obj)
            .map(res => res.json());
    }

    signup(obj) {
        return this.http.post(this.userService.baseUrl + "account/usersignup", obj)
            .map(res => res.json());
    }

    verify(obj) {
        return this.http.post(this.userService.baseUrl + "account/verify", obj)
            .map(res => res.json());
    }

    resendVerification(phoneNumber) {
        return this.http.get(this.userService.baseUrl + "account/resendverification?phoneNumber=" + phoneNumber, )
            .map(res => res.json());
    }

    requestPasswordReset(phoneNumber) {
        return this.http.get(this.userService.baseUrl + "account/requestpasswordreset?phoneNumber=" + phoneNumber, )
            .map(res => res.json());
    }
    resetPassword(obj) {
        return this.http.post(this.userService.baseUrl + "account/resetpassword", obj)
            .map(res => res.json());
    }

    getWallets(obj) {
        return this.http.post(this.userService.baseUrl + "userwallets/query", obj)
            .map(res => res.json());
    }
    addWallet(obj) {
        return this.http.post(this.userService.baseUrl + "userwallets/post", obj)
            .map(res => res.json());
    }
    updateWallet(obj) {
        return this.http.put(this.userService.baseUrl + "userwallets/put", obj)
            .map(res => res.json());
    }
    getWalletProviders() {
        return this.http.get(this.userService.baseUrl + "walletproviders", )
            .map(res => res.json());
    }
    setDefaultWallet(id) {
        return this.http.get(this.userService.baseUrl + "userwallets/setdefault?id=" + id, )
            .map(res => res.json());
    }

    getProfile() {
        return this.http.get(this.userService.baseUrl + "account/getprofile")
            .map(res => res.json());
    }
    updateProfile(obj) {
        return this.http.post(this.userService.baseUrl + "account/updateprofile", obj)
            .map(res => res.json());
    }

    SetImage(obj) {
        return this.http.post(this.userService.baseUrl + "account/setimage", obj)
            .map(res => res.json());
    }

    getUserScore() {
        return this.http.get(this.userService.baseUrl + "creditscores/getuserscore")
            .map(res => res.json());
    }
    getAmountRange() {
        return this.http.get(this.userService.baseUrl + "creditscores/getamountrange")
            .map(res => res.json());
    }

    getInterestRates() {
        return this.http.get(this.userService.baseUrl + "interestrates/get")
            .map(res => res.json());
    }

    getLoanDurations(obj) {
        return this.http.post(this.userService.baseUrl + "public/getloandurations", obj)
            .map(res => res.json());
    }

    makeLoanRequest(obj) {
        return this.http.post(this.userService.baseUrl + "loanrequests/post", obj)
            .map(res => res.json());
    }

    updateLoanRequest(obj) {
        return this.http.put(this.userService.baseUrl + "loanrequests/put", obj)
            .map(res => res.json());
    }

    getLoanRequests(obj) {
        return this.http.post(this.userService.baseUrl + "loanrequests/query", obj)
            .map(res => res.json());
    }

    getLoanRequest(id) {
        return this.http.get(this.userService.baseUrl + "loanrequests/get?id=" + id)
            .map(res => res.json());
    }
    cancelLoanRequest(id) {
        return this.http.get(this.userService.baseUrl + "loanrequests/cancel?id=" + id)
            .map(res => res.json());
    }
    getUserStats() {
        return this.http.get(this.userService.baseUrl + "dashboard/getuserstats")
            .map(res => res.json());
    }
    getActiveLoan() {
        return this.http.get(this.userService.baseUrl + "loans/getactive")
            .map(res => res.json());
    }

    getLoansHistory(obj) {
        return this.http.post(this.userService.baseUrl + "loans/gethistory", obj)
            .map(res => res.json());
    }

    makePayment(obj) {
        return this.http.post(this.userService.baseUrl + "loanrepayments/post", obj)
            .map(res => res.json());
    }

    getactiveschools(obj) {
        return this.http.post(this.userService.baseUrl + "public/getactiveschools", obj)
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

    getStudentStatuses() {
        return this.http.get(this.userService.baseUrl + "public/getstudentstatuses")
            .map(res => res.json());
    }

    getIds() {
        return this.http.get(this.userService.baseUrl + "useridentifications/get")
            .map(res => res.json());
    }
    addId(obj) {
        return this.http.post(this.userService.baseUrl + "useridentifications/post", obj)
            .map(res => res.json());
    }
    updateId(obj) {
        return this.http.put(this.userService.baseUrl + "useridentifications/put", obj)
            .map(res => res.json());
    }
    deleteId(id) {
        return this.http.delete(this.userService.baseUrl + "useridentifications/delete?id="+id)
            .map(res => res.json());
    }

    getDocTypes() {
        return this.http.get(this.userService.baseUrl + "public/getdocumenttypes")
            .map(res => res.json());
    }

    getDocs() {
        return this.http.get(this.userService.baseUrl + "userdocuments/get")
            .map(res => res.json());
    }
    getDoc(id) {
        return this.http.get(this.userService.baseUrl + "userdocuments/get?id="+id)
            .map(res => res.json());
    }
    addDoc(obj) {
        return this.http.post(this.userService.baseUrl + "userdocuments/post", obj)
            .map(res => res.json());
    }
    updateDoc(obj) {
        return this.http.put(this.userService.baseUrl + "userdocuments/put", obj)
            .map(res => res.json());
    }
    deleteDoc(id) {
        return this.http.delete(this.userService.baseUrl + "userdocuments/delete?id="+id)
            .map(res => res.json());
    }

    deleteWallet(id) {
        return this.http.delete(this.userService.baseUrl + "userwallets/delete?id="+id)
            .map(res => res.json());
    }

    getNotifications(cnt) {
        return this.http.get(this.userService.baseUrl + "public/getalerts?count="+cnt)
            .map(res => res.json());
    }

}
