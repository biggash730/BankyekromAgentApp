import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { BackendProvider } from '../../providers/backend';
import { VerifyPage } from '../../pages/verify/verify';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  phoneNumber:string;
  name:string;
  email:string;
  password:string;
  confirmPassword:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider) {
    userService.setPage("Signup")
  }
  ionViewDidLoad() { 
  }
  goBack(){
    this.navCtrl.pop();
  }
  signup(){
    var obj = {
        phoneNumber: this.phoneNumber, 
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
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
    else if (!obj.email) {
      let alert = this.alertCtrl.create({
          title:'Email Error', 
          subTitle:'Please enter your email address',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else if (!obj.name) {
      let alert = this.alertCtrl.create({
          title:'Name Error', 
          subTitle:'Please enter your full name',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else if (obj.password != obj.confirmPassword) {
      let alert = this.alertCtrl.create({
          title:'The password and confirm password do not match', 
          subTitle:'Please enter your first name',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Processing..."
      });
      loader.present();    
      
      obj.phoneNumber = "0"+obj.phoneNumber;

      this.backendService.signup(obj).subscribe(data => {
          loader.dismissAll();
            if(data.success) 
            {
              this.userService.setPhoneNumber(data.data)
              let alert = this.alertCtrl.create({
                title:'Signup Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              this.navCtrl.push(VerifyPage);
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
      loader.dismissAll();
    }
    }

}
