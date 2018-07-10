import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { LoginPage } from '../../pages/login/login';
import { PhotoPage } from '../../pages/photo/photo';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loader:any;
  profile: any;
  error: string;
  loading: Loading;
  ids: any[]
  documents: any[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController,public events: Events) {
      this.loader = this.loadingCtrl.create({
        content: ""
      });
      this.ids = []
      this.documents = []
      this.profile = {};
      this.getProfile()
      //this.getIds()
      //this.getDocs()
      this.profileUpdated()
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  profileUpdated(){
    this.events.subscribe('Profile: Updated', () => {
      this.getProfile();
    });
  }

  UpdateProfile(){
    this.navCtrl.push(UpdateProfilePage);
  }

  changeImage(){
    this.navCtrl.push(PhotoPage);
  }

  AddId(){
    //this.navCtrl.push(AddidPage);
  }
  UpdateId(data) {
    //this.navCtrl.push(UpdateidPage, data);
  }

  AddDoc(){
    //this.navCtrl.push(AdddocPage);
  }
  UpdateDoc(data) {
    //this.navCtrl.push(UpdatedocPage, data);
  }

  getProfile(){
    let self = this
    let loader = this.loadingCtrl.create({
      content: ""
    });
    //loader.present().then(()=>{    })
    loader.present().then(()=>{
      self.backendService.getProfile().subscribe(data => {
        //console.log(data)
        loader.dismissAll();
        if(data.success) 
          {
            self.profile = data.data;
          }
      }, (error) => {
          //console.log(error);
          loader.dismissAll();
    });
    })
    
  }

  getIds(){
    this.backendService.getIds().subscribe(data => {
      if(data.success) 
        {
          this.ids = data.data;
        }
    }, (error) => {
        //console.log(error);
  });
    
  }

  getDocs(){
    this.backendService.getDocs().subscribe(data => {
      if(data.success) 
        {
          this.documents = data.data;
        }
    }, (error) => {
        //console.log(error);
  });
    
  }

  logout(){
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
            this.storage.remove(this.userService.HAS_LOGGED_IN)
            this.navCtrl.parent.parent.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

}
