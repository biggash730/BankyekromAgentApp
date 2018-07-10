import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { BackendProvider } from '../../providers/backend';
import { Storage } from '@ionic/storage';
//import { LoginPage } from '../../pages/login/login';
import { ResetPage } from '../../pages/reset/reset';

/**
 * Generated class for the ResetRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reset-request',
  templateUrl: 'reset-request.html',
})
export class ResetRequestPage {
  phoneNumber:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Reset-Request")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      this.phoneNumber = JSON.parse(val)
    });
  }

  login(){
    this.navCtrl.pop()
    //this.navCtrl.push(LoginPage);
  }
  reset(){
    this.navCtrl.push(ResetPage);
  }

  requestReset(){
    var obj = {
      phoneNumber: this.phoneNumber
      }
      //console.log(obj)
    if (!obj.phoneNumber) {
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else if(obj.phoneNumber.startsWith("0")){
      let alert = this.alertCtrl.create({
        title:'Phone Number Error', 
        subTitle:'Please enter a valid phone number without the preceding zero (0)',
        buttons:['OK']
      });
      alert.present();        
      return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Initiating Password Reset..."
      });
      loader.present(); 
      
      obj.phoneNumber = "0"+obj.phoneNumber;

      this.backendService.requestPasswordReset(obj.phoneNumber).subscribe(data => {
          loader.dismissAll();
          if(data.success) 
            {
              let alert = this.alertCtrl.create({
                title:'Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              this.userService.setPhoneNumber(this.phoneNumber)
              //redirect to the reset page
              this.navCtrl.push(ResetPage);
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Reset Request Failed', 
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
