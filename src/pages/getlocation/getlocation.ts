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
import { LocaldbProvider } from '../../providers/localdb';


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
  formData: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, private geolocation: Geolocation, public localdb: LocaldbProvider) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  setlocation() {
    let loader = this.loadingCtrl.create({
      content: "Saving ..."
    });
    loader.present();
    this.localdb.saveRecord(this.formData, 'farms')
      .then(res => {
        loader.dismissAll();
        //console.log(res)
        let alert = this.alertCtrl.create({
          title: 'Save Successful',
          subTitle: "Farm saved Successfully",
          buttons: ['OK']
        });
        alert.present();
        this.events.publish('Farm: saved');
        this.navCtrl.pop();
      })
      .catch((err) => { });
  }

  getLocation() {
    var self = this;
    this.geolocation.getCurrentPosition().then((resp) => {
      self.formData.latitude = resp.coords.latitude;
      self.formData.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  start() {
    this.getLocation();
  }
}
