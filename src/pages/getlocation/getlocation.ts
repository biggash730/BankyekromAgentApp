import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Events
} from 'ionic-angular';
import {
  BackendProvider
} from '../../providers/backend';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-getlocation',
  templateUrl: 'getlocation.html',
})
export class GetLocationPage {
  loader: any
  formData: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, private geolocation: Geolocation) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

setlocation() {
    //do validations
    //do save action here
    let self = this

    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present().then(() => {

        self.backendService.setLocation(self.formData).subscribe(data => {
          loader.dismissAll();
          if (data.success) {
            let alert = self.alertCtrl.create({
              title: 'Updated Successful',
              subTitle: data.message,
              buttons: ['OK']
            });
            alert.present();
            self.events.publish('Farm: saved');
            self.navCtrl.pop();
          } else {
            let alert = self.alertCtrl.create({
              title: 'Update Error',
              subTitle: data.message,
              buttons: ['OK']
            });
            alert.present();
          }
        }, (error) => {
          loader.dismissAll();
          console.log(error);
        });
      });
    }

    getLocation(){
      var self = this;
      this.geolocation.getCurrentPosition().then((resp) => {
        self.formData.latitude = resp.coords.latitude;
        self.formData.longitude = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }

    start() {
      this.loader = this.loadingCtrl.create({
        content: ""
      });
      this.getLocation();
    }
  }
