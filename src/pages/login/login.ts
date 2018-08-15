import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { HomePage } from '../home/home';

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
  username:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Login")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      this.username = JSON.parse(val)
    });
  }

  login(){
    var obj = {
        username: this.username, password: this.password
      }
      //console.log(obj)
    if (!obj.username) {
      let alert = this.alertCtrl.create({
          title:'Username Error', 
          subTitle:'Please enter a valid username',
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
              this.userService.setLoggedIn()
              this.userService.setCurrentUser(data.data)
              this.userService.setToken(data.data.token)
              this.navCtrl.setRoot(HomePage)
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
