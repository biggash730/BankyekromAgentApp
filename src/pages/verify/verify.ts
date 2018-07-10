import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { ResendVerificationPage } from '../../pages/resend-verification/resend-verification';
import { LoginPage } from '../../pages/login/login';


@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  code:string
  phoneNumber: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Verify")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      //console.log(val)
      this.phoneNumber = JSON.parse(val)
    });   
    
  }

  login(){
    //this.navCtrl.pop();
    this.navCtrl.push(LoginPage);
  }

  resend(){
    //this.navCtrl.pop();
    this.navCtrl.push(ResendVerificationPage);
  }

  verify(){
    

    var obj = {
        phoneNumber: this.phoneNumber, token: this.code
      }
      //console.log(obj)
    if (!obj.token) {
      let alert = this.alertCtrl.create({
          title:'Verification Error', 
          subTitle:'Please enter the verification code',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else if (!obj.phoneNumber) {
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter your phone number',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else if(obj.phoneNumber.startsWith("0")){
      let alert = this.alertCtrl.create({
        title:'Phone Number Error', 
        subTitle:'Please enter a phone number without the preceding zero (0)',
        buttons:['OK']
      });
      alert.present();        
      return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Verifying..."
      });
      loader.present();  
      
      obj.phoneNumber = "0"+obj.phoneNumber;

      this.backendService.verify(obj).subscribe(data => {
          //console.log(data)
          loader.dismissAll();
            if(data.success) 
            {
              let alert = this.alertCtrl.create({
                title:'Verification Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              //redirect to the verification page
              this.navCtrl.push(LoginPage);
              //this.navCtrl.pop()
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Verification Failed', 
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
