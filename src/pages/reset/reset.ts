import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { BackendProvider } from '../../providers/backend';
import { LoginPage } from '../../pages/login/login';
//import { ResetRequestPage } from '../../pages/reset-request/reset-request';

/**
 * Generated class for the ResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  token:string;
  password: string;
  confirmPassword:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider) {
    userService.setPage("Reset")
  }

  ionViewDidLoad() {
  }

  login(){
    this.navCtrl.push(LoginPage);
  }
  request(){
    this.navCtrl.pop()
    //this.navCtrl.push(ResetRequestPage);
  }

  reset(){
    var obj = {
      token: this.token,
      password: this.password,
      confirmPassword: this.confirmPassword
      }
      //console.log(obj)
    if (!obj.token) {
      let alert = this.alertCtrl.create({
          title:'Token Error', 
          subTitle:'Please enter the reset token',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else  if (!obj.password) {
      let alert = this.alertCtrl.create({
          title:'Password Error', 
          subTitle:'Please enter a new password',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else  if (!obj.confirmPassword) {
      let alert = this.alertCtrl.create({
          title:'Password Error', 
          subTitle:'Please confirm the new password',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else  if (obj.password != obj.confirmPassword) {
      let alert = this.alertCtrl.create({
          title:'Password Error', 
          subTitle:'The new password and confirm assword do not match',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Completing Password Reset..."
      });
      loader.present();   

      this.backendService.resetPassword(obj).subscribe(data => {
          loader.dismissAll();
          if(data.success) 
            {
              let alert = this.alertCtrl.create({
                title:'Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              this.navCtrl.push(LoginPage);
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Reset Failed', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
      loader.dismissAll();
    }
    }
  }
