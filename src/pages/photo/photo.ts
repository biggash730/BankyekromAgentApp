import { Component, NgZone } from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { NavController, NavParams, LoadingController, AlertController, Loading, Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackendProvider } from '../../providers/backend';
import { UserDataProvider } from '../../providers/user-data';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//declare var cordova: any;
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  loader: any;
  profile: any;
  error: string;
  loading: Loading;
  lastImage: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider,
    public zone: NgZone, public storage: Storage, public userService: UserDataProvider, public alertCtrl: AlertController, public events: Events, public platform: Platform) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.profile = {};
    this.getProfile()
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  profileUpdated() {
    this.events.publish('Profile: Updated');
  }

  

  public uploadImage(base64) {
    var self = this;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
      var obj = {
        image: base64
      };
      self.backendService.setImage(obj).subscribe(data => {
        self.loading.dismissAll()
        if (data.success) {
          self.events.publish('Profile: Updated');
          let alert = self.alertCtrl.create({
            title: 'Success',
            subTitle: "Image Upload Successful",
            buttons: ['OK']
          });
          alert.present();
          self.navCtrl.pop()
        }
      }, (error) => {
        //console.log(error);
        self.loading.dismissAll()
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: "Error Uploading Image to Server",
          buttons: ['OK']
        });
        alert.present();
      });
  }

  getProfile() {
    let self = this
    let loader = this.loadingCtrl.create({
      content: ""
    });
    //loader.present().then(()=>{    })
    loader.present().then(() => {
      self.backendService.getProfile().subscribe(data => {
        //console.log(data)
        loader.dismissAll();
        if (data.success) {
          self.profile = data.data;
        }
      }, (error) => {
        //console.log(error);
        loader.dismissAll();
      });
    })

  }

}
