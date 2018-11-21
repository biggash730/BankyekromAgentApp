import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { SetupPage } from '../setup/setup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {
  loader: any
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Login")
    this.loader = this.loadingCtrl.create({
      content: "Login Initiated..."
    });
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      this.username = JSON.parse(val)
    });
  }

  login() {
    var obj = {
      username: this.username, password: this.password
    }
    //console.log(obj)
    if (!obj.username) {
      let alert = this.alertCtrl.create({
        title: 'Username Error',
        subTitle: 'Please enter a valid username',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    else if (!obj.password) {
      let alert = this.alertCtrl.create({
        title: 'Password Error',
        subTitle: 'Please provide a password',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    else {


      this.storage.get(this.userService.CONNECTIONSTATUS).then((val) => {
        if (val == "offline") {
          let alert = this.alertCtrl.create({
            title: 'Offline Network',
            subTitle: 'Please check that you have internet connection',
            buttons: ['OK']
          });
          alert.present();
          return;
        }
      });
      this.loader.present();
      this.backendService.login(obj).subscribe(data => {
        //console.log(data)
        this.loader.dismissAll();
        if (data.success) {
          let alert = this.alertCtrl.create({
            title: 'Login Successful',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
         
          
          this.userService.setLoggedIn()
          this.userService.setCurrentUser(data.data)
          this.userService.setToken(data.data.token)
          var self = this
          setTimeout(()=>{
            alert.dismiss()
            self.navCtrl.setRoot(SetupPage)
          }, 3000);
          
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
        }
      }, (error) => {
        this.loader.dismissAll();
        console.log(error);
      });
      this.loader.dismissAll();
    }
  }
}
