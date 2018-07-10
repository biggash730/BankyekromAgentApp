import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { BackendProvider } from '../../providers/backend';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { VerifyPage } from '../../pages/verify/verify';

/**
 * Generated class for the ResendVerificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-resend-verification',
  templateUrl: 'resend-verification.html',
})
export class ResendVerificationPage {
  phoneNumber:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Resend-Verification")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      this.phoneNumber = JSON.parse(val)
    });
  }

  login(){
    this.navCtrl.push(LoginPage);
  }
  verify(){
    this.navCtrl.pop()
    //this.navCtrl.push(VerifyPage);
  }

  resend(){
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
        content: "Resending Verification Code..."
      });
      loader.present(); 
      
      obj.phoneNumber = "0"+obj.phoneNumber;

      this.backendService.resendVerification(obj.phoneNumber).subscribe(data => {
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
              this.navCtrl.push(VerifyPage);
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Resend Verification Failed', 
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
