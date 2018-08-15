import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular/umd';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public userService: UserDataProvider, public backendService: BackendProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  ionViewWillEnter(){
    }
  openProfile(){
    this.navCtrl.push(ProfilePage);
  }

  openTerms(){
    //this.navCtrl.push(TermsPage);
  }
  openAbout(){
    //this.navCtrl.push(AboutPage);
  }
  openPrivacy(){
    //this.navCtrl.push(PrivacyPolicyPage);
  }
  openContactUs(){
    //this.navCtrl.push(ContactUsPage);
  }

  signout(){
    //let self = this
    let alert = this.alertCtrl.create({
      title: 'App Logout',
      message: 'Are you sure you want to be logged out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            
            //console.log('Cancel the request');
            this.backendService.logout().subscribe(data => {
            //console.log(data)
            if(data.success) 
            {
              this.storage.remove(this.userService.HAS_LOGGED_IN)
              this.navCtrl.parent.parent.setRoot(LoginPage);
            }
          }, (error) => {
            console.log(error);
          });
          //this.storage.remove(this.userService.HAS_LOGGED_IN)
          //this.navCtrl.parent.parent.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();   
    
  }

}
