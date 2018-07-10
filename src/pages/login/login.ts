import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { SignupPage } from '../../pages/signup/signup';
import { HomePage } from '../../pages/home/home';
import { VerifyPage } from '../../pages/verify/verify';
import { ResetRequestPage } from '../../pages/reset-request/reset-request';

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
  cities:any[]
  phoneNumber:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Login")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      this.phoneNumber = JSON.parse(val)
    });
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }
  verify(){
    this.navCtrl.push(VerifyPage);
  }
  reset(){
    this.navCtrl.push(ResetRequestPage);
  }

  login(){
    var obj = {
        userName: this.phoneNumber, password: this.password
      }
      //console.log(obj)
    if (!obj.userName) {
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else if(obj.userName.startsWith("0")){
      let alert = this.alertCtrl.create({
        title:'Phone Number Error', 
        subTitle:'Please enter a valid phone number without the preceding zero (0)',
        buttons:['OK']
      });
      alert.present();        
      return;
    }
    else if (!obj.password) {
      let alert = this.alertCtrl.create({
          title:'Password Error', 
          subTitle:'Please provide a password',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Login Initiated..."
      });
      loader.present();   

      obj.userName = "0"+obj.userName;

      this.backendService.login(obj).subscribe(data => {
          //console.log(data)
          loader.dismissAll();
          if(data.success) 
            {
              let alert = this.alertCtrl.create({
                title:'Login Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              //save the user details and set that login is successful
              //this.userService.setUsername(data.data.name);
              this.userService.setLoggedIn()
              this.userService.setCurrentUser(data.data)
              this.userService.setToken(data.data.token)
              //redirect to the verification page
              this.navCtrl.push(HomePage);
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Login Failed', 
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
